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
  "typescript-cheatsheet": lazy(
    () => import("../articles/TypeScriptCheatsheet")
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
  "html-cheatsheet": lazy(
    () => import("../articles/HTMLCheatsheet")
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
  "css-cheatsheet": lazy(
    () => import("../articles/CSSCheatsheet")
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
    <main className="article-page studio-container">
      {/* Back link */}
      <Link
        to="/blog"
        className="inner-back-link"
      >
        <span className="material-symbols-rounded text-base!">arrow_back</span>
        Back to Blog
      </Link>

      {/* Article header */}
      <header className="article-header">
        <p className="eyebrow">{meta.category} / NOTES FROM THE DESK</p>
        <h1>{meta.title}</h1>
        <p className="article-deck">{meta.description}</p>
        <div className="article-meta">
          <span>
            {new Date(meta.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span>{meta.readingTime}</span>
          <span>{meta.tags.join(' · ')}</span>
        </div>
      </header>

      {/* Article body */}
      <article className="article-body">
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
