import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useCmsItems } from "@/hooks/useCmsContent";
import { useHomeContent } from "@/hooks/useHomeContent";

const Testimonials = () => {
  const testimonialsQuery = useCmsItems("testimonial");
  const { content } = useHomeContent();
  const section = content?.sections?.testimonials;
  const cmsTestimonials = testimonialsQuery.data || [];
  const placementTestimonials = cmsTestimonials?.filter(
    (item) => item.content.placement === "trusted-partners",
  );
  const visibleTestimonials = placementTestimonials.map((item) => ({
        image: String(item.content.image || ""),
        name: item.title,
        company: String(item.content.company || ""),
        rating: Number(item.content.rating ?? 0),
        review: String(item.content.review || ""),
      }));
  const clientLogos = section?.logos || [];

  if (!section) return null;

  return (
    <section
      id="clients"
      className="py-16 section-dark-4 relative overflow-hidden"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-[200px]" />

      <div className="container mx-auto px-6">
        {/* HEADING */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold tracking-widest text-primary uppercase">
            {section.eyebrow}
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-3">
            {section.heading}
          </h2>
        </div>

        {/* LOGO CAROUSEL */}
        <div className="mb-14 overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-10 w-max"
          >
            {[...clientLogos, ...clientLogos].map((logo, i) => (
              <div
                key={i}
                className="
                  w-44 h-28
                  flex items-center justify-center
                  bg-gray-200/20
                  border border-gray-300/20
                  rounded-xl
                  backdrop-blur-xl
                  shadow-sm
                  hover:scale-105
                  transition-transform
                  duration-300
                "
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="
                    h-20
                    object-contain
                    brightness-0
                    invert
                    saturate-0
                    opacity-100
                    drop-shadow-[0_0_10px_rgba(255,255,255,0.95)]
                    transition-all
                    duration-300
                    hover:scale-110
                  "
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* TESTIMONIAL CAROUSEL */}
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-8 w-max"
          >
            {[...visibleTestimonials, ...visibleTestimonials].map((t, i) => (
              <div
                key={i}
                className="
                  min-w-[420px] max-w-[460px]
                  bg-white/5
                  border border-primary/10
                  rounded-2xl
                  p-6
                  backdrop-blur-xl
                  shadow-xl
                  hover:border-primary/30
                  transition-all
                "
              >
                {/* USER */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.image}
                    className="w-14 h-14 rounded-full object-cover border border-primary/20"
                    alt={t.name}
                  />

                  <div>
                    <h4 className="font-semibold text-foreground">
                      {t.name}
                    </h4>

                    <p className="text-xs text-muted-foreground">
                      {t.company}
                    </p>
                  </div>
                </div>

                {/* STARS */}
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, index) => (
                    <Star
                      key={index}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                {/* TEXT */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  "{t.review}"
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;