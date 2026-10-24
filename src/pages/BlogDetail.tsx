import { motion, useScroll, useTransform } from "framer-motion";
import {
  CalendarDays,
  ArrowLeft,
  Clock3,
  Tag,
  Share2,
  TrendingUp,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useCmsItem, useCmsItems } from "@/hooks/useCmsContent";
import { toBlogArticle } from "@/lib/blogContent";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

type ArticleBlock = ReturnType<typeof toBlogArticle>["content"][number];

/* ─── Reading progress bar ─── */
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setProgress((scrollTop / (scrollHeight - clientHeight)) * 100);
    };
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-white/10 z-50">
      <div
        className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 transition-all duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

/* ─── Build TOC from headings ─── */
const buildTOC = (content: ArticleBlock[]) =>
  content
    .filter((b) => b.type === "heading")
    .map((b, i) => ({ id: `heading-${i}`, text: b.text ?? "" }));

/* ─── Sidebar ─── */
const Sidebar = ({
  blog,
  toc,
  pageText,
}: {
  blog: { slug: string };
  toc: { id: string; text: string }[];
  pageText: (key: string) => string;
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const recentBlogsQuery = useCmsItems("blog");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0% -70% 0%" }
    );
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  const recentBlogs = (recentBlogsQuery.data || [])
    .filter((item) => item.slug !== blog.slug)
    .slice(0, 6)
    .map(toBlogArticle);

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.7 }}
      className="relative h-full"
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 via-blue-500/20 to-transparent pointer-events-none" />

      {/* Sticky container so sidebar tracks scroll but fills full height */}
      <div className="sticky top-6 flex flex-col gap-6 pl-6 h-[calc(100%-1.5rem)]">

        {/* Table of Contents */}
        {toc.length > 0 && (
          <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-cyan-500/[0.06] to-white/[0.02] backdrop-blur-xl p-7 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-400/10 blur-3xl rounded-full" />
            <div className="flex items-center gap-2.5 mb-6 relative">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-400/15 border border-cyan-400/25">
                <BookOpen className="w-4 h-4 text-cyan-300" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-widest leading-none">
                  {pageText("tableOfContentsTitle")}
                </h3>
                <p className="text-[10px] text-white/35 mt-1">
                  {toc.length} {pageText("sectionsLabel")}
                </p>
              </div>
            </div>
            <ul className="space-y-1.5 relative">
              {toc.map((item, i) => {
                const isActive = activeId === item.id;
                const linkClass = isActive
                  ? "group relative flex items-center gap-3 py-2.5 text-sm transition-all rounded-xl px-3 text-cyan-200 bg-gradient-to-r from-cyan-500/15 to-transparent border border-cyan-400/20 w-full text-left"
                  : "group relative flex items-center gap-3 py-2.5 text-sm transition-all rounded-xl px-3 text-gray-400 hover:text-cyan-200 hover:bg-white/5 border border-transparent w-full text-left";
                const numClass = isActive
                  ? "flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold flex-shrink-0 bg-cyan-400 text-black"
                  : "flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold flex-shrink-0 bg-white/10 text-white/40 group-hover:bg-cyan-400/30 group-hover:text-cyan-200";
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
                      }
                      className={linkClass}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-cyan-400" />
                      )}
                      <span className={numClass}>{i + 1}</span>
                      <span className="leading-snug">{item.text}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Recent Articles */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-widest flex-shrink-0">
            {pageText("recentArticlesTitle")}
          </h3>
          {recentBlogs.map((item, i) => (
            <Link
              key={item.slug}
              to={`/blog/${item.slug}`}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden hover:border-cyan-400/30 hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/90 via-[#050816]/30 to-transparent" />
                <span className="absolute top-3 left-3 text-[9px] uppercase tracking-[0.2em] text-cyan-300 bg-black/50 backdrop-blur-sm border border-cyan-500/20 px-2.5 py-1 rounded-full font-semibold">
                  {item.category}
                </span>
                <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/50 text-[10px] font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <div className="px-5 py-3 flex flex-col flex-shrink-0">
                <h4 className="text-white text-sm font-semibold leading-snug mb-1.5 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed mb-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-white/30 text-[11px] flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1 text-cyan-400 text-xs font-semibold">
                    Read
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </motion.aside>
  );
};

/* ══════════════════════════════════════════════════════ */

const BlogDetail = () => {
  const { slug } = useParams();
  const {
    data: cmsBlog,
    isPending: isCmsPending,
    isError: isCmsError,
    error: cmsError,
  } = useCmsItem("blog", slug || "");
  const blogPageQuery = useCmsItem("page", "blog");
  const pageText = (key: string) => {
    const value = blogPageQuery.data?.content[key];
    return typeof value === "string" ? value : "";
  };
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 140]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const blog = cmsBlog ? toBlogArticle(cmsBlog) : undefined;

  if (!blog) {
    if (isCmsPending) {
      return (
        <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white">
          Loading article...
        </div>
      );
    }
    return (
      <div
        role={isCmsError ? "alert" : "status"}
        className="min-h-screen bg-[#050816] flex items-center justify-center px-6 text-center text-white text-xl font-bold"
      >
        {isCmsError
          ? `Article content could not be loaded: ${cmsError.message}`
          : "Blog Not Found"}
      </div>
    );
  }

  const toc = buildTOC(blog.content);

  let headingIdx = 0;
  const contentWithIds = blog.content.map((block) => {
    if (block.type === "heading")
      return { ...block, id: `heading-${headingIdx++}` };
    return block;
  });

  return (
    <>
      <Navbar />
      <ReadingProgress />

      <section className="relative min-h-screen overflow-hidden bg-[#060b1c]">

        {/* Ambient glows */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-cyan-500/8 blur-[180px] rounded-full" />
          <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-purple-600/8 blur-[160px] rounded-full" />
          <div className="absolute bottom-0 left-1/2 w-[700px] h-[400px] -translate-x-1/2 bg-blue-600/6 blur-[180px] rounded-full" />
        </div>

        {/* ── HERO ── */}
        <div ref={heroRef} className="relative h-[55vh] min-h-[420px] max-h-[560px] overflow-hidden">
          <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
            <img src={blog.img} alt={blog.title} className="w-full h-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#060b1c] via-[#060b1c]/70 to-[#060b1c]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060b1c]/60 via-transparent to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-6 w-full">
            {/* <Link
              to="/#blogs"
              className="inline-flex items-center gap-2 text-white/60 hover:text-cyan-300 transition-all text-sm mb-10 group w-fit"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full border border-white/20 group-hover:border-cyan-400/50 transition">
                <ArrowLeft className="w-3.5 h-3.5" />
              </span>
              Back to Journal
            </Link> */}

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="pb-14"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/25 text-cyan-300 text-[11px] font-bold uppercase tracking-[0.2em]">
                  <Tag className="w-3 h-3" />
                  {blog.category}
                </span>
                <span className="text-white/30 text-xs">·</span>
                <span className="text-white/50 text-xs flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> {pageText("trendingLabel")}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] max-w-4xl tracking-tight mb-7">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-black font-black text-sm flex-shrink-0">
                    {blog.author?.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-tight">{blog.author?.name}</p>
                    <p className="text-white/40 text-[11px]">{blog.author?.role}</p>
                  </div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <span className="flex items-center gap-1.5 text-white/50 text-sm">
                  <CalendarDays className="w-3.5 h-3.5 text-cyan-400" />
                  {blog.date}
                </span>
                <span className="flex items-center gap-1.5 text-white/50 text-sm">
                  <Clock3 className="w-3.5 h-3.5 text-cyan-400" />
                  {blog.readTime}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-14">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12 xl:gap-16 items-stretch">

            {/* Main content — flex column so it stretches to match sidebar height */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="flex flex-col h-full"
            >
              {/* Description callout */}
              <div className="relative rounded-2xl border-l-[3px] border-cyan-400 bg-gradient-to-r from-cyan-500/8 to-transparent pl-6 pr-6 py-5 mb-12">
                <p className="text-lg text-white/80 leading-relaxed">{blog.description}</p>
              </div>

              {/* Article body — grows to fill remaining left-column height, distributed evenly
                  so the bottom of the content always lines up with the bottom of the sidebar,
                  regardless of how long or short the article is */}
              <div className="space-y-5 flex-1">
                {contentWithIds.map((block, index: number) => {
                  if (block.type === "heading") {
                    return (
                      <h3
                        key={index}
                        id={block.id}
                        className="text-2xl font-bold text-white mt-12 mb-3 scroll-mt-28 relative pl-4 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[3px] before:rounded-full before:bg-gradient-to-b before:from-cyan-400 before:to-blue-500"
                      >
                        {block.text}
                      </h3>
                    );
                  }
                  if (block.type === "image") {
                    const src = blog.images?.[block.index];
                    if (!src) return null;
                    const isLeft = block.index % 2 === 0;
                    return (
                      <div
                        key={index}
                        className={
                          isLeft
                            ? "float-left mr-7 mb-4 mt-2 w-[55%] sm:w-[50%] rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
                            : "float-right ml-7 mb-4 mt-2 w-[55%] sm:w-[50%] rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
                        }
                      >
                        <img
                          src={src}
                          alt={`${pageText("articleImageAltPrefix")} ${(block.index ?? 0) + 1}`}
                          className="w-full h-full object-cover aspect-[4/3]"
                        />
                      </div>
                    );
                  }
                  if (block.type === "labeled") {
                    return (
                      <p key={index} className="text-gray-400 leading-[2] text-[17px]">
                        <span className="text-cyan-300 font-semibold">
                          {block.label}:
                        </span>{" "}
                        {block.text}
                      </p>
                    );
                  }
                  return (
                    <p key={index} className="text-gray-400 leading-[2] text-[17px]">
                      {block.text}
                    </p>
                  );
                })}
              </div>
              <div className="clear-both" />

              {/* Author + share footer — pinned to bottom of left column */}
              <div className="mt-14 pt-8 border-t border-white/8 flex items-center justify-between gap-6 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-black font-black text-lg flex-shrink-0">
                    {blog.author?.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{blog.author?.name}</p>
                    <p className="text-xs text-gray-400">{blog.author?.role}</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white/60 hover:border-cyan-400/40 hover:text-cyan-300 transition-all text-sm">
                  <Share2 className="w-3.5 h-3.5" /> {pageText("shareArticleLabel")}
                </button>
              </div>
            </motion.div>

            {/* Sidebar */}
            <Sidebar blog={blog} toc={toc} pageText={pageText} />

          </div>
        </div>

      </section>

      <FooterSection />
    </>
  );
};

export default BlogDetail;
