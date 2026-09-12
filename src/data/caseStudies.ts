export interface CaseStudy {
    id: number;
    link: string;
    title: string;
    client: string;
    description: string;
    tags: string[];
    /** Hex swatch shown on the card; carried over from the original card colours. */
    swatch: string;
    image: string;
}

const caseStudies: CaseStudy[] = [
    {
        id: 1,
        link: "01",
        title: "Property Panel Redesign",
        client: "Intelligent Automation Platform",
        description:
            "Transforming a space-heavy, stacked form into a compact, interactive property grid to speed up automation setup.",
        tags: ["User Research", "UI Design", "Prototyping", "HTML/CSS"],
        swatch: "#bd97d7",
        image: "/img/automationstory.png",
    },
    {
        id: 2,
        link: "02",
        title: "Dashboard Builder",
        client: "Intelligent Automation Platform",
        description:
            "Transforming a complex, code-based dashboard configuration process into an intuitive visual builder",
        tags: ["User Research", "UI Design", "Prototyping", "HTML/CSS"],
        swatch: "#ebdba3",
        image: "/img/dashboard-builder.png",
    },
    {
        id: 3,
        link: "03",
        title: "Insurance Claims Validation Platform",
        client: "Intelligent Automation Platform",
        description:
            "Built a hybrid rule-engine and LLM platform to automate insurance claim validation and reduce manual review time.",
        tags: ["User Research", "UI Design", "Prototyping", "HTML/CSS"],
        swatch: "#b7ce85",
        image: "/img/dashboard-builder.png",
    },
];

export default caseStudies;
