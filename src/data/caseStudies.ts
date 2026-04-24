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
    title: "Automation Story Property Panel Redesign",
    client: "SmartOPS",
    description: "Redesigning a stacked property form into a compact, high-density grid to speed up automation setup, and maximize screen real estate.",
    tags: ["User Research", "UI Design", "Prototyping", "HTML/CSS"],
    color: "bg-slate-200",
    shadow: "shadow-slate-100/50",
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
    client: "SmartOPS",
    description: "Transforming a complex, code-based dashboard configuration process into an intuitive visual builder",
    tags: ["User Research", "UI Design", "Prototyping", "HTML/CSS"],
    color: "bg-slate-200",
    shadow: "shadow-slate-100/50",
    image: "/img/dashboard-builder.png",
  },
];

export default caseStudies;
