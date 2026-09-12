import { useState, useEffect, useRef } from "react";
import { assetUrl } from "../utils/assetUrl";

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
    "w-11 h-14 text-center text-xl font-display font-semibold rounded border outline-none bg-ink-2 transition-colors focus:border-pigment";
const contactLink =
    "inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-line-strong font-mono text-[11px] uppercase tracking-[0.08em] text-bone-2 hover:text-bone hover:border-bone transition-colors";

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
        <main className="flex flex-col items-center justify-center min-h-[70vh] px-gutter pt-32 pb-16">
            <div className="w-full max-w-sm">
                <div className="mb-8 text-center">
                    <span className="label block mb-3">Password protected</span>
                    <h1 className="m-0 font-display font-semibold text-[clamp(30px,4vw,44px)] tracking-[-0.03em] leading-none">
                        Case Studies
                    </h1>
                    <p className="text-sm text-bone-2 mt-3 mb-0">
                        {MODE === "pin"
                            ? `Enter your ${PIN_LENGTH}-digit PIN to continue.`
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
                                                ? "border-red-400 text-red-400"
                                                : "border-line-strong text-pigment",
                                        ].join(" ")}
                                    />
                                ))}
                            </div>
                            {error && (
                                <p className="text-xs text-red-400 m-0">
                                    Incorrect PIN. Try again.
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col items-center gap-4 mt-6">
                            <p className="label m-0">Reach out to me for the PIN</p>
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
                                    "w-full px-4 py-3 rounded border bg-ink-2 text-sm outline-none transition-colors focus:border-pigment",
                                    error
                                        ? "border-red-400 placeholder:text-red-400"
                                        : "border-line-strong",
                                ].join(" ")}
                            />
                            {error && (
                                <p className="text-xs text-red-400 -mt-1">
                                    Incorrect password. Try again.
                                </p>
                            )}
                            <button
                                type="submit"
                                className="w-full bg-pigment text-pigment-ink hover:bg-bone hover:text-ink font-mono text-xs uppercase tracking-[0.1em] py-3.5 rounded-full transition-colors">
                                Unlock
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </main>
    );
}
