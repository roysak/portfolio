interface MaterialIconProps {
  name: string;
  className?: string;
}

// Maps Tailwind w-N classes to pixel sizes for font-size
const SIZE_MAP: Record<string, string> = {
  'w-3': '12px',
  'w-4': '16px',
  'w-5': '20px',
  'w-6': '24px',
  'w-7': '28px',
  'w-8': '32px',
  'w-10': '40px',
  'w-12': '48px',
};

function extractSize(cls: string): string {
  const parts = cls.split(' ');
  for (const [key, size] of Object.entries(SIZE_MAP)) {
    if (parts.includes(key)) return size;
  }
  return '20px';
}

function stripSizeClasses(cls: string): string {
  return cls
    .split(' ')
    .filter((c) => !/^[wh]-\d+(\.\d+)?$/.test(c))
    .join(' ');
}

export default function DynamicIcon({ name, className = '' }: MaterialIconProps) {
  const fontSize = extractSize(className);
  const filteredClass = stripSizeClasses(className);

  return (
    <span
      className={`material-symbols-rounded ${filteredClass}`}
      style={{ fontSize }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
