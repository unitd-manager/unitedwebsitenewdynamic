import type { CmsItem } from "@/lib/cmsApi";

export type BlogContentBlock = {
  type: string;
  text?: string;
  label?: string;
  index?: number;
  id?: string;
};

export type BlogArticle = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  img: string;
  images: string[];
  description: string;
  author: { name: string; role: string };
  content: BlogContentBlock[];
};

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function toBlogArticle(item: CmsItem): BlogArticle {
  const author =
    item.content.author &&
    typeof item.content.author === "object" &&
    !Array.isArray(item.content.author)
      ? (item.content.author as Record<string, unknown>)
      : {};
  const content = Array.isArray(item.content.content)
    ? item.content.content.filter(
        (block): block is BlogContentBlock =>
          Boolean(block) &&
          typeof block === "object" &&
          typeof block.type === "string",
      )
    : [];

  return {
    slug: item.slug,
    title: item.title,
    category: stringValue(item.content.category),
    date: stringValue(item.content.date),
    readTime: stringValue(item.content.readTime),
    img: stringValue(item.content.img),
    images: Array.isArray(item.content.images)
      ? item.content.images.filter(
          (image): image is string => typeof image === "string",
        )
      : [],
    description: stringValue(item.content.description),
    author: {
      name: stringValue(author.name),
      role: stringValue(author.role),
    },
    content,
  };
}
