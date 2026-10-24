import React, { useState } from "react";
import { MapPin, Mail, Send, CheckCircle2, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import image from "../assets/network (3).webp";
import image1 from "../assets/Bpo.webp";
import image2 from "../assets/india.webp";
import image3 from "../assets/singapore.webp";

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-cyan-400 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-3">
    {children}
  </p>
);

const inputClass =
  "w-full bg-[#0c1730]/80 border border-cyan-900/60 rounded-xl px-5 py-4 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/70 focus:ring-1 focus:ring-cyan-400/40 transition-colors";

const errorInputClass =
  "w-full bg-[#0c1730]/80 border border-red-500/70 rounded-xl px-5 py-4 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400/40 transition-colors";

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  details: string;
}

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
}

// Simple, practical email regex (covers standard cases without being overly strict)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Matches 10-digit numbers, optionally with +country code and spaces/dashes
const PHONE_REGEX = /^\+?[0-9]{1,4}?[-.\s]?\(?[0-9]{3,4}\)?[-.\s]?[0-9]{3,4}[-.\s]?[0-9]{3,4}$/;

const validateName = (value: string): string | undefined => {
  if (!value.trim()) return "Name is required";
  if (value.trim().length < 2) return "Enter a valid name";
  return undefined;
};

const validateCompany = (value: string): string | undefined => {
  if (!value.trim()) return "Company name is required";
  return undefined;
};

const validateEmail = (value: string): string | undefined => {
  if (!value.trim()) return "Email is required";
  if (!EMAIL_REGEX.test(value.trim())) return "Enter a valid email address";
  return undefined;
};

const validatePhone = (value: string): string | undefined => {
  const digitsOnly = value.replace(/\D/g, "");
  if (digitsOnly.length < 10 || digitsOnly.length > 13) {
    return "Enter a valid mobile number (10 digits)";
  }
  if (!PHONE_REGEX.test(value.trim())) {
    return "Enter a valid mobile number";
  }
  return undefined;
};

