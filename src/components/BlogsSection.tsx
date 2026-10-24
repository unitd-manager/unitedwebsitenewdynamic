import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Search,
  Calendar,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useCmsItem, useCmsItems } from "@/hooks/useCmsContent";
import { toBlogArticle, type BlogArticle } from "@/lib/blogContent";
import Navbar from "./Navbar";
import FooterSection from "./FooterSection";

export default function BlogPage() {
  const navigate = useNavigate();
  const blogsQuery = useCmsItems("blog");
  const pageQuery = useCmsItem("page", "blog");

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [suggestions, setSuggestions] = useState<BlogArticle[]>([]);

  const blogItems = (blogsQuery.data || []).map(toBlogArticle);
  const pageContent = pageQuery.data?.content;
  const pageText = (key: string) =>
    typeof pageContent?.[key] === "string" ? String(pageContent[key]) : "";
  const categories = ["All", ...new Set(blogItems.map((article) => article.category))];

  const getMatches = (text: string): BlogArticle[] => {
    const q = text.trim().toLowerCase();
    if (!q) return [];
    return blogItems.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSuggestions(getMatches(value).slice(0, 5));
  };

  const goToArticle = (slug: string) => {
    setSuggestions([]);
    setQuery("");
    navigate(`/blog/${slug}`);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const matches = getMatches(query);
    if (matches.length > 0) goToArticle(matches[0].slug);
  };

  const visibleArticles =
    activeCategory === "All"
      ? blogItems
      : blogItems.filter((a) => a.category === activeCategory);

  if (blogsQuery.isSuccess && blogItems.length === 0) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center bg-[#04060f] px-6 text-center text-white">
          <p>No published articles yet.</p>
        </main>
        <FooterSection />
      </>
    );
  }

  if (blogsQuery.isPending || pageQuery.isPending) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center bg-[#04060f] px-6 text-center text-white">
          <p role="status">Loading blog content...</p>
        </main>
        <FooterSection />
      </>
    );
  }

  if (blogsQuery.isError || pageQuery.isError || !pageContent) {
    const error = blogsQuery.error || pageQuery.error;
    return (
      <>
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center bg-[#04060f] px-6 text-center text-white">
          <p role="alert" className="max-w-xl">
            {error
              ? `Blog content could not be loaded: ${error.message}`
              : "Blog page content is not available."}
          </p>
        </main>
        <FooterSection />
      </>
    );
  }

  const featured = blogItems[0];

  return (
    <>
      <Navbar />

      <main className="bg-[#04060f] text-white overflow-x-hidden">

        {/* HERO BANNER */}
        <div
          className="relative min-h-[calc(100svh-4.5rem)] md:min-h-[60vh]"
          style={{
            backgroundImage: `linear-gradient(
              180deg,
              rgba(4,6,15,0.35) 0%,
              rgba(4,6,15,0.55) 60%,
              rgba(4,6,15,0.95) 100%
            ), url(${pageText("heroBackgroundImage")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}

        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-36 pb-14 sm:pb-20 md:pb-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/60 bg-cyan-400/40 px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-cyan-50 font-semibold">
              {pageText("heroEyebrow")}
            </span>

            <h1 className="mt-5 sm:mt-7 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.02] max-w-4xl">
              {pageText("heroTitlePrefix")}{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                {pageText("heroTitleAccent")}
              </span>{" "}
              {pageText("heroTitleSuffix")}
            </h1>

            <p className="mt-5 sm:mt-7 max-w-2xl text-sm sm:text-base md:text-lg text-white/70 leading-relaxed">
              {pageText("heroDescription")}
            </p>

            {/* STATS */}
            <div className="mt-8 sm:mt-10 flex flex-wrap gap-x-8 sm:gap-x-12 gap-y-5 sm:gap-y-6">
              <div>
                <p className="text-3xl md:text-4xl font-bold">{blogItems.length}+</p>
                <p className="text-sm text-white/50 mt-1">{pageText("articleCountLabel")}</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold">{categories.length - 1}</p>
                <p className="text-sm text-white/50 mt-1">{pageText("topicCountLabel")}</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold">{pageText("freshnessValue")}</p>
                <p className="text-sm text-white/50 mt-1">{pageText("freshnessLabel")}</p>
              </div>
            </div>

            {/* SEARCH */}
            <form onSubmit={handleSearch} className="mt-8 sm:mt-10 max-w-xl relative">
              <div className="flex min-w-0 items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 sm:px-5 py-2">
                <Search className="w-4 h-4 text-white/60" />
                <input
                  value={query}
                  onChange={handleChange}
                  placeholder={pageText("searchPlaceholder")}
                  className="min-w-0 flex-1 bg-transparent outline-none text-sm"
                />
                <button
                  type="submit"
                  className="shrink-0 bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-4 sm:px-5 py-2 rounded-full text-sm whitespace-nowrap"
                >
                  {pageText("searchButton")}
                </button>
              </div>

              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-white/10 bg-[#0a0d1c] backdrop-blur-xl overflow-hidden z-20 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                  {suggestions.map((item) => (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => goToArticle(item.slug)}
                      className="w-full text-left px-5 py-3 flex items-center justify-between gap-4 hover:bg-cyan-400/10 transition-colors border-b border-white/5 last:border-b-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        <p className="text-[11px] uppercase tracking-wider text-cyan-300 mt-1">
                          {item.category}
                        </p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-white/40 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`w-full justify-center px-3 py-2 rounded-full text-sm border transition-colors sm:w-auto sm:px-4 ${
                  activeCategory === c
                    ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200"
                    : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* FEATURED ARTICLE */}
        <div className="max-w-7xl mx-auto px-6 mt-10">
          {featured && <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[28px] border border-white/10 bg-white/5 p-8"
          >
            <div className="flex justify-between flex-col md:flex-row gap-8">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-cyan-300 font-semibold">
                  {pageText("featuredLabel")} &middot; {featured.category}
                </span>
                <h3 className="mt-4 text-2xl md:text-3xl font-bold leading-snug max-w-2xl">
                  {featured.title}
                </h3>
                <p className="mt-4 text-white/60 max-w-2xl">{featured.description}</p>
                <div className="mt-6 flex flex-wrap gap-5 text-white/50 text-sm">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {featured.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {featured.readTime}
                  </span>
                  <span className="flex items-center gap-2">By {featured.author?.name}</span>
                </div>
              </div>
              <Link
                to={`/blog/${featured.slug}`}
                className="border border-cyan-400/40 bg-cyan-400/10 text-cyan-200 px-5 py-2.5 rounded-full hover:bg-cyan-400/20 transition-colors whitespace-nowrap self-start h-fit flex items-center gap-1"
              >
                {pageText("readArticleLabel")} <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>}
        </div>

        {/* LATEST ARTICLES GRID */}
        <div className="max-w-7xl mx-auto px-6 mt-16 md:mt-20 pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold">{pageText("latestArticlesTitle")}</h2>
            <button
              onClick={() => setActiveCategory("All")}
              className="hidden sm:flex items-center gap-1 text-sm text-cyan-300 hover:text-cyan-200 transition-colors"
            >
              {pageText("viewAllLabel")} <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>

          {visibleArticles.length === 0 ? (
            <p className="text-center text-white/50">No articles found in this category yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleArticles.map((blog, i) => (
                <motion.div
                  key={blog.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group overflow-hidden rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(0,255,255,0.08)]"
                >
                  <Link to={`/blog/${blog.slug}`}>
                    <div className="relative aspect-video overflow-hidden">
                      <span className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-[0.2em] bg-black/50 backdrop-blur-sm border border-white/10 text-cyan-200 px-3 py-1 rounded-full">
                        {blog.category}
                      </span>
                      <img
                        src={blog.img}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold group-hover:text-cyan-300 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-white/60 mt-3 line-clamp-2">{blog.description}</p>
                      <div className="mt-6 flex justify-between items-center text-xs text-white/40">
                        <span>{blog.author?.name} &middot; {blog.date}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {blog.readTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* NEWSLETTER */}
        <div className="max-w-7xl mx-auto px-6 pb-20 md:pb-28">
          <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="max-w-md">
              <h3 className="text-2xl md:text-3xl font-bold">
                {pageText("newsletterTitle")}
              </h3>
              <p className="text-white/60 mt-3">
                {pageText("newsletterDescription")}
              </p>
            </div>
            <form className="flex min-w-0 w-full flex-col items-stretch gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-4 md:w-[420px] md:flex-row md:items-center md:gap-2 md:rounded-full md:px-5 md:py-2">
              <input
                type="email"
                placeholder={pageText("newsletterPlaceholder")}
                className="min-w-0 flex-1 bg-transparent text-center text-sm outline-none md:text-left"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black whitespace-nowrap"
              >
                {pageText("newsletterButton")}
              </button>
            </form>
          </div>
        </div>

      </main>

      <FooterSection />
    </>
  );
}