interface TopicLegendProps {
  label: string;
  badgeColors: Record<string, string>;
  badgePrefix?: string;
}

export default function TopicLegend({ label, badgeColors, badgePrefix = "" }: TopicLegendProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
      <span className="font-medium text-neutral-400 uppercase tracking-wide">{label}</span>
      {Object.entries(badgeColors).map(([key, cls]) => (
        <span key={key} className={`px-2.5 py-0.5 rounded-full font-semibold ${cls}`}>
          {badgePrefix}{key}
        </span>
      ))}
    </div>
  );
}
