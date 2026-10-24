import React from "react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import { ServicePageStatus } from "@/components/ServicePageStatus";
import { useNavigate } from "react-router-dom";
import {
  Search,
  TrendingUp,
  Target,
  BarChart3,
  MapPin,
  Store,
  Megaphone,
  MousePointerClick,
  Trophy,
  Wallet,
  Zap,
  ClipboardCheck,
  CheckCircle2,
  Image as ImageIcon,
  Facebook,
  Instagram,
  Linkedin,
  type LucideIcon,
} from "lucide-react";
import {
  getServicePageData,
  serviceArray,
  serviceText,
  useServicePage,
} from "@/hooks/useServicePage";

/* ---------- shared bits (kept identical to SocialMediaMarketing.tsx) ---------- */

const Eyebrow = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-400/20 border border-cyan-400/30 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-cyan-300 uppercase">
    {children}
  </span>
);

const SectionHeading = ({ eyebrow, title, sub = undefined, align = "center" }: { eyebrow?: React.ReactNode; title: React.ReactNode; sub?: React.ReactNode; align?: string }) => (
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

/* ---------- content data (verbatim from source page) ---------- */

const introParagraphs = [
  "Search Engine Marketing (SEM) involves creating paid advertising campaigns that appear in search engine results, while Search Engine Optimization (SEO) aims to achieve organic results. In SEM, advertisers pay to target specific keywords based on potential customers' search terms. For instance, when someone performs a search on Google, advertisers target these keywords so their ads appear at the top of the search results page. These paid placements help advertisers drive potential customers to their websites, ultimately generating revenue.",
  "Let's take an example: if I search for \"Google\" in the search engine, I might be looking for an overview of Google, or I might be searching for an agency related to Google. In the search results, the top ad is a result of search engine marketing. These companies are trying to attract potential clients to their websites through paid advertisements.",
  "In SEM, the positioning of your promotion on the search engine results page is determined by the amount you pay for specific keywords (more popular keywords tend to be more expensive) and your ad's \"quality score\" in relation to others.",
  "Overall, SEM is a powerful way to boost visibility and drive relevant traffic to your website by strategically targeting search terms and potential customers.",
];

const benefits = [
  {
    icon: MapPin,
    title: "Location-Based Ads",
    paragraphs: [
      "Search engine marketing offers the flexibility to target individuals based on their location. With this approach, you can create ads in different languages and choose specific locations for their display. Whether you want to target an entire country, a particular city, or even a specific area anywhere in the world, SEM allows for precise geographical targeting. This level of control enables businesses to tailor their marketing campaigns to reach the most relevant and potential customers in their desired locations.",
    ],
  },
  {
    icon: Store,
    title: "Small Business Guide",
    paragraphs: [
      "Search Engine Marketing (SEM) is a highly effective strategy for small businesses to reach their target audience, acquire new customers, boost revenues, and reduce acquisition costs. By leveraging SEM techniques, businesses can improve their online visibility and attract potential customers who are actively searching for products or services they offer. This targeted approach ensures that the marketing efforts are focused on reaching the right audience, leading to higher conversion rates and a better return on investment. Additionally, SEM allows small businesses to compete with larger companies on a level playing field in the digital space, leveling the marketing playing field.",
    ],
  },
  {
    icon: Megaphone,
    title: "Brand Awareness",
    paragraphs: [
      "As mentioned, both SEO and unpaid social media efforts demand considerable time and patience. According to Google, it may take up to a year for a high-quality website to climb the rankings. Success depends on the strategies employed and how competitors are approaching their online presence.",
    ],
  },
  {
    icon: MousePointerClick,
    title: "Pay Per Click",
    paragraphs: [
      "When you create paid search ads, they are displayed for free, and you will only be charged when someone takes action, such as clicking on your ad. This means you can benefit from free exposure and brand awareness on search engines, and you'll only incur charges when someone clicks on your ad and visits your landing page. In this way, paid search advertising provides a cost-effective approach to gaining visibility and driving relevant traffic to your website.",
    ],
  },
  {
    icon: Trophy,
    title: "Getting The Ad At The Top Of The Search Engine",
    paragraphs: [
      "Ranking at the top of Google is a powerful way to gain visibility for your brand. When users see your page listed prominently, even without clicking on it, they still associate it with the specific need or query they are looking to fulfill. This association creates brand recognition and reinforces your relevance in the eyes of potential customers. So, even if they don't click on your page immediately, being visible at the top of search results leaves a lasting impression and can influence their future decisions when seeking products or services related to your business.",
    ],
  },
  {
    icon: Wallet,
    title: "Get Away With A Limited Budget",
    paragraphs: [
      "Search engine advertising solutions offer the flexibility to adjust your budget according to your needs. You don't require a large initial investment, making it a viable option for small and medium-sized businesses. Additionally, as your brand expands and grows, the possibilities are limitless.",
      "Furthermore, with Google Ads for Search Engine Marketing, you can not only place ads within the search engine but also leverage valuable data and parameters to display targeted ads on other websites. This high level of personalization allows you to reach potential customers who have previously visited your website, shown interest in specific products, or belong to particular cities. When combined with your search engine marketing campaigns, these strategies become powerful tools to further enhance and grow your brand.",
    ],
  },
  {
    icon: Zap,
    title: "It's Simple And Fast Tool",
    paragraphs: [
      "Creating a Search Engine Marketing campaign is a quick and straightforward process. Although it might take some time to observe the full impact of the campaign, it offers high flexibility and configurability and can be set up within a few hours.",
      "You can make adjustments on an as-needed basis, allowing you to customize your website content, keywords, and budget according to your audience's behavior and preferences. This adaptability ensures that your campaign remains relevant and responsive to the ever-changing dynamics of your target market.",
    ],
  },
  {
    icon: BarChart3,
    title: "To Generate The Change",
    paragraphs: [
      "Google Ads provides a comprehensive set of tools to measure conversions, ensuring that your ads are highly effective. These tools allow you to track and analyze various metrics, such as clicks, impressions, click-through rates, and conversions. By utilizing these measurement capabilities, you can gain valuable insights into the performance of your advertisements and make data-driven decisions to optimize your campaign for better results. This data-driven approach empowers businesses to continually refine their advertising strategies and achieve greater success with their Google Ads campaigns.",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "Reasonable",
    paragraphs: [
      "Platforms like Google Ads provide detailed reports on the progress of your campaigns, allowing you to stay informed about the performance of your advertisements. Additionally, by integrating with Analytics, you can seamlessly monitor and control all aspects of your marketing efforts, ensuring a smooth and well-coordinated strategy.",
      "In today's business landscape, search engine marketing has become an essential tool for companies. Its true strength, however, lies in combining it with Search Engine Optimization (SEO). Conducting thorough keyword research forms the foundation of a successful search engine marketing strategy. By understanding the relevant and valuable keywords for your business, you can effectively target your audience, boost your online visibility, and maximize the impact of your search engine marketing endeavors. This synergy between SEO and search engine marketing is key to achieving significant success in the digital realm.",
    ],
  },
];

/* ---------- page ---------- */

export default function SearchEngineMarketing() {
  const navigate = useNavigate();
  const serviceQuery = useServicePage("search-engine-marketing");
  if (serviceQuery.isPending) {
    return <ServicePageStatus message="Loading search engine marketing content..." />;
  }
  if (serviceQuery.isError) {
    return <ServicePageStatus message={`Search engine marketing content could not be loaded: ${serviceQuery.error.message}`} />;
  }
  const pageData = getServicePageData(serviceQuery.data?.content);
  if (!pageData) {
    return <ServicePageStatus message="Search engine marketing content is not available." />;
  }
  const iconByName: Record<string, LucideIcon> = {
    MapPin, Store, Megaphone, MousePointerClick, Trophy, Wallet, Zap,
    ClipboardCheck, Target, Search, TrendingUp, BarChart3,
  };
  const introParagraphs = serviceArray<string>(pageData, "introParagraphs");
  const comparison = serviceArray<{ title: string; image: string; paragraphs: string[] }>(pageData, "comparison");
  const benefits = serviceArray<{ title: string; icon: string; paragraphs: string[] }>(pageData, "benefits").map((item) => ({
    ...item,
    icon: iconByName[item.icon] || CheckCircle2,
  }));
  return (
    <div className="min-h-screen bg-[#05060f] text-white antialiased selection:bg-blue-500/30">
      <Navbar />
      {/* background ambience */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-cyan-600/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[24rem] w-[24rem] rounded-full bg-blue-800/10 blur-[120px]" />
      </div>

      <div className="relative">
        {/* ---------------- HERO ---------------- */}
        <header className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="grid items-center gap-14 md:grid-cols-2">
            <div>
              <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
                {serviceText(pageData, "heroTitle")}{" "}
                <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  {serviceText(pageData, "heroAccent")}
                </span>
              </h1>
              <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-lg">
                {serviceText(pageData, "heroDescription")}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button 
                onClick={() => navigate("/enquiryNow")}
                className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-105">
                  {serviceText(pageData, "ctaLabel")}
                </button>
                
              </div>
            </div>

           <div className="relative mx-auto flex h-72 w-72 items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm md:h-96 md:w-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/20 blur-2xl" />
              <img
                src={serviceText(pageData, "heroImage")}
                alt={serviceText(pageData, "heroImageAlt")}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* ---------------- INTRO (full text) ---------------- */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <SectionHeading
            eyebrow={serviceText(pageData, "overviewEyebrow")}
            title={serviceText(pageData, "overviewTitle")}
          />
          <Panel>
            {introParagraphs.map((p, i) => (
              <p
                key={i}
                className={`text-slate-300 leading-relaxed ${
                  i > 0 ? "mt-5" : ""
                }`}
              >
                {p}
              </p>
            ))}
          </Panel>
        </section>

        {/* ---------------- SEM vs SEO (full text) ---------------- */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <SectionHeading
            eyebrow={serviceText(pageData, "comparisonEyebrow")}
            title={serviceText(pageData, "comparisonTitle")}
          />
          <div className="grid gap-6 md:grid-cols-2">
            {comparison.map((c) => (
              <Panel key={c.title}>
                <div className="mb-6 overflow-hidden rounded-2xl bg-slate-950/10">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="h-56 w-full object-cover"
                  />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">
                  {c.title}
                </h3>
                {c.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={`text-sm text-slate-400 leading-relaxed ${
                      i > 0 ? "mt-3" : ""
                    }`}
                  >
                    {p}
                  </p>
                ))}
              </Panel>
            ))}
          </div>
        </section>

        {/* ---------------- BENEFITS (timeline, full text) ---------------- */}
        <section className="border-y border-white/10 bg-white/[0.02] py-24">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              eyebrow={serviceText(pageData, "benefitsEyebrow")}
              title={serviceText(pageData, "benefitsTitle")}
            />

            {/* mobile: single-column rail */}
            <div className="relative md:hidden">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/60 via-blue-500/40 to-cyan-400/60" />
              <div className="space-y-8">
                {benefits.map((b, i) => (
                  <div key={b.title} className="relative pl-12">
                    <div className="absolute left-0 top-0 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-cyan-400 bg-[#05060f] shadow-[0_0_14px_rgba(34,211,238,0.5)]">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-[11px] font-bold text-cyan-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h4 className="font-semibold text-white">
                          {b.title}
                        </h4>
                      </div>
                      {b.paragraphs.map((p, j) => (
                        <p
                          key={j}
                          className={`text-sm text-slate-400 leading-relaxed ${
                            j > 0 ? "mt-3" : "mt-2"
                          }`}
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* desktop: alternating timeline */}
            <div className="relative hidden md:block">
              <div className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-400/60 via-blue-500/40 to-cyan-400/60" />
              <div className="space-y-10">
                {benefits.map((b, i) => {
                  const card = (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-cyan-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h4 className="font-bold text-white">{b.title}</h4>
                      </div>
                      {b.paragraphs.map((p, j) => (
                        <p
                          key={j}
                          className={`text-sm text-slate-400 leading-relaxed ${
                            j > 0 ? "mt-3" : "mt-3"
                          }`}
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  );
                  return (
                    <div
                      key={b.title}
                      className="grid grid-cols-[1fr_56px_1fr] items-center gap-6"
                    >
                      {i % 2 === 0 ? card : <div />}
                      <div className="relative z-10 flex justify-center">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-cyan-400 bg-[#05060f] shadow-[0_0_16px_rgba(34,211,238,0.55)]">
                          <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                        </div>
                      </div>
                      {i % 2 === 1 ? card : <div />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- CTA ---------------- */}
        <section className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            {serviceText(pageData, "ctaTitle")}
          </h2>
          <p className="mt-4 text-slate-400">
            {serviceText(pageData, "ctaDescription")}
          </p>
          <button 
          onClick={() => navigate("/enquiryNow")}
          className="mt-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-105">
            {serviceText(pageData, "ctaLabel")}
          </button>
        </section>

      </div>
      <FooterSection />
    </div>
  );
}