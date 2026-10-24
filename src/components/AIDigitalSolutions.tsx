import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useHomeContent } from "@/hooks/useHomeContent";
import {
  Bot,
  Sparkles,
  Workflow,
  Headphones,
  BarChart3,
  Search,
  BadgeDollarSign,
  Instagram,
  FileText,
  TrendingUp,
} from "lucide-react";

const aiIcons = [Bot, Sparkles, Workflow, Headphones, BarChart3];
const digitalIcons = [Search, BadgeDollarSign, Instagram, FileText, TrendingUp];

const AIDigitalSolutions = () => {
  const { content } = useHomeContent();
  const section = content?.sections?.aiDigital;
  if (!section) return null;

  const aiServices = section.aiServices || [];
  const digitalServices = section.digitalServices || [];

  return (
    <section
      className="
      relative
      overflow-hidden
      py-28
      bg-[#050816]"
    >

      {/* Background Glow */}

      <div className="
      absolute
      top-[-150px]
      left-[-100px]
      h-[450px]
      w-[450px]
      rounded-full
      bg-primary/10
      blur-[140px]" />

      <div className="
      absolute
      bottom-[-150px]
      right-[-100px]
      h-[450px]
      w-[450px]
      rounded-full
      bg-purple-500/10
      blur-[140px]" />





      <div className="
      container
      mx-auto
      px-6
      relative
      z-10">

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
          text-center
          max-w-3xl
          mx-auto"
        >

          <span className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-primary/20
          bg-primary/10
          px-5
          py-2
          text-xs
          uppercase
          tracking-[0.25em]
          text-primary
          font-semibold">

            {section.eyebrow}

          </span>





          <h2 className="
          mt-7
          text-5xl
          lg:text-5xl
          font-bold
          leading-tight">

            {section.heading}

          </h2>





          <p className="
          mt-6
          text-lg
          leading-relaxed
          text-muted-foreground">

            {section.description}

          </p>

        </motion.div>





        {/* Main Grid */}

        <div className="
        mt-20
        grid
        lg:grid-cols-2
        gap-8">

          {/* LEFT CARD */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
            relative
            overflow-hidden
            rounded-[36px]
            border
            border-primary/20
            bg-white/[0.04]
            backdrop-blur-2xl
            p-8"
          >

            {/* Gradient Border Glow */}

            <div className="
            absolute
            inset-0
            bg-gradient-to-b
            from-primary/10
            to-transparent" />





            <div className="relative z-10">

              <div className="
              flex
              items-center
              gap-4">

                <div className="
                w-16
                h-16
                rounded-2xl
                bg-primary/10
                flex
                items-center
                justify-center">

                  <Bot className="
                  w-8
                  h-8
                  text-primary" />

                </div>





                <div>

                  <p className="
                  text-sm
                  uppercase
                  tracking-[0.25em]
                  text-primary
                  font-semibold">

                    {section.aiEyebrow}

                  </p>

                  <h3 className="
                  mt-2
                  text-3xl
                  font-bold">

                    {section.aiHeading}

                  </h3>

                </div>

              </div>





              {/* Services */}

              <div className="
              mt-10
              space-y-4">

                {aiServices.map((service, index) => {
                  const Icon = aiIcons[index % aiIcons.length];

                  return (

                    <motion.div
                      whileHover={{
                        y: -4,
                        scale: 1.01,
                      }}
                      key={service.title}
                      className="
                      group
                      flex
                      items-center
                      gap-5
                      rounded-2xl
                      border
                      border-white/10
                      bg-[#0d1220]/80
                      px-5
                      py-5
                      hover:border-primary/30
                      transition-all
                      duration-300"
                    >

                      <div className="
                      w-12
                      h-12
                      rounded-xl
                      bg-primary/10
                      flex
                      items-center
                      justify-center
                      shrink-0">

                        <Icon className="
                        w-5
                        h-5
                        text-primary" />

                      </div>





                      <h4 className="
                      text-white
                      font-medium">

                        {service.title}

                      </h4>

                    </motion.div>

                  );
                })}

              </div>

            </div>

          </motion.div>





          {/* RIGHT CARD */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
            relative
            overflow-hidden
            rounded-[36px]
            border
            border-purple-500/20
            bg-white/[0.04]
            backdrop-blur-2xl
            p-8"
          >

            {/* Glow */}

            <div className="
            absolute
            inset-0
            bg-gradient-to-b
            from-purple-500/10
            to-transparent" />





            <div className="relative z-10">

              <div className="
              flex
              items-center
              gap-4">

                <div className="
                w-16
                h-16
                rounded-2xl
                bg-purple-500/10
                flex
                items-center
                justify-center">

                  <TrendingUp className="
                  w-8
                  h-8
                  text-purple-400" />

                </div>





                <div>

                  <p className="
                  text-sm
                  uppercase
                  tracking-[0.25em]
                  text-purple-400
                  font-semibold">

                    {section.digitalEyebrow}

                  </p>

                  <h3 className="
                  mt-2
                  text-3xl
                  font-bold">

                    {section.digitalHeading}

                  </h3>

                </div>

              </div>





              {/* Services */}

              <div className="
              mt-10
              space-y-4">

                {digitalServices.map((service, index) => {
                  const Icon = digitalIcons[index % digitalIcons.length];
                  const content = (
                    <>
                      <div className="
                      w-12
                      h-12
                      rounded-xl
                      bg-purple-500/10
                      flex
                      items-center
                      justify-center
                      shrink-0">

                        <Icon className="
                        w-5
                        h-5
                        text-purple-400" />

                      </div>

                      <h4 className="
                      text-white
                      font-medium">

                        {service.title}

                      </h4>
                    </>
                  );

                  return (
                    <motion.div
                      whileHover={{
                        y: -4,
                        scale: 1.01,
                      }}
                      key={service.title}
                      className="
                      group
                      rounded-2xl
                      border
                      border-white/10
                      bg-[#0d1220]/80
                      px-5
                      py-5
                      hover:border-purple-400/30
                      transition-all
                      duration-300"
                    >
                      {service.href ? (
                        <Link to={service.href} className="flex items-center gap-5">
                          {content}
                        </Link>
                      ) : (
                        <div className="flex items-center gap-5">{content}</div>
                      )}
                    </motion.div>
                  );
                })}

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
};

export default AIDigitalSolutions;