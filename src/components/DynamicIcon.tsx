import * as Icons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

interface DynamicIconProps extends LucideProps {
  name: string;
}

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const key = toPascalCase(name) as keyof typeof Icons;
  const Icon = Icons[key] as React.ComponentType<LucideProps> | undefined;
  if (!Icon || typeof Icon !== 'function') return null;
  return <Icon {...props} />;
}
