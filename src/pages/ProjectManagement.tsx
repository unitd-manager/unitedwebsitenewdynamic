import { type ReactNode, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import PlatformCapabilitiesCarousel from "@/components/PlatformCapabilitiesCarousel";
import image1 from "@/assets/pms-analytics.webp";
import image2 from "@/assets/pms-network.webp";
import image3 from "@/assets/pms-task.webp";
import image4 from "@/assets/pms-report.webp";
import image5 from "@/assets/project-plan.webp";
import image6 from "@/assets/pms-budjet.webp";
import image7 from "@/assets/pms-collabration.webp";
import image8 from "@/assets/pms-analyse.webp";
import image9 from "@/assets/pms-scalablity.webp";
import image10 from "@/assets/pms-featurs.webp";

const liveImageBase = "https://unitedweb.unitdtechnologies.com/assets";
const pmsHero = `${liveImageBase}/product6-DHFU8PT4.png`;
const stats = [
  { value: "12+", label: "Modules" },
  { value: "180+", label: "Projects Delivered" },
  { value: "99.9%", label: "Uptime SLA" },
];

const productCards = [
  {
    title: "Intuitive Dashboard",
    description:
      "Our Project Management System boasts an intuitive dashboard that provides a comprehensive overview of all ongoing projects. It allows project managers to monitor progress, track key performance indicators, and make data-driven decisions effortlessly.",
    image: image1
  },
  {
    title: "Customizable Workflows",
    description: "Every project is unique, and our system recognizes that. We provide customizable workflows that allow you to tailor the system to your specific project management needs. Whether you're in construction, software development, marketing, or any other industry, you can adapt our platform to match your workflow seamlessly.",
    image: image2,
  },
  {
    title: "Task Management",
    description:"Break tasks into manageable sub-tasks. Define clear responsibilities and deadlines for each sub-task. Allocate team members to specific tasks. Assign equipment and materials as needed. Ensure optimal utilization of resources. Prevent overloads by managing workloads effectively.",
    image: image3,
  },
  {
    title: "Progress Tracking and Reporting",
    description: "Monitor project progress in real-time. Track completion of tasks and sub-tasks. Showcase project performance and key metrics. Provide data-driven insights. Enable data-driven decision-making. Facilitate informed choices based on project data.",
    image: image4,
  },
  {
    title: "Project Planning",
    description: "Effective project planning is at the heart of successful project management. Our platform equips project teams with powerful planning tools, including charts, task dependencies, and resource allocation. This ensures that projects are well-structured, and timelines are realistic.",
    image: image5,
  },
  {
    title: "Budget Management",
    description: "Managing project budgets and expenses is often a complex task. Our system simplifies this by offering robust budget tracking and expense management capabilities. It allows you to set budgets, track expenses, and generate reports to ensure projects stay on course financially.",
    image: image6,
  },
    {
        title: "Real-time Collaboration",
        description: "Collaboration lies at the core of modern project management. With real-time collaboration features, your team can communicate seamlessly, share documents, and work together from anywhere in the world. This fosters creativity, encourages knowledge sharing, and enhances overall productivity.",
        image: image7,
    },
    {
        title: "Reporting and Analytics",
        description: "Data-driven decision-making is a cornerstone of effective project management. Our system offers advanced reporting and analytics tools that help you track project progress, identify bottlenecks, and measure key performance indicators . These insights empower you to make informed decisions and continuously improve project outcomes.",
        image: image8,
    },
    {
        title: "Scalability",
        description: "Our system is designed to scale with your organization's needs. Whether you're managing a small project or a large portfolio of projects, our platform can adapt to accommodate your requirements.",
        image: image9,
    },
     {
        title: "Features",
        description: "Intuitive Dashboard,Project Planning,Real-time Collaboration,Budget and Expense Management,Risk and Compliance Management,Mobile Accessibility.",
        image:image10,
    },
];

const faqs = [
  {
    question: "What is the Project Management Software?",
    answer: "Our Project Management Software is a comprehensive platform designed to streamline workflows, enhance collaboration, and optimize productivity. It covers every stage of the project lifecycle, from planning and execution to monitoring and reporting.",
  },
  {
    question: "How does pricing and the free trial work?",
    answer: "We offer a variety of pricing plans to suit different team sizes and needs. You can find detailed information on our pricing page. We also offer a 14-day free trial with full access to all features, no credit card required.",
  },
  {
    question: "Who is the platform designed for?",
    answer: "The platform is designed for a wide range of industries, including construction, software development, marketing, and more. Its customizable workflows make it adaptable to any team's specific needs.",
  },
  {
    question: "Can it integrate with the tools we already use?",
    answer: "Yes, our platform offers seamless integration with a wide range of popular tools, such as Slack, Google Drive, and GitHub. This allows you to maintain your existing workflows while benefiting from our powerful project management features.",
  },
  {
    question: "Which methodologies are supported?",
    answer: "Our platform supports a variety of project management methodologies, including Agile, Scrum, Kanban, and Waterfall. You can choose the methodology that best suits your team's workflow and project requirements.",
  },
  {
    question: "How are security and customer support handled?",
    answer: "We take security very seriously and employ industry-standard measures to protect your data. Our dedicated customer support team is available 24/7 to assist you with any questions or issues you may have.",
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

const ProjectManagement = () => {
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
                Project <span className="text-cyan-300">Management</span>
                <br />
                Software
              </h1>

              <p className="mt-8 max-w-[560px] text-lg font-medium leading-8 text-[#7fa2b3]">
                Project management system designed to streamline project workflows, enhance collaboration, and optimize productivity across various industries. This web-based platform combines cutting-edge technologies and user-friendly interfaces to empower project teams with the tools they need to succeed. From project planning to execution, monitoring, and reporting, covers every aspect of the project lifecycle, making it the ultimate solution for efficient project management.
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
                alt="Project management network interface"
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
                What is PMS — the operating system for modern project teams.
              </h2>
              <p className="max-w-[610px] text-lg font-medium leading-8 text-[#7fa2b3]">
                Designed to streamline workflows, enhance collaboration, and optimize productivity across industries — from planning and execution to monitoring and reporting, covering every aspect of the project lifecycle.
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
                  Talk to our project management experts. We'll walk you through the platform, understand your workflow, and design a setup tailored to your team's goals.
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

export default ProjectManagement;