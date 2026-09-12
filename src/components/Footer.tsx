import { Link } from "react-router-dom";
import { Col, Grid, Register } from "./system";

const colophon = [
  { k: "Set in", v: "Inter Tight, Newsreader, JetBrains Mono" },
  { k: "Built with", v: "React, TypeScript, Tailwind, GSAP, WebGL" },
  { k: "Grid", v: "12 columns — hold G to see it" },
  { k: "Printed in", v: "Kochi, India" },
];

const elsewhere = [
  { label: "LinkedIn", href: "https://in.linkedin.com/in/roysak" },
  { label: "WhatsApp", href: "https://wa.me/919846666988" },
  { label: "+91 98466 66988", href: "tel:+919846666988" },
];

/** The colophon — how the thing was made, set the way a book sets it. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative px-margin pt-[clamp(56px,8vw,120px)] pb-8 border-t border-rule">
      <Register className="left-[calc(var(--margin)-22px)] top-6" />
      <Register className="right-[calc(var(--margin)-22px)] top-6" />

      <Grid className="gap-y-[clamp(40px,6vw,72px)]">
        <Col span={12}>
          <p className="label m-0 mb-6">
            <span className="text-accent">§</span> Colophon
          </p>
          <p className="m-0 font-serif font-normal text-display leading-[1.05] tracking-[-0.025em]">
            Let's make something
            <br />
            worth printing.
          </p>
          <a
            href="mailto:roysak@gmail.com"
            className="group inline-block mt-7 font-display font-medium text-head tracking-[-0.02em]"
          >
            roysak@gmail.com
            <span
              aria-hidden="true"
              className="block h-px bg-accent origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100"
            />
          </a>
        </Col>

        <Col span={5}>
          <dl className="m-0">
            {colophon.map((c) => (
              <div key={c.k} className="flex items-baseline gap-4 py-2 border-b border-rule">
                <dt className="label shrink-0 w-[6.5rem]">{c.k}</dt>
                <dd className="m-0 text-small text-ink-2 min-w-0">{c.v}</dd>
              </div>
            ))}
          </dl>
        </Col>

        <Col span={3} start={9}>
          <p className="label m-0 mb-3">Elsewhere</p>
          <ul className="list-none m-0 p-0 grid gap-2">
            {elsewhere.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-small text-ink-2 hover:text-accent transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </Col>

        <Col span={12} className="flex justify-between gap-4 flex-wrap pt-5 border-t border-rule">
          <span className="label">© {year} Roys A Kareem · All plates his own</span>
          <Link className="label hover:text-accent transition-colors" to="/">
            ↑ Return to cover
          </Link>
        </Col>
      </Grid>
    </footer>
  );
}
