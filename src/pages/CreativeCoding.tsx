import { Link } from "react-router-dom";

export default function CreativeCoding() {
  return (
    <main className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto w-full py-24 pt-12">
      <div className="pb-12">
          <Link
              to="/works"
              className="text-neutral-500 hover:text-neutral-900 flex gap-2">
              <i className="material-symbols-rounded">keyboard_backspace</i>Back to Works
          </Link>
      </div>
      <h1 className="text-3xl font-semibold tracking-tight mb-10">
        Creative Coding
      </h1>
      <p className="text-neutral-500 leading-relaxed max-w-2xl">
        Content coming soon.
      </p>
    </main>
  );
}
