import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";  
import { useHomeContent } from "@/hooks/useHomeContent";
import {
  BriefcaseBusiness,
  Users,
  Globe,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

const HeroSection = () => {

  const navigate = useNavigate();
  const { content } = useHomeContent();
  if (!content) return null;

  const statIcons = [
    <BriefcaseBusiness size={18} />,
    <Users size={18} />,
    <Globe size={18} />,
    <BarChart3 size={18} />,
    <ShieldCheck size={18} />,
  ];
  const stats = Array.isArray(content.stats)
    ? content.stats.map((item, index) => ({
        icon: statIcons[index % statIcons.length],
        value: item.value,
        label: item.label,
      }))
    : [];

  return (
    <section
      className="
        relative
        min-h-screen
        pt-24
        md:pt-28
        pb-10
        md:pb-16
        overflow-hidden
        bg-cover
        bg-no-repeat
        bg-left
        md:bg-center
        flex
        items-center
      "
      style={{
        backgroundImage: `url(${content.backgroundImage || ""})`,
      }}
    >
      <div className="container mx-auto px-5 md:px-6 relative z-10">
        <div className="flex items-center min-h-[calc(100vh-120px)]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl lg:ml-10"
          >
            {/* Badge */}
            <div
              className="
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-blue-400/80
                bg-blue-600/80
                backdrop-blur-xl
                px-5
                md:px-6
                py-3
              "
            >
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />

              <span
                className="
                  text-[10px]
                  md:text-xs
                  uppercase
                  tracking-[0.25em]
                  text-white
                  font-semibold
                "
              >
                {content.eyebrow}
              </span>
            </div>

            {/* Heading */}
            <h1
              className="
                mt-6
                md:mt-8
                text-3xl
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
                font-black
                leading-[0.9]
                tracking-[-0.05em]
                text-white
              "
            >
              {content.headingPrefix}
              <br />

              <span
        className="
  bg-gradient-to-b
  from-white
  via-cyan-300
  to-[white]
  bg-clip-text
  text-transparent
  
"
>
  {content.headingHighlight}
</span>
                
          

              <br />
              {content.headingSuffix}
            </h1>

            {/* Description */}
            <p
              className="
                mt-6
                max-w-xl
                text-sm
                sm:text-base
                md:text-lg
                text-white/80
                leading-relaxed
              "
            >
              {content.description}
            </p>

            {/* Counter Section */}
            <div className="mt-6 md:mt-10">
              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                  md:flex
                  md:flex-wrap
                  lg:flex-nowrap
                  items-center
                "
              >
                {stats.map((item, index) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ y: -2 }}
                    className={`
                      flex
                      items-center
                      gap-2
                      p-3
                      rounded-xl
                      bg-blue-900/30
                      backdrop-blur-md
                      md:bg-transparent
                      md:rounded-none
                      md:p-3
                      ${
                        index !== stats.length - 1
                          ? "lg:border-r lg:border-white/20"
                          : ""
                      }
                    `}
                  >
                    <div
                      className="
                        w-10
                        h-10
                        rounded-xl
                        bg-blue-500/80
                        border
                        border-blue-400/20
                        flex
                        items-center
                        justify-center
                        text-white
                        shrink-0
                      "
                    >
                      {item.icon}
                    </div>

                    <div>
                      <h3 className="text-white text-lg md:text-[20px] font-semibold leading-none">
                        {item.value}
                      </h3>

                      <p className="text-white/75 text-xs md:text-sm whitespace-nowrap">
                        {item.label}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 md:mt-10 flex flex-wrap gap-3">
              <button
             onClick={() => content.ctaHref && navigate(content.ctaHref)}
             
             className="
                  rounded-full
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-800
                  px-10
                  md:px-14
                  py-4
                  md:py-5
                  text-lg
                  md:text-xl
                  font-semibold
                  text-white
                  hover:scale-105
                  transition
                "
              >
                {content.ctaText}
              </button>

            {/*  <button
              
                className="
                  rounded-full
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-800
                  px-5
                  md:px-6
                  py-3
                  font-semibold
                  text-white
                  hover:scale-105
                  transition
                "
              >
                View Case Studies
              </button> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;