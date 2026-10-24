import { type ReactNode, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import PlatformCapabilitiesCarousel from "@/components/PlatformCapabilitiesCarousel";
import product5 from "../assets/product5.webp";
import image1 from "../assets/pay-hr.webp";
import image2 from "../assets/pay-auto.webp";
import image3 from "../assets/project-plan.webp";
import image4 from "../assets/pay-slip.webp";
import image5 from "../assets/pay-process.webp";
import image6 from "../assets/pay-tax.webp";
import image7 from "../assets/pay-data.webp";
import image8 from "../assets/pay-payslip.webp";
import image9 from "../assets/pay-report.webp";
import image10 from "../assets/pay-leave.webp";



const pmsHero = product5;
const stats = [
  { value: "10+", label: "Modules" },
  { value: "250+", label: "Clients" },
  { value: "99.9%", label: "Uptime SLA" },
];

const productCards = [
  {
    title: "HR Solution yet simplified",
    description: "User-friendly and easy-to-adapt HR/Payroll Software. Ensures compliance with Ministry of Manpower (MOM) regulations. Offers various reports for easy management and data analysis. Secure and compliant with robust encryption and regular backups.",
    image: image1,
  },
  {
    title: "Auto Generated Documents",
    description: "Easily ensure KET's compliance with MOM in just one click. Generate Employment Contracts with a simple click. Print Increment letters instantly with one click. Customize templates to meet your company's specific needs. Access documents anytime, anywhere for added convenience.",
    image: image2,
  },
  {
    title: "Seamless Employee Management",
    description:
      "Access all employee data from a centralized location for seamless management. Receive smart reminders for timely document renewals. Effortlessly set up recurring allowances and deductions. Customize the software to accommodate new data based on your company's requirements.",
    image: image3,
  },
  {
    title: "Payslips for all employees in ONE click",
    description: "Easily generate reports in Manpower (MOM) format for regulatory compliance. Enjoy automatic CPF calculation as per CPF Board guidelines. Automatically deduct loans based on the provided schedule. Experience automated calculations for Government Donations. Seamlessly calculate SDL (Skills Development Levy) with ease.",
    image: image4,
  },
  {
    title: "Efficient Payroll Processing",
    description: "Our Payroll Software simplifies the complex task of payroll processing. It handles all aspects of calculating employee salaries, including regular wages, overtime, bonuses, and deductions. With automated calculations, you can say goodbye to manual errors and ensure accurate paychecks every time.",
    image: image5,
  },
    {
        title: "Tax Compliance",
        description: "Stay up-to-date with the latest tax regulations and ensure compliance with tax authorities. Our software calculates and withholds the correct amount of income tax, CPF (Central Provident Fund), and other statutory deductions, reducing the risk of non-compliance and penalties.",
        image: image6,
    },
    {
        title: "Historical Data Tracking",
        description: "Easily access historical payroll data and reports. This feature is invaluable for audits, year-end reporting, and employee inquiries. You can quickly retrieve past payslips, tax forms, and payroll summaries.",
        image: image7,
    },
    {
        title: "Customizable Payslips",
        description: "Tailor payslips to meet your company's specific needs. Include company branding, logos, and any additional information you deem necessary. Our software generates professional, itemized payslips that are easy for employees to understand.",
        image: image8,
    },
    {
        title: "Comprehensive Reporting",
        description: "Generate a variety of reports to gain insights into your company's payroll expenses, trends, and patterns. Use these reports for budgeting, forecasting, and strategic decision-making.",
        image: image9,
    },
    {
        title: "Leave and Attendance Management",
        description: "Our Payroll Software offers integrated leave and attendance management. Track employee attendance, manage leave requests, and automatically factor this data into payroll calculations. This ensures accurate and fair pay based on attendance records.",
        image: image10,
    },
];

const faqs = [
  {
    question: "What is UTS Payroll?",
    answer: "Introducing our Payroll Software that efficiently calculates and generates itemized payslips for all employees, compliant with MOM and KET'S format. With automatic CPF & Loan deductions, you can bid farewell to late submissions, penalties, and delayed paydays. Enjoy the user-friendly interface, suitable for any company in Singapore.",
  },
  {
    question: "How does it simplify HR and Payroll?",
    answer: "Our software is user-friendly, ensures MOM compliance, offers various reports for data analysis, and is secure with robust encryption and regular backups.",
  },
  {
    question: "What documents can be auto-generated?",
    answer: "You can easily generate KET's compliance documents, Employment Contracts, and Increment letters with a single click. Templates can be customized to meet your company's specific needs, and documents are accessible anytime, anywhere.",
  },
  {
    question: "How does it help with employee management?",
    answer: "Access all employee data from a centralized location, receive smart reminders for document renewals, set up recurring allowances and deductions, and customize the software to accommodate new data based on your company's requirements.",
  },
  {
    question: "How are payslips generated?",
    answer: "Generate payslips for all employees in one click. The software automatically calculates CPF, deducts loans, handles Government Donations, and calculates SDL, all in compliance with MOM and CPF Board guidelines.",
  },
  {
    question: "What are the key features of payroll processing?",
    answer: "Our Payroll Software simplifies payroll processing by handling all aspects of calculating employee salaries, including regular wages, overtime, bonuses, and deductions. Automated calculations ensure accurate paychecks every time.",
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

const PayrollManagement = () => {
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
                Payroll <span className="text-cyan-300">Management</span>
                <br />
                Software
              </h1>

              <p className="mt-8 max-w-[560px] text-lg font-medium leading-8 text-[#7fa2b3]">
               Introducing our Payroll Software that efficiently calculates and generates itemized payslips for all employees, compliant with MOM and KET'S format. With automatic CPF & Loan deductions, you can bid farewell to late submissions, penalties, and delayed paydays. Enjoy the user-friendly interface, suitable for any company in Singapore.
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
                alt="Payroll management network interface"
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
                What is UTS Payroll — the ultimate HR and Payroll solution.
              </h2>
              <p className="max-w-[610px] text-lg font-medium leading-8 text-[#7fa2b3]">
                Designed to streamline and centralize all HR and payroll tasks, making your business operations more efficient and convenient.
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
                  Talk to our payroll management experts. We'll walk you through the platform, understand your workflow, and design a setup tailored to your team's goals.
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

export default PayrollManagement;