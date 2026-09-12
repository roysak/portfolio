import { useParams, Link, Navigate } from "react-router-dom";
import { articles } from "../data/articles";
import { lazy, Suspense, type FC } from "react";
import { Col, Grid, Register } from "../components/system";

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
    <main className="relative px-margin pt-[clamp(28px,5vw,56px)] pb-[clamp(64px,9vw,128px)]">
      <Register className="left-[calc(var(--margin)-22px)] top-[clamp(28px,5vw,56px)]" />
      <Register className="right-[calc(var(--margin)-22px)] top-[clamp(28px,5vw,56px)]" />

      <Grid className="gap-y-8">
        <Col span={12} className="pb-4 border-b border-rule">
          <Link to="/blog" className="label hover:text-accent transition-colors">
            ← Back to notes
          </Link>
        </Col>

        {/* ── Standfirst ── */}
        <Col span={8}>
          <p className="label m-0 mb-5 flex flex-wrap gap-x-3">
            <span className="text-accent">{meta.category}</span>
            <span>{meta.tags.join(" · ")}</span>
          </p>
          <h1 className="m-0 font-display font-medium text-title leading-[1.02] tracking-[-0.04em] text-balance">
            {meta.title}
          </h1>
          <p className="mt-5 mb-0 font-serif text-lead leading-[1.45] text-ink-2 max-w-[54ch]">
            {meta.description}
          </p>
        </Col>

        <Col span={3} start={10} className="self-end max-md:mt-2">
          <dl className="m-0 border-t border-rule">
            <div className="flex items-baseline gap-3 py-2 border-b border-rule">
              <dt className="label shrink-0 w-16">Published</dt>
              <dd className="m-0 text-small">
                {new Date(meta.date).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </dd>
            </div>
            <div className="flex items-baseline gap-3 py-2 border-b border-rule">
              <dt className="label shrink-0 w-16">Reading</dt>
              <dd className="m-0 text-small">{meta.readingTime}</dd>
            </div>
          </dl>
        </Col>

        {/* ── Body ── */}
        <Col span={12} className="mt-[clamp(24px,4vw,48px)] pt-8 border-t border-rule-2">
          <article>
            <Suspense
              fallback={
                <p className="label py-24 text-center">Setting the page…</p>
              }
            >
              <ArticleContent />
            </Suspense>
          </article>
        </Col>
      </Grid>
    </main>
  );
}
