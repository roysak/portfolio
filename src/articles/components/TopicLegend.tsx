interface TopicLegendProps {
  label: string;
  badgeColors: Record<string, string>;
  badgePrefix?: string;
}

export default function TopicLegend({ label, badgeColors, badgePrefix = "" }: TopicLegendProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs">
      <span className="label">{label}</span>
      {Object.entries(badgeColors).map(([key, cls]) => (
        <span key={key} className={`px-2.5 py-0.5 rounded-art-pill font-semibold ${cls}`}>
          {badgePrefix}
          {key}
        </span>
      ))}
    </div>
  );
}
