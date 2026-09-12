import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { articles } from "../data/articles";
import type { ArticleCategory } from "../data/articleTypes";
import SectionHead from "../components/SectionHead";

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

const sorted = [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default function Blog() {
  const [active, setActive] = useState<ArticleCategory>("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const usedCategories = ALL_CATEGORIES.filter(
    (cat) => cat === "All" || sorted.some((a) => a.category === cat),
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
    <main className="px-gutter pt-36 pb-[clamp(64px,9vw,128px)]">
      <div className="max-w-6xl mx-auto w-full">
        <SectionHead
          index="01"
          title={
            <>
              Notes & <em className="font-serif italic text-bone-2">cheatsheets</em>
            </>
          }
          aside={`${sorted.length} articles on design and frontend`}
        />

        {/* Search */}
        <div className="relative mb-5">
          <span
            className="material-symbols-rounded absolute left-4 top-1/2 -translate-y-1/2 text-bone-3 text-xl! pointer-events-none"
            aria-hidden="true"
          >
            search
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search articles…"
            aria-label="Search articles"
            className="w-full pl-12 pr-12 py-3.5 rounded-art border border-line bg-ink-2 text-[15px] text-bone placeholder:text-bone-3 focus:outline-none focus:border-pigment transition-colors"
          />
          {query && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-bone-3 hover:text-bone transition-colors"
              aria-label="Clear search"
            >
              <span className="material-symbols-rounded text-xl!" aria-hidden="true">close</span>
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {usedCategories.map((cat) => {
            const isActive = active === cat;
            const count = cat === "All" ? sorted.length : sorted.filter((a) => a.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-art-pill border font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-300 ${
                  isActive
                    ? "bg-bone text-ink border-bone"
                    : "bg-transparent text-bone-2 border-line hover:text-bone hover:border-line-strong"
                }`}
              >
                {cat}
                <span className={isActive ? "text-ink/55" : "text-bone-3"}>{count}</span>
              </button>
            );
          })}
        </div>

        {query && (
          <p className="label mb-6">
            {filtered.length === 0
              ? "No results"
              : `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for “${query}”`}
          </p>
        )}

        {/* Article list */}
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-bone-3 gap-3 border border-line rounded-art">
            <span className="material-symbols-rounded text-4xl!" aria-hidden="true">search_off</span>
            <p className="text-[15px] m-0">
              {query ? `No articles match “${query}”.` : "No articles in this category yet."}
            </p>
          </div>
        ) : (
          <ul className="list-none m-0 p-0 grid gap-px bg-line border border-line">
            {paginated.map((article) => (
              <li key={article.slug}>
                <Link
                  to={`/blog/${article.slug}`}
                  className="index-row group bg-ink flex flex-col gap-3 p-7 transition-[padding] duration-500 ease-art hover:pl-9"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] px-2.5 py-1 rounded-art-pill bg-plum-soft text-plum">
                      {article.category}
                    </span>
                    {/* The category often repeats as the first tag; show it once. */}
                    {article.tags
                      .filter((tag) => tag.toLowerCase() !== article.category.toLowerCase())
                      .map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-art-pill border border-line text-bone-3"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>

                  <h2 className="m-0 font-display text-[clamp(22px,2.6vw,34px)] leading-tight transition-colors duration-300 group-hover:text-pigment">
                    {article.title}
                  </h2>

                  <p className="m-0 text-bone-2 max-w-[68ch]">{article.description}</p>

                  <div className="flex items-center gap-5 label mt-1">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="material-symbols-rounded text-base!" aria-hidden="true">calendar_today</span>
                      {new Date(article.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="material-symbols-rounded text-base!" aria-hidden="true">schedule</span>
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
              className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-art border border-line font-mono text-[11px] uppercase tracking-[0.1em] text-bone-2 hover:text-bone hover:border-line-strong disabled:opacity-35 disabled:pointer-events-none transition-colors"
            >
              <span className="material-symbols-rounded text-base!" aria-hidden="true">chevron_left</span>
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                aria-current={n === safePage ? "page" : undefined}
                className={`w-10 h-10 rounded-art border font-mono text-[11px] transition-colors duration-300 ${
                  n === safePage
                    ? "bg-bone text-ink border-bone"
                    : "border-line text-bone-2 hover:text-bone hover:border-line-strong"
                }`}
              >
                {String(n).padStart(2, "0")}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-art border border-line font-mono text-[11px] uppercase tracking-[0.1em] text-bone-2 hover:text-bone hover:border-line-strong disabled:opacity-35 disabled:pointer-events-none transition-colors"
            >
              Next
              <span className="material-symbols-rounded text-base!" aria-hidden="true">chevron_right</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
