import { useLocation } from "react-router-dom";
import Button, { ArrowIcon } from "../components/Button";
import DualField from "../components/bgfx/DualField";

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <main className="relative grow flex flex-col items-center justify-center overflow-hidden px-gutter pt-36 pb-24 text-center min-h-[78svh]">
      <div className="absolute inset-0" aria-hidden="true">
        <DualField density={500} intensity={0.7} />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,var(--ink)_25%,transparent_75%)]"
      />

      <div className="relative grid gap-7 justify-items-center">
        <span className="label tag-num text-pigment">Error</span>
        <h1 className="m-0 text-[clamp(88px,22vw,280px)] leading-[0.8]">
          <span className="font-serif italic">4</span>
          <span className="font-mono tracking-[-0.06em] text-[0.82em] text-pigment">0</span>
          <span className="font-grotesk font-extrabold">4</span>
        </h1>
        <p className="m-0 max-w-[44ch] text-bone-2">
          <code className="font-mono text-sm px-1.5 py-0.5 rounded-art-sm bg-ink-3 text-bone">{pathname}</code>{" "}
          doesn't exist — in either mode.
        </p>
        <div className="flex flex-wrap gap-3.5 justify-center">
          <Button to="/" primary>
            Back to home <ArrowIcon />
          </Button>
          <Button to="/works">Browse works</Button>
        </div>
      </div>
    </main>
  );
}
