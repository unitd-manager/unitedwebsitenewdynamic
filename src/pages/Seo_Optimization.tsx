import { createContext, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  Sparkles,
  Target,
  Trophy,
  Search,
  FileCheck2,
  Link2,
  LineChart,
  Wrench,
  ChevronRight,
  CheckCircle2,
  Globe,
  Users,
  Award,
  BarChart3,
  Rocket,
  Building2,
  Crown,
  ListChecks,
  FileText,
  Link as LinkIcon,
  Goal,
  Megaphone,
  ClipboardList,
  Send,
  type LucideIcon,
} from "lucide-react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import { ServicePageStatus } from "@/components/ServicePageStatus";
import {
  getServicePageData,
  serviceArray,
  serviceText,
  useServicePage,
  type ServicePageData,
} from "@/hooks/useServicePage";
import "./seo-optimization.css";

const SEOPageDataContext = createContext<ServicePageData>({});

function useSEOPageData() {
  return useContext(SEOPageDataContext);
}

/* ---------- ANIMATION HELPERS ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const viewportOnce = { once: true, margin: "-80px" };
const viewportOnceSmall = { once: true, margin: "-40px" };

function SEOPage() {
  const serviceQuery = useServicePage("seo-optimization");
  if (serviceQuery.isPending) {
    return <ServicePageStatus message="Loading SEO content..." />;
  }
  if (serviceQuery.isError) {
    return <ServicePageStatus message={`SEO content could not be loaded: ${serviceQuery.error.message}`} />;
  }
  const pageData = getServicePageData(serviceQuery.data?.content);
  if (!pageData) {
    return <ServicePageStatus message="SEO content is not available." />;
  }
  return (
    <SEOPageDataContext.Provider value={pageData}>
    <main className="seo-page min-h-screen bg-background">
      <Navbar />
      <div className="pt-24">
        <Hero />
        <Intro />
        <WhyWeNeed />
        <AlternatingSections />
        <Services />
        <Process />
        <Rankings />
        <Preliminary />
        <Engagement />
        <LongTermGoals />
        <Venues />
        <OnPageOptimization />
        <OffPageOptimization />
        <CTA />
      </div>
      <FooterSection />
    </main>
    </SEOPageDataContext.Provider>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const pageData = useSEOPageData();
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 30%, rgba(96, 165, 250, 0.25), transparent 25%), " +
          "radial-gradient(circle at 80% 15%, rgba(168, 85, 247, 0.2), transparent 20%), " +
          "radial-gradient(circle at 50% 90%, rgba(34, 197, 94, 0.12), transparent 30%), " +
          "linear-gradient(135deg, rgb(4, 7, 16) 0%, rgb(11, 20, 40) 35%, rgb(15, 25, 45) 100%)",
      }}
    >
      <div className="absolute inset-0 hero-grid-bg opacity-30" />
      <div className="absolute -top-32 -right-28 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-20 blur-3xl" />
      <div className="absolute -bottom-24 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-purple-500 to-pink-400 opacity-15 blur-3xl" />
      <div className="absolute top-1/2 right-0 h-80 w-80 rounded-full bg-gradient-to-l from-emerald-500 to-teal-400 opacity-10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pt-1 pb-4 sm:px-5 sm:pt-2 sm:pb-5 lg:pt-2 lg:pb-6">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 flex items-center gap-2 text-xs text-white/70 sm:text-sm"
        >
          {/* <a href="/" className="transition-colors duration-200 hover:text-cyan-300">
            Home
          </a>

          <ChevronRight className="h-4 w-4" />

          <a href="/services" className="transition-colors duration-200 hover:text-cyan-300">
            Services
          </a> */}
        </motion.nav>

        <div className="grid min-h-[380px] items-center gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-4xl font-black leading-tight tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              {serviceText(pageData, "heroTitle")}
              <br />
              <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                {serviceText(pageData, "heroAccent")}
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75 sm:text-xl">
              {serviceText(pageData, "heroDescription")}
            </p>

            <div className="mt-8 flex">
              <a
                href="#enquiry"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_18px_70px_-30px_rgba(56,189,248,0.9)] transition duration-200 hover:-translate-y-0.5"
              >
                {serviceText(pageData, "ctaLabel")}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex items-center justify-end"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-cyan-500/20 blur-3xl" />

              <img
                src={serviceText(pageData, "heroImage")}
                alt={serviceText(pageData, "heroImageAlt")}
                className="relative h-[340px] w-full max-w-[520px] rounded-3xl border border-white/10 object-cover shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  const pageData = useSEOPageData();
  const introParagraph = serviceArray<string>(pageData, "introParagraphs")[0] || "";
  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
          <TrendingUp className="h-3.5 w-3.5" /> {serviceText(pageData, "introEyebrow")}
        </span>
        <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          {serviceText(pageData, "introTitle")}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {introParagraph}
        </p>
      </motion.div>
    </section>
  );
}

