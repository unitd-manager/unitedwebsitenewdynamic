import { type ReactNode, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import PlatformCapabilitiesCarousel from "@/components/PlatformCapabilitiesCarousel";
import product3 from "../assets/product1.webp";
import product5 from "../assets/product5.webp";
import image1 from "../assets/erp-benefits.webp";
import image2 from "../assets/erp-implement.webp";
import image3 from "../assets/erp-seamless.webp";
import image4 from "../assets/erp-process.webp";
import image5 from "../assets/erp1.webp";
import image6 from "../assets/erp-Comprehensive.webp";
import image7 from "../assets/erp2.webp";
import image8 from "../assets/erp3.webp";
import image9 from "../assets/erp-seamless.webp";
import image10 from "../assets/erp-process (2).webp";

const liveImageBase = "https://unitedweb.unitdtechnologies.com/assets";
const pmsHero = product3
const stats = [
  { value: "12+", label: "Modules" },
  { value: "180+", label: "Projects Delivered" },
  { value: "99.9%", label: "Uptime SLA" },
];

const productCards = [
   {
    title: "Benefits of ERP",
    description:
      "ERP software eliminates redundant tasks and manual data entry, reducing the risk of errors and improving efficiency across the organization.ERP integrates data from different departments, providing a single source of truth for accurate reporting and analysis.Enhanced communication and collaboration among teams lead to better decision-making and problem-solving.Automation of processes, better inventory management, and optimized resource allocation can lead to significant cost savings.ERP systems can adapt to the changing needs of your business, making them suitable for both small and large enterprises.Access to real-time data helps in providing better customer service, resulting in higher customer satisfaction.",
    image: image1,
  },
  {
    title: "Implementing ERP",
    description: "Identify your organization's specific needs and goals for implementing ERP.Choose an ERP solution that aligns with your business requirements and budget.Tailor the ERP system to match your unique processes and integrate it with existing software.Provide comprehensive training to employees to ensure a smooth transition.Thoroughly test the ERP system to identify and resolve any issues.Roll out the ERP system gradually and provide ongoing support to users.",
    image: image2,
  },
  {
    title: "Seamless Collaboration",
    description:
      "Effective communication and collaboration are vital for business success. ERP systems facilitate seamless interaction among team members and departments.Employees can access shared data, collaborate on projects, and communicate within the ERP platform, enhancing productivity and teamwork.",
    image: image3,
  },
  {
    title: "ERP Process Enhancement",
    description: "Whether it's automating invoicing, purchase orders, or inventory tracking, automation leads to improved efficiency and cost savings.",
    image: image4,
  },
  {
    title: "Real-Time Data Visibility",
    description:
      "One of the standout features of ERP systems is the ability to provide real-time data visibility. Gone are the days of relying on outdated, disconnected spreadsheets and systems.With ERP, you have access to up-to-the-minute data from across your organization. This enables faster decision-making, accurate forecasting, and the ability to spot opportunities and challenges as they arise.",
    image: image5,
  },
   {
    title: "Comprehensive Modules for Every Business Function",
    description:
      "Finance and Accounting,Human Resources,Supply Chain Management,Manufacturing,Sales and CRM,Business Intelligence and Reporting",
    image: image6,
  },
  {
    title: "Streamlined Procurement",
    description: "Automate procurement workflows, from requisition to payment. Manage supplier relationships, evaluate performance, and negotiate better terms.Ensure compliance with procurement policies and regulations.",
    image: image7,
  },
  {
    title: "Enhanced Customer Relationship Management (CRM)",
    description: "Capture and manage customer data, interactions, and sales opportunities. Deliver personalized customer experiences through data-driven insights.Automate marketing campaigns, sales pipelines, and customer support processes.Track and analyze customer behavior to tailor your offerings and increase customer satisfaction.",
    image: image8,
  },
  {
    title: "Optimized Inventory Control",
    description: "Track inventory levels in real-time to prevent stockouts and overstocking. Set reorder points and automate purchase orders to optimize stock levels.Monitor product movements, trace batch details, and manage warehouses efficiently.Gain insights into demand patterns and forecast inventory needs accurately.",
    image: image9,
  },
  {
    title: "Reporting and Analytics",
    description: "Create custom reports and dashboards to track KPIs.Perform in-depth data analysis for strategic decision-making.Predict trends and forecast demand based on historical data.Generate real-time insights for agile, data-driven operations.",
    image: image10,
  },
];

const faqs = [
  {
    question: "What is UTS ERP?",
    answer: "Enterprise Resource Planning (ERP) is a comprehensive software solution designed to manage and integrate core business processes, including finance, human resources, supply chain, manufacturing, sales, and more.",
  },
  {
    question: "What are the benefits of ERP?",
    answer: "ERP software eliminates redundant tasks, integrates data from different departments, enhances communication, leads to significant cost savings, and can adapt to the changing needs of your business.",
  },
  {
    question: "How is ERP implemented?",
    answer: "The implementation process involves identifying your organization's needs, choosing the right solution, tailoring the system, providing training, testing thoroughly, and rolling out the system gradually.",
  },
  {
    question: "How does ERP enhance collaboration?",
    answer: "ERP systems facilitate seamless interaction among team members and departments. Employees can access shared data, collaborate on projects, and communicate within the ERP platform, enhancing productivity and teamwork.",
  },
  {
    question: "What are the comprehensive modules for every business function?",
    answer: "Finance and Accounting, Human Resources, Supply Chain Management, Manufacturing, Sales and CRM, Business Intelligence and Reporting.",
  },
  {
    question: "How are reporting and analytics handled?",
    answer: "You can create custom reports and dashboards to track KPIs, perform in-depth data analysis for strategic decision-making, predict trends and forecast demand based on historical data, and generate real-time insights for agile, data-driven operations.",
  },
];

const consultationItems = [
  "30-minute discovery call",
  "Live platform walkthrough",
  "Custom workflow advice",
  "No commitment required",
];

const Pill = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_18px_rgba(0,221,255,0.12)]">
    {children}
  </span>
);

