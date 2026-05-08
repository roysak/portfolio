import { useState } from "react";
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
];

const categoryIcon: Record<ArticleCategory, string> = {
  "All":        "layers",
  "UX & Design":"design_services",
  "JavaScript": "js",
  "TypeScript": "code",
  "React":      "hub",
  "Angular":    "change_history",
  "Frontend":   "devices",
  "CSS":        "palette",
};

export default function Blog() {
  const [active, setActive] = useState<ArticleCategory>("All");

  // Only show categories that have at least one article (plus All)
  const usedCategories = ALL_CATEGORIES.filter(
    (cat) => cat === "All" || articles.some((a) => a.category === cat)
  );

  const filtered =
    active === "All" ? articles : articles.filter((a) => a.category === active);

  return (
    <main className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto w-full py-24 pt-12">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight mb-3">Blog</h1>
        <p className="text-neutral-500 text-md leading-relaxed">
          Practical guides, cheatsheets, and thoughts on design and frontend development.
        </p>
      </header>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {usedCategories.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                isActive
                  ? "bg-primary-600 text-white border-primary-600 shadow-sm"
                  : "bg-white text-neutral-500 border-neutral-200 hover:border-primary-300 hover:text-primary-700"
              }`}
            >
              {/* <span className="material-symbols-rounded text-base! leading-none">{categoryIcon[cat]}</span> */}
              {cat}
              <span
                className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-500"
                }`}
              >
                {cat === "All"
                  ? articles.length
                  : articles.filter((a) => a.category === cat).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Article list */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-neutral-400 gap-3">
          <span className="material-symbols-rounded text-4xl!">search_off</span>
          <p className="text-sm">No articles in this category yet.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-6">
          {filtered.map((article) => (
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
    </main>
  );
}
