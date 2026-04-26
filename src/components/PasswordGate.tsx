import { useState, useEffect, useRef } from "react";

const PASSWORD_HASH =
  "48e23e7f21c9a43e3b7d5a58ba94f5793a91a8c53cf7d0b6b3b4d1ba7513ce23";
const SESSION_KEY = "cs_auth";

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      setAuthenticated(true);
    } else {
      // Focus input when gate appears
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const hash = await sha256(value);
    if (hash === PASSWORD_HASH) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthenticated(true);
    } else {
      setError(true);
      setShaking(true);
      setValue("");
      setTimeout(() => setShaking(false), 500);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
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
            This section is password protected.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
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
      </div>
    </main>
  );
}
