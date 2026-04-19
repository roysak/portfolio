import { Link } from "react-router-dom";
import GridAnimation from "../components/GridAnimation";
import { assetUrl } from "../utils/assetUrl";

export default function Home() {
    return (
        <main className="content-center grow">
            <section className="flex items-center">
                <div className="w-full mx-auto px-24 flex flex-col lg:flex-row gap-16 md:gap-32 items-center justify-center">
                    <div className="flex flex-col xl:flex-row gap-0 items-center">
                        <div className="flex flex-col lg:flex-row gap-0 items-center">
                            <div className="pointer-events-none items-center justify-center opacity-80 hidden md:flex min-w-sm">
                                <img src={assetUrl("/img/dude.png")} alt="A portrait of the developer" className="w-full max-w-md lg:max-w-md" />
                            </div>
                            <div className="flex flex-col w-fll lg:w-auto gap-6 md:gap-6 items-stretch px-12">
                                <h1 className="text-8xl md:text-8xl lg:text-8xl tracking-tight mb-4 text-primary-600 w-full sm:text-center lg:text-left">
                                    Pixels. Code.
                                    <div className="font-semibold">
                                        <span className="text-[#df5745]">I</span>
                                        <span className="text-[#eeab19]">m</span>
                                        <span className="text-[#5cbd66]">p</span>
                                        <span className="text-[#38a4bd]">a</span>
                                        <span className="text-[#714dc5]">c</span>
                                        <span className="text-[#c24678]">t</span>
                                        <span className="text-[#B3B3B3]">.</span>
                                    </div>
                                </h1>
                                <p className="text-2xl md:text-xl leading-10 text-body-text font-normal sm:text-center lg:text-left">Crafting colorful, user-centric experiences from the first pixel to the final deployment.</p>
                            </div>    
                        </div>                                        
                        <div className="flex flex-col pt-16 sm:w-full md:w-auto sm:flex-col md:flex-row lg:pt-0 xl:flex-col gap-6 border-neutral-200 border-l rounded-2xl px-0 lg:px-12">
                            <Link
                                to="/case-studies"
                                className="inline-flex flex-col items-start gap-2 px-8 py-4 bg-primary-600 text-white font-normal text-lg rounded-xl hover:bg-primary-700 transition-colors">
                                <b className="font-semibold text-2xl">Case Studies</b>
                                <p className="text-lg">Deep dives into the "why" behind the "what."</p>
                                 {/* Explore the strategic thinking, user research, and iterative processes that transformed complex problems into functional solutions. */}
                            </Link>
                            <Link
                                to="/works"
                                className="inline-flex flex-col items-start gap-2 px-8 py-4 border border-neutral-300 text-neutral-700 text-lg rounded-xl hover:border-neutral-500 transition-colors">
                                <b className="font-semibold text-2xl">Works</b>
                                <p className="text-lg">A curated gallery of craft and code.</p>
                                {/* A showcase of live projects and digital experiences built at the intersection of aesthetic design and technical precision. */}
                            </Link>
                            <Link
                                to="/resume"
                                className="inline-flex flex-col items-start gap-2 px-8 py-4 border border-neutral-300 text-neutral-700 text-lg rounded-xl hover:border-neutral-500 transition-colors">
                                <b className="font-semibold text-2xl">Resume</b>
                                <p className="text-lg">The journey, the tools, and the milestones.</p>
                                {/* A detailed look at my professional evolution, technical stack, and the impact I’ve delivered across various industries. */}
                            </Link>
                        </div>
                         
                    </div>
                </div>
            </section>
            <GridAnimation />
        </main>
    );
}
