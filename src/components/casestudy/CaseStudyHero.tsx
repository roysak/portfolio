import DynamicIcon from "../DynamicIcon";
import type { HeroData } from "../../data/caseStudyTypes";

interface Props {
    hero: HeroData;
}

export default function CaseStudyHero({ hero }: Props) {
    const meta = [
        { label: "Role", value: hero.meta.role },
        { label: "Platform", value: hero.meta.platform },
        { label: "Tools", value: hero.meta.tools },
        { label: "Focus", value: hero.meta.focus },
    ];

    return (
        <section
            id="hero"
            className="px-gutter pt-10 pb-[clamp(56px,8vw,104px)] border-b border-line">
            <div className="max-w-6xl mx-auto w-full grid gap-8">
                <span className="inline-flex items-center gap-2 w-max px-3.5 py-1.5 rounded-full bg-plum-soft text-plum font-mono text-[11px] uppercase tracking-[0.08em]">
                    {hero.badgeIcon && (
                        <DynamicIcon name={hero.badgeIcon} className="w-4 h-4" />
                    )}
                    {hero.badge}
                </span>

                <h1 className="m-0 font-display font-semibold text-[clamp(40px,6.5vw,88px)] leading-[0.98] tracking-[-0.035em] text-balance">
                    {hero.title}
                </h1>

                <p className="m-0 max-w-[52ch] text-[clamp(17px,1.5vw,21px)] text-bone-2 text-pretty">
                    {hero.description}
                </p>

                <dl className="m-0 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-7 border-t border-line pt-9">
                    {meta.map((m) => (
                        <div key={m.label}>
                            <dt className="label">{m.label}</dt>
                            <dd className="m-0 mt-2 text-[15px] text-bone">{m.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
