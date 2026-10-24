import React from "react";
// Update these paths to point to your own image assets
import project16 from "../assets/smart.webp";
import project17 from "../assets/pms1.webp";
import project17b from "../assets/pms2.webp";
import project18 from "../assets/hr1.webp";
import project18b from "../assets/hr2.webp";
import project19 from "../assets/admc.webp";
import project20 from "../assets/sai1.webp";
import project20b from "../assets/sai2.webp";
import image from "../assets/download (1).webp";
import image1 from "../assets/AI2.webp";
import image2 from "../assets/AI.webp";
import image3 from "../assets/img1 (1).webp";
import image4 from "../assets/img1 (2).webp";
import image5 from "../assets/img1 (3).webp";
import { useNavigate } from "react-router-dom";
import {
  Smartphone,
  Tablet,
  Code2,
  Sparkles,
  Users,
  TrendingUp,
  Zap,
  Layers,
  Globe,
  Image as ImageIcon,
  Facebook,
  Instagram,
  Linkedin,
  ChevronRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

/* ---------- shared bits ---------- */

const Eyebrow = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-400/20 border border-cyan-400/30 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-cyan-300 uppercase">
    {children}
  </span>
);

const SectionHeading = ({ eyebrow, title, sub, align = "center" }) => (
  <div
    className={`max-w-2xl ${
      align === "center" ? "mx-auto text-center" : "text-left"
    } mb-14`}
  >
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
      {title}
    </h2>
    {sub && <p className="mt-4 text-slate-400 leading-relaxed">{sub}</p>}
  </div>
);

const Panel = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-9 backdrop-blur-sm ${className}`}
  >
    {children}
  </div>
);

const IconTile = ({ icon: Icon }) => (
  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-blue-500/20">
    <Icon className="h-5 w-5 text-white" strokeWidth={2} />
  </div>
);

const ProjectCard = ({ project, large = false }) => {
  // Normalize: a project can have either a single `image` or an
  // `images: []` array. If it has more than one image, we crossfade
  // between them automatically, independent of the outer carousel.
  const images = project.images && project.images.length > 0
    ? project.images
    : project.image
    ? [project.image]
    : [];

  const [imgIndex, setImgIndex] = React.useState(0);

  React.useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setImgIndex((i) => (i + 1) % images.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [images.length]);

  const heightClass = large ? "h-72" : "h-52";

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      <div className={`relative w-full ${heightClass}`}>
        {images.length > 0 ? (
          images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={project.name}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out group-hover:scale-110 ${
                i === imgIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionProperty: "opacity, transform" }}
            />
          ))
        ) : (
          /* Drop your own project screenshot in this placeholder */
          <div className="flex h-full w-full items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110">
            <div className="flex flex-col items-center gap-2 text-slate-600">
              <ImageIcon className={large ? "h-9 w-9" : "h-7 w-7"} strokeWidth={1.5} />
              <span className="text-[10px] uppercase tracking-widest">
                Add project image
              </span>
            </div>
          </div>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 flex gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-all ${
                  i === imgIndex ? "w-4 bg-cyan-300" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <div className={large ? "p-6 text-center" : "p-4"}>
        <p
          className={`font-semibold text-white ${
            large ? "text-center text-lg" : "text-left text-sm"
          }`}
        >
          {project.name}
        </p>
      </div>
    </div>
  );
};

/**
 * Auto-forward carousel that always shows exactly `perSlide` cards
 * at a time, grouped into pages, sliding forward automatically and
 * looping seamlessly back to the start.
 */
const ProjectsCarousel = ({ projects, perSlide = 2, intervalMs = 4000 }) => {
  // Build pages of `perSlide` items. Pad the last page (repeating from
  // the start) so every page renders the same number of cards.
  const slides = React.useMemo(() => {
    const pages = [];
    for (let i = 0; i < projects.length; i += perSlide) {
      pages.push(projects.slice(i, i + perSlide));
    }
    if (pages.length > 1) {
      const last = pages[pages.length - 1];
      let fillIndex = 0;
      while (last.length < perSlide) {
        last.push(projects[fillIndex % projects.length]);
        fillIndex += 1;
      }
    }
    return pages;
  }, [projects, perSlide]);

  const total = slides.length;
  // Clone of the first slide appended so we can always animate forward
  // and then snap back invisibly instead of animating backward.
  const track = React.useMemo(() => [...slides, slides[0]], [slides]);

  const [index, setIndex] = React.useState(0);
  const [animate, setAnimate] = React.useState(true);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (total <= 1 || paused) return;
    const timer = setInterval(() => {
      setIndex((i) => i + 1);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [total, paused, intervalMs]);

  // When we've slid onto the cloned slide, wait for the transition to
  // finish, then jump back to the real first slide with no animation.
  React.useEffect(() => {
    if (index === total) {
      const id = setTimeout(() => {
        setAnimate(false);
        setIndex(0);
      }, 500);
      return () => clearTimeout(id);
    }
  }, [index, total]);

  // Re-enable the transition on the next frame after the silent jump.
  React.useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animate]);

  const goTo = (i) => {
    setAnimate(true);
    setIndex(i);
  };

  const advance = () => setIndex((i) => i + 1);

  if (total === 0) return null;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className={`flex ${
            animate ? "transition-transform duration-500 ease-out" : ""
          }`}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {track.map((slide, si) => (
            <div key={si} className="w-full flex-shrink-0">
              <div
                className={`grid gap-x-6 gap-y-10 px-1 ${
                  perSlide === 1
                    ? "mx-auto max-w-md grid-cols-1"
                    : perSlide === 2
                    ? "mx-auto max-w-3xl grid-cols-2"
                    : "grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {slide.map((project, pi) => (
                  <ProjectCard
                    key={`${si}-${project.name}-${pi}`}
                    project={project}
                    large={perSlide === 1}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {total > 1 && (
        <div className="mt-8 flex items-center justify-center gap-5">
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to set ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index % total ? "w-6 bg-cyan-400" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
         
        </div>
      )}
    </div>
  );
};

