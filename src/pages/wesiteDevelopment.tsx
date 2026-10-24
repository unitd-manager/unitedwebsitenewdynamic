import React from "react";
import { useNavigate } from "react-router-dom";
// Update these paths to point to your own image assets
import image18 from "../assets/download.webp";
import image19 from "../assets/Productivity Workspace UI.webp";
import image20 from "../assets/Cyber security dashboard.webp";
import image1 from "../assets/website.webp";
import image2 from "../assets/web1 (1).webp";
import image3 from "../assets/web2.webp";

import { ExternalLink, Image as ImageIcon } from "lucide-react";

import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

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

/* ---------- content data (verbatim) ---------- */

const introParagraphs = [
  "In today's digital world, having a strong online presence is essential. Therefore, placing significant emphasis on web design and web development is crucial before implementation. An effective web design should be simple, with a theme that clearly conveys the intended message to the users.",
  "With a decade of experience, we have successfully created numerous websites, spanning from simple informational sites to sophisticated e-commerce platforms. Please take a moment to explore our portfolio below, which showcases our expertise and gives you an idea of our capabilities.",
];

const factorsIntro =
  "Before diving into web design and development, it's crucial to consider various factors that contribute to the success of your website.";

const factors = [
  {
    image: image18,
    title: "Purpose of the Site",
    text: "The website's design should serve its purpose effectively. Ensure that users can easily find all the information they need about your products or services. Focus on providing value to visitors rather than just making the website visually attractive.",
  },
  {
    image: image19,
    title: "Usability",
    text: "A user-friendly design is paramount. Usability refers to how easily users can interact with your site and find the information they seek. The navigation should be intuitive, allowing users to move seamlessly throughout the site.",
    link: {
      label: "usability guidelines by Google",
      href: "https://www.google.com/",
    },
    linkPrefix: "Consider these usability guidelines from Google. Please find some ",
  },
  {
    image: image20,
    title: "Quality Content",
    text: "Our website content is meticulously crafted to be informative and easy to understand. We ensure that all essential information about our services is readily available. It's crucial to note that our content is entirely original, as search engines penalize sites with duplicate content.",
  },
];

const portfolioIntro =
  "Discover Some of Our Web Design Projects: Below, you'll find a selection of our remarkable web design projects. These examples showcase our dedication to creating visually appealing and user-friendly websites that effectively communicate our clients' messages.";

const portfolioItems = [
  { image: image2, caption: "" },
  { image: image3, caption: "" },
];

/* ---------- page ---------- */

export default function WebsiteDevelopment() {
  const navigate = useNavigate();

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
                Website{" "}
                <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Development
                </span>
              </h1>
              <p className="mt-4 text-cyan-300 font-semibold tracking-wide">
                Website Development — Ecommerce Development
              </p>
              <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-lg">
                From simple informational sites to sophisticated e-commerce
                platforms — a decade of experience building websites that
                communicate your message clearly and effectively.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button 
                onClick={() => navigate("/enquiryNow")}
                className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-105">
                  Enquiry Now
                </button>
               
              </div>
            </div>

          <div className="relative mx-auto flex h-72 w-72 items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm md:h-96 md:w-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/20 blur-2xl" />
              <img
                src={image1}
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
            title="Website Development — Ecommerce Development"
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
              eyebrow="Before You Begin"
              title="Factors That Contribute to a Successful Website"
              sub={factorsIntro}
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
                            href={f.link.href}
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
            eyebrow="Our Work"
            title="Discover Some of Our Web Design Projects"
            sub={portfolioIntro}
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
            Please find few of our web design projects..
          </p>
        </section>

        {/* ---------------- CTA ---------------- */}
        <section className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Ready To Build Your Website?
          </h2>
          <p className="mt-4 text-slate-400">
            Let's design and develop a site that clearly communicates your
            message and converts visitors into customers.
          </p>
          <button 
          onClick={() => navigate("/enquiryNow")}
          className="mt-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-105">
            Enquiry Now
          </button>
        </section>

        <FooterSection />
      </div>
    </div>
  );
}
