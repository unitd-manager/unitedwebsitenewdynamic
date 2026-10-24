import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/Importancia de la derecho a la protección de los datos.webp";
import image1 from "../assets/IoT Developments Shaping the Future of Connected Technology.webp";
import image2 from "../assets/Techsodise builds digital growth systems_.webp";
import image3 from "../assets/cost.webp";
import image4 from "../assets/data.webp";
import image5 from "../assets/global.webp";
import image6 from "../assets/cloud1.webp";
import image8 from "../assets/email.webp";
import image7 from "../assets/Affordable Dedicated Servers in Phoenix, USA – Atalnetworks.webp";
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

/* ---------- content data (verbatim from source page) ---------- */

const introParagraph =
  "Cloud hosting involves hosting applications across multiple servers to distribute the workload and ensure high uptime. In traditional hosting, applications were typically hosted on a single server, which could lead to significant downtime and delays in making the server operational again in case of failures. However, cloud hosting offers several advantages, including:";

const overviewFeatures = [
  {
    image: image1,
    title: "High Reliability",
    text: "By distributing the application across multiple servers, cloud hosting reduces the risk of complete downtime. If one server fails, the workload is automatically shifted to other servers, ensuring continuous availability.",
  },
  {
    image: image2,
    title: "Scalability",
    text: "Cloud hosting allows applications to easily scale up or down based on demand. As traffic fluctuates, resources can be dynamically allocated to meet the requirements, ensuring optimal performance at all times.",
  },
  {
    image: image3,
    title: "Cost-Efficiency",
    text: "With cloud hosting, you only pay for the resources you use. This pay-as-you-go model helps in cost optimization, as opposed to traditional hosting, where you often pay for fixed resources regardless of usage.",
  },
  {
    image: image4,
    title: "Data Redundancy",
    text: "Cloud hosting providers implement robust data backup and replication strategies, ensuring that your data is securely stored across multiple locations. This redundancy minimizes the risk of data loss due to hardware failures.",
  },
  {
    image: image5,
    title: "Global Reach",
    text: "Cloud hosting allows applications to be deployed in data centers worldwide. This enables faster access for users across different geographical locations, improving user experience.",
  },
  {
    image: image6,
    title: "Flexibility",
    text: "Cloud hosting platforms offer a wide range of services and tools, allowing developers to customize and configure their application environments according to specific needs.",
  },
];

const dedicatedAdvantages = [
  {
    title: "Abundant Resources",
    text: "Get full access to ample CPU, RAM, and storage dedicated entirely to your applications, with no sharing or contention from other users.",
  },
  {
    title: "High Security",
    text: "Operate in an isolated environment with complete control over firewalls, security patches, and access permissions.",
  },
  {
    title: "Reliable Performance",
    text: "Enjoy consistent uptime and speed, since your server's resources are never shared with other customers.",
  },
  {
    title: "Cost-Efficiency",
    text: "Get predictable, all-inclusive pricing for a powerful hosting solution without the overhead of managing on-premise hardware.",
  },
];

const emailValueAdds = [
  {
    title: "WordPress Hosting",
    text: "Fully managed WordPress environments optimized for speed, security, and easy content updates.",
  },
  {
    title: "Gsuite Integration",
    text: "Seamlessly connect your domain with Google Workspace for professional email, calendars, and collaboration tools.",
  },
  {
    title: "Email Migration From Outlook To Gsuite",
    text: "A smooth, guided migration of your mailboxes and data from Outlook to Gsuite with minimal downtime.",
  },
];

/* ---------- page ---------- */

