import { useState } from "react";
import type { TopicItem, ModalLabels } from "./types";
import { CODE_LABELS } from "./types";
import TopicCard from "./TopicCard";
import TopicModal from "./TopicModal";
import TopicLegend from "./TopicLegend";

interface CategorizedArticleProps {
  /** Array of topic items — will be grouped by their `badge` field. */
  items: TopicItem[];
  /** Map of badge value → Tailwind class string for colouring badges. */
  badgeColors: Record<string, string>;
  /** Label shown in the legend bar (e.g., "Category", "Section"). */
  legendLabel?: string;
  /** Prefix prepended to badge text (e.g., "v" for versions). */
  badgePrefix?: string;
  /** Custom labels for the modal sections. Defaults to CODE_LABELS. */
  labels?: ModalLabels;
  /** Word used in the category count badge (e.g., "topics", "methods"). */
  countLabel?: string;
}

/**
 * Template for articles that group topics under category sections.
 *
 * Usage:
 * ```tsx
 * export default function MyArticle() {
 *   return (
 *     <CategorizedArticle
 *       items={topicsData}
 *       badgeColors={categoryColor}
 *       legendLabel="Category"
 *       labels={UX_LABELS}
 *     />
 *   );
 * }
 * ```
 */
export default function CategorizedArticle({
  items,
  badgeColors,
  legendLabel = "Category",
  badgePrefix = "",
  labels = CODE_LABELS,
  countLabel = "topics",
}: CategorizedArticleProps) {
  const [selected, setSelected] = useState<TopicItem | null>(null);

  // Preserve insertion order of categories
  const categories = Array.from(new Set(items.map((t) => t.category)));

  return (
    <>
      {categories.map((cat) => {
        const catItems = items.filter((t) => t.category === cat);
        return (
          <section key={cat} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-semibold text-neutral-800">{cat}</h2>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeColors[cat] ?? "bg-neutral-100 text-neutral-600"}`}>
                {catItems.length} {countLabel}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {catItems.map((topic) => (
                <TopicCard
                  key={topic.name}
                  topic={topic}
                  badgeClass={badgeColors[topic.category] ?? "bg-neutral-100 text-neutral-600"}
                  badgePrefix={badgePrefix}
                  onClick={() => setSelected(topic)}
                />
              ))}
            </div>
          </section>
        );
      })}

      <TopicLegend label={legendLabel} badgeColors={badgeColors} badgePrefix={badgePrefix} />

      {selected && (
        <TopicModal
          topic={selected}
          badgeClass={badgeColors[selected.category] ?? "bg-neutral-100 text-neutral-600"}
          badgePrefix={badgePrefix}
          labels={labels}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
