import { motion } from "framer-motion";
import { Users, FolderCheck, Brain, FileText } from "lucide-react";
import { useHomeContent } from "@/hooks/useHomeContent";

const statIcons = [Users, FolderCheck, Brain, FileText];

const CounterSection = () => {
  const { content } = useHomeContent();
  const stats = content?.sections?.counters?.stats || [];
  if (!content?.sections?.counters) return null;

  return (
    <section className="py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(200 100% 20%), hsl(250 60% 25%), hsl(330 60% 25%))' }}>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => {
            const Icon = statIcons[i % statIcons.length];
            return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-4xl font-heading font-bold text-white">{s.value}</div>
              <div className="text-sm text-white/50 mt-1 uppercase tracking-wider">{s.label}</div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
