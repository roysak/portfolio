import DynamicIcon from "../DynamicIcon";
import type { HeroData } from "../../data/caseStudyTypes";
import { Col, Grid, Register } from "../system";

interface Props {
    hero: HeroData;
}

/** The chapter opener: badge, title, standfirst and a ruled record of the work. */
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
            className="relative px-margin pt-6 pb-[clamp(48px,7vw,96px)]"
        >
            <Register className="left-[calc(var(--margin)-22px)] top-2" />
            <Register className="right-[calc(var(--margin)-22px)] top-2" />

            <Grid className="gap-y-8">
                <Col span={12}>
                    <span className="label inline-flex items-center gap-2.5 text-accent">
                        {hero.badgeIcon && <DynamicIcon name={hero.badgeIcon} className="w-4 h-4" />}
                        {hero.badge}
                    </span>
                </Col>

                <Col span={10}>
                    <h1
                        data-set
                        className="m-0 font-display font-medium text-[clamp(36px,6vw,80px)] leading-[0.96] tracking-[-0.045em] text-balance"
                    >
                        {hero.title}
                    </h1>
                </Col>

                <Col span={6}>
                    <p className="m-0 font-serif text-lead leading-[1.45] text-ink-2 text-pretty">
                        {hero.description}
                    </p>
                </Col>

                <Col span={12}>
                    <dl className="m-0 grid grid-cols-2 md:grid-cols-4 gap-x-gutter gap-y-6 border-t border-rule-2 pt-6">
                        {meta.map((m) => (
                            <div key={m.label}>
                                <dt className="label">{m.label}</dt>
                                <dd className="m-0 mt-2 text-small text-ink">{m.value}</dd>
                            </div>
                        ))}
                    </dl>
                </Col>
            </Grid>
        </section>
    );
}
