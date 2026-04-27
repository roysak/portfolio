import { useState, useEffect, useRef } from "react";
import { assetUrl } from "../utils/assetUrl";

// ─── Switch between "password" and "pin" modes here ──────────────────────────
const MODE: "password" | "pin" = "pin";
const PIN_LENGTH = 6; // 4 or 6 — only used when MODE is "pin"
// ─────────────────────────────────────────────────────────────────────────────

const HASHES = {
  password: "48e23e7f21c9a43e3b7d5a58ba94f5793a91a8c53cf7d0b6b3b4d1ba7513ce23",
  pin: "9a1304628838259a8e0e8e731aefd62794e4dfe467dd859cae9fa5339498ee95",
};

const SESSION_KEY = "cs_auth";

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState<string[]>(Array(PIN_LENGTH).fill(""));
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pinRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      setAuthenticated(true);
      return;
    }
    if (MODE === "pin") {
      setTimeout(() => pinRefs.current[0]?.focus(), 100);
    } else {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, []);

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

  function handlePinKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      pinRefs.current[index - 1]?.focus();
    }
  }

  function handlePinPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, PIN_LENGTH);
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
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-50 mb-4">
            <i className="material-symbols-rounded text-primary-600 text-2xl">lock</i>
          </div>
          <h1 className="text-2xl font-semibold text-primary-600 tracking-tight">
            Case Studies
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            {MODE === "pin"
              ? `Enter your ${PIN_LENGTH}-digit PIN to continue.`
              : "This section is password protected."}
          </p>
        </div>

        {/* ── PIN mode ────────────────────────────────────────────────────── */}
        {MODE === "pin" && (
          <div className={`flex flex-col items-center gap-4 ${shaking ? "animate-shake" : ""}`}>
            <img src={assetUrl(typing ? '/img/surprised.gif' : '/img/protected.gif')} alt="Protected" className="w-full" />
            <div className="flex gap-3">
              {pin.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { pinRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(i, e.target.value)}
                  onKeyDown={(e) => handlePinKeyDown(i, e)}
                  onPaste={handlePinPaste}
                  className={[
                    "w-11 h-14 text-center text-xl font-semibold rounded-lg border outline-none transition-colors",
                    error
                      ? "border-red-400 bg-red-50 text-red-500"
                      : "border-neutral-300 bg-white focus:border-primary-400 text-primary-600",
                  ].join(" ")}
                />
              ))}
            </div>
            {error && (
              <p className="text-xs text-red-500">Incorrect PIN. Try again.</p>
            )}
            <p className="text-xs text-neutral-400 mt-2">Reach out to me for PIN</p>
            <div className="flex gap-3">
              <a href="mailto:roysak@gmail.com" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full text-neutral-600 hover:bg-neutral-50 transition-colors">
                <i className="material-symbols-rounded text-sm text-blue-600">alternate_email</i>Email
              </a>
              <a href="https://wa.me/919846666988" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full text-neutral-600 hover:bg-neutral-50 transition-colors">
                <i className="material-symbols-rounded text-sm"><img className="w-6" src={assetUrl('/img/whatsapp.svg')} alt="Whatsapp" /></i>WhatsApp
              </a>
              <a href="tel:+919846666988" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full text-neutral-600 hover:bg-neutral-50 transition-colors">
                <i className="material-symbols-rounded text-sm text-green-600">call</i>Call
              </a>
            </div>
          </div>
        )}

        {/* ── Password mode ────────────────────────────────────────────────── */}
        {MODE === "password" && (
          <form
            onSubmit={handlePasswordSubmit}
            className={shaking ? "animate-shake" : ""}
          >
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
                  "w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors",
                  error
                    ? "border-red-400 bg-red-50 placeholder:text-red-300"
                    : "border-neutral-300 bg-white focus:border-primary-400",
                ].join(" ")}
              />
              {error && (
                <p className="text-xs text-red-500 -mt-1">Incorrect password. Try again.</p>
              )}
              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Unlock
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