const EnquiryNow: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: "",
    details: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{
    name?: boolean;
    company?: boolean;
    email?: boolean;
    phone?: boolean;
  }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validators: Record<"name" | "company" | "email" | "phone", (v: string) => string | undefined> = {
    name: validateName,
    company: validateCompany,
    email: validateEmail,
    phone: validatePhone,
  };

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));

      // live-validate as the user types, but only after the field has been touched
      if (field in validators && (touched[field as keyof typeof touched] || submitted)) {
        const validate = validators[field as keyof typeof validators];
        setErrors((prev) => ({ ...prev, [field]: validate(value) }));
      }
    };

  const handleBlur = (field: "name" | "company" | "email" | "phone") => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validators[field](form[field]) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const nextErrors: FormErrors = {
      name: validateName(form.name),
      company: validateCompany(form.company),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
    };

    setErrors(nextErrors);
    setTouched({ name: true, company: true, email: true, phone: true });

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) {
      setSubmitted(false);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.details || data?.message || "Unable to send enquiry.");
      }

      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        product: "",
        details: "",
      });
      setTouched({});
      setErrors({});
      setIsSubmitting(false);
    } catch (error) {
      setSubmitted(false);
      setIsSubmitting(false);
      alert(error instanceof Error ? error.message : "Unable to send enquiry. Please try again.");
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setForm({
      name: "",
      company: "",
      email: "",
      phone: "",
      product: "",
      details: "",
    });
    setErrors({});
    setTouched({});
  };

  return (
    <div className="min-h-screen bg-[#060b1c] text-white">
      <Navbar />

      {/* Hero / circuit background */}
      <section className="relative z-0 overflow-hidden pt-32 md:pt-40 pb-16 px-6">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060b1c] via-[#060b1c]/50 to-[#060b1c] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <Eyebrow>Enquiry</Eyebrow>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Send An Enquiry
          </h1>
          <div className="w-16 h-1 bg-cyan-400 rounded-full mx-auto my-6" />
          <p className="text-slate-400 text-base">
            Tell us what you need and we&apos;ll get back to you with a quote.
          </p>
        </div>
      </section>

      {/* Form + side image */}
      <section className="relative px-6 pb-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,420px)_1fr] gap-8 items-start">
          {/* Side card */}
          <div className="relative rounded-2xl overflow-hidden h-full min-h-[340px] border border-white/5">
            <img
              src={image1}
              alt="Talk to our team"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold">Talk to our team</h3>
              <p className="text-slate-300 text-sm mt-1">
                Support across time zones — India &amp; Singapore.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-[#0a1226] border border-white/5 rounded-2xl p-6 md:p-8"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400/10">
                    <CheckCircle2 className="h-8 w-8 text-cyan-300" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white">Enquiry Received!</h3>
                    <p className="mx-auto mt-2 max-w-xs text-sm text-slate-400">
                      Thanks for reaching out. We'll get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="rounded-lg border border-cyan-400/60 px-5 py-2.5 text-sm font-semibold text-cyan-300 hover:bg-cyan-400/10 transition-colors"
                  >
                    Send Another Enquiry
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange("name")}
                        onBlur={handleBlur("name")}
                        className={errors.name ? errorInputClass : inputClass}
                        required
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={form.company}
                        onChange={handleChange("company")}
                        onBlur={handleBlur("company")}
                        className={errors.company ? errorInputClass : inputClass}
                        required
                      />
                      {errors.company && (
                        <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.company}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={handleChange("email")}
                        onBlur={handleBlur("email")}
                        className={errors.email ? errorInputClass : inputClass}
                        required
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="tel"
                        placeholder="Your Phone"
                        value={form.phone}
                        onChange={handleChange("phone")}
                        onBlur={handleBlur("phone")}
                        className={errors.phone ? errorInputClass : inputClass}
                        required
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="Product / Service Interested In"
                    value={form.product}
                    onChange={handleChange("product")}
                    className={`${inputClass} mt-4`}
                  />

                  <textarea
                    placeholder="Your Enquiry Details"
                    value={form.details}
                    onChange={handleChange("details")}
                    rows={6}
                    className={`${inputClass} mt-4 resize-y`}
                  />

                  <div className="flex justify-center mt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-60 disabled:cursor-not-allowed text-[#06101f] font-semibold rounded-full px-8 py-3.5 text-sm shadow-[0_0_25px_rgba(34,211,238,0.55)] transition-colors"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Submit Enquiry
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </section>

      {/* Company / locations */}
      <section className="relative px-6 pb-24 bg-gradient-to-b from-transparent via-transparent to-[#150826]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            United Technologies
          </h2>
          <a
            href="mailto:info@unitdtechnologies.com"
            className="mt-3 inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 text-sm"
          >
            <Mail size={16} />
            info@unitdtechnologies.com
          </a>

          <div className="mt-12 grid sm:grid-cols-2 gap-6 text-left">
            {[
              {
                country: "India",
                image: image2,
                lines: ["36, Balaji Nagar, 2nd Street,", "Royapettah, Chennai - 600014"],
              },
              {
                country: "Singapore",
                image: image3,
                lines: ["10 Jalan Besar #15-02A Sim Lim Tower", "Singapore - 208787"],
              },
            ].map((loc) => (
              <div
                key={loc.country}
                className="relative rounded-2xl overflow-hidden h-64 border border-white/5"
              >
                <img
                  src={loc.image}
                  alt={`${loc.country} office`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
                <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
                  <span className="w-11 h-11 rounded-full border border-cyan-400/60 flex items-center justify-center mb-4 bg-black/30">
                    <MapPin size={18} className="text-cyan-300" />
                  </span>
                  <h3 className="text-lg font-bold">{loc.country}</h3>
                  <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                    {loc.lines[0]}
                    <br />
                    {loc.lines[1]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default EnquiryNow;