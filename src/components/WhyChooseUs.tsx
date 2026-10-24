import { motion } from "framer-motion";
import { Eye, Repeat, TrendingUp, Award } from "lucide-react";
import { useHomeContent } from "@/hooks/useHomeContent";
import CounterSection from "./CounterSection";

const reasonIcons = [Eye, Repeat, TrendingUp, Award];

const WhyChooseUs = () => {
  const { content } = useHomeContent();
  const section = content?.sections?.whyChooseUs;
  const reasons = (section?.reasons || []).map((reason, index) => ({
    ...reason,
    icon: reasonIcons[index % reasonIcons.length],
  }));
  if (!section) return null;

  return (
    <>
      <section className="py-24 section-dark-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-[200px]" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <span className="text-sm font-semibold tracking-widest text-primary uppercase">
              {section.eyebrow}
            </span>

            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mt-3 leading-snug">
              {section.heading}
            </h2>

            <p className="text-muted-foreground mt-4 leading-relaxed max-w-2xl mx-auto">
              {section.description}
            </p>

            <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <r.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                  {r.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {r.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CounterSection />
    </>
  );
};

export default WhyChooseUs;