import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Cloud,
  Server,
  Database,
  ShieldCheck,
  CheckCircle2,
  Image as ImageIcon,
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import { ServicePageStatus } from "@/components/ServicePageStatus";
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

const Timeline = ({ items }) => (
  <>
    {/* mobile: single-column rail */}
    <div className="relative md:hidden">
      <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/60 via-blue-500/40 to-cyan-400/60" />
      <div className="space-y-8">
        {items.map((item, i) => (
          <div key={item.title} className="relative pl-12">
            <div className="absolute left-0 top-0 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-cyan-400 bg-[#05060f] shadow-[0_0_14px_rgba(34,211,238,0.5)]">
              <CheckCircle2 className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-[11px] font-bold text-cyan-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="font-semibold text-white">{item.title}</h4>
              </div>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* desktop: alternating timeline */}
    <div className="relative hidden md:block">
      <div className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-400/60 via-blue-500/40 to-cyan-400/60" />
      <div className="space-y-10">
        {items.map((item, i) => {
          const card = (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-cyan-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="font-bold text-white">{item.title}</h4>
              </div>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                {item.text}
              </p>
            </div>
          );
          return (
            <div
              key={item.title}
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
  </>
);

const FeaturePanel = ({ feature, number }) => (
  <Panel className="relative h-full overflow-hidden">
    <span className="absolute -top-6 -right-2 text-8xl font-extrabold text-white/[0.03]">
      {String(number).padStart(2, "0")}
    </span>
    <div className="relative">
      {feature.image ? (
        <img
          src={feature.image}
          alt={feature.title}
          className="mb-6 h-56 w-full rounded-xl object-cover md:h-64 lg:h-72"
        />
      ) : (
        /* Drop your own image in this placeholder */
        <div className="mb-6 flex h-56 w-full items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.02] md:h-64 lg:h-72">
          <div className="flex flex-col items-center gap-2 text-slate-600">
            <ImageIcon className="h-6 w-6" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-widest">
              Add image
            </span>
          </div>
        </div>
      )}

      <h3 className="mb-3 text-left text-xl font-bold text-white">
        {feature.title}
      </h3>
      <p className="text-left text-slate-400 leading-relaxed">
        {feature.text}
      </p>
    </div>
  </Panel>
);

const FeatureCarousel = ({ features }) => {
  const entries = features.map((feature, i) => ({ feature, number: i + 1 }));
  const slides = [];
  for (let k = 0; k < entries.length; k += 2) {
    slides.push(entries.slice(k, k + 2));
  }
  // if the last slide is left with a single item, pair it with the first
  // item so every slide shows two
  if (slides.length > 1 && slides[slides.length - 1].length === 1) {
    slides[slides.length - 1] = [
      ...slides[slides.length - 1],
      entries[0],
    ];
  }
  const total = slides.length;
  // append a clone of the first slide so the track can always advance
  // forward and snap back invisibly, instead of animating backward
  const track = [...slides, slides[0]];

  const [index, setIndex] = React.useState(0);
  const [animate, setAnimate] = React.useState(true);

  const advance = () => setIndex((i) => i + 1);
  const goTo = (i) => {
    setAnimate(true);
    setIndex(i);
  };

  React.useEffect(() => {
    const timer = setInterval(advance, 5000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    if (index === total) {
      const id = setTimeout(() => {
        setAnimate(false);
        setIndex(0);
      }, 500);
      return () => clearTimeout(id);
    }
  }, [index, total]);

  React.useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animate]);

  return (
    <div>
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
                className={`grid gap-6 px-1 ${
                  slide.length === 2
                    ? "md:grid-cols-2"
                    : "mx-auto md:max-w-xl"
                }`}
              >
                {slide.map(({ feature, number }, pi) => (
                  <FeaturePanel
                    key={`${si}-${feature.title}-${pi}`}
                    feature={feature}
                    number={number}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

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
    </div>
  );
};

/* ---------- page ---------- */

export default function CloudHosting() {
  const navigate = useNavigate();
  const serviceQuery = useServicePage("cloud-hosting");
  if (serviceQuery.isPending) {
    return <ServicePageStatus message="Loading cloud hosting content..." />;
  }
  if (serviceQuery.isError) {
    return <ServicePageStatus message={`Cloud hosting content could not be loaded: ${serviceQuery.error.message}`} />;
  }
  const pageData = getServicePageData(serviceQuery.data?.content);
  if (!pageData) {
    return <ServicePageStatus message="Cloud hosting content is not available." />;
  }
  const overviewFeatures = serviceArray<{ image: string; title: string; text: string }>(pageData, "overviewFeatures");
  const dedicatedAdvantages = serviceArray<{ title: string; text: string }>(pageData, "dedicatedAdvantages");
  const emailValueAdds = serviceArray<{ title: string; text: string }>(pageData, "emailValueAdds");
  return (
    <div className="min-h-screen bg-[#05060f] text-white antialiased selection:bg-blue-500/30">
      {/* background ambience */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-cyan-600/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[24rem] w-[24rem] rounded-full bg-blue-800/10 blur-[120px]" />
      </div>

      <Navbar />

      <div className="relative">
        {/* ---------------- HERO ---------------- */}
        <header className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="grid items-center gap-14 md:grid-cols-2">
            <div>
              <Eyebrow>{serviceText(pageData, "eyebrow")}</Eyebrow>
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

        {/* ---------------- WHAT IS CLOUD HOSTING (full text) ---------------- */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <SectionHeading eyebrow={serviceText(pageData, "overviewEyebrow")} title={serviceText(pageData, "overviewTitle")} />
          <Panel className="mb-8">
            <p className="text-slate-300 leading-relaxed">
              {serviceText(pageData, "introParagraph")}
            </p>
          </Panel>
          <FeatureCarousel features={overviewFeatures} />
        </section>

        {/* ---------------- DEDICATED SERVER (full text) ---------------- */}
        <section className="border-y border-white/10 bg-white/[0.02] py-24">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              eyebrow={serviceText(pageData, "dedicatedEyebrow")}
              title={serviceText(pageData, "dedicatedTitle")}
            />
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="text-left">
                <p className="text-slate-300 leading-relaxed">
                  {serviceText(pageData, "dedicatedDescription")}
                </p>

                <h4 className="mt-6 font-semibold text-white">
                  {serviceText(pageData, "dedicatedQuestion")}
                </h4>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  {serviceText(pageData, "dedicatedAnswer")}
                </p>
              </div>

            <div className="relative mx-auto flex h-72 w-72 items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm md:h-96 md:w-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/20 blur-2xl" />
              <img
                src={serviceText(pageData, "dedicatedImage")}
                alt={serviceText(pageData, "dedicatedImageAlt")}
                className="h-full w-full object-cover"
              />
            </div>

            </div>

            <div className="mt-16">
              <SectionHeading eyebrow={serviceText(pageData, "advantagesEyebrow")} title={serviceText(pageData, "advantagesTitle")} />
              <Timeline items={dedicatedAdvantages} />
            </div>
          </div>
        </section>

        {/* ---------------- EMAIL HOSTING SERVER (full text) ---------------- */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading
            eyebrow={serviceText(pageData, "emailEyebrow")}
            title={serviceText(pageData, "emailTitle")}
          />
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="text-left">
              <p className="text-slate-300 leading-relaxed">
                {serviceText(pageData, "emailDescription")}
              </p>
              <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                {serviceText(pageData, "emailDescriptionSecondary")}
              </p>
            </div>

            {/* Drop your own image in this placeholder */}
           <div className="relative mx-auto flex h-72 w-72 items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm md:h-96 md:w-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/20 blur-2xl" />
              <img
                src={serviceText(pageData, "emailImage")}
                alt={serviceText(pageData, "emailImageAlt")}
                className="h-full w-full object-cover"
              />
            </div>

          </div>

          <div className="mt-16">
            <SectionHeading
              eyebrow={serviceText(pageData, "valueEyebrow")}
              title={serviceText(pageData, "valueTitle")}
              sub={serviceText(pageData, "valueDescription")}
            />
            <Timeline items={emailValueAdds} />
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