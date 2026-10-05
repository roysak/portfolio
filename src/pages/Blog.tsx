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
    <main className="blog-index studio-container">
      <header className="inner-page-intro">
        <p className="eyebrow">03 / NOTES FROM THE DESK</p>
        <h1>Learning <em>out loud.</em></h1>
        <p>Practical guides, cheatsheets, and thoughts on design and frontend development.</p>
      </header>

      {/* Search */}
      <div className="blog-search">
        <span className="material-symbols-rounded" aria-hidden="true">
          search
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search articles…"
          aria-label="Search articles"
          className="blog-search-input"
        />
        {query && (
          <button
            onClick={() => handleSearch("")}
            className="blog-search-clear"
            aria-label="Clear search"
          >
            <span className="material-symbols-rounded text-xl!">close</span>
          </button>
        )}
      </div>

      {/* Category filters */}
      <div className="blog-filters" role="group" aria-label="Filter articles by category">
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
              aria-pressed={isActive}
              className={`blog-filter ${isActive ? "is-active" : ""}`}
            >
              {cat}
              <span
                className="blog-filter-count"
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results summary */}
      {query && (
        <p className="blog-results">
          {filtered.length === 0
            ? "No results"
            : `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${query}"`}
        </p>
      )}

      {/* Article list */}
      {paginated.length === 0 ? (
        <div className="blog-empty">
          <span className="material-symbols-rounded text-4xl!">search_off</span>
          <p className="text-sm">
            {query ? `No articles match "${query}".` : "No articles in this category yet."}
          </p>
        </div>
      ) : (
        <ul className="blog-list">
          {paginated.map((article, index) => (
            <li key={article.slug}>
              <Link
                to={`/blog/${article.slug}`}
                className="blog-entry"
              >
                <div className="blog-entry-top">
                  <span className="eyebrow">{String((safePage - 1) * PAGE_SIZE + index + 1).padStart(2, '0')} / {article.category}</span>
                  <span className="blog-entry-date">{new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                </div>
                <div className="blog-entry-main"><div><h2>{article.title}</h2><p>{article.description}</p></div><span className="round-arrow" aria-hidden="true">↗</span></div>
                <div className="blog-entry-bottom"><span>{article.readingTime}</span><span>{article.tags.join(' · ')}</span></div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="blog-pagination" aria-label="Article pages">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="blog-page-button"
          >
            <span className="material-symbols-rounded text-base!">chevron_left</span>
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              aria-label={`Page ${n}`}
              aria-current={n === safePage ? "page" : undefined}
              className={`blog-page-button ${n === safePage ? "is-active" : ""}`}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="blog-page-button"
          >
            Next
            <span className="material-symbols-rounded text-base!">chevron_right</span>
          </button>
        </nav>
      )}
    </main>
  );
}
