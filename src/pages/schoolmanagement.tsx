import { type ReactNode, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import PlatformCapabilitiesCarousel from "@/components/PlatformCapabilitiesCarousel";
import product3 from "../assets/product3.webp";
import image1 from "../assets/school-endroll.webp";
import image2 from "../assets/school-acadamic.webp";
import image3 from "../assets/school-asses.webp";
import image4 from "../assets/school-finance.webp";
import image5 from "../assets/school-admin.webp";
import image6 from "../assets/school-comm.webp";
import image7 from "../assets/school-centric.webp";
import image8 from "../assets/school-effortless.webp";
import image9 from "../assets/school-attandance.webp";
import image10 from "../assets/school-finance.webp";

const liveImageBase = "https://unitedweb.unitdtechnologies.com/assets";
const pmsHero = product3;
const stats = [
  { value: "12+", label: "Modules" },
  { value: "180+", label: "Projects Delivered" },
  { value: "99.9%", label: "Uptime SLA" },
];

const productCards = [
  {
    title: "Enrollment",
    description: "The software offers a seamless and user-friendly process for parent registration and student enrollment, simplifying the onboarding experience.The software automates Giro deductions for banks, facilitating easy and hassle-free payment processing for parents and guardians.The software sends automated email alerts to parents, ensuring they stay informed about important announcements and notices from the school.Student Data Access: Parent and student data are centralized within the software, providing easy access and quick references for school administrators and staff.The software sends SMS notifications to parents regarding their child's attendance, keeping them up-to-date with their child's school attendance status.",
    image: image1,
  },
  {
    title: "Academic",
    description: "Centralized Management of Multiple Branches, One-Click Student Transfers among Branches, Instant Promotion of Students to Higher Classes/Batches",
    image: image2,
  },
  {
    title: "Assessment",
    description:
      "Online Assessment for Courses/Subjects, Flexible Assessment Process Modification, Certificate and Grade Printing.Impressive Student Progress Reports.Emailing Parent-Student Progress Reports",
    image: image3,
  },
  {
    title: "Finance",
    description: "Smart Invoice Management for Tracking Outstanding Payments, One-Click Auto-Generation of Giro File for Payments.Multiple Payment Options for Flexibility.Centralized Payment Management for Students.Enhanced Reports to Manage Outstanding Payments",
    image: image4,
  },
  {
    title: "Admin Management",
    description: "Role-Based User Access for Staff Management, Impressive Dashboard Elements for Informed Decision-Making.Wide Range of Reports for Effective Planning.User-Friendly with Easily Adaptable Features.Cloud-Based Accessibility from Anywhere",
    image: image5,
  },
  {
    title: "Enhanced Communication",
    description: "Effective communication is at the heart of a successful educational institution. School management software offers a platform for seamless communication between teachers, parents, and students.Parents can receive real-time updates on their child's progress, upcoming events, and important announcements, fostering a strong partnership between home and school.",
    image: image6,
  },
   {
    title: "Student-Centric Approach",
    description:
      "School management software puts students at the center of the learning experience.It allows for the creation of individualized learning plans, tracks student progress, and facilitates easy communication with teachers.This student-centric approach ensures that each student's unique needs are met. ",
    image: image7,
  },
  {
    title: "Effortless Administrative",
    description: "Managing student data, attendance records, timetables, and admissions can be an overwhelming task.School management software automates these processes, reducing the administrative burden and freeing up valuable time for educators and administrators to focus on what truly matters: providing a quality education. ",
    image: image8,
  },
  {
    title: "Attendance Tracking",
    description: "Keeping track of student attendance is a critical aspect of school management.Manual attendance taking can be time-consuming and prone to errors.School management software automates the attendance tracking process, making it efficient and accurate.Teachers can record attendance with a few clicks, and parents can receive notifications if their child is absent, ensuring better accountability. ",
    image: image9,
  },
  {
    title: "Financial Management",
    description: "Schools often have complex financial operations, including fee collection, budgeting, and expense tracking.School management software includes financial management modules that simplify these tasks.Schools can generate invoices, track payments, and monitor their financial health with ease.This feature is particularly beneficial for administrators and finance personnel.",
    image: image10,
  },
];

const faqs = [
  {
    question: "What is the School Management Software?",
    answer: "UTS SMS (School Management Software) is a top-notch and user-friendly school software designed to meet all your daily needs in Singapore. This comprehensive software streamlines and centralizes all administration tasks, making school management more efficient and convenient.",
  },
  {
    question: "How does the enrolment process work?",
    answer: "The software offers a seamless and user-friendly process for parent registration and student enrollment, simplifying the onboarding experience. It also automates Giro deductions and sends automated email and SMS alerts to parents.",
  },
  {
    question: "What are the academic features?",
    answer: "The academic features include centralized management of multiple branches, one-click student transfers among branches, and instant promotion of students to higher classes/batches.",
  },
  {
    question: "How are assessments handled?",
    answer: "The software provides online assessment for courses/subjects, flexible assessment process modification, certificate and grade printing, impressive student progress reports, and the ability to email these reports to parents.",
  },
  {
    question: "What financial management tools are included?",
    answer: "The finance module includes smart invoice management, one-click auto-generation of Giro files for payments, multiple payment options, centralized payment management, and enhanced reports to manage outstanding payments.",
  },
  {
    question: "How is administration and security managed?",
    answer: "The software includes role-based user access for staff management, impressive dashboard elements for informed decision-making, a wide range of reports for effective planning, and is cloud-based for accessibility from anywhere.",
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

const SchoolManagement = () => {
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
                School <span className="text-cyan-300">Management</span>
                <br />
                Software
              </h1>

              <p className="mt-8 max-w-[560px] text-lg font-medium leading-8 text-[#7fa2b3]">
                 UTS SMS is a top-notch and user-friendly school software designed to meet all your daily needs in Singapore. This comprehensive software streamlines and centralizes all administration tasks, making school management more efficient and convenient.
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
                alt="School management network interface"
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
                What is UTS SMS — the operating system for modern schools.
              </h2>
              <p className="max-w-[610px] text-lg font-medium leading-8 text-[#7fa2b3]">
                Designed to streamline and centralize all administration tasks, making school management more efficient and convenient.
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
                  Talk to our school management experts. We'll walk you through the platform, understand your workflow, and design a setup tailored to your team's goals.
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

export default SchoolManagement;