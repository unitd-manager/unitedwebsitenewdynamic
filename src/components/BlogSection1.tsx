import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CalendarDays,
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCmsItems } from "@/hooks/useCmsContent";
import { useHomeContent } from "@/hooks/useHomeContent";

const BlogsSection1 = () => {
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();
  const { content } = useHomeContent();
  const section = content?.sections?.blogs;
  const blogsQuery = useCmsItems("blog");
  const cmsBlogs = blogsQuery.data || [];
  const visibleBlogItems = cmsBlogs.map((item) => ({
        slug: item.slug,
        title: item.title,
        category: String(item.content.category || ""),
        date: String(item.content.date || ""),
        description: String(item.content.description || ""),
        img: String(item.content.image || ""),
      }));
  if (!section || !blogsQuery.isSuccess || visibleBlogItems.length === 0) return null;

  const visibleCount = 3;

  const next = () =>
    setStartIndex((prev) => (prev + 1) % visibleBlogItems.length);

  const prev = () =>
    setStartIndex(
      (prev) => (prev - 1 + visibleBlogItems.length) % visibleBlogItems.length
    );

  const visibleBlogs = Array.from(
    { length: visibleCount },
    (_, i) => visibleBlogItems[(startIndex + i) % visibleBlogItems.length]
  );

  return (
    <section
      id="blogs"
      className="relative py-28 overflow-hidden bg-[#050816]"
    >
      {/* Glow Background */}
      <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-[0.25em] text-cyan-400 uppercase">
            {section.eyebrow}
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-5">
            {section.heading}
          </h2>

          <p className="max-w-2xl mx-auto text-gray-400 mt-6 leading-relaxed">
            {section.description}
          </p>
        </motion.div>

        {/* Blog Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {visibleBlogs.filter(Boolean).map((blog, i) => (

            <motion.div
              key={`${blog.slug}-${i}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => navigate(`/blog/${blog.slug}`)}
              className="
                group
                overflow-hidden
                rounded-[30px]
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                transition-all
                duration-500
                hover:border-cyan-400/40
                hover:shadow-[0_0_40px_rgba(0,255,255,0.08)]
                cursor-pointer
              "
            >

              {/* Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />
              </div>

              {/* Content */}
              <div className="p-6">

                {/* Top Row */}
                <div className="flex items-center justify-between mb-4">

                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      bg-cyan-500/10
                      border
                      border-cyan-500/20
                      text-cyan-300
                      text-[11px]
                      font-semibold
                      tracking-wide
                      uppercase
                    "
                  >
                    {blog.category}
                  </span>

                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {blog.date}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white leading-snug mb-3 group-hover:text-cyan-300 transition-colors">
                  {blog.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-3">
                  {blog.description}
                </p>

                {/* Read More */}
                <Link
                  to={`/blog/${blog.slug}`}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-cyan-300
                    hover:gap-3
                    transition-all
                  "
                >
                  {section.readMoreLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>

              </div>
            </motion.div>

          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-12">

          <button
            onClick={prev}
            className="
              w-12
              h-12
              rounded-full
              border
              border-white/10
              bg-white/[0.03]
              flex
              items-center
              justify-center
              hover:bg-cyan-500/10
              transition
            "
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={next}
            className="
              w-12
              h-12
              rounded-full
              border
              border-white/10
              bg-white/[0.03]
              flex
              items-center
              justify-center
              hover:bg-cyan-500/10
              transition
            "
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

        </div>
      </div>
    </section>
  );
};

export default BlogsSection1;