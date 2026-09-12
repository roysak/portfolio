import { Link } from "react-router-dom";
import Magnetic from "./Magnetic";
import { useMode } from "../theme/modeContext";

const elsewhere = [
  { label: "LinkedIn", href: "https://in.linkedin.com/in/roysak", ext: true },
  { label: "Email", href: "mailto:roysak@gmail.com" },
  { label: "Phone", href: "tel:+919846666988" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const { mode } = useMode();

  return (
    <footer className="relative mt-auto border-t border-line px-gutter pt-[clamp(56px,9vw,120px)] pb-8">
      <div className="grid gap-[clamp(36px,6vw,72px)]">
        <div className="grid gap-6">
          <span className="label tag-num text-pigment">Contact</span>
          <p className="m-0 font-display text-[clamp(38px,8vw,128px)] leading-(--display-leading) text-balance">
            Let's build
            <br />
            something <em className="text-pigment not-italic">good</em>.
          </p>
          <Magnetic strength={0.14} className="justify-self-start">
            <a
              href="mailto:roysak@gmail.com"
              className="link-sweep font-mono text-[clamp(14px,2.4vw,22px)] tracking-[0.02em] text-bone-2 hover:text-bone transition-colors"
            >
              roysak@gmail.com
            </a>
          </Magnetic>
        </div>

        <div className="grid gap-8 sm:grid-cols-[1fr_auto] items-end border-t border-line pt-7">
          <div className="grid gap-2">
            <span className="label">
              © {year} · Roys A Kareem · Kochi, India
            </span>
            <span className="label">
              Built with React, Tailwind and a canvas or two ·{" "}
              <span className="text-pigment">{mode === "code" ? "code" : "design"} mode</span>
            </span>
          </div>

          <nav className="flex gap-6 flex-wrap" aria-label="Elsewhere">
            {elsewhere.map((l) => (
              <a
                key={l.label}
                className="label label-strong link-sweep hover:text-bone transition-colors"
                href={l.href}
                target={l.ext ? "_blank" : undefined}
                rel={l.ext ? "noopener noreferrer" : undefined}
              >
                {l.label}
              </a>
            ))}
            <Link className="label label-strong link-sweep hover:text-bone transition-colors" to="/">
              Top
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
