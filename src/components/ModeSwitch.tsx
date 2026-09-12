import { useMode } from "../theme/modeContext";

/**
 * The one control that defines the site: flips the whole page between the
 * designer's paper and the developer's terminal. The click coordinates are
 * handed to the provider so the wipe originates from the switch itself.
 */
export default function ModeSwitch({ className = "" }: { className?: string }) {
  const { mode, other, toggle } = useMode();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={mode === "code"}
      aria-label={`Switch to ${other} mode`}
      title={`Switch to ${other} mode`}
      onClick={(e) => toggle({ x: e.clientX, y: e.clientY })}
      className={`mode-switch ${className}`}
    >
      <span className="mode-switch__knob" aria-hidden="true" />
      <span className="mode-switch__label" data-on={mode === "design"} aria-hidden="true">
        Design
      </span>
      <span className="mode-switch__label" data-on={mode === "code"} aria-hidden="true">
        Code
      </span>
    </button>
  );
}