/* ---------- content data (verbatim) ---------- */

const introParagraph =
  "The advent of smartphones has ushered in a new era of user experience. With users relying heavily on their devices, there has been a surge in Mobile App development. Every day, hundreds of apps are being developed to cater to the diverse needs of smartphone users. Mobile apps have become an essential platform for businesses and individuals to engage with their audience and provide valuable services on the go.";

const businessUse = [
  {
    image: image2,
    title: "Enhancing User Experience",
    text: "It's widely acknowledged that Mobile Apps provide superior user experiences compared to websites. With enriched and highly valuable content, apps stand out from other web sources. Users perceive apps to be laser-focused on providing exactly what they seek, creating a compelling reason to choose the app over alternative platforms. This focus on user needs and seamless interactions drives more users towards adopting and engaging with mobile apps.",
  },
  {
    image: image1,
    title: "Boosting Business Growth",
    text: "Having a dedicated app for your service or product creates a perception of high standard and reliability in the minds of your customers. This enhanced image draws more focus towards your business. Through the app, you establish a close and direct line of communication with your customers, providing them with all the information they need about your offerings. Any business updates or promotions can be swiftly delivered to targeted customers based on their specific product or service preferences. This personalized approach fosters stronger customer relationships and significantly contributes to driving business growth.",
  },
];

const appTypes = [
  {
    image: image3,
    title: "Native App",
    text: "Native apps are specifically designed and built for specific platforms, making them available in the respective app stores. One significant advantage of native apps is their exceptional speed and the ability to utilize all the elements and features of the user's device. This ensures a seamless and optimized user experience.",
  },
  {
    image: image4,
    title: "Hybrid App",
    text: "A hybrid app is a cost-effective combination of native and web applications. It leverages the strengths of both approaches, allowing it to adapt its functionality based on specific requirements. By incorporating elements from native apps and web applications, hybrid apps provide a versatile solution that can deliver a rich user experience while being budget-friendly.",
  },
  {
    image: image5,
    title: "Web App",
    text: "A web app is an application that runs within a web browser and is built using HTML5, CSS, and JavaScript. It provides a user experience similar to a native app but has some limitations in accessing certain device elements. Despite these limitations, web apps offer the advantage of cross-platform compatibility, as they can be accessed on various devices with internet browsers.",
  },
];

