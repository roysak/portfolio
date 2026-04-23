import DynamicIcon from "../DynamicIcon";
import type { HeroData } from "../../data/caseStudyTypes";

interface Props {
    hero: HeroData;
}

export default function CaseStudyHero({ hero }: Props) {
    return (
        <section
            id="hero"
            className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto pt-24 pb-20">
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-semibold uppercase tracking-wide mb-4">
                    {hero.badgeIcon && (
                        <DynamicIcon
                            name={hero.badgeIcon}
                            className="w-4 h-4"
                        />
                    )}
                    {hero.badge}
                </div>

                <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight mb-8">
                    {hero.title}
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-2xl">
                    {hero.description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-100 pt-10">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                            Role
                        </p>
                        <p className="font-medium text-sm">{hero.meta.role}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                            Platform
                        </p>
                        <p className="font-medium text-sm">
                            {hero.meta.platform}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                            Tools
                        </p>
                        <p className="font-medium text-sm">{hero.meta.tools}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                            Focus
                        </p>
                        <p className="font-medium text-sm">{hero.meta.focus}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
