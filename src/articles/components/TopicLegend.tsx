interface TopicLegendProps {
  label: string;
  badgeColors: Record<string, string>;
  badgePrefix?: string;
}

export default function TopicLegend({ label, badgeColors, badgePrefix = "" }: TopicLegendProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="label">{label}</span>
      {Object.entries(badgeColors).map(([key, cls]) => (
        <span key={key} className={`label px-2 py-0.5 border ${cls}`}>
          {badgePrefix}
          {key}
        </span>
      ))}
    </div>
  );
}