function WhyWeNeed() {
  const items = [
    { icon: TrendingUp, title: "Increased Website Traffic" },
    { icon: Award, title: "Enhanced Brand Awareness" },
    { icon: Target, title: "Target Audience Identification" },
    { icon: Trophy, title: "Competitive Advantage" },
  ];
  return (
   <section
  className="border-y border-brand/10 py-14 sm:py-16 lg:py-20"
  style={{
    backgroundColor: "rgba(10, 19, 36, 0.55)",
  }}
>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mb-12 text-center"
        >
          <h3 className="text-3xl font-bold sm:text-4xl">Why We Need SEO?</h3>
          <p className="mt-3 text-muted-foreground">Four reasons SEO drives real business outcomes</p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceSmall}
          variants={staggerContainer}
          className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map(({ icon: Icon, title }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="group relative h-full min-h-44 overflow-hidden rounded-2xl border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <div
                className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl text-white shadow-glow transition group-hover:scale-110"
                style={{ background: "var(--gradient-brand)" }}
              >
                <Icon className="h-7 w-7" />
              </div>
              <h4 className="text-lg font-semibold">{title}</h4>
              <div className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-brand/5 transition group-hover:scale-150" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function AlternatingSections() {
  const pageData = useSEOPageData();
  const sections = [
    {
      tag: "High Traffic to Your Website",
      title: "SEO can help your business in following ways",
      paragraphs: [
        "Search engine optimization (SEO) is the most efficient means of increasing sales compared to other offline and online marketing methods. By focusing on optimizing your website for search engines, you can attract a highly targeted audience actively searching for products or services like yours.",
        "This targeted approach ensures that your marketing efforts are directed at individuals who are already interested in what you offer, significantly increasing the likelihood of converting them into customers. As a result, SEO provides a powerful and cost-effective strategy to drive sales and achieve business growth in the digital age.",
      ],
      image: serviceText(pageData, "trafficImage"),
      stat: { value: "120K+", label: "Monthly sessions tracked" },
      reverse: false,
    },
    {
      tag: "Build Your Brand Through SEO",
      title: "Google holds ~70% of the global search market",
      paragraphs: [
        "Google holds the largest market share among search engines, encompassing approximately 70% of the search market, surpassing competitors like Yahoo, Bing, and Baidu.",
        "Google's algorithm plays a pivotal role in search engine optimization (SEO) by continually evolving and updating. These algorithm changes regulate the optimization process and establish standard practices.",
        "To effectively optimize a website and drive legitimate traffic, it requires the expertise of an SEO specialist who understands Google's algorithm intricacies. A skilled professional can navigate the algorithm's complexities, ensuring that the website adheres to best practices and earns higher rankings in search results, ultimately attracting more relevant traffic.",
      ],
      image: serviceText(pageData, "brandImage"),
      stat: { value: "70%", label: "Google market share" },
      reverse: true,
    },
    {
      tag: "Find Your Target Audience",
      title: "Building a brand begins with understanding your audience",
      paragraphs: [
        "Building a successful brand begins with a deep understanding of your target audience's expectations for your website. By identifying your audience's needs, you can create content that comprehensively addresses their questions and provides valuable information.",
        "Crafting high-quality and informative content positions your site as a reputable source, prompting search engines to rank it higher when users seek relevant information. To further enhance your brand's online presence, ensure your content is written in a way that encourages other sites to link back to it. Earning backlinks from reputable sources enhances your site's authority and visibility in search engine results.",
        "Keeping these principles in mind allows you to select relevant keywords and craft content that not only resonates with your audience but also elevates your brand's presence in search engines. By consistently delivering valuable content, you establish your brand as a credible and trusted resource, building a strong online reputation over time.",
      ],
      image: serviceText(pageData, "audienceImage"),
      stat: { value: "64%", label: "Use search to find products" },
      reverse: false,
    },
    {
      tag: "Being Ahead of Your Competitor",
      title: "Optimizing your website with the right keyword",
      paragraphs: [
        "Having the right keywords and content on your website is crucial for reaching your target audience effectively. Studies show that 64% of consumers use search engines to find products or services they need. This presents a significant opportunity for businesses to optimize their websites and connect with their target audience.",
        "By offering a quality business with competitive pricing, you can turn the leads generated from your website into valuable prospects. Providing a positive user experience, along with attractive pricing, enhances the chances of converting website visitors into satisfied customers.",
        "Optimizing your website with quality content and relevant keywords not only boosts your page ranking in search engines but also gives you a competitive edge, resulting in increased inquiries. According to a survey, websites that appear on the first page of search engine results receive an average of 24% of clicks, while those on the second page receive only 13%. By securing a higher ranking, you position your site to receive more clicks and engagement, surpassing your competitors.",
        "Achieving a prominent position in search engine results ensures that your website is more visible to potential customers, leading to a higher volume of inquiries. This advantage over your competitors allows you to attract more prospects and increase your chances of converting them into loyal customers.",
      ],
      image: serviceText(pageData, "optimizationImage"),
      stat: { value: "24%", label: "Of clicks go to page #1" },
      reverse: true,
    },
  ];

  const decorIcons = [TrendingUp, Target, Users, Award, Sparkles, Trophy];

  return (
    <div className="relative">
      {sections.map((s, idx) => {
        const isAlt = idx % 2 === 1;
        const bg =
          isAlt
            ? "border-y border-cyan-400/20 bg-gradient-to-br from-slate-950/80 via-cyan-950/40 to-blue-950/50"
            : "bg-gradient-to-br from-slate-900/60 via-indigo-900/30 to-slate-950/70";
        const pad = "py-14 sm:py-16 lg:py-20";
        const DecorIcon = decorIcons[idx % decorIcons.length];
        const panelTheme = {
          imageCard: isAlt
            ? "flex-1 overflow-hidden rounded-3xl border-2 border-cyan-400/30 bg-gradient-to-br from-cyan-900/40 to-blue-900/30 shadow-[0_20px_60px_-20px_rgba(56,189,248,0.4)]"
            : "flex-1 overflow-hidden rounded-2xl border-2 border-yellow-400/30 bg-gradient-to-br from-yellow-900/25 to-orange-900/25 shadow-elegant",
          imageOverlay: isAlt ? "linear-gradient(135deg, rgba(56, 189, 248, 0.4), rgba(59, 130, 246, 0.3))" : "linear-gradient(135deg, rgba(250, 204, 21, 0.35), rgba(249, 115, 22, 0.25))",
          textCard: isAlt
            ? "relative flex flex-1 min-h-[360px] flex-col justify-between overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 p-8 text-white shadow-elegant lg:min-h-[460px]"
            : "relative flex flex-1 min-h-[360px] flex-col justify-between overflow-hidden rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-slate-950/95 via-yellow-950/20 to-slate-950 p-8 text-white shadow-elegant lg:min-h-[460px]",
          textBg: isAlt
            ? "linear-gradient(135deg, rgba(15, 23, 44, 0.95), rgba(30, 58, 138, 0.85))"
            : "linear-gradient(135deg, rgba(30, 25, 15, 0.95), rgba(60, 45, 15, 0.80))",
          accentBlob: isAlt ? "bg-cyan-400/25" : "bg-yellow-400/25",
        };
        return (
          <section key={s.tag} className={`${bg} ${pad}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div
                className={`grid gap-9 lg:grid-cols-12 lg:items-stretch lg:gap-14 ${
                  s.reverse
                    ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
                    : ""
                }`}
              >
                {s.image ? (
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    variants={s.reverse ? fadeRight : fadeLeft}
                    transition={{ duration: 0.6 }}
                    className="relative flex flex-col lg:col-span-5"
                  >
                    <div
                      className="absolute inset-0 -z-10 translate-x-6 translate-y-6 rounded-3xl opacity-25 blur-2xl"
                      style={{ background: panelTheme.imageOverlay }}
                    />
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      transition={{ type: "spring", stiffness: 220, damping: 18 }}
                      className={panelTheme.imageCard}
                    >
                      <img
                        src={s.image}
                        alt={s.tag}
                        loading="lazy"
                        className="block h-full min-h-[320px] w-full object-cover lg:min-h-[460px]"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={viewportOnceSmall}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="mt-4 inline-flex items-center gap-3 self-start rounded-xl border bg-card/95 px-4 py-3 shadow-card backdrop-blur-md"
                    >
                      <div className="text-2xl font-bold text-brand">{s.stat.value}</div>
                      <div className="text-xs text-muted-foreground">{s.stat.label}</div>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    variants={s.reverse ? fadeRight : fadeLeft}
                    transition={{ duration: 0.6 }}
                    className="relative flex flex-col lg:col-span-5"
                  >
                    <div
                      className="absolute inset-0 -z-10 translate-x-6 translate-y-6 rounded-3xl opacity-30 blur-2xl"
                      style={{ background: "var(--gradient-brand)" }}
                    />
                    <motion.div
                      whileHover={{ scale: 1.01, y: -4 }}
                      transition={{ type: "spring", stiffness: 220, damping: 18 }}
                      className={panelTheme.textCard}
                      style={{ background: panelTheme.textBg }}
                    >
                      <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/15 blur-2xl" />
                      <div className={`absolute -left-8 -bottom-8 h-40 w-40 rounded-full ${panelTheme.accentBlob} blur-2xl`} />

                      <div className="relative">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md ring-1 ring-white/30">
                          <DecorIcon className="h-7 w-7" />
                        </div>
                        <p className="mt-6 text-xl font-semibold leading-snug sm:text-2xl">
                          “{s.title}.”
                        </p>
                        <p className="mt-3 text-sm text-white/80">{s.tag}</p>
                      </div>

                      <div className="relative mt-8 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur">
                          <div className="text-3xl font-bold">{s.stat.value}</div>
                          <div className="mt-1 text-xs text-white/80">{s.stat.label}</div>
                        </div>
                        <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur">
                          <div className="flex items-center gap-2 text-sm font-semibold">
                            <CheckCircle2 className="h-4 w-4" /> Proven
                          </div>
                          <div className="mt-1 text-xs text-white/80">Strategy that ranks</div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  variants={s.reverse ? fadeLeft : fadeRight}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col justify-start pt-4 lg:col-span-7"
                >
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
                    {s.tag}
                  </span>
                  <h3 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">{s.title}</h3>
                  <div className="mt-5 space-y-4 text-muted-foreground">
                    {s.paragraphs.map((p, i) => (
                      <p key={i} className="leading-relaxed">{p}</p>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

function Services() {
  const services = [
    { icon: Search, title: "Keyword Research", desc: "Discover high-intent search terms your customers actually use." },
    { icon: FileCheck2, title: "On-page SEO", desc: "Optimise titles, meta, headings and content for relevance." },
    { icon: Wrench, title: "Technical SEO", desc: "Site speed, crawlability, schema and Core Web Vitals." },
    { icon: Link2, title: "Link Building", desc: "Earn authoritative backlinks that boost domain authority." },
    { icon: LineChart, title: "Analytics & Reporting", desc: "Transparent dashboards showing real ranking growth." },
    { icon: Globe, title: "Local & Global SEO", desc: "Rank in your city or across international search markets." },
  ];

  return (
    <section id="services" className="relative overflow-hidden py-14 sm:py-16 lg:py-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/40 to-background" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg- px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
            What We Offer
          </span>
          <h3 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">Complete SEO Services</h3>
          <p className="mt-4 text-muted-foreground">End-to-end SEO solutions designed to dominate search results.</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceSmall}
          variants={staggerContainer}
          className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={scaleIn}
              transition={{ duration: 0.5 }}
              className="group relative flex h-full min-h-60 flex-col overflow-hidden rounded-2xl glass-card p-6 transition hover:-translate-y-2 hover:shadow-elegant"
            >
              <div
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-10 blur-2xl transition group-hover:opacity-30"
                style={{ background: "var(--gradient-brand)" }}
              />
              <div
                className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-glow"
                style={{ background: "var(--gradient-brand)" }}
              >
                <Icon className="h-7 w-7" />
              </div>
              <h4 className="text-xl font-semibold">{title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              <div className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-brand opacity-70 transition group-hover:opacity-100">
                Learn more <ArrowRight className="h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "01", icon: Search, title: "Research", desc: "Audit, competitor analysis and keyword discovery." },
    { n: "02", icon: Target, title: "Strategy", desc: "Tailored roadmap aligned with your business goals." },
    { n: "03", icon: Wrench, title: "Optimization", desc: "On-page, technical and content execution." },
    { n: "04", icon: Rocket, title: "Growth", desc: "Continuous tracking, refinement and scaling." },
  ];

  return (
    <section className="relative overflow-hidden py-14 text-white sm:py-16 lg:py-20" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 hero-grid-bg opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
            Our Process
          </span>
          <h3 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">A proven 4-step workflow</h3>
          <p className="mt-4 text-white/70">From research to measurable growth — every step engineered for results.</p>
        </motion.div>

        <div className="relative grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-14 hidden h-px bg-gradient-to-r from-transparent via-white/30 to-transparent lg:block" />
          {steps.map(({ n, icon: Icon, title, desc }, i) => (
            <motion.div
              key={n}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnceSmall}
              variants={scaleIn}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative flex min-h-64 flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
            >
              <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition hover:scale-105">
                <Icon className="h-10 w-10" />
                <span className="absolute -right-2 -top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold text-primary shadow-elegant">
                  {n}
                </span>
              </div>
              <div className="mt-6 text-center">
                <h4 className="text-xl font-semibold">{title}</h4>
                <p className="mt-2 text-sm text-white/70">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Rankings() {
  const pageData = useSEOPageData();
  const rows = [
    { site: "www.prforbes.com", keyword: "gay trainers", country: "United States · google.com", rank: 2 },
    { site: "www.prforbes.com", keyword: "gay fitness trainers", country: "United States · google.com", rank: 2 },
    { site: "www.coba-grills.hk", keyword: "lotus grill hong kong", country: "Hong Kong · google.com.hk", rank: 1 },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
        className="mx-auto mb-12 max-w-2xl text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
          <Crown className="h-3.5 w-3.5" /> Proven Results
        </span>
        <h3 className="mt-4 text-3xl font-bold sm:text-4xl">Few of our keywords ranking positions in first page</h3>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto mb-10 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {serviceArray<{ src: string; alt: string }>(pageData, "rankings").map((img, i) => (
          <motion.div
            key={i}
            variants={scaleIn}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl border bg-white shadow-elegant"
          >
            <div
              className="pointer-events-none absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-3xl opacity-30 blur-2xl transition group-hover:opacity-60"
              style={{ background: "var(--gradient-brand)" }}
            />
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="block h-auto w-full object-contain transition duration-500 group-hover:scale-[1.03]"
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mx-auto max-w-4xl overflow-hidden rounded-2xl border bg-card shadow-elegant"
      >
        <div className="hidden grid-cols-12 gap-4 border-b bg-secondary/60 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground md:grid">
          <div className="col-span-5 flex items-center gap-2"><Building2 className="h-4 w-4" /> Website</div>
          <div className="col-span-3 flex items-center gap-2"><Search className="h-4 w-4" /> Keyword</div>
          <div className="col-span-3 flex items-center gap-2"><Globe className="h-4 w-4" /> Country</div>
          <div className="col-span-1 text-right">Rank</div>
        </div>
        {rows.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnceSmall}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex flex-col gap-2 border-b border-border/50 p-5 transition hover:bg-secondary/40 last:border-b-0 md:grid md:grid-cols-12 md:items-center md:gap-4 md:px-6 md:py-5"
          >
            <div className="break-all font-semibold text-foreground md:col-span-5">{r.site}</div>
            <div className="text-muted-foreground md:col-span-3"><span className="md:hidden text-xs uppercase tracking-wider text-muted-foreground/70 mr-2">Keyword:</span>{r.keyword}</div>
            <div className="text-sm text-muted-foreground md:col-span-3"><span className="md:hidden text-xs uppercase tracking-wider text-muted-foreground/70 mr-2">Country:</span>{r.country}</div>
            <div className="md:col-span-1 md:text-right">
              <span className="inline-flex items-center gap-1 rounded-full bg-brand/15 px-3 py-1 text-sm font-bold text-brand-soft ring-1 ring-brand/30">
                <CheckCircle2 className="h-3.5 w-3.5" /> #{r.rank}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function BulletCard({ icon: Icon, title, items }: { icon: LucideIcon; title: string; items: string[] }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border bg-card p-5 shadow-card transition hover:-translate-y-1 hover:shadow-elegant sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-glow" style={{ background: "var(--gradient-brand)" }}>
          <Icon className="h-5 w-5" />
        </div>
        <h4 className="text-lg font-semibold">{title}</h4>
      </div>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-brand-soft" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Preliminary() {
  const items = [
    {
      title: "Site Assessment and Evaluation",
      description: "Conduct a comprehensive evaluation of your website to identify strengths, weaknesses, and areas for improvement.",
    },
    {
      title: "Custom Site Audit",
      description: "Perform a tailored and detailed analysis of your website's performance, structure, and user experience to pinpoint specific areas that require attention.",
    },
    {
      title: "Analytics Assessment & Key Performance Indicators",
      description: "Analyze website data and metrics to assess its performance and identify key performance indicators (KPIs) crucial for monitoring success.",
    },
    {
      title: "Strategic Analysis",
      description: "Develop a strategic plan based on the assessment and audit findings, outlining the necessary steps to optimize the website effectively.",
    },
    {
      title: "Key Phrase Research",
      description: "Conduct research to identify relevant and high-impact keywords that align with your business and target audience.",
    },
    {
      title: "Competitor Research",
      description: "Analyze competitors' websites and SEO strategies to gain insights into their strengths and weaknesses, enabling you to refine your own approach.",
    },
    {
      title: "Complete Site Audit",
      description: "Perform an all-encompassing audit of your website, covering various aspects such as content, design, technical elements, and user experience to ensure a comprehensive optimization process.",
    },
  ];

  return (
   <section
  className="border-y border-brand/10 py-14 sm:py-16 lg:py-20"
  style={{
    backgroundColor: "rgba(10, 19, 36, 0.55)",
  }}
>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
            <ClipboardList className="h-4 w-4" />
            Preliminary Work
          </span>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Website & Search Engine Friendliness Assessment
          </h2>

          <p className="mt-4 text-muted-foreground">
            Our SEO process begins with a complete website assessment,
            uncovering opportunities, identifying challenges, and creating a
            roadmap for long-term search engine success.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-7xl">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />

          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`relative mb-4 flex w-full ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
            >
              <div className="absolute left-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border-4 border-background bg-brand text-white md:left-1/2 md:-translate-x-1/2">
                <CheckCircle2 className="h-4 w-4" />
              </div>

              <div
                className={`ml-12 w-full rounded-xl border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:ml-0 md:w-[40%] ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}
              >
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="text-base font-semibold leading-tight">{item.title}</h3>
                </div>

                <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Engagement() {
  const cards = [
    {
      icon: FileText,
      title: "Meta Tag & Content Optimization",
      items: [
        "Collaborate with existing site pages to optimize Meta tags",
        "Recommend organic content improvements on internal pages",
        "Phrase-research driven content suggestions",
        "Delivered as .txt files ready to paste into pages",
        "Boost search visibility and organic traffic",
      ],
    },
    {
      icon: ListChecks,
      title: "Site Map Creation",
      items: [
        "Create or optimize text and XML sitemaps",
        "Roadmap for search engine spiders",
        "Smooth crawl path avoiding navigation obstacles",
        "Better indexing of all pages",
        "Improved visibility and search rankings",
      ],
    },
    {
      icon: LinkIcon,
      title: "Optimize Links",
      items: [
        "Implement keyword-rich internal text links",
        "Enhance keyword saturation rates",
        "Improve search engine placement",
        "Elevate navigation and usability",
        "Better content context for crawlers",
      ],
    },
    {
      icon: Send,
      title: "Link Directory Placement",
      items: [
        "Acquire placements from related directories",
        "Master document tracks acquired and pending links",
        "Meticulous monitoring of link-building progress",
        "High-quality backlinks from relevant sources",
        "Boost authority, visibility and rankings",
      ],
    },
  ];

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
            <Wrench className="h-3.5 w-3.5" />
            Engagement in Optimization
          </span>

          <h3 className="mt-4 text-3xl font-bold sm:text-4xl">
            Where the Real Optimization Work Happens
          </h3>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceSmall}
          variants={staggerContainer}
          className="grid gap-5 md:grid-cols-2"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              className="h-full"
            >
              <div className="group h-full rounded-2xl border bg-card p-5 shadow-sm transition-all duration-500 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10">
                <div className="mb-4 inline-flex rounded-xl bg-brand/10 p-3 text-brand transition-all duration-500 group-hover:bg-brand group-hover:text-white">
                  <card.icon className="h-5 w-5" />
                </div>

                <h4 className="mb-4 text-lg font-semibold">{card.title}</h4>

                <ul className="space-y-2">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function LongTermGoals() {
  const goals = [
    { icon: TrendingUp, title: "Generate High-Volume Quality Traffic", desc: "Attract substantial, targeted audiences actively searching for your products or services." },
    { icon: Award, title: "Internet Branding & Saturation", desc: "Establish a strong online presence and enhance recognition across every relevant platform." },
    { icon: Trophy, title: "Rank for Competitive Search Terms", desc: "Secure top positions on SERPs for the keywords that matter most to your business." },
  ];
  return (
    <section className="relative overflow-hidden py-14 text-white sm:py-16 lg:py-20" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 hero-grid-bg opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
            <Goal className="h-3.5 w-3.5" /> Long-Term Project Goals
          </span>
          <h3 className="mt-4 text-3xl font-bold sm:text-4xl">Built for sustained, compounding growth</h3>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceSmall}
          variants={staggerContainer}
          className="grid auto-rows-fr gap-4 sm:grid-cols-3"
        >
          {goals.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={scaleIn}
              className="h-full min-h-64 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/10"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <Icon className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-semibold">{title}</h4>
              <p className="mt-2 text-sm text-white/75">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Venues() {
  const venues = [
    { icon: Megaphone, label: "News & Press Release Sites" },
    { icon: Building2, label: "Local Directories & Searches" },
    { icon: Award, label: "Industry Authority Sites" },
    { icon: Users, label: "Blogs & Social Media Networks" },
  ];
  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <h3 className="text-3xl font-bold sm:text-4xl">Where clients discover you online</h3>
          <p className="mt-3 text-muted-foreground">
            After achieving immediate and long-term goals, potential clients will find you across multiple venues.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceSmall}
          variants={staggerContainer}
          className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {venues.map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="group flex h-full min-h-48 flex-col items-center justify-center rounded-2xl border bg-card p-6 text-center shadow-card transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-glow transition group-hover:scale-110" style={{ background: "var(--gradient-brand)" }}>
                <Icon className="h-6 w-6" />
              </div>
              <p className="font-semibold">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function OnPageOptimization() {
  const onPageFeatures = [
    "Keyword Research & Competition Checking",
    "Writing Title Tag (Up to 66 Characters)",
    "Recommended Description (Up to 156 Characters)",
    "Adding Meta Keywords",
    "Checking H1 Tag",
    "Creating XML Sitemap",
    "Setting up Robots.txt",
    "Image Optimization (ALT-Tag for Images)",
    "Content Optimization",
    "Checking Broken Links & 404 Error Pages",
    "Creating Google Verification Code",
    "Mobile-Friendly Usability Check",
  ];

  return (
    <section 
      className="w-full py-16 lg:py-24 border-b border-white/5"
      style={{
        backgroundImage: "linear-gradient(135deg, rgb(4, 7, 16) 0%, rgb(9, 17, 34) 50%, rgb(5, 10, 22) 100%)"
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-3xl border border-cyan-500/10 bg-slate-950/40 p-6 sm:p-10 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none animate-pulse" />
          
          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400 border border-cyan-400/20">
                  Technical On-Site Strategy
                </span>
                <h3 className="mt-2 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  On-Page Optimization REPORT
                </h3>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
                <FileCheck2 className="h-7 w-7" />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {onPageFeatures.map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.03, duration: 0.3 }}
                  whileHover={{ y: -3, borderColor: "rgba(34, 211, 238, 0.3)", backgroundColor: "rgba(255, 255, 255, 0.04)" }}
                  className="flex-grow shrink-0 basis-full sm:basis-[48%] lg:basis-[31%] p-5 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md transition-all duration-300 flex items-center gap-4"
                >
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-xs font-mono font-black text-cyan-400 shadow-glow">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </div>
                  <span className="text-sm font-semibold text-slate-300 tracking-wide leading-snug">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OffPageOptimization() {
  const offPageFeatures = [
    "Search Engine Submissions",
    "Regional Search Engine Submissions",
    "Social Bookmarking Submissions",
    "Directory Submissions",
    "Deep Link Submissions",
    "Link Wheel",
    "Image Sharing",
    "Classified Submission",
    "Blog Comments",
    "Forum Posting",
    "Guest Blog Posting",
    "Business Listing & Local Citations",
  ];

  return (
    <section 
      className="w-full py-16 lg:py-24 border-b border-white/5"
      style={{
        backgroundImage: "linear-gradient(135deg, rgb(5, 10, 22) 0%, rgb(11, 20, 40) 50%, rgb(4, 7, 16) 100%)"
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-3xl border border-violet-500/10 bg-slate-950/40 p-6 sm:p-10 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000_70%,transparent_100%)]" />
          <div className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-violet-500/5 blur-3xl pointer-events-none animate-pulse" />
          
          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-violet-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-400 border border-violet-400/20">
                  External Authority Outreach
                </span>
                <h3 className="mt-2 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  Off-page Optimization
                </h3>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-lg shadow-violet-600/30">
                <Link2 className="h-7 w-7" />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {offPageFeatures.map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.03, duration: 0.3 }}
                  whileHover={{ y: -3, borderColor: "rgba(139, 92, 246, 0.3)", backgroundColor: "rgba(255, 255, 255, 0.04)" }}
                  className="flex-grow shrink-0 basis-full sm:basis-[48%] lg:basis-[31%] p-5 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md transition-all duration-300 flex items-center gap-4"
                >
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-400/20 text-xs font-mono font-black text-violet-400 shadow-glow">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </div>
                  <span className="text-sm font-semibold text-slate-300 tracking-wide leading-snug">{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-10 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-white/5 p-6 text-slate-400 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 h-[2px] w-16 bg-gradient-to-r from-violet-500 to-cyan-400" />
              <p className="text-sm sm:text-base leading-relaxed">
                Upon project completion, our website will achieve higher accessibility on the internet through top rankings for specific keywords across various search engines. If you are in need of a website developer in Singapore, simply perform a Google search for <strong className="text-cyan-400 font-semibold">"SEO Singapore,"</strong> and you will undoubtedly find our services readily available to assist you.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const navigate = useNavigate();
  const pageData = useSEOPageData();

  return (
    <section id="enquiry" className="px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-5xl overflow-hidden rounded-2xl px-5 py-12 text-center text-white shadow-elegant sm:px-8 sm:py-14 lg:px-12 lg:py-16"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
          <BarChart3 className="h-7 w-7" />
        </div>
        <h3 className="mt-6 text-3xl font-bold sm:text-4xl lg:text-5xl">{serviceText(pageData, "ctaTitle")}</h3>
        <p className="mx-auto mt-4 max-w-2xl text-white/80">
          {serviceText(pageData, "ctaDescription")}
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <button
            onClick={() => navigate("/enquiryNow")}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/10"
          >
            {serviceText(pageData, "ctaLabel")} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/10"
          >
            <Users className="h-4 w-4" /> {serviceText(pageData, "ctaSecondaryLabel")}
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default SEOPage;
