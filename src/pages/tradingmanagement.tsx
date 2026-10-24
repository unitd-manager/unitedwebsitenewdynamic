import { type ReactNode, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import PlatformCapabilitiesCarousel from "@/components/PlatformCapabilitiesCarousel";
import product3 from "../assets/product3.webp";
import inventoryImage from "../assets/tms-inventory-3d.svg";
import supplierImage from "../assets/tms-supplier-3d.svg";
import quoteImage from "../assets/tms-quote-3d.svg";
import customerImage from "../assets/tms-customer-3d.svg";
import dashboardImage from "../assets/tms-dashboard-3d.svg";
import supplierPerformanceImage from "../assets/tms-supplier-performance-3d.svg";
import crmImage from "../assets/tms-crm-3d.svg";
import image1 from "../assets/erp2.webp";
import image2 from "../assets/trad-crm.webp";
import image3 from "../assets/trad-document.webp";
import image4 from "../assets/trad-quote.webp";
import image5 from "../assets/trad-supplier.webp";
import image6 from "../assets/trad-salient.webp";
import image7 from "../assets/trad-report.webp";
import image11 from "../assets/crm-client.webp";
import image8 from "../assets/trad-supplier.webp";
import image9 from "../assets/trad-order.webp";
import image10 from "../assets/trad-order (2).webp";


const tmsHero = product3;
const stats = [
  { value: "10+", label: "Modules" },
  { value: "150+", label: "Clients" },
  { value: "99.9%", label: "Uptime SLA" },
];

const productCards = [
    {
      title: "Inventory Management",
      description: "With our Trading Management System, you can effectively track and manage your inventory. Know exactly how much stock you have on hand, when to reorder, and when to restock popular items. This ensures that you never run out of critical products and can fulfill customer orders promptly.",
      image: image1,
    },
    {
      title: "Salient Products",
      description: "Experience a seamless and automated process.Access various assessment tools for informed decision-making.Stay updated with automatic stock updates based on sales.",
      image: image6,
    },
    {
      title: "Document Management",
      description: "Store and organize important documents related to your trading operations, such as contracts, invoices, shipping documents, and product specifications. Easily retrieve documents when needed for audits or reference.",
      image: image3,
    },
    {
      title: "Supplier Management",
      description: "Create and save products without any restrictions, ensuring seamless management.Easily compare product prices before placing orders for optimal decision-making.Centralize all supplier details for convenient access and organization.Link suppliers to multiple products for efficient vendor management.",
      image: image5,
    },
    {
      title: "Order Fulfillment",
      description: "Streamline your order fulfillment process from order receipt to delivery. Automatically generate purchase orders, track order status, and manage shipping and logistics. Provide customers with accurate delivery estimates and improve overall order accuracy.",
      image: image9,
    },
    {
      title: "Quote Management",
          description: "Experience an easy and fast quote generation process. Flexibility to add mark-ups according to your preferences.Keep track of the history of amendments in each quote.Enjoy attractive and easily referenced quote printing. Effortlessly duplicate quotes with just one click.",
          image: image4,
        },
    {
      title: "Customer Management",
      description: "Access all customer data from a centralized location for efficient management. Easily add billing and delivery addresses in different locations as needed.Accurately track due payments for better financial control.Generate reports to monitor orders placed, sorted by date for easy reference.Handle Payments seamlessly with the option for partial payments.",
      image: image10,
    },
    {
        title: "Dashboard & Reports",
        description: "Utilize statistical analysis of customer data as a prominent element in the dashboard. The dashboard serves as a vital tool for informed decision-making across various aspects.Access a wide range of reports based on monthly/yearly transactions for comprehensive insights. Stay updated on current product availability with the stock report feature.Experience the utmost user-friendliness and ease of use with our software.",
        image: image7,
    },
    {
            title: "Supplier Performance Monitoring",
            description: "Evaluate supplier performance based on factors such as delivery times, product quality, and pricing. Our system allows you to make data-driven decisions when selecting and managing suppliers, ensuring a reliable and cost-effective supply chain.",
            image: image8,
        },
    {
        title: "Customer Relationship Management (CRM)",
        description: "Enhance your customer relationships with a built-in CRM module. Maintain detailed customer profiles, track interactions, and segment customers for targeted marketing campaigns. Deliver personalized service and build customer loyalty.",
        image: image11,
    },
];

const faqs = [
    {
      question: "What is UTS TMS?",
      answer: "UTS TMS (Trading Management System) is your all-in-one solution for managing all trading operations. From generating quotes to purchase orders and invoices, its straightforward process ensures a smooth workflow. The software's flexible format, precise output, and user-friendly management make it stand out as a top-notch solution for your trading needs.",
    },
    {
      question: "What are the salient products?",
      answer: "Experience a seamless and automated process. Access various assessment tools for informed decision-making. Stay updated with automatic stock updates based on sales.",
    },
    {
        question: "How does it handle supplier performance monitoring?",
        answer: "Evaluate supplier performance based on factors such as delivery times, product quality, and pricing. Our system allows you to make data-driven decisions when selecting and managing suppliers, ensuring a reliable and cost-effective supply chain.",
    },
    {
        question: "Does it have Customer Relationship Management (CRM)?",
        answer: "Enhance your customer relationships with a built-in CRM module. Maintain detailed customer profiles, track interactions, and segment customers for targeted marketing campaigns. Deliver personalized service and build customer loyalty.",
    },
    {
        question: "Can I manage my inventory with this system?",
        answer: "Yes, our Trading Management System includes robust inventory management features. You can track stock levels in real-time, manage reorder points, and get alerts for low stock, ensuring you can always meet customer demand without overstocking.",
    },
    {
        question: "How does the quote management feature work?",
        answer: "Our system simplifies quote generation. You can create professional quotes quickly, apply mark-ups, and track their status. It also keeps a history of all amendments for easy reference and allows you to duplicate existing quotes with a single click to save time.",
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

const TradingManagement = () => {
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
                Trading <span className="text-cyan-300">Management</span>
                <br />
                Software
              </h1>

              <p className="mt-8 max-w-[560px] text-lg font-medium leading-8 text-[#7fa2b3]">
                UTS TMS(Trading management system) is your all-in -one solution for managing all trading operations,From generating quotes to purchase orders and invoices, ots straightforward process ensures smooth work flow. The software's flexible format, precise output, and user friendly management make it stand out as a top-notch solution for your trading needs.
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
                src={tmsHero}
                alt="Trading Management Software"
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
                What is UTS TMS — the operating system for modern trading businesses.
              </h2>
              <p className="max-w-[610px] text-lg font-medium leading-8 text-[#7fa2b3]">
                The software's flexible format, precise output, and user-friendly management make it stand out as a top-notch solution for your trading needs.
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
                  Talk to our Trading Management experts. We'll walk you through the platform, understand your workflow, and design a setup tailored to your team's goals.
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

export default TradingManagement;