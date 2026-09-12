import { useState, useEffect, useRef } from "react";
import { assetUrl } from "../utils/assetUrl";
import { Register } from "./system";

// ─── Switch between "password" and "pin" modes here ──────────────────────────
const MODE: "password" | "pin" = "pin";
const PIN_LENGTH = 6; // 4 or 6 — only used when MODE is "pin"
// ─────────────────────────────────────────────────────────────────────────────

const HASHES = {
    password:
        "48e23e7f21c9a43e3b7d5a58ba94f5793a91a8c53cf7d0b6b3b4d1ba7513ce23",
    pin: "9a1304628838259a8e0e8e731aefd62794e4dfe467dd859cae9fa5339498ee95",
};

const SESSION_KEY = "cs_auth";

async function sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

const inputBase =
    "w-12 h-16 text-center text-2xl font-display font-medium border outline-none bg-paper-2 tabular-nums transition-colors focus:border-accent";
const contactLink =
    "label inline-flex items-center gap-2 px-3 py-2 border border-rule-2 hover:bg-ink hover:text-paper hover:border-ink transition-colors";

export default function PasswordGate({
    children,
}: {
    children: React.ReactNode;
}) {
    const [authenticated, setAuthenticated] = useState(
        () => sessionStorage.getItem(SESSION_KEY) === "1",
    );
    const [pin, setPin] = useState<string[]>(Array(PIN_LENGTH).fill(""));
    const [value, setValue] = useState("");
    const [error, setError] = useState(false);
    const [shaking, setShaking] = useState(false);
    const [typing, setTyping] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const pinRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (authenticated) return;
        if (MODE === "pin") {
            setTimeout(() => pinRefs.current[0]?.focus(), 100);
        } else {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [authenticated]);

    function triggerError() {
        setError(true);
        setShaking(true);
        setTyping(false);
        if (MODE === "pin") {
            setPin(Array(PIN_LENGTH).fill(""));
            setTimeout(() => pinRefs.current[0]?.focus(), 50);
        } else {
            setValue("");
            setTimeout(() => inputRef.current?.focus(), 50);
        }
        setTimeout(() => setShaking(false), 500);
    }

    async function verify(input: string) {
        const hash = await sha256(input);
        if (hash === HASHES[MODE]) {
            sessionStorage.setItem(SESSION_KEY, "1");
            setAuthenticated(true);
        } else {
            triggerError();
        }
    }

    // ── PIN handlers ────────────────────────────────────────────────────────────
    function handlePinChange(index: number, digit: string) {
        if (!/^\d?$/.test(digit)) return;
        setError(false);
        if (digit) setTyping(true);
        const next = [...pin];
        next[index] = digit;
        setPin(next);
        if (digit && index < PIN_LENGTH - 1) {
            pinRefs.current[index + 1]?.focus();
        }
        if (next.every((d) => d !== "") && digit) {
            verify(next.join(""));
        }
    }

    function handlePinKeyDown(
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>,
    ) {
        if (e.key === "Backspace" && !pin[index] && index > 0) {
            pinRefs.current[index - 1]?.focus();
        }
    }

    function handlePinPaste(e: React.ClipboardEvent<HTMLInputElement>) {
        const pasted = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, PIN_LENGTH);
        if (pasted.length === PIN_LENGTH) {
            e.preventDefault();
            const next = pasted.split("");
            setPin(next);
            pinRefs.current[PIN_LENGTH - 1]?.focus();
            verify(pasted);
        }
    }

    // ── Password handler ────────────────────────────────────────────────────────
    async function handlePasswordSubmit(e: React.FormEvent) {
        e.preventDefault();
        await verify(value);
    }

    if (authenticated) return <>{children}</>;

    return (
        <main className="relative flex flex-col items-center justify-center min-h-[72svh] px-margin py-16">
            <Register className="left-[calc(var(--margin)-22px)] top-8" />
            <Register className="right-[calc(var(--margin)-22px)] top-8" />

            <div className="w-full max-w-md border border-rule-2 bg-paper-2 p-[clamp(24px,4vw,48px)]">
                <div className="mb-10 pb-6 border-b border-rule">
                    <span className="label block mb-4 text-accent">
                        ⊗ Sealed · Not for circulation
                    </span>
                    <h1 className="m-0 font-display font-medium text-[clamp(28px,3.6vw,42px)] tracking-[-0.04em] leading-none">
                        Case Studies
                    </h1>
                    <p className="font-serif text-small text-ink-2 mt-3 mb-0">
                        {MODE === "pin"
                            ? `These plates carry client work. Enter your ${PIN_LENGTH}-digit PIN to open them.`
                            : "This section is password protected."}
                    </p>
                </div>

                {/* ── PIN mode ────────────────────────────────────────────────────── */}
                {MODE === "pin" && (
                    <div>
                        <div
                            className={`flex flex-col items-center gap-4 ${shaking ? "animate-shake" : ""}`}>
                            <img
                                src={assetUrl(
                                    typing
                                        ? "/img/surprised.gif"
                                        : "/img/protected.gif",
                                )}
                                alt="Protected"
                                className="w-full rounded hidden"
                            />
                            <div className="flex gap-3">
                                {pin.map((digit, i) => (
                                    <input
                                        key={i}
                                        ref={(el) => {
                                            pinRefs.current[i] = el;
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        aria-label={`PIN digit ${i + 1}`}
                                        onChange={(e) =>
                                            handlePinChange(i, e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                            handlePinKeyDown(i, e)
                                        }
                                        onPaste={handlePinPaste}
                                        className={[
                                            inputBase,
                                            error
                                                ? "border-accent text-accent"
                                                : "border-rule-2 text-ink",
                                        ].join(" ")}
                                    />
                                ))}
                            </div>
                            {error && (
                                <p className="label text-accent m-0" role="alert">
                                    Incorrect PIN. Try again.
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col items-center gap-4 mt-10 pt-6 border-t border-rule">
                            <p className="label m-0">Request the PIN</p>
                            <div className="flex gap-2 flex-wrap justify-center">
                                <a
                                    href="mailto:roysak@gmail.com?subject=Case%20Study%20Access&body=I%20would%20like%20to%20access%20your%20case%20study"
                                    className={contactLink}>
                                    Email
                                </a>
                                <a
                                    href="https://wa.me/919846666988?text=Hello%2C%20I%20would%20like%20to%20access%20your%20case%20study"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={contactLink}>
                                    <img className="w-4" src={assetUrl("/img/whatsapp.svg")} alt="" />
                                    WhatsApp
                                </a>
                                <a href="tel:+919846666988" className={contactLink}>
                                    Call
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Password mode ────────────────────────────────────────────────── */}
                {MODE === "password" && (
                    <form
                        onSubmit={handlePasswordSubmit}
                        className={shaking ? "animate-shake" : ""}>
                        <div className="flex flex-col gap-3">
                            <input
                                ref={inputRef}
                                type="password"
                                value={value}
                                onChange={(e) => {
                                    setValue(e.target.value);
                                    setError(false);
                                    setTyping(e.target.value.length > 0);
                                }}
                                placeholder="Enter password"
                                autoComplete="current-password"
                                className={[
                                    "w-full px-4 py-3 border bg-paper-2 text-small outline-none transition-colors focus:border-accent",
                                    error
                                        ? "border-accent placeholder:text-accent"
                                        : "border-rule-2",
                                ].join(" ")}
                            />
                            {error && (
                                <p className="label text-accent -mt-1" role="alert">
                                    Incorrect password. Try again.
                                </p>
                            )}
                            <button
                                type="submit"
                                className="w-full bg-ink text-paper hover:bg-accent font-mono text-caption uppercase tracking-[0.11em] py-3.5 transition-colors">
                                Unlock
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </main>
    );
}
