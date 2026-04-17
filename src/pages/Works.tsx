import { Link } from "react-router-dom";

export default function Works() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-24 pt-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-10">Works</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Link
          to="/works/digital-paintings"
          className="group block rounded-2xl border border-neutral-200 p-8 hover:border-neutral-400 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2 group-hover:text-neutral-600 transition-colors">
            Digital Paintings
          </h2>
          <p className="text-neutral-500 leading-relaxed">
            A collection of digital artwork and illustrations.
          </p>
        </Link>

        <Link
          to="/works/applications"
          className="group block rounded-2xl border border-neutral-200 p-8 hover:border-neutral-400 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2 group-hover:text-neutral-600 transition-colors">
            Applications
          </h2>
          <p className="text-neutral-500 leading-relaxed">
            Side projects and applications I've built.
          </p>
        </Link>
      </div>
    </main>
  );
}
