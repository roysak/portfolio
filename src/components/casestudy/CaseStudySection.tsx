import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function CaseStudySection({ title, children }: Props) {
  return (
    <section className="mb-12 pb-12 border-b border-neutral-100 last:border-b-0">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      {children}
    </section>
  );
}