const EnterpriseResourcePlanning = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <main className="min-h-screen bg-[#00121a] px-5 py-16 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1540px] overflow-hidden rounded-xl bg-[#00141d] shadow-[0_0_0_1px_rgba(0,212,255,0.05),0_32px_110px_rgba(0,0,0,0.45)]">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:px-0 lg:py-20">
          <section className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <Pill>
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                United Technologies
              </Pill>

              <h1 className="mt-8 max-w-[620px] text-[46px] font-black leading-[1.04] tracking-normal text-white sm:text-[50px] lg:text-[52px] 2xl:text-[60px]">
                Enterprise Resource <span className="text-cyan-300">Planning</span>
              </h1>

              <p className="mt-8 max-w-[560px] text-lg font-medium leading-8 text-[#7fa2b3]">
                A comprehensive software solution designed to manage and integrate core business processes, including finance, human resources, supply chain, manufacturing, sales, and more. It provides a centralized platform that allows organizations to collect, store, manage, and interpret data from various departments, facilitating data-driven decision-making.
              </p>

              <div className="mt-12 grid max-w-[430px] grid-cols-3 gap-7">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-black leading-none text-white sm:text-4xl">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#6f94a7]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[22px] shadow-[0_0_80px_rgba(0,221,255,0.18)]">
              <img
                src={pmsHero}
                alt="Enterprise Resource Planning interface"
                className="aspect-[748/526] w-full rounded-[22px] object-cover"
              />
            </div>
          </section>

          <section className="mt-12 rounded-[28px] border border-cyan-100/10 bg-[#071d27] px-8 py-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:px-10 lg:px-12 lg:py-12">
            <div className="mb-8 flex items-center gap-4">
              <span className="rounded-full bg-cyan-500/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-cyan-300">
                Featured
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#668898]">
                Overview
              </span>
            </div>

            <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.96fr]">
              <h2 className="max-w-[590px] text-4xl font-black leading-tight tracking-normal text-white sm:text-[42px]">
                What is UTS ERP — the operating system for modern businesses.
              </h2>
              <p className="max-w-[610px] text-lg font-medium leading-8 text-[#7fa2b3]">
                It provides a centralized platform that allows organizations to collect, store, manage, and interpret data from various departments, facilitating data-driven decision-making.
              </p>
            </div>
          </section>

          <PlatformCapabilitiesCarousel cards={productCards} />

          <section className="mt-12 rounded-[28px] border border-cyan-100/10 bg-[#071d27] px-6 py-11 sm:px-10 lg:px-12">
            <div className="text-center">
              <span className="rounded-full bg-cyan-500/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-cyan-300">
                FAQ
              </span>
              <h2 className="mt-8 text-4xl font-black tracking-normal text-white sm:text-[42px]">
                Frequently Asked <span className="text-cyan-300">Questions</span>
              </h2>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {faqs.map((faq, index) => (
                <div key={faq.question}>
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="flex min-h-14 w-full items-center justify-between rounded-2xl border border-cyan-100/10 bg-[#031620] px-5 text-left text-sm font-black text-white transition-colors hover:border-cyan-300/40"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-cyan-300 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="mt-2 rounded-2xl border border-cyan-100/10 bg-[#031620] px-5 py-4 text-base font-medium leading-7 text-[#7fa2b3]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-[28px] border border-cyan-100/10 bg-[#071d27] px-8 py-10 sm:px-10 lg:px-12 lg:py-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <span className="rounded-full bg-cyan-500/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-cyan-300">
                  Consultation
                </span>

                <h2 className="mt-20 text-4xl font-black tracking-normal text-white sm:text-[42px]">
                  Schedule a Consultation
                </h2>
                <p className="mt-6 max-w-[760px] text-lg font-medium leading-8 text-[#7fa2b3]">
                  Talk to our ERP experts. We'll walk you through the platform, understand your workflow, and design a setup tailored to your team's goals.
                </p>
              </div>

              <div className="lg:pt-1 lg:text-right">
                <a
                  href="mailto:info@unitedtechnologies.com"
                  className="inline-flex rounded-full bg-cyan-300 px-8 py-4 text-sm font-black text-[#00141d] transition-transform hover:scale-105"
                >
                  Schedule Consultation
                </a>
                <p className="mt-4 text-sm font-medium text-[#6f94a7]">
                  or email info@unitedtechnologies.com
                </p>
              </div>
            </div>

            <div className="mt-9 grid max-w-[690px] gap-x-20 gap-y-4 sm:grid-cols-2">
              {consultationItems.map((item) => (
                <div key={item} className="flex items-center gap-3 text-base font-semibold text-white">
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  {item}
                </div>
              ))}
            </div>
          </section>

          <footer className="py-16 text-center text-sm font-medium text-[#5e8193]">
            © United Technologies · info@unitedtechnologies.com
          </footer>
        </div>
      </div>
    </main>
  );
};

export default EnterpriseResourcePlanning;