import { Link } from "react-router-dom";
import { articles } from "../data/articles";

export default function Blog() {
  return (
    <main className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto w-full py-24 pt-12">
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight mb-3">
          Blog
        </h1>
        <p className="text-neutral-500 text-md leading-relaxed">
          Practical guides, cheatsheets, and thoughts on design and frontend development.
        </p>
      </header>

      <ul className="flex flex-col gap-6">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              to={`/blog/${article.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border border-neutral-200 p-8 hover:border-primary-300 hover:bg-primary-50 transition-all"
            >
              <div className="flex flex-wrap items-center gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-700"
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
    </main>
  );
}
