import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Mail, Phone, MapPin, Clock,
  Linkedin, Twitter, Instagram, Facebook,
  Send, User, MessageSquare, CheckCircle2, Loader2, ChevronDown,
} from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

// ── schema ────────────────────────────────────────────────────────────────────
const schema = z.object({
  name:    z.string().min(2, "At least 2 characters required"),
  email:   z.string().email("Enter a valid email address"),
  phone:   z.string().regex(/^\+?[0-9\s\-()]{7,15}$/, "Enter a valid phone number").or(z.literal("")),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "At least 10 characters required"),
});
type Form = z.infer<typeof schema>;

const SUBJECTS = [
  "General Enquiry",
  "Web Development",
  "Mobile App Development",
  "AI & Automation",
  "Digital Marketing",
  "Partnership",
  "Other",
];

const INFO = [
  { icon: Mail,   label: "Email Us",      value: "info@unitedtechnologies.com", href: "mailto:info@unitedtechnologies.com" },
  { icon: Phone,  label: "Call Us",       value: "+65 1234 5678",              href: "tel:+6512345678" },
  { icon: MapPin, label: "Our Office",    value: "Singapore, South East Asia", href: null },
  { icon: Clock,  label: "Working Hours", value: "Mon – Fri, 9am – 6pm SGT",   href: null },
];

const SOCIALS = [
  { icon: Linkedin,  href: "#", label: "LinkedIn" },
  { icon: Twitter,   href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook,  href: "#", label: "Facebook" },
];

// ── plain, standard field styling (no glass/glow) ──────────────────────────────
const inp = (err: boolean) =>
  `w-full rounded-lg border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50
   transition-colors duration-150 focus:outline-none focus:ring-2
   ${err
    ? "border-destructive/50 focus:border-destructive focus:ring-destructive/15"
    : "border-border focus:border-primary focus:ring-primary/15"}`;

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-foreground">{label}</label>
      {children}
      {error && <p className="text-[11px] text-destructive">{error}</p>}
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────
const ContactSection = () => {
  const [form, setForm]     = useState<Form>({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone]     = useState(false);

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
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.details || data?.message || "Failed to send message");
      }
      setLoading(false);
      setDone(true);
      toast.success("Message sent! We'll be in touch within 24 hours.");
    } catch (error) {
      setLoading(false);
      toast.error(error instanceof Error ? error.message : "Failed to send message. Please try again.");
    }
  };

  const reset = () => {
    setDone(false);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setErrors({});
  };

  return (
    <section id="contact-us" className="relative py-24 bg-background">
      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">

        {/* ── header ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-[.2em] text-primary">Contact Us</span>
          <h2 className="mx-auto mt-3 max-w-[min(100%,36rem)] text-balance font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Get In Touch With Our Team
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Reach out through any of the channels below, or send us a message directly.
          </p>
          <div className="w-14 h-1 bg-primary mx-auto mt-5 rounded-full" />
        </motion.div>

        {/* ── info strip: 4 plain cards ── */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-4">
          {INFO.map(({ icon: Icon, label, value, href }, i) => {
            const Tag = href ? "a" : "div";
            const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                {/* @ts-ignore */}
                <Tag
                  {...props}
                  className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card px-4 py-6 text-center transition-colors hover:border-primary/40"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="break-words text-sm font-semibold leading-snug text-foreground [overflow-wrap:anywhere]">{value}</p>
                </Tag>
              </motion.div>
            );
          })}
        </div>

        {/* ── body: form (left) + map (right) in plain bordered cards ── */}
        <div className="grid gap-6 lg:grid-cols-2 items-start">

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-border bg-card p-6 sm:p-8"
          >
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground">Message Received!</h3>
                    <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">
                      Thanks for reaching out. We'll get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={reset}
                    className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                  >
                    Send Another Message
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
                  className="space-y-4"
                >
                  <h3 className="font-heading text-lg font-bold text-foreground mb-1">Send a Message</h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full Name *" error={errors.name}>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input type="text" name="name" placeholder="Jane Smith"
                          value={form.name} onChange={update} className={`${inp(!!errors.name)} pl-9`} />
                      </div>
                    </Field>
                    <Field label="Email Address *" error={errors.email}>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input type="email" name="email" placeholder="jane@company.com"
                          value={form.email} onChange={update} className={`${inp(!!errors.email)} pl-9`} />
                      </div>
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Phone (optional)" error={errors.phone}>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input type="tel" name="phone" placeholder="+65 1234 5678"
                          value={form.phone} onChange={update} className={`${inp(!!errors.phone)} pl-9`} />
                      </div>
                    </Field>
                    <Field label="Subject *" error={errors.subject}>
                      <div className="relative">
                        <select name="subject" value={form.subject} onChange={update}
                          className={`${inp(!!errors.subject)} appearance-none pr-9`}>
                          <option value="" disabled className="bg-card">Select a subject…</option>
                          {SUBJECTS.map(s => <option key={s} value={s} className="bg-card">{s}</option>)}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </Field>
                  </div>

                  <Field label="Message *" error={errors.message}>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                      <textarea name="message" rows={4}
                        placeholder="How can we help?"
                        value={form.message} onChange={update}
                        className={`${inp(!!errors.message)} resize-none pl-9`} />
                    </div>
                  </Field>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                      : <><Send className="h-4 w-4" /> Send Message</>}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* MAP */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="rounded-xl border border-border bg-card p-2 overflow-hidden relative"
            style={{ minHeight: "460px" }}
          >
            <iframe
              title="UTS Singapore"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.19891888645!2d103.70416215!3d1.3139961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da11238a8b9375%3A0x887869cf52abf5c4!2sSingapore!5e0!3m2!1sen!2ssg!4v1700000000000!5m2!1sen!2ssg"
              width="100%" height="100%"
              style={{
                border: 0,
                borderRadius: "0.5rem",
                filter: "invert(90%) hue-rotate(180deg) brightness(0.75) contrast(1.1) saturate(0.85)",
                position: "absolute",
                inset: "0.5rem",
                width: "calc(100% - 1rem)",
                height: "calc(100% - 1rem)",
              }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-foreground">Singapore HQ</span>
            </div>
          </motion.div>
        </div>

        {/* ── socials footer row ── */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Follow Us</span>
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
