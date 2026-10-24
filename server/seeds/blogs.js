import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const articles = require("./blogs.json");

function image(assetPath) {
  return `/api/media?path=${encodeURIComponent(assetPath)}`;
}

const articleSeeds = articles.map((article) => ({
  type: "blog",
  slug: article.slug,
  title: article.title,
  content: {
    blogSeedVersion: 1,
    category: article.category,
    date: article.date,
    readTime: article.readTime,
    img: image(article.img),
    images: article.images.map(image),
    description: article.description,
    author: article.author,
    content: article.content,
  },
}));

export const blogPageSeed = {
  type: "page",
  slug: "blog",
  title: "Blog",
  content: {
    blogPageSeedVersion: 3,
    heroEyebrow: "UnitedWeb Journal",
    heroTitlePrefix: "Field notes on",
    heroTitleAccent: "AI, automation",
    heroTitleSuffix: "& digital growth.",
    heroDescription:
      "Playbooks, teardowns and behind-the-build stories from a team shipping production systems for clients across multiple industries.",
    heroBackgroundImage: image("src/assets/blog page.webp"),
    articleCountLabel: "Articles published",
    topicCountLabel: "Topics covered",
    freshnessValue: "24/7",
    freshnessLabel: "Always up to date",
    searchPlaceholder: "Search articles, topics, authors...",
    searchButton: "Search",
    tableOfContentsTitle: "In this article",
    sectionsLabel: "sections",
    recentArticlesTitle: "Recent Articles",
    trendingLabel: "Trending",
    articleImageAltPrefix: "Article image",
    shareArticleLabel: "Share article",
    featuredLabel: "Featured",
    latestArticlesTitle: "Latest articles",
    viewAllLabel: "View all",
    readArticleLabel: "Read article",
    newsletterTitle: "Get the next playbook in your inbox.",
    newsletterDescription:
      "One concise email a month. AI builds, growth experiments, and lessons from real client work. No fluff.",
    newsletterPlaceholder: "you@company.com",
    newsletterButton: "Subscribe",
  },
};

export default articleSeeds;
