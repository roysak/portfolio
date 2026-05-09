import { useParams, Link, Navigate } from "react-router-dom";
import { articles } from "../data/articles";
import { lazy, Suspense, type FC } from "react";

const articleComponents: Record<string, React.LazyExoticComponent<FC>> = {
  "react-hooks-cheatsheet": lazy(
    () => import("../articles/ReactHooksCheatsheet")
  ),
  "javascript-async-cheatsheet": lazy(
    () => import("../articles/JavaScriptAsyncCheatsheet")
  ),
  "typescript-data-types": lazy(
    () => import("../articles/TypeScriptDataTypes")
  ),
  "typescript-variable-types": lazy(
    () => import("../articles/TypeScriptVariableTypes")
  ),
  "typescript-array-cheatsheet": lazy(
    () => import("../articles/TypeScriptArrayCheatsheet")
  ),
  "laws-of-ux": lazy(
    () => import("../articles/LawsOfUX")
  ),
  "design-sprint": lazy(
    () => import("../articles/DesignSprint")
  ),
  "design-thinking": lazy(
    () => import("../articles/DesignThinking")
  ),
  "heuristic-evaluation": lazy(
    () => import("../articles/HeuristicEvaluation")
  ),
  "design-systems": lazy(
    () => import("../articles/DesignSystems")
  ),
  "css-specificity": lazy(
    () => import("../articles/CSSSpecificity")
  ),
  "color-theory": lazy(
    () => import("../articles/ColorTheory")
  ),
};

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const meta = articles.find((a) => a.slug === slug);

  if (!meta || !slug || !(slug in articleComponents)) {
    return <Navigate to="/blog" replace />;
  }

  const ArticleContent = articleComponents[slug];

  return (
    <main className="max-w-5xl mx-auto w-full px-6 py-24 pt-12">
      {/* Back link */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-primary-600 transition-colors mb-10"
      >
        <span className="material-symbols-rounded text-base!">arrow_back</span>
        Back to Blog
      </Link>

      {/* Article header */}
      <header className="mb-10 pb-10 border-b border-neutral-200">
        <div className="flex flex-wrap gap-2 mb-4">
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 mb-4">
          {meta.title}
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed mb-6">{meta.description}</p>
        <div className="flex items-center gap-4 text-sm text-neutral-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="material-symbols-rounded text-base!">calendar_today</span>
            {new Date(meta.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="material-symbols-rounded text-base!">schedule</span>
            {meta.readingTime}
          </span>
        </div>
      </header>

      {/* Article body */}
      <article>
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-24 text-neutral-400">
              <span className="material-symbols-rounded animate-spin text-3xl!">progress_activity</span>
            </div>
          }
        >
          <ArticleContent />
        </Suspense>
      </article>
    </main>
  );
}
