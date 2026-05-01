import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  category: string;
  date: string;
};

export type Article = ArticleMeta & {
  content: string;
};

export function getAllArticles(): ArticleMeta[] {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const slug = file.replace(".md", "");
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        keyword: data.keyword ?? "",
        category: data.category ?? "Guide",
        date: data.date ?? "",
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    keyword: data.keyword ?? "",
    category: data.category ?? "Guide",
    date: data.date ?? "",
    content,
  };
}
