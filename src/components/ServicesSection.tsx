import { motion } from "framer-motion";
import { Smartphone, Globe, Megaphone, Cloud } from "lucide-react";
import { useCmsItems } from "@/hooks/useCmsContent";
import { useHomeContent } from "@/hooks/useHomeContent";

const ServicesSection = () => {
  const servicesQuery = useCmsItems("service");
  const { content } = useHomeContent();
  const section = content?.sections?.services;
  const cmsServices = servicesQuery.data || [];
  const iconByName = { Smartphone, Globe, Megaphone, Cloud };
  const visibleServices = cmsServices.map((service) => {
        const iconName = service.content.icon as keyof typeof iconByName;
        return {
          title: service.title,
          desc: String(service.content.description || ""),
          icon: iconByName[iconName] || Globe,
        };
      });

  if (!section) return null;

  return (
    <section id="services" className="py-24 section-dark-3 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest text-primary uppercase">{section.eyebrow}</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">
            {section.heading}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleServices.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 hover:bg-card transition-all duration-500 text-center hover:-translate-y-2 hover:shadow-2xl hover:border-primary/40"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <s.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
