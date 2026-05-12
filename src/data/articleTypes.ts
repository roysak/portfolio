export type ArticleCategory =
  | "All"
  | "UX & Design"
  | "JavaScript"
  | "TypeScript"
  | "React"
  | "Angular"
  | "Frontend"
  | "CSS"
  | "HTML";

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: ArticleCategory;
  readingTime: string;
}
