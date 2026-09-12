import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { articles } from "../data/articles";
import type { ArticleCategory } from "../data/articleTypes";
import { Col, Grid, Register } from "../components/system";
import { useSpreadMotion } from "../hooks/useMotion";

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

const PAGE_SIZE = 8;

const sorted = [...articles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const shortDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { year: "numeric", month: "short" });

/** The notes index — a periodical's contents page, not a card grid. */
export default function Blog() {
  const [active, setActive] = useState<ArticleCategory>("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const ref = useSpreadMotion<HTMLElement>();

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
    <main ref={ref} className="relative px-margin pt-[clamp(28px,5vw,56px)] pb-[clamp(64px,9vw,128px)]">
      <Register className="left-[calc(var(--margin)-22px)] top-[clamp(28px,5vw,56px)]" />
      <Register className="right-[calc(var(--margin)-22px)] top-[clamp(28px,5vw,56px)]" />

      <Grid className="gap-y-8">
        <Col span={8}>
          <p className="label m-0 mb-5">
            <span className="text-accent">§</span> <span className="ml-3">Notes</span>
          </p>
          <h1 data-set className="m-0 font-display font-medium text-display leading-[0.95] tracking-[-0.045em]">
            Notes &amp;{" "}
            <span className="font-serif font-normal italic tracking-[-0.02em] text-ink-2">
              cheatsheets
            </span>
          </h1>
        </Col>
        <Col span={3} start={10} as="p" className="self-end m-0 text-small text-ink-2 max-md:mt-4">
          Practical guides, cheatsheets, and thoughts on design and frontend development.
        </Col>

        {/* ── Filters ── */}
        <Col span={12} className="mt-[clamp(16px,3vw,32px)] pt-6 border-t border-rule grid gap-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {usedCategories.map((cat) => {
                const isActive = active === cat;
                const count =
                  cat === "All" ? sorted.length : sorted.filter((a) => a.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategory(cat)}
                    aria-pressed={isActive}
                    className={`label group inline-flex items-baseline gap-1.5 py-1 transition-colors hover:text-ink ${
                      isActive ? "text-ink" : ""
                    }`}
                  >
                    <span className="relative">
                      {cat}
                      <span
                        aria-hidden="true"
                        className={`absolute left-0 -bottom-1 h-px w-full bg-accent origin-left transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </span>
                    <span className={isActive ? "text-accent" : "text-ink-3"}>{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full max-w-[260px]">
              <input
                type="search"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search…"
                aria-label="Search articles"
                className="w-full bg-transparent border-b border-rule-2 py-2 pr-7 font-mono text-caption uppercase tracking-[0.11em] text-ink placeholder:text-ink-3 focus:outline-none focus:border-accent transition-colors"
              />
              {query && (
                <button
                  onClick={() => handleSearch("")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 label hover:text-accent transition-colors"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {query && (
            <p className="label m-0" role="status">
              {filtered.length === 0
                ? "No results"
                : `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for “${query}”`}
            </p>
          )}
        </Col>

        {/* ── Index ── */}
        <Col span={12}>
          {paginated.length === 0 ? (
            <p className="py-20 text-center font-serif text-lead text-ink-3">
              {query ? `No articles match “${query}”.` : "No articles in this category yet."}
            </p>
          ) : (
            <ul className="list-none m-0 p-0 border-t border-rule">
              {paginated.map((article, i) => (
                <li key={article.slug}>
                  <Link
                    to={`/blog/${article.slug}`}
                    className="group grid grid-cols-1 md:grid-cols-[3.5rem_1fr_auto] gap-x-6 gap-y-2 items-baseline py-5 border-b border-rule transition-[padding-left] duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:pl-3"
                  >
                    <span className="label text-accent">
                      {String((safePage - 1) * PAGE_SIZE + i + 1).padStart(2, "0")}
                    </span>

                    <span className="min-w-0">
                      <span className="block font-display font-medium text-head leading-tight tracking-[-0.025em] transition-colors group-hover:text-accent">
                        {article.title}
                      </span>
                      <span className="block mt-1.5 font-serif text-small text-ink-2 max-w-[62ch]">
                        {article.description}
                      </span>
                      <span className="label block mt-2">
                        {article.category} · {article.tags.join(" · ")}
                      </span>
                    </span>

                    <span className="label text-right whitespace-nowrap">
                      {shortDate(article.date)}
                      <span className="block mt-1 text-ink-3">{article.readingTime}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Col>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <Col span={12} className="flex items-center justify-between gap-4 mt-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="label px-3 py-2 border border-rule-2 disabled:opacity-35 disabled:cursor-not-allowed hover:not-disabled:bg-ink hover:not-disabled:text-paper hover:not-disabled:border-ink transition-colors"
            >
              ← Prev
            </button>

            <span className="label">
              Page {String(safePage).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="label px-3 py-2 border border-rule-2 disabled:opacity-35 disabled:cursor-not-allowed hover:not-disabled:bg-ink hover:not-disabled:text-paper hover:not-disabled:border-ink transition-colors"
            >
              Next →
            </button>
          </Col>
        )}
      </Grid>
    </main>
  );
}
