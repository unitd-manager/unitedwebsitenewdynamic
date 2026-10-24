import { type ReactNode, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import PlatformCapabilitiesCarousel from "@/components/PlatformCapabilitiesCarousel";
import product2 from "../assets/product2.webp";
import image1 from "../assets/crm-salient.webp";
import image2 from "../assets/crm-client.webp";
import image3 from "../assets/crm-lead.webp";
import image4 from "../assets/crm-task.webp";
import image5 from "../assets/crm-pay.webp";
import image6 from "../assets/crm-comm.webp";
import image7 from "../assets/crm-data.webp";
import image8 from "../assets/crm-scal.webp";
import image9 from "../assets/crm-customer.webp";
import image10 from "../assets/crm-report.webp";
const pmsHero = product2;
const stats = [
  { value: "8+", label: "Modules" },
  { value: "300+", label: "Clients" },
  { value: "99.9%", label: "Uptime SLA" },
];

const productCards = [
    {
      title: "Salient Products",
      description: "Seamless process with automation to reduce errors and workload.Comprehensive range of assessment tools for data-driven decision making.Personalized user notifications for each assigned job.Based on the SaaS model, available 24/7 for easy access.SMS and Email notifications for instant updates.Best customer support, both pre and post-sales, ensuring your satisfaction.Most user-friendly platform, ready-to-use with no installation required.",
      image: image1,
    },
    {
      title: "Client Management",
      description: "Centralized client data management through CRM softwareEasy identification of outstanding payments with individual and summary views.Utilize attractive pre-built invoice formats to enhance brand value.Minimize human error and improve task management with pre-set reminders.Flexibility to add multiple addresses based on the client's portfolio.",
      image: image2,
    },
    {
      title: "Lead Management",
      description: "The software aims to enhance lead management processes, allowing businesses to effectively nurture and convert leads into customers by streamlining lead tracking, follow-up, and engagement.By optimizing the sales process, the software helps businesses close deals more efficiently, leading to increased sales revenue and improved overall business performance.The software prioritizes customer support and satisfaction, providing tools and features that enable businesses to deliver excellent customer service and build strong relationships with clients.With streamlined business management processes, the software frees up staff from time-consuming administrative tasks, allowing them to focus on strategic activities that drive business growth and expansion.The software provides performance tracking and reporting features, allowing businesses to monitor individual staff members' achievements in meeting their targets and goals. This enables effective performance evaluation and recognition of top-performing employees.",
      image: image3,
    },
    {
      title: "Work/Task Management",
      description: "Efficiently assign jobs to specific staff members from a pool of employees.Monitor work progress and allocate resources based on workload requirements.Smart reminders to alert employees before scheduled deadlines, ensuring timely completion.Automated notifications to managers once a job is completed, promoting seamless communication.Effective man management reduces stress and enhances job completion efficiency.",
      image: image4,
    },
    {
        title: "Payments & Reports",
        description: "The software provides a wide range of reports tailored to cater to various business requirements, offering valuable insights and data for better decision-making.With a PaaS model, the software allows businesses to manage their operations and access essential data from anywhere, providing flexibility and convenience.The software boasts a user-friendly interface and requires minimal setup, enabling businesses to quickly implement and use the solution without extensive training.",
        image: image5,
      },
      {
        title: "Improved Communication",
        description: "CRM software is equipped with communication tools that enhance interactions with customers. Email integration, for example, allows you to send and receive emails directly from the CRM platform, ensuring that all communication is tracked and organized.This leads to better collaboration among your team and ensures that no customer query or request goes unanswered. ",
        image: image6,
      },
      {
        title: "Centralized Customer Data",
        description: "One of the core features of CRM software is its ability to centralize customer data.Instead of scattered information across spreadsheets, emails, and notes, a CRM system stores all customer-related data in one secure location. This includes contact information, communication history, purchase history, and preferences. This centralization simplifies data management and ensures that everyone in your organization has access to accurate and up-to-date customer information. ",
        image: image7,
      },
      {
        title: "Scalability",
        description: "Whether you're a small startup or a large enterprise, CRM software is scalable to meet your needs. You can start with basic features and add more as your business grows.This scalability ensures that your CRM system can evolve with your business, providing long-term value. ",
        image: image8,
      },
        {
            title: "Customer Support and Service",
            description: "Providing exceptional customer support is a key differentiator for businesses. CRM software includes customer support and service modules that help you manage and resolve customer issues efficiently.You can create support tickets, track service requests, and ensure that customer inquiries are handled promptly.",
            image: image9,
        },
        {
            title: "Analytics and Reporting",
            description: "Understanding your customers' behavior and preferences is crucial for making informed business decisions.CRM software provides analytics and reporting tools that offer insights into customer trends, sales performance, and marketing campaign effectiveness. These insights enable you to tailor your strategies for maximum impact. ",
            image: image10,
        },
     
  ];

const faqs = [
    {
      question: "What is UTS CRM?",
      answer: "UTS CRM (Customer Relationship Management) encompasses a range of practices, strategies, and technologies employed by companies to manage and analyze customer interactions and data throughout the entire customer lifecycle. The ultimate objective is to enhance business relationships with customers and improve overall business performance.",
    },
    {
      question: "How does Lead Management work?",
      answer: "The software aims to enhance lead management processes, allowing businesses to effectively nurture and convert leads into customers by streamlining lead tracking, follow-up, and engagement.",
    },
    {
      question: "What are the benefits of Work/Task Management?",
      answer: "Efficiently assign jobs to specific staff members, monitor work progress, and set smart reminders to ensure timely completion. Automated notifications keep managers informed, reducing stress and enhancing efficiency.",
    },
    {
        question: "What kind of reports can I generate?",
        answer: "The software provides a wide range of reports tailored to cater to various business requirements, offering valuable insights and data for better decision-making. With a PaaS model, you can manage operations and access data from anywhere.",
    },
    {
        question: "Can I integrate UTS CRM with other software?",
        answer: "Yes, UTS CRM is designed to be flexible and can be integrated with various other software and platforms to ensure a seamless workflow and data synchronization across your business tools.",
    },
    {
        question: "Is my data secure with UTS CRM?",
        answer: "Data security is our top priority. We employ robust security measures, including encryption and regular backups, to ensure that your customer data is safe and protected at all times.",
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

const CustomerRelationshipManagement = () => {
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
                Customer <span className="text-cyan-300">Relationship</span>
                <br />
                Management
              </h1>

              <p className="mt-8 max-w-[560px] text-lg font-medium leading-8 text-[#7fa2b3]">
                UTS CRM encompasses a range of practices, strategies, and technologies to manage and analyze customer interactions and data throughout the customer lifecycle.The ultimate objective is to enhance business relationships with customers and improve overall business performance.
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
                alt="Customer Relationship Management"
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
                What is UTS CRM — the operating system for modern businesses.
              </h2>
              <p className="max-w-[610px] text-lg font-medium leading-8 text-[#7fa2b3]">
                Designed to streamline and centralize all customer interactions, making business management more efficient and convenient.
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
                  Talk to our CRM experts. We'll walk you through the platform, understand your workflow, and design a setup tailored to your team's goals.
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

export default CustomerRelationshipManagement;