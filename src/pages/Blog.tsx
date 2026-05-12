import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { articles } from "../data/articles";
import type { ArticleCategory } from "../data/articleTypes";

const ALL_CATEGORIES: ArticleCategory[] = [
  "All",
  "UX & Design",
  "JavaScript",
  "TypeScript",
  "React",
  "Angular",
  "Frontend",
  "CSS",
  "HTML",
];

const PAGE_SIZE = 6;

const sorted = [...articles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export default function Blog() {
  const [active, setActive] = useState<ArticleCategory>("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const usedCategories = ALL_CATEGORIES.filter(
    (cat) => cat === "All" || sorted.some((a) => a.category === cat)
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sorted.filter((a) => {
      const matchesCategory = active === "All" || a.category === active;
      const matchesSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [active, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function handleCategory(cat: ArticleCategory) {
    setActive(cat);
    setPage(1);
  }

  function handleSearch(value: string) {
    setQuery(value);
    setPage(1);
  }

  return (
    <main className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto w-full py-24 pt-12">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight mb-3">Blog</h1>
        <p className="text-neutral-500 text-md leading-relaxed">
          Practical guides, cheatsheets, and thoughts on design and frontend development.
        </p>
      </header>

      {/* Search */}
      <div className="relative mb-6">
        <span className="material-symbols-rounded absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xl! pointer-events-none">
          search
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search articles…"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition"
        />
        {query && (
          <button
            onClick={() => handleSearch("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition"
            aria-label="Clear search"
          >
            <span className="material-symbols-rounded text-xl!">close</span>
          </button>
        )}
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {usedCategories.map((cat) => {
          const isActive = active === cat;
          const count =
            cat === "All"
              ? sorted.length
              : sorted.filter((a) => a.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                isActive
                  ? "bg-primary-600 text-white border-primary-600 shadow-sm"
                  : "bg-white text-neutral-500 border-neutral-200 hover:border-primary-300 hover:text-primary-700"
              }`}
            >
              {cat}
              <span
                className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results summary */}
      {query && (
        <p className="text-sm text-neutral-400 mb-6">
          {filtered.length === 0
            ? "No results"
            : `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${query}"`}
        </p>
      )}

      {/* Article list */}
      {paginated.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-neutral-400 gap-3">
          <span className="material-symbols-rounded text-4xl!">search_off</span>
          <p className="text-sm">
            {query ? `No articles match "${query}".` : "No articles in this category yet."}
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-6">
          {paginated.map((article) => (
            <li key={article.slug}>
              <Link
                to={`/blog/${article.slug}`}
                className="group flex flex-col gap-3 rounded-2xl border border-neutral-200 p-8 hover:border-primary-300 hover:bg-primary-50 transition-all"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-700">
                    {article.category}
                  </span>
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-xl font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors">
                  {article.title}
                </h2>

                <p className="text-neutral-500 leading-relaxed">{article.description}</p>

                <div className="flex items-center gap-4 text-sm text-neutral-400 mt-1">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="material-symbols-rounded text-base!">calendar_today</span>
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="material-symbols-rounded text-base!">schedule</span>
                    {article.readingTime}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-neutral-200 text-sm text-neutral-500 hover:border-primary-300 hover:text-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <span className="material-symbols-rounded text-base!">chevron_left</span>
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-9 h-9 rounded-lg border text-sm font-medium transition ${
                n === safePage
                  ? "bg-primary-600 text-white border-primary-600 shadow-sm"
                  : "border-neutral-200 text-neutral-500 hover:border-primary-300 hover:text-primary-700"
              }`}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-neutral-200 text-sm text-neutral-500 hover:border-primary-300 hover:text-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next
            <span className="material-symbols-rounded text-base!">chevron_right</span>
          </button>
        </div>
      )}
    </main>
  );
}
