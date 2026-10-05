import type { TopicItem } from "./types";

interface TopicCardProps {
  topic: TopicItem;
  badgeClass: string;
  badgePrefix?: string;
  onClick: () => void;
}

export default function TopicCard({ topic, badgeClass, badgePrefix = "", onClick }: TopicCardProps) {
  return (
    <button
      onClick={onClick}
      className="article-topic-card group flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5 text-left transition-all"
    >
      <span className="text-base font-semibold leading-tight">
        {topic.name}
      </span>
      <span className={`article-badge self-start text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeClass}`}>
        {badgePrefix}{topic.category}
      </span>
    </button>
  );
}
