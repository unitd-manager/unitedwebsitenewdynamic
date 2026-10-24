import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useCmsItems } from "@/hooks/useCmsContent";
import { useHomeContent } from "@/hooks/useHomeContent";

const TestimonialsCarousel = () => {
  const testimonialsQuery = useCmsItems("testimonial");
  const { content } = useHomeContent();
  const section = content?.sections?.testimonialCarousel;
  const cmsTestimonials = testimonialsQuery.data || [];
  const placementTestimonials = cmsTestimonials?.filter(
    (item) => item.content.placement === "carousel",
  );
  const visibleTestimonials = placementTestimonials.map((item) => ({
        image: String(item.content.image || ""),
        name: item.title,
        company: String(item.content.company || ""),
        review: String(item.content.review || ""),
        rating: Number(item.content.rating ?? 0),
      }));

  if (!section) return null;

  return (
    <section className="py-24 section-dark-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <span className="text-primary uppercase tracking-widest text-sm font-semibold">
            {section.eyebrow}
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3 leading-snug">
            {section.heading}
          </h2>

          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
            {section.description}
          </p>

          <div className="w-16 h-1 bg-primary mx-auto mt-5 rounded-full" />
        </motion.div>

        {/* Sliding Cards */}
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
            {[...visibleTestimonials, ...visibleTestimonials].map(
              (testimonial, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="
                    w-[420px]
                    rounded-3xl
                    border border-primary/10
                    bg-card/40
                    backdrop-blur-xl
                    p-8
                    shadow-xl
                    flex-shrink-0
                    hover:border-primary/40
                    transition-all
                    duration-300
                  "
                >
                  {/* Quote Icon */}
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                    className="mb-6"
                  >
                    <Quote className="w-10 h-10 text-primary" />
                  </motion.div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    "{testimonial.review}"
                  </p>

                  {/* Client */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                    />

                    <div>
                      <h4 className="font-semibold text-foreground">
                        {testimonial.name}
                      </h4>

                      <p className="text-sm text-muted-foreground">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;