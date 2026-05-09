import { useState } from "react";
import type { TopicItem, ModalLabels } from "./types";
import { CODE_LABELS } from "./types";
import TopicCard from "./TopicCard";
import TopicModal from "./TopicModal";
import TopicLegend from "./TopicLegend";

interface FlatArticleProps {
  /** Array of topic items — rendered in a single flat grid. */
  items: TopicItem[];
  /** Map of badge value → Tailwind class string for colouring badges. */
  badgeColors: Record<string, string>;
  /** Label shown in the legend bar (e.g., "React version"). */
  legendLabel?: string;
  /** Prefix prepended to badge text (e.g., "v" for versions). */
  badgePrefix?: string;
  /** Custom labels for the modal sections. Defaults to CODE_LABELS. */
  labels?: ModalLabels;
}

/**
 * Template for articles that show all topics in a single flat grid.
 *
 * Usage:
 * ```tsx
 * export default function MyArticle() {
 *   return (
 *     <FlatArticle
 *       items={hooksData}
 *       badgeColors={versionColor}
 *       legendLabel="React version"
 *       badgePrefix="v"
 *       labels={API_LABELS}
 *     />
 *   );
 * }
 * ```
 */
export default function FlatArticle({
  items,
  badgeColors,
  legendLabel = "Version",
  badgePrefix = "",
  labels = CODE_LABELS,
}: FlatArticleProps) {
  const [selected, setSelected] = useState<TopicItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
        {items.map((topic) => (
          <TopicCard
            key={topic.name}
            topic={topic}
            badgeClass={badgeColors[topic.category] ?? "bg-neutral-100 text-neutral-600"}
            badgePrefix={badgePrefix}
            onClick={() => setSelected(topic)}
          />
        ))}
      </div>

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
