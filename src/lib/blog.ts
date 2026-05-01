import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  keyword: string;
  content: string;
};

export function getAllArticles(): Omit<Article, "content">[] {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug: data.slug || file.replace(".md", ""),
        title: data.title || "",
        description: data.description || "",
        category: data.category || "Guide",
        date: data.date || "",
        keyword: data.keyword || "",
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getArticleBySlug(slug: string): Article | null {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const fileSlug = data.slug || file.replace(".md", "");
    if (fileSlug === slug) {
      return {
        slug: fileSlug,
        title: data.title || "",
        description: data.description || "",
        category: data.category || "Guide",
        date: data.date || "",
        keyword: data.keyword || "",
        content,
      };
    }
  }

  return null;
}
