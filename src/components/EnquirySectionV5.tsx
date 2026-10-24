import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Send, User, Mail, Phone, MessageSquare,
  CheckCircle2, Loader2, ChevronDown,
  BriefcaseBusiness, Users, Globe, ShieldCheck, ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "At least 2 characters required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().regex(/^\+?[0-9\s\-()]{7,15}$/, "Enter a valid phone number").or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "At least 10 characters required"),
});

type Form = z.infer<typeof schema>;

const SERVICES = [
  "Web Development",
  "Mobile App Development",
  "AI & Automation",
  "UI/UX Design",
  "Digital Marketing",
  "Cloud Solutions",
  "Other",
];

const STATS = [
  { icon: BriefcaseBusiness, value: "180+", label: "Projects Delivered" },
  { icon: Users,             value: "40+",  label: "Happy Clients" },
  { icon: Globe,             value: "12",   label: "Countries Served" },
  { icon: ShieldCheck,       value: "100%", label: "Delivery Rate" },
];

const inp = (err: boolean) =>
  `w-full rounded-lg border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40
   backdrop-blur-sm transition-colors duration-200 focus:outline-none focus:ring-2
   ${err
     ? "border-red-400/50 focus:border-red-400/70 focus:ring-red-400/10"
     : "border-white/10 focus:border-[#00A8FF]/60 focus:ring-[#00A8FF]/15"}`;

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-white/70 uppercase tracking-wide">{label}</label>
      {children}
      {error && <p className="text-[11px] text-red-400">{error}</p>}
    </div>
  );
}

export default function EnquirySectionV5() {
  const [form, setForm] = useState<Form>({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name as keyof Form]) setErrors(p => ({ ...p, [name]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = schema.safeParse(form);
    if (!res.success) {
      const fe: Partial<Record<keyof Form, string>> = {};
      res.error.errors.forEach(err => { fe[err.path[0] as keyof Form] = err.message; });
      setErrors(fe);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 1600));
    setLoading(false);
    setDone(true);
    toast.success("Enquiry submitted! We'll be in touch within 24 hours.");
  };

  const reset = () => {
    setDone(false);
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
    setErrors({});
  };

  return (
    <section className="min-h-screen bg-[#03050d] flex items-center py-16 relative overflow-hidden">
      {/* ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[160px]" />
        <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] rounded-full bg-cyan-500/8 blur-[160px]" />
      </div>

      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid lg:grid-cols-[420px_1fr] gap-8 xl:gap-12 items-start">

          {/* ── LEFT PANEL ── branded blue gradient, matches Hero CTA buttons */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-800 p-8 sm:p-10 relative overflow-hidden"
          >
            {/* decorative circles inside panel */}
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5" />
            <div className="absolute -bottom-16 -left-10 w-56 h-56 rounded-full bg-white/5" />

            <div className="relative z-10">
              {/* badge */}
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/90 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" />
                Get In Touch
              </span>

              <h2 className="mt-5 text-2xl sm:text-3xl font-black text-white leading-snug">
                Let's Build
                <br />
                <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                  Something Great
                </span>
                <br />
                Together
              </h2>

              <p className="mt-4 text-sm text-white/75 leading-relaxed">
                Share your project details below. Our team reviews every enquiry and
                responds within one business day — no obligation, just a conversation.
              </p>

              {/* divider */}
              <div className="my-8 border-t border-white/15" />

              {/* stats grid — same icon-box pattern as HeroSection */}
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                      <s.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-white leading-none">{s.value}</p>
                      <p className="text-[11px] text-white/65 mt-0.5 leading-tight">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* divider */}
              <div className="my-8 border-t border-white/15" />

              {/* quick contact */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-white/80">
                  <Mail className="w-4 h-4 shrink-0 text-cyan-300" />
                  info@unitedtechnologies.com
                </div>
                <div className="flex items-center gap-3 text-sm text-white/80">
                  <Phone className="w-4 h-4 shrink-0 text-cyan-300" />
                  +65 1234 5678
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT PANEL — dark glass form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-white/8 bg-white/3 backdrop-blur-md p-8 sm:p-10"
          >
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[480px] flex-col items-center justify-center gap-5 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-700 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Enquiry Received!</h3>
                    <p className="mt-2 max-w-xs text-sm text-white/60">
                      Thanks for reaching out. We'll get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={reset}
                    className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-white/80 hover:border-[#00A8FF]/50 hover:text-[#00A8FF] transition-colors"
                  >
                    Submit Another <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={submit}
                  noValidate
                  className="space-y-5"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white">Send Your Enquiry</h3>
                    <p className="text-sm text-white/50 mt-1">Fill in the details and we'll be in touch.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full Name *" error={errors.name}>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                        <input type="text" name="name" placeholder="Jane Smith"
                          value={form.name} onChange={update} className={`${inp(!!errors.name)} pl-10`} />
                      </div>
                    </Field>
                    <Field label="Email Address *" error={errors.email}>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                        <input type="email" name="email" placeholder="jane@company.com"
                          value={form.email} onChange={update} className={`${inp(!!errors.email)} pl-10`} />
                      </div>
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Phone (optional)" error={errors.phone}>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                        <input type="tel" name="phone" placeholder="+65 1234 5678"
                          value={form.phone} onChange={update} className={`${inp(!!errors.phone)} pl-10`} />
                      </div>
                    </Field>
                    <Field label="Service Interested In *" error={errors.service}>
                      <div className="relative">
                        <select name="service" value={form.service} onChange={update}
                          className={`${inp(!!errors.service)} appearance-none pr-9`}>
                          <option value="" disabled className="bg-[#0a0f1e]">Select a service…</option>
                          {SERVICES.map(s => <option key={s} value={s} className="bg-[#0a0f1e]">{s}</option>)}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                      </div>
                    </Field>
                  </div>

                  <Field label="Message *" error={errors.message}>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-white/30" />
                      <textarea name="message" rows={5}
                        placeholder="Tell us about your project, goals, and timeline…"
                        value={form.message} onChange={update}
                        className={`${inp(!!errors.message)} resize-none pl-10`} />
                    </div>
                  </Field>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-800 py-4 text-sm font-bold text-white hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading
                      ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                      : <><Send className="h-4 w-4" /> Submit Enquiry</>}
                  </button>

                  <p className="text-center text-[11px] text-white/30">
                    By submitting you agree to our privacy policy. No spam, ever.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
