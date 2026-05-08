import type { Article } from "./articleTypes";

export const articles: Article[] = [
  {
    slug: "react-hooks-cheatsheet",
    title: "React Hooks Cheatsheet",
    description:
      "A comprehensive reference covering every built-in React hook — when to use them, how they work, and practical code examples.",
    date: "2025-05-04",
    category: "React",
    tags: ["React", "Hooks", "JavaScript", "Frontend"],
    readingTime: "8 min read",
  },
  {
    slug: "javascript-async-cheatsheet",
    title: "JavaScript Promises & Async/Await Cheatsheet",
    description:
      "A hands-on reference for JavaScript's asynchronous primitives — Promises, async functions, await, and related patterns with real code examples.",
    date: "2026-05-06",
    category: "JavaScript",
    tags: ["JavaScript", "Promises", "Async", "Frontend"],
    readingTime: "7 min read",
  },
  {
    slug: "typescript-array-cheatsheet",
    title: "TypeScript Array Cheatsheet",
    description:
      "A comprehensive reference for TypeScript array methods — creation, mutation, search, iteration, transformation, and the new immutable ES2023 methods, all with typed examples.",
    date: "2026-05-08",
    category: "TypeScript",
    tags: ["TypeScript", "Arrays", "JavaScript", "Frontend"],
    readingTime: "9 min read",
  },
  {
    slug: "heuristic-evaluation",
    title: "Heuristic Evaluation",
    description:
      "A complete reference to Nielsen's 10 Usability Heuristics and the heuristic evaluation process — with examples, severity ratings, and evaluation templates.",
    date: "2026-05-06",
    category: "UX & Design",
    tags: ["UX", "Usability", "Design", "Research"],
    readingTime: "6 min read",
  },
];
