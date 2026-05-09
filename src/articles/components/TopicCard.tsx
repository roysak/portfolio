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
      className="group flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5 text-left transition-all hover:border-primary-300 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-primary-600"
    >
      <span className="text-base font-semibold text-neutral-800 group-hover:text-primary-700 transition-colors leading-tight">
        {topic.name}
      </span>
      <span className={`self-start text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeClass}`}>
        {badgePrefix}{topic.category}
      </span>
    </button>
  );
}
