import type { TopicItem } from "./types";

interface TopicCardProps {
  topic: TopicItem;
  badgeClass: string;
  badgePrefix?: string;
  onClick: () => void;
}

/** One entry in an article's topic index — a ruled cell, not a floating card. */
export default function TopicCard({ topic, badgeClass, badgePrefix = "", onClick }: TopicCardProps) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col gap-3 border border-rule bg-paper-2 p-4 text-left transition-colors hover:border-rule-2 hover:bg-paper-3 focus-visible:outline-2 focus-visible:outline-accent"
    >
      <span className="font-display text-small font-medium text-ink group-hover:text-accent transition-colors leading-tight">
        {topic.name}
      </span>
      <span className={`self-start label px-2 py-0.5 border ${badgeClass}`}>
        {badgePrefix}
        {topic.category}
      </span>
    </button>
  );
}
