import Header from "../components/Header";
import Footer from "../components/Footer";
import CaseStudyCard from "../components/CaseStudyCard";
import caseStudies from "../data/caseStudies";

export default function Home() {
    return (
        <div className="min-h-screen bg-white text-neutral-900 font-sans">
            <Header />
            <main className="max-w-6xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                    {caseStudies.map((study) => (
                        <CaseStudyCard key={study.id} study={study} />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