const projects = [
  { name: "Smartcon", image: project16 },
  { name: "PMS", images: [project17, project17b] },
  { name: "HR", images: [project18, project18b] },
  { name: "ADMC", image: project19 },
  { name: "Saif Sports Club-Booking", images: [project20, project20b] },
];

/* ---------- page ---------- */

export default function MobileAppDevelopment() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#05060f] text-white antialiased selection:bg-blue-500/30">
      {/* background ambience */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-cyan-600/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[24rem] w-[24rem] rounded-full bg-blue-800/10 blur-[120px]" />
      </div>

      <div className="relative">
        <Navbar />
        {/* ---------------- HERO ---------------- */}
        <header className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="grid items-center gap-14 md:grid-cols-2">
            <div>
              <Eyebrow>Service Details</Eyebrow>
              <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
                Mobile App{" "}
                <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Development
                </span>
              </h1>
              <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-lg">
                Native, hybrid, and web apps built to give your business a
                direct, personal line of communication with your customers
                wherever they are.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button 
                onClick={() => navigate("/enquiryNow")}
                className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-105">
                  Enquiry Now
                </button>
                <span className="text-sm text-slate-500">
                  Home&nbsp;/&nbsp;
                  <span className="text-slate-300">Service Details</span>
                </span>
              </div>
            </div>

            <div className="relative mx-auto flex h-72 w-72 items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm md:h-96 md:w-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/20 blur-2xl" />
              <img
                src={image}
                alt="social media marketing"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* ---------------- OVERVIEW (full text) ---------------- */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <SectionHeading
            eyebrow="Overview"
            title="The Significance of Mobile App?"
          />
          <Panel>
            <p className="text-slate-300 leading-relaxed">
              {introParagraph}
            </p>
          </Panel>
        </section>

        {/* ---------------- USE OF MOBILE APP IN BUSINESS ---------------- */}
        <section className="border-y border-white/10 bg-white/[0.02] py-24">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              eyebrow="Why It Matters"
              title="Use of Mobile App in Business"
            />
            <div className="grid gap-6 md:grid-cols-2">
              {businessUse.map((b) => (
                <Panel key={b.title}>
                  <div className="mb-6 overflow-hidden rounded-2xl">
                    <img src={b.image} alt={b.title} className="w-full h-56 md:h-64 object-cover" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">
                    {b.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {b.text}
                  </p>
                </Panel>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- TYPES OF APPS ---------------- */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading title="Types of Apps" />
          <div className="grid gap-6 lg:grid-cols-3">
            {appTypes.map((b) => (
              <Panel
                key={b.title}
                className="border-cyan-400/20 bg-gradient-to-br from-white/5 via-white/5 to-blue-950/30 shadow-2xl shadow-blue-900/20"
              >
                <div className="mb-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/30">
                  <img src={b.image} alt={b.title} className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <h3 className="text-white font-bold text-2xl mb-3 tracking-tight">
                  {b.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {b.text}
                </p>
              </Panel>
            ))}
          </div>
        </section>

        {/* ---------------- PROJECTS (auto-forward slideshow, 2 per slide) ---------------- */}
        <section className="border-y border-white/10 bg-white/[0.02] py-24">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              eyebrow="Our Work"
              title="Mobile App Projects We've Built"
            />
            <ProjectsCarousel projects={projects} perSlide={2} intervalMs={4000} />
          </div>
        </section>

        {/* ---------------- CTA ---------------- */}
        <section className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Ready To Build Your App?
          </h2>
          <p className="mt-4 text-slate-400">
            Let's turn your idea into a native, hybrid, or web app your
            customers will love using.
          </p>
          <button 
          onClick={() => navigate("/enquiryNow")}
          className="mt-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-105">
            Enquiry Now
          </button>
        </section>

        {/* ---------------- FOOTER ---------------- */}
        <FooterSection />
      </div>
    </div>
  );
}
