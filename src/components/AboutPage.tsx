import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCmsItem } from "@/hooks/useCmsContent";
import {
  Users,
  Rocket,
  BriefcaseBusiness,
  Smartphone,
  Globe,
  Cloud,
  ShoppingCart,
} from "lucide-react"; 

type AboutListItem = {
  title: string;
  description: string;
};

type AboutContent = {
  heroEyebrow: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroTitleSuffix: string;
  heroDescription: string;
  heroImage: string;
  heroImageAlt: string;
  howWeWorkLabel: string;
  howWeWorkHref: string;
  exploreProductsLabel: string;
  exploreProductsHref: string;
  stats: Array<{ value: string; label: string }>;
  companyEyebrow: string;
  companyHeadingPrefix: string;
  companyHeadingMiddle: string;
  companyHeadingHighlight: string;
  companyDescription: string;
  timeline: Array<AboutListItem & { icon: string }>;
  principlesEyebrow: string;
  principlesHeadingPrefix: string;
  principlesHeadingHighlight: string;
  principles: AboutListItem[];
  productsEyebrow: string;
  productsHeadingPrefix: string;
  productsHeadingHighlight: string;
  productsDescription: string;
  products: Array<AboutListItem & { tag: string; icon: string }>;
  servicesEyebrow: string;
  servicesHeadingPrefix: string;
  servicesHeadingHighlight: string;
  servicesDescription: string;
  servicesImage: string;
  servicesImageAlt: string;
  services: AboutListItem[];
  ctaEyebrow: string;
  ctaHeadingPrefix: string;
  ctaHeadingHighlight: string;
  ctaDescription: string;
  ctaButtonLabel: string;
  ctaButtonHref: string;
};

