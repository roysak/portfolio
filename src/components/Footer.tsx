import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-gutter pt-[clamp(64px,9vw,120px)] pb-8 grid gap-12">
      <p className="m-0 font-display font-bold text-[clamp(40px,8vw,120px)] leading-[0.92] tracking-[-0.04em]">
        Let's build something
        <br />
        <a
          href="mailto:roysak@gmail.com"
          className="group relative inline-block"
        >
          roysak@gmail.com
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 bottom-1.5 h-[0.06em] bg-pigment origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-x-100"
          />
        </a>
      </p>
      <div className="flex justify-between gap-4 flex-wrap border-t border-line pt-5">
        <span className="label">© {year} · Designed with intention.</span>
        <nav className="flex gap-5">
          <a className="label" href="https://in.linkedin.com/in/roysak" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a className="label" href="tel:+919846666988">
            Phone
          </a>
          <Link className="label" to="/">
            Top
          </Link>
        </nav>
      </div>
    </footer>
  );
}
