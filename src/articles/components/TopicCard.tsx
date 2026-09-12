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
      className="group flex flex-col gap-3 rounded-art border border-line bg-ink-2 p-5 text-left transition-all duration-300 hover:border-line-strong hover:-translate-y-0.5 hover:shadow-card"
    >
      <span className="text-base font-semibold text-bone group-hover:text-pigment transition-colors leading-tight">
        {topic.name}
      </span>
      <span className={`self-start text-xs font-semibold px-2.5 py-0.5 rounded-art-pill ${badgeClass}`}>
        {badgePrefix}
        {topic.category}
      </span>
    </button>
  );
}