export default function CloudHosting() {
    const navigate = useNavigate();
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
              <Eyebrow>Service Details</Eyebrow>
              <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
                Cloud{" "}
                <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Hosting
                </span>
              </h1>
              <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-lg">
                Hosting applications across multiple servers to distribute
                the workload and ensure high uptime — reliable, scalable,
                and built to grow with you.
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
                src={image}
                alt="social media marketing"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* ---------------- WHAT IS CLOUD HOSTING (full text) ---------------- */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <SectionHeading eyebrow="Overview" title="What Is Cloud Hosting" />
          <Panel className="mb-8">
            <p className="text-slate-300 leading-relaxed">
              {introParagraph}
            </p>
          </Panel>
          <FeatureCarousel features={overviewFeatures} />
        </section>

        {/* ---------------- DEDICATED SERVER (full text) ---------------- */}
        <section className="border-y border-white/10 bg-white/[0.02] py-24">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              eyebrow="Cloud Hosting VPS And Dedicated"
              title="Dedicated Server"
            />
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="text-left">
                <p className="text-slate-300 leading-relaxed">
                  A dedicated server is an exclusive hosting solution
                  provided to a single customer, granting them full control
                  over its features and resources. Unlike shared hosting,
                  where multiple users share the same server, a dedicated
                  server offers unparalleled performance and security as it
                  is entirely dedicated to one customer's needs. This level
                  of control allows the customer to customize the server's
                  configurations, choose specific software, and optimize its
                  performance to meet their unique requirements. With a
                  dedicated server, the customer has the flexibility to
                  manage the server environment efficiently, ensuring a
                  reliable and powerful hosting solution tailored to their
                  specific needs.
                </p>

                <h4 className="mt-6 font-semibold text-white">
                  Who should use dedicated server hosting?
                </h4>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  Dedicated server hosting is best suited for users who run
                  multiple high-traffic applications and require enhanced
                  security, reliability, and complete control over their
                  server environment. It is ideal for resource-intensive
                  tasks, e-commerce websites, and businesses that need
                  optimal performance and customized configurations.
                </p>
              </div>

            <div className="relative mx-auto flex h-72 w-72 items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm md:h-96 md:w-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/20 blur-2xl" />
              <img
                src={image7}
                alt="social media marketing"
                className="h-full w-full object-cover"
              />
            </div>

            </div>

            <div className="mt-16">
              <SectionHeading eyebrow="Why It Works" title="Advantages" />
              <Timeline items={dedicatedAdvantages} />
            </div>
          </div>
        </section>

        {/* ---------------- EMAIL HOSTING SERVER (full text) ---------------- */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading
            eyebrow="Cloud Hosting Email And WordPress"
            title="Email Hosting Server"
          />
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="text-left">
              <p className="text-slate-300 leading-relaxed">
                Emails contain sensitive information, making it crucial to
                have dedicated servers to ensure secure and reliable email
                communication. At our hosting service, we offer a variety of
                email servers to cater to the diverse needs of our users.
              </p>
              <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                Our email hosting packages start with a minimum of 5 email
                accounts, providing an ideal solution for small businesses
                and individuals. Moreover, the storage capacity is scalable,
                enabling users to easily increase their storage as per their
                specific requirements.
              </p>
            </div>

            {/* Drop your own image in this placeholder */}
           <div className="relative mx-auto flex h-72 w-72 items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm md:h-96 md:w-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/20 blur-2xl" />
              <img
                src={image8}
                alt="social media marketing"
                className="h-full w-full object-cover"
              />
            </div>

          </div>

          <div className="mt-16">
            <SectionHeading
              eyebrow="What's Included"
              title="Value-Added Services"
              sub="In addition to our standard email hosting services, we also offer:"
            />
            <Timeline items={emailValueAdds} />
          </div>
        </section>

        {/* ---------------- CTA ---------------- */}
        <section className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Ready To Move To The Cloud?
          </h2>
          <p className="mt-4 text-slate-400">
            Let's find the right hosting setup — cloud, dedicated, or
            email — for your business.
          </p>
          <button 
          onClick={() => navigate("/enquiryNow")}
          className="mt-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-105">
            Enquiry Now
          </button>
        </section>
      </div>

      <FooterSection />

    </div>
  );
}