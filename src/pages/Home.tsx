import { Link } from "react-router-dom";
import { assetUrl } from "../utils/assetUrl";
import SketchAnimation from "../components/SketchAnimation";

export default function Home() {
    return (
        <main className="content-center grow">
            <section className="flex items-center">
                <div className="w-full mx-auto md:px-24 flex flex-col lg:flex-row gap-16 md:gap-32 items-center justify-center">
                    <div className="flex flex-col xl:flex-row gap-0 items-center">
                        <div className="flex flex-col lg:flex-row lg:gap-10 items-center">
							<div className="blur-in blur-in-1 pointer-events-none items-center justify-center lg:flex min-w-sm">
                                {(() => {
                                    const images = ["hero.png"];
                                    const randomImage = images[Math.floor(Math.random() * images.length)];
                                    return <img src={assetUrl(`/img/${randomImage}`)} alt="A portrait of the developer" className="w-full max-w-100 md:max-w-140 m-auto" />;
                                })()}
							</div>
                            <div className="flex flex-col w-full lg:w-auto gap-6 md:gap-6 items-stretch px-6 py-6">
                                <h1 className="blur-in blur-in-2 text-6xl xl:text-8xl tracking-tight mb-4 text-primary-600 w-full text-center lg:text-left md:pt-8">
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
                                <p className="blur-in blur-in-3 text-2xl md:text-xl leading-10 text-body-text font-normal text-center lg:text-left">Crafting colorful, user-centric experiences from the first pixel to the final deployment.</p>
                            </div>    
                        </div>                                        
                        <div className="flex flex-col px-6 pt-16 sm:w-full md:w-auto sm:flex-col md:flex-row md:border-l-0 lg:pt-0 xl:flex-col gap-6 border-neutral-200 xl:border-l lg:px-12">
                            <Link
                                to="/case-studies"
                                className="blur-in blur-in-4 md:grow md:basis-0 inline-flex flex-col items-start gap-2 px-8 py-4 text-neutral-700 text-md rounded-xl transition-all bg-gray-50 hover:bg-primary-50">
                                <span className="material-symbols-rounded text-primary-600 shrink-0 text-3xl!" aria-hidden="true">book</span>
                                <b className="font-semibold text-xl">Case Studies</b>
                                <p>Deep dives into the "why" behind the "what."</p>
                            </Link>
                            <Link
                                to="/works"
                                className="blur-in blur-in-5 md:grow md:basis-0 inline-flex flex-col items-start gap-2 px-8 py-4 text-neutral-700 text-md rounded-xl transition-all bg-gray-50 hover:bg-primary-50">
                                <span className="material-symbols-rounded text-primary-600 shrink-0 text-3xl!" aria-hidden="true">work</span>
                                <b className="font-semibold text-xl">Works</b>
                                <p>A curated gallery of craft and code.</p>
                            </Link>
                            <Link
                                to="/resume"
                                className="blur-in blur-in-6 md:grow md:basis-0 inline-flex flex-col items-start gap-2 px-8 py-4 text-neutral-700 text-md rounded-xl transition-all bg-gray-50 hover:bg-primary-50">
                                <span className="material-symbols-rounded text-primary-600 shrink-0 text-3xl!" aria-hidden="true">article_person</span>
                                <b className="font-semibold text-xl">Resume</b>
                                <p>The journey, the tools, and the milestones.</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <SketchAnimation />
        </main>
    );
}
