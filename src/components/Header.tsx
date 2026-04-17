export default function Header() {
  return (
    <header className="max-w-6xl mx-auto border-b border-gray-100 px-6 py-12 md:py-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
          Roys A Kareem
        </h1>
        <h2 className="text-xl md:text-2xl text-neutral-700 font-medium mb-4">
          Specialist I - UX/UI Designer
        </h2>
        <p className="text-neutral-500 text-lg max-w-xl leading-relaxed">
          A collection of my recent work focusing on intuitive problem-solving,
          user-centered design, and measurable impact.
        </p>
      </div>
      <div className="text-sm font-medium text-neutral-400" />
    </header>
  );
}
