import { type ReactNode, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import PlatformCapabilitiesCarousel from "@/components/PlatformCapabilitiesCarousel";
import product4 from "../assets/product4.webp";
import image1 from "@/assets/smart-tender.webp";
import image2 from "@/assets/smart-material.webp";
import image3 from "@/assets/smart-purchase.webp";
import image4 from "@/assets/smart-project.webp";
import image5 from "@/assets/smart-doc.webp";
import image6 from "@/assets/pms-hero.webp";
import image7 from "@/assets/smart-work.webp";
import image8 from "@/assets/smart-cost.webp";
import image9 from "@/assets/pms-analytics.webp";
import image10 from "@/assets/smart-salient.webp";
const scsHero = product4;
const stats = [
  { value: "12+", label: "Modules" },
  { value: "100+", label: "Clients" },
  { value: "99.9%", label: "Uptime SLA" },
];

const productCards = [
    {
      title: "Tender & Quote Management",
      description: "Experience a seamless and automated process. Precise and user friendly Tender tracking. Smart reminders to submit well before deadline.Pre-built decision making tools for best tendering.Automated process flow after tender awarded.Flexible and multi-option quote management.",
      image: image1,
    },
    {
      title: "Material Management",
      description: "The Smart-Construction CRM efficiently monitors materials usage at projects, ensuring effective and optimized utilization. By closely tracking materials, the CRM helps reduce wastage and prevents mismanagement of resources.The software also enables seamless tracking of machinery deployed on projects, facilitating proper scheduling and utilization. It ensures that machinery is utilized efficiently to enhance project productivity.",
      image: image2,
    },
    {
      title: "Purchase Order Management",
      description: "The Smart-Construction CRM offers efficient tracking of suppliers and sub-contractors, ensuring smooth collaboration throughout projects.The CRM streamlines the process flow for supplier purchase orders (POs) and work orders, simplifying administrative tasks and reducing delays.To prevent over-awarding of tasks to multiple sub-contractors, the CRM implements a comprehensive system that promotes fair distribution of assignments, avoiding redundancies and enhancing project efficiency.With automated supplier confirmation and PO generation, the CRM expedites the procurement process, saving time and reducing manual errors.",
      image: image3,
    },
    {
      title: "Project Analysis Tool",
      description: "The Smart-Construction CRM offers a smart tracking tool that comprehensively monitors all tasks related to the project, ensuring transparency and efficiency throughout the project lifecycle.With the ability to monitor manpower usage based on the scheduled planner, the CRM helps in optimizing workforce allocation and resource management.The CRM also enables accurate tracking of material and operational budgets, facilitating better financial management and cost control.Intuitive graphics and alerts promptly notify stakeholders of any variations from the planned schedule, enabling quick and proactive decision-making to mitigate potential issues.",
      image: image4,
    },
    {
        title: "Document Management",
        description: "Effortlessly manage and organize project-related documents with Smart-Construction CRM. The software offers secure cloud storage, version control, and document sharing capabilities.It ensures that important documents, such as blueprints, contracts, and permits, are easily accessible to authorized personnel. Say goodbye to paper-based documentation and hello to a digital, paperless workflow.",
        image: image5,
    },
    {
        title: "Project Management",
        description: "Smart-Construction CRM simplifies project management by offering a centralized platform for tracking project progress, timelines, and milestones. It enables real-time collaboration among project stakeholders, streamlining communication and reducing delays.With customizable dashboards and reporting tools, it provides insights for informed decision-making, ensuring projects stay on track and within budget. ",
        image: image6,
    },
    {
        title: "Workforce Management",
        description: " Smart-Construction CRM optimizes workforce management by tracking employee schedules, skills, and certifications.It allows for efficient allocation of resources based on project requirements and employee availability.The system also aids in monitoring employee performance, ensuring that the right team members are assigned to the right tasks, contributing to enhanced productivity and job satisfaction. ",
        image: image7,
    },
    {
        title: "Cost Estimation & Budgeting",
        description: "Accurate cost estimation and budgeting are critical in construction projects.Smart-Construction CRM offers robust tools for creating detailed cost estimates, factoring in materials, labor, equipment, and overhead costs.It enables real-time tracking of expenses against budgets, helping project managers identify cost overruns early and make necessary adjustments to stay within budget constraints.",
        image: image8,
    },
    {
        title: "Reporting & Analytics",
        description: "Harness the power of data with Smart-Construction CRM's reporting and analytics capabilities. The software compiles project data into actionable insights through customizable reports and dashboards.Project managers can analyze trends, identify bottlenecks, and make data-driven decisions for continuous improvement. With a comprehensive view of project performance, you can ensure projects are completed efficiently and profitably ",
        image: image9,
    },
    {
        title: "Salient Features",
        description: "Smart-Construction CRM (Customer Relationship Management) software offers a seamless and efficient process through automation, effectively reducing errors and minimizing workload. It provides a wide range of assessment tools that aid in making well-informed decisions throughout the customer journey.The system ensures timely user notifications aligned with assigned tasks and responsibilities. Operating on a Software-as-a-Service (SaaS) model, the CRM remains accessible 24/7, ensuring continuous availability and convenience for users.The software facilitates communication through SMS and email notifications, keeping all stakeholders well-informed and connected. It boasts the best-in-class customer support both before and after sales, ensuring a smooth and satisfactory user experience.The Smart-Construction CRM stands out for its user-friendliness, ready-to-use interface, and seamless integration with existing software solutions, eliminating the need for complicated installations or setups.",
        image: image10,
    },
];

const faqs = [
    {
      question: "What is Smart-Construction CRM?",
      answer: "Smart-Construction CRM (Customer Relationship Management) is a term that refers to practices, strategies, and technologies that companies use to manage and analyze customer interactions, business management and data throughout the customer lifecycle, with the goal of improving business relationships with customers.",
    },
    {
      question: "What are the salient features?",
      answer: "Smart-Construction CRM offers a seamless and efficient process through automation, reducing errors and workload. It provides a wide range of assessment tools for well-informed decisions, ensures timely user notifications, and operates on a SaaS model for 24/7 accessibility.",
    },
    {
        question: "How does it handle communication?",
        answer: "The software facilitates communication through SMS and email notifications, keeping all stakeholders well-informed and connected. It also boasts the best-in-class customer support both before and after sales.",
    },
    {
        question: "Is it user-friendly?",
        answer: "The Smart-Construction CRM stands out for its user-friendliness, ready-to-use interface, and seamless integration with existing software solutions, eliminating the need for complicated installations or setups.",
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

const SmartConstruction = () => {
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
                Smart <span className="text-cyan-300">Construction</span>
                <br />
                CRM
              </h1>

              <p className="mt-8 max-w-[560px] text-lg font-medium leading-8 text-[#7fa2b3]">
                Smart-Construction CRM is a term that refers to practices, strategies, and technologies that companies use to manage and analyze customer interactions, business management and data throughout the customer lifecycle, with the goal of improving business relationships with customers.
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
                src={scsHero}
                alt="Smart Construction CRM"
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
                What is Smart-Construction CRM — the operating system for modern construction businesses.
              </h2>
              <p className="max-w-[610px] text-lg font-medium leading-8 text-[#7fa2b3]">
                Designed to streamline and centralize all construction operations, making business management more efficient and convenient.
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
                  Talk to our Smart Construction experts. We'll walk you through the platform, understand your workflow, and design a setup tailored to your team's goals.
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

        
        </div>
      </div>
    </main>
  );
};

export default SmartConstruction;