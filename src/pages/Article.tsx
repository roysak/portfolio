import { useParams, Link, Navigate } from "react-router-dom";
import { articles } from "../data/articles";
import { lazy, Suspense, type FC } from "react";

const articleComponents: Record<string, React.LazyExoticComponent<FC>> = {
  "react-hooks-cheatsheet": lazy(() => import("../articles/ReactHooksCheatsheet")),
  "javascript-async-cheatsheet": lazy(() => import("../articles/JavaScriptAsyncCheatsheet")),
  "typescript-cheatsheet": lazy(() => import("../articles/TypeScriptCheatsheet")),
  "typescript-data-types": lazy(() => import("../articles/TypeScriptDataTypes")),
  "typescript-variable-types": lazy(() => import("../articles/TypeScriptVariableTypes")),
  "typescript-array-cheatsheet": lazy(() => import("../articles/TypeScriptArrayCheatsheet")),
  "html-cheatsheet": lazy(() => import("../articles/HTMLCheatsheet")),
  "laws-of-ux": lazy(() => import("../articles/LawsOfUX")),
  "design-sprint": lazy(() => import("../articles/DesignSprint")),
  "design-thinking": lazy(() => import("../articles/DesignThinking")),
  "heuristic-evaluation": lazy(() => import("../articles/HeuristicEvaluation")),
  "design-systems": lazy(() => import("../articles/DesignSystems")),
  "css-cheatsheet": lazy(() => import("../articles/CSSCheatsheet")),
  "css-specificity": lazy(() => import("../articles/CSSSpecificity")),
  "color-theory": lazy(() => import("../articles/ColorTheory")),
};

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const meta = articles.find((a) => a.slug === slug);

  if (!meta || !slug || !(slug in articleComponents)) {
    return <Navigate to="/blog" replace />;
  }

  const ArticleContent = articleComponents[slug];

  return (
    <main className="px-gutter pt-36 pb-[clamp(64px,9vw,128px)]">
      <div className="max-w-5xl mx-auto w-full">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 label label-strong hover:text-pigment transition-colors mb-10"
        >
          <span className="material-symbols-rounded text-base!" aria-hidden="true">arrow_back</span>
          Back to blog
        </Link>

        <header className="mb-12 pb-10 border-b border-line">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] px-2.5 py-1 rounded-art-pill bg-plum-soft text-plum">
              {meta.category}
            </span>
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-[0.1em] px-2.5 py-1 rounded-art-pill border border-line text-bone-3"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="m-0 font-display text-[clamp(34px,5.5vw,76px)] leading-[0.98] text-balance">
            {meta.title}
          </h1>

          <p className="mt-5 mb-6 text-[clamp(16px,1.6vw,20px)] text-bone-2 max-w-[62ch]">{meta.description}</p>

          <div className="flex items-center gap-5 label">
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-rounded text-base!" aria-hidden="true">calendar_today</span>
              {new Date(meta.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-rounded text-base!" aria-hidden="true">schedule</span>
              {meta.readingTime}
            </span>
          </div>
        </header>

        <article>
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-24 text-bone-3">
                <span className="material-symbols-rounded animate-spin text-3xl!" aria-hidden="true">
                  progress_activity
                </span>
              </div>
            }
          >
            <ArticleContent />
          </Suspense>
        </article>
      </div>
    </main>
  );
}
