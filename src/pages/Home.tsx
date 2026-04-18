import { Link } from "react-router-dom";
import GridAnimation from "../components/GridAnimation";

export default function Home() {
    return (
        <main>
            <section className="flex items-center">
                <div className="max-w-6xl mx-auto px-6 py-24">
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
                        Roys A Kareem
                    </h1>
                    <h2 className="text-xl md:text-2xl text-neutral-700 font-medium mb-6">
                        Specialist I — UX/UI Designer
                    </h2>
                    <p className="text-neutral-500 text-lg max-w-2xl leading-relaxed mb-8">
                        A collection of my recent work focusing on intuitive
                        problem-solving, user-centered design, and measurable
                        impact.
                    </p>
                    <div className="flex gap-4">
                        <Link
                            to="/case-studies"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-full hover:bg-primary-700 transition-colors">
                            View Case Studies
                        </Link>
                        <Link
                            to="/works"
                            className="inline-flex items-center gap-2 px-5 py-2.5 border border-neutral-300 text-neutral-700 text-sm font-medium rounded-full hover:border-neutral-500 transition-colors">
                            Browse Works
                        </Link>
                    </div>
                </div>
            </section>
            <GridAnimation />
        </main>
    );
}
