import React from "react";
import { useNavigate } from "react-router-dom";
// Update these paths to point to your own image assets
import { ExternalLink, Image as ImageIcon } from "lucide-react";

import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { ServicePageStatus } from "@/components/ServicePageStatus";
import {
  getServicePageData,
  serviceArray,
  serviceText,
  useServicePage,
} from "@/hooks/useServicePage";

/* ---------- shared bits ---------- */

const Eyebrow = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-400/20 border border-cyan-400/30 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-cyan-300 uppercase">
    {children}
  </span>
);

const SectionHeading = ({ eyebrow, title, sub = undefined, align = "center" }) => (
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

/* ---------- page ---------- */

export default function WebsiteDevelopment() {
  const navigate = useNavigate();
  const serviceQuery = useServicePage("website-development");
  if (serviceQuery.isPending) {
    return <ServicePageStatus message="Loading website development content..." />;
  }
  if (serviceQuery.isError) {
    return <ServicePageStatus message={`Website development content could not be loaded: ${serviceQuery.error.message}`} />;
  }
  const pageData = getServicePageData(serviceQuery.data?.content);
  if (!pageData) {
    return <ServicePageStatus message="Website development content is not available." />;
  }
  const introParagraphs = serviceArray<string>(pageData, "introParagraphs");
  const factors = serviceArray<{
    image: string;
    title: string;
    text: string;
    link?: { label: string; href: string };
    linkPrefix?: string;
  }>(pageData, "factors");
  const portfolioItems = serviceArray<{ image: string; caption: string }>(pageData, "portfolioItems");

  return (
    <div className="min-h-screen bg-[#05060f] text-white antialiased selection:bg-blue-500/30">
      <Navbar />
      {/* background ambience */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-cyan-600/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[24rem] w-[24rem] rounded-full bg-blue-800/10 blur-[120px]" />
      </div>

      <div className="relative z-10">
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
              <p className="mt-4 text-cyan-300 font-semibold tracking-wide">
                {serviceText(pageData, "eyebrow")}
              </p>
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

        {/* ---------------- OVERVIEW (full text) ---------------- */}
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

        {/* ---------------- KEY SUCCESS FACTORS ---------------- */}
        <section className="border-y border-white/10 bg-white/[0.02] py-24">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              eyebrow={serviceText(pageData, "factorsEyebrow")}
              title={serviceText(pageData, "factorsTitle")}
              sub={serviceText(pageData, "factorsIntro")}
            />
            <div className="grid gap-6 md:grid-cols-3">
              {factors.map((f) => (
                <Panel key={f.title} className="group overflow-hidden !p-0">
                  <div className="overflow-hidden rounded-t-2xl">
                    {f.image ? (
                      <img
                        src={f.image}
                        alt={f.title}
                        className="h-44 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    ) : (
                      /* Drop your own image in this placeholder */
                      <div className="flex h-44 w-full items-center justify-center border-b border-dashed border-white/15 bg-white/[0.02] transition-transform duration-500 ease-out group-hover:scale-110">
                        <div className="flex flex-col items-center gap-2 text-slate-600">
                          <ImageIcon className="h-6 w-6" strokeWidth={1.5} />
                          <span className="text-[10px] uppercase tracking-widest">
                            Add image
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-7 md:p-9">
                    <h3 className="text-white font-semibold text-lg mb-3">
                      {f.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {f.text}
                      {f.linkPrefix && (
                        <>
                          {" "}
                          {f.linkPrefix}
                          <a
                            href={f.link?.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-cyan-400 underline decoration-cyan-400/40 underline-offset-2 hover:text-cyan-300"
                          >
                            {f.link.label}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                </Panel>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- PORTFOLIO ---------------- */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading
            eyebrow={serviceText(pageData, "portfolioEyebrow")}
            title={serviceText(pageData, "portfolioTitle")}
            sub={serviceText(pageData, "portfolioIntro")}
          />
          <div className="grid gap-6 md:grid-cols-2">
            {portfolioItems.map((item, i) => (
              <div key={i}>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.caption || `Project ${i + 1}`}
                      className="h-80 md:h-96 w-full object-cover object-center transition-transform duration-500 ease-out hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-80 md:h-96 w-full items-center justify-center">
                      <div className="flex flex-col items-center gap-2 text-slate-600">
                        <ImageIcon className="h-8 w-8" strokeWidth={1.5} />
                        <span className="text-[10px] uppercase tracking-widest">
                          Add project image
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                {item.caption && (
                  <p className="mt-3 text-center text-sm text-slate-500">
                    {item.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-500">
            {serviceText(pageData, "portfolioCaption")}
          </p>
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

        <FooterSection />
      </div>
    </div>
  );
}
