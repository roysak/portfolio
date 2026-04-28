export interface CaseStudy {
    id: number;
    link: string;
    title: string;
    client: string;
    description: string;
    tags: string[];
    color: string;
    shadow: string;
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
        color: "bg-[#bd97d7] border-2 border-[#bd97d7]",
        shadow: "shadow-[#bd97d7]/10",
        image: "/img/automationstory.png",
    },
    // {
    //   id: 2,
    //   link: "02",
    //   title: "Dashboard Builder",
    //   client: "SmartOPS",
    //   description: "Designing an intuitive, modular dashboard builder on top of a rigid pre-established backend",
    //   tags: ["User Research", "UI Design", "Prototyping", "HTML/CSS"],
    //   color: "bg-slate-200",
    //   shadow: "shadow-slate-100/50",
    //   image: "/img/dashboard-builder.png",
    // },
    {
        id: 2,
        link: "02",
        title: "Dashboard Builder",
        client: "Intelligent Automation Platform",
        description:
            "Transforming a complex, code-based dashboard configuration process into an intuitive visual builder",
        tags: ["User Research", "UI Design", "Prototyping", "HTML/CSS"],
        color: "bg-[#b7ce85] border-2 border-[#b7ce85]",
        shadow: "shadow-[#b7ce85]/10",
        image: "/img/dashboard-builder.png",
    },
];

export default caseStudies;
