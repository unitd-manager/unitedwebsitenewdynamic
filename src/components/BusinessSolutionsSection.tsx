import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useHomeContent } from "@/hooks/useHomeContent";
import {
  Globe,
  Smartphone,
  BrainCircuit,
  Database,
  Cloud,
  Layers3,
  Megaphone,
  Search,
  BadgeDollarSign,
  Instagram,
  Wand2,
  TrendingUp,
  Briefcase,
} from "lucide-react";

const developmentIcons = [Globe, Smartphone, BrainCircuit, Layers3, Database, Briefcase, Cloud];
const marketingIcons = [Megaphone, Search, BadgeDollarSign, Instagram, Wand2, TrendingUp, Briefcase];

const BusinessSolutionsSection = () => {
  const { content } = useHomeContent();
  const section = content?.sections?.businessSolutions;
  if (!section) return null;

  const developmentServices = section.developmentServices || [];
  const marketingServices = section.marketingServices || [];

  return (
    <section className="relative py-28 bg-[#03050d] overflow-hidden">

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-cyan-500/10 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-purple-500/10 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,255,255,0.05),transparent,rgba(168,85,247,0.05))]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="px-6 py-2 rounded-full text-xs tracking-[0.3em] uppercase bg-white/5 border border-white/10 text-cyan-300 backdrop-blur-md">
            {section.eyebrow}
          </span>

          <h2 className="mt-7 text-5xl font-bold text-white">
            {section.heading}
          </h2>

          <p className="mt-6 text-gray-400">
            {section.description}
          </p>
        </motion.div>

        {/* GRID */}
        <div className="mt-20 grid lg:grid-cols-2 gap-10">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent"
          >
            <h3 className="text-cyan-300 text-sm tracking-[0.3em] uppercase">
              {section.developmentEyebrow}
            </h3>

            <h2 className="text-3xl font-bold text-white mt-2 mb-8">
              {section.developmentHeading}
            </h2>

            <div className="space-y-5">
              {developmentServices.map((item, i) => {
                const Icon = developmentIcons[i % developmentIcons.length];
                return (
                  <motion.div
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-5 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition"
                  >
                    <div className="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-cyan-300" />
                    </div>

                    <span className="text-white font-medium">
                      {item.title}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent"
          >
            <h3 className="text-purple-300 text-sm tracking-[0.3em] uppercase">
              {section.marketingEyebrow}
            </h3>

            <h2 className="text-3xl font-bold text-white mt-2 mb-8">
              {section.marketingHeading}
            </h2>

            <div className="space-y-5">
              {marketingServices.map((item, i) => {
                const Icon = marketingIcons[i % marketingIcons.length];
                const content = (
                  <>
                    <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-purple-300" />
                    </div>

                    <span className="text-white font-medium">
                      {item.title}
                    </span>
                  </>
                );

                return (
                  <motion.div
                    key={i}
                    whileHover={{ x: 10 }}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/40 transition"
                  >
                    {item.href ? (
                      <Link to={item.href} className="flex items-center gap-5">
                        {content}
                      </Link>
                    ) : (
                      <div className="flex items-center gap-5">{content}</div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BusinessSolutionsSection;