export default function AboutPage() {
  const { data, isPending, isError, error } = useCmsItem("page", "about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isPending) {
    return <main className="flex min-h-screen items-center justify-center bg-[#020817] text-white" role="status">Loading About page...</main>;
  }
  if (isError) {
    return <main className="flex min-h-screen items-center justify-center bg-[#020817] px-6 text-center text-white" role="alert">Unable to load About page content: {error.message}</main>;
  }
  if (!data) {
    return <main className="flex min-h-screen items-center justify-center bg-[#020817] text-white" role="alert">About page content is not published.</main>;
  }

  const content = data.content as AboutContent;
  const stats = content.stats;
  const principles = content.principles;
  const services = content.services;
  const products = content.products;
  const timeline = content.timeline;
  const statIcons = [<Users size={20} />, <Rocket size={20} />, <BriefcaseBusiness size={20} />, <Globe size={20} />];
  const principleIcons = [<Users size={22} />, <Rocket size={22} />, <BriefcaseBusiness size={22} />, <Globe size={22} />];
  const serviceIcons = [<Smartphone size={22} />, <ShoppingCart size={22} />, <Globe size={22} />, <Cloud size={22} />];

  const heroGradient = {
    background: "linear-gradient(90deg, #1a8afe 0%, #054eb7 25%, #0a2d7a 50%, #001862 100%)",
  };

  return (
    <>
    <div className={scrolled ?"[&_nav]:!bg-[#00A8FF] [&_nav]:!shadow-lg" : "[&_nav]:!bg-transparent"}>
  
      <Navbar />
      </div>
      <main className="text-white overflow-x-hidden bg-[#020817]">

        {/* ── Marquee keyframe + Navbar bg override ────────────── */}
        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          .group:hover .animate-marquee {
            animation-play-state: paused;
          }
          .animate-marquee-mobile {
            animation: marquee 22s linear infinite;
          }
          .mobile-marquee-wrap:active .animate-marquee-mobile {
            animation-play-state: paused;
          }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        {/* ══════════════════════════════════════════════════════
            HERO — MOBILE
        ══════════════════════════════════════════════════════ */}
        <section className="lg:hidden" style={heroGradient}>

          {/* Screen 1 */}
          <div className="min-h-screen flex flex-col justify-center px-5 pt-28 pb-6">
            <div className="inline-flex border border-cyan-500/30 rounded-full px-4 py-1.5 text-[10px] tracking-[3px] text-cyan-400 w-fit">
              {content.heroEyebrow}
            </div>
            <h1 className="mt-4 text-[2rem] font-bold leading-[1.15]">
              {content.heroTitlePrefix}
              <br />
              <span className="text-cyan-400">{content.heroTitleHighlight}</span>
              <br />
              {content.heroTitleSuffix}
            </h1>
            <p className="mt-3 whitespace-pre-line text-white/60 leading-6 text-sm">
              {content.heroDescription}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={content.howWeWorkHref}
                className="rounded-full bg-cyan-500 text-black font-semibold px-5 py-2.5 transition inline-flex text-sm"
              >
                {content.howWeWorkLabel}
              </a>
              <a
                href={content.exploreProductsHref}
                className="rounded-full border border-white/20 px-5 py-2.5 hover:border-cyan-400 transition inline-flex text-sm"
              >
                {content.exploreProductsLabel}
              </a>
            </div>

            {/* Stat cards — horizontal scroll row like screenshot */}
            <div className="flex flex-col gap-2 mt-5">
              {stats.map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/15"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white flex-shrink-0">
                    {statIcons[index]}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white leading-tight">{item.value}</h2>
                    <p className="text-white/60 text-[10px] uppercase tracking-wide leading-tight">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Screen 2 — image */}
          <div className="min-h-screen flex items-center px-5 py-8">
            <div
              className="group relative overflow-hidden rounded-[24px] w-full border-2 border-transparent hover:border-cyan-400 transition-all duration-500"
              style={{ height: "calc(100vh - 96px)" }}
            >
              <img
                src={content.heroImage}
                alt={content.heroImageAlt}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-all duration-700" />
              <div className="absolute inset-0 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.25)] transition-all duration-700 rounded-[24px]" />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            HERO — DESKTOP
        ══════════════════════════════════════════════════════ */}
        <section className="hidden lg:block min-h-screen" style={heroGradient}>
          <div className="max-w-7xl mx-auto px-8 pt-24 pb-8">
            <div className="grid grid-cols-2 gap-8" style={{ minHeight: "calc(100vh - 96px)" }}>

              {/* LEFT */}
              <div className="flex flex-col justify-center">
                <div className="inline-flex border border-cyan-500/30 rounded-full px-5 py-2 text-xs tracking-[3px] text-cyan-400 w-fit">
                  {content.heroEyebrow}
                </div>
                <h1 className="mt-5 text-5xl xl:text-[3.5rem] font-bold leading-[1.1]">
                  {content.heroTitlePrefix}
                  <br />
                  <span className="text-cyan-400">{content.heroTitleHighlight}</span>
                  <br />
                  {content.heroTitleSuffix}
                </h1>
                <p className="mt-4 whitespace-pre-line text-white/60 leading-7 max-w-lg text-sm xl:text-base">
                  {content.heroDescription}
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href={content.howWeWorkHref}
                    className="rounded-full bg-cyan-500 text-black font-bold px-10 py-5 text-lg hover:scale-105 transition inline-flex"
                  >
                    {content.howWeWorkLabel}
                  </a>
                  <a
                    href={content.exploreProductsHref}
                    className="rounded-full border-2 border-white/30 px-10 py-5 text-lg hover:border-cyan-400 hover:text-cyan-400 transition inline-flex"
                  >
                    {content.exploreProductsLabel}
                  </a>
                </div>

                {/* Stat cards — horizontal row like screenshot */}
                <div className="flex  gap-2 mt-10">
                  {stats.map((item, index) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 rounded-2xl px-3 py-3 bg-white/10 backdrop-blur-sm border border-white/15 hover:bg-white/15 hover:border-white/30 transition-all duration-300 flex-1 min-w-[140px]"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white flex-shrink-0">
                        {statIcons[index]}
                      </div>
                      <div>
                        <h2 className="text-xl xl:text-2xl font-bold text-white leading-tight">{item.value}</h2>
                        <p className="text-white/60 uppercase text-[9px] mt-0.5 tracking-wide leading-tight">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — image */}
              <div
                className="group relative overflow-hidden rounded-[32px] cursor-pointer border-2 border-transparent hover:border-cyan-400 transition-all duration-500"
                style={{ height: "calc(100vh - 96px)" }}
              >
                <img
                  src={content.heroImage}
                  alt={content.heroImageAlt}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-all duration-700" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#08124d]/80 to-transparent" />
                <div className="absolute inset-0 group-hover:shadow-[0_0_60px_rgba(34,211,238,0.2)] transition-all duration-700 rounded-[32px]" />
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            HOW WE WORK
        ══════════════════════════════════════════════════════ */}
        <section id="how-we-work" className="py-16 lg:py-20 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-cyan-400 text-xs tracking-[4px] uppercase">{content.companyEyebrow}</p>
            <h2 className="mt-6 text-4xl lg:text-6xl font-bold leading-tight">
              {content.companyHeadingPrefix}
              <br />
              {content.companyHeadingMiddle}
              <span className="text-cyan-400"> {content.companyHeadingHighlight}</span>
            </h2>
            <p className="mt-8 text-gray-400 max-w-3xl mx-auto">
              {content.companyDescription}
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            PROCESS TIMELINE
        ══════════════════════════════════════════════════════ */}
        <section className="pb-24">
          <div className="max-w-6xl mx-auto px-6 relative">
            <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-white/10" />
            <div className="space-y-10 md:space-y-20">
              {timeline.map((item, index) => (
                <div
                  key={item.title}
                  className="grid md:grid-cols-2 gap-10 md:gap-16 items-center relative"
                >
                  {index % 2 === 1 && <div className="hidden md:block" />}
                  <div className={`flex items-start gap-5 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="md:hidden w-12 h-12 rounded-full border border-cyan-500/30 bg-[#020817] flex items-center justify-center flex-shrink-0 shadow-[0_0_25px_rgba(34,211,238,0.15)]">
                      <span className="text-cyan-400 text-lg">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-3xl font-bold md:mb-5">{item.title}</h3>
                      <p className="mt-3 md:mt-0 text-gray-400 text-sm md:text-lg leading-7 md:leading-9">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-cyan-500/30 bg-[#020817] items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                    <span className="text-cyan-400 text-xl">{item.icon}</span>
                  </div>
                  {index % 2 === 0 && <div className="hidden md:block" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            PRINCIPLES
        ══════════════════════════════════════════════════════ */}
        <section className="py-24">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center">
              <p className="text-cyan-400 text-xs uppercase tracking-[4px]">{content.principlesEyebrow}</p>
              <h2 className="text-5xl font-bold mt-6">
                {content.principlesHeadingPrefix}
                <span className="text-cyan-400"> {content.principlesHeadingHighlight}</span>
              </h2>
            </div>
            <div className="grid lg:grid-cols-[repeat(4,minmax(0,1fr))] gap-6 mt-20">
              {principles.map((item, index) => (
                <div
                  key={item.title}
                  className="bg-[#071120] border border-white/10 rounded-[28px] p-8 hover:border-cyan-500 hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500 flex items-center justify-center text-black">
                    {principleIcons[index]}
                  </div>
                  <h3 className="text-2xl font-semibold mt-8">{item.title}</h3>
                  <p className="mt-5 text-gray-400 leading-8">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            EXCLUSIVE PRODUCTS
        ══════════════════════════════════════════════════════ */}
        <section id="exclusive-products" className="py-16 pb-24 border-t border-white/5 bg-[#040812]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-14 items-start mb-12">
              <div>
                <p className="text-cyan-400 text-xs font-semibold tracking-[4px] uppercase">{content.productsEyebrow}</p>
                <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {content.productsHeadingPrefix}
                  <br />
                  <span className="text-cyan-400">{content.productsHeadingHighlight}</span>
                </h2>
              </div>
              <div className="lg:pt-8">
                <p className="text-gray-400 text-lg leading-9 max-w-xl">
                  {content.productsDescription}
                </p>
              </div>
            </div>

            {/* Desktop marquee */}
            <div className="hidden md:block group relative">
              <div className="animate-marquee flex gap-7 w-max">
                {[...products, ...products].map((item, index) => (
                  <div
                    key={index}
                    className="w-[340px] h-[340px] flex-shrink-0 rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,#0D1628_0%,#07101D_100%)] p-8 flex flex-col backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/40 hover:-translate-y-2 hover:shadow-[0_0_45px_rgba(6,182,212,0.12)]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-2xl">
                        {item.icon}
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-[2px] text-cyan-400 pt-1">
                        ● {item.tag}
                      </span>
                    </div>
                    <div className="mt-10">
                      <h3 className="text-[26px] font-bold leading-[1.2]">{item.title}</h3>
                      <p className="mt-5 text-gray-400 leading-7 text-[15px]">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile marquee */}
            <div className="md:hidden overflow-hidden mobile-marquee-wrap">
              <div className="animate-marquee-mobile flex gap-5 w-max">
                {[...products, ...products].map((item, index) => (
                  <div
                    key={index}
                    className="w-[280px] h-[320px] flex-shrink-0 rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,#0D1628_0%,#07101D_100%)] p-7 flex flex-col"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-xl">
                        {item.icon}
                      </div>
                      <span className="text-[10px] uppercase tracking-[2px] text-cyan-400">● {item.tag}</span>
                    </div>
                    <div className="mt-8">
                      <h3 className="text-[22px] font-bold leading-[1.2]">{item.title}</h3>
                      <p className="mt-4 text-gray-400 text-sm leading-7">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SERVICES
        ══════════════════════════════════════════════════════ */}
        <section className="py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-cyan-400 text-xs tracking-[4px] uppercase">{content.servicesEyebrow}</p>
                <h2 className="mt-6 text-4xl lg:text-5xl font-bold leading-tight">
                  {content.servicesHeadingPrefix}
                  <span className="text-cyan-400"> {content.servicesHeadingHighlight}</span>
                </h2>
                <p className="mt-8 text-gray-400 leading-8">
                  {content.servicesDescription}
                </p>
                <img
                  src={content.servicesImage}
                  alt={content.servicesImageAlt}
                  className="rounded-[24px] mt-10 w-full h-[220px] lg:h-[260px] object-cover object-center"
                />
              </div>
              <div className="flex flex-col justify-center divide-y divide-white/10">
                {services.map((service, index) => (
                  <div key={service.title} className="flex gap-5 py-8 first:pt-0 lg:first:pt-8">
                    <div className="text-cyan-400 mt-1 flex-shrink-0">{serviceIcons[index]}</div>
                    <div>
                      <h3 className="text-2xl font-semibold">{service.title}</h3>
                      <p className="mt-3 text-gray-400">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            CTA
        ══════════════════════════════════════════════════════ */}
        <section className="min-h-screen flex items-center border-t border-white/5 py-0">
          <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 py-16">
            <div className="rounded-[40px] border border-white/10 bg-gradient-to-r from-[#071120] to-[#0a2740] p-10 lg:p-24 min-h-[60vh] flex items-center">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-12 w-full">
                <div>
                  <p className="text-cyan-400 text-xs tracking-[4px] uppercase mb-6">{content.ctaEyebrow}</p>
                  <h2 className="text-5xl lg:text-7xl font-bold leading-tight">
                    {content.ctaHeadingPrefix}
                    <br />
                    <span className="text-cyan-400">{content.ctaHeadingHighlight}</span>
                  </h2>
                  <p className="mt-8 text-gray-400 max-w-xl text-lg leading-8">
                    {content.ctaDescription}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Link
                    to={content.ctaButtonHref}
                    className="rounded-full bg-cyan-500 text-black font-semibold px-12 py-6 text-lg hover:scale-105 transition block whitespace-nowrap"
                  >
                    {content.ctaButtonLabel}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════ */}
      <FooterSection />
    </>
  );
}
