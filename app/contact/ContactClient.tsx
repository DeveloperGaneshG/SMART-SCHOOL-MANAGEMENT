"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  AlertCircle,
  Loader2,
  Send,
  ExternalLink,
} from "lucide-react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { getSupabase } from "@/lib/supabase";

// ─── Types ────────────────────────────────────────────────────────────────────

type ContactFormData = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

function ContactHero() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden bg-navy"
      style={{ minHeight: "52vh" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(59,130,246,0.12) 0%, transparent 60%), " +
            "radial-gradient(ellipse 50% 40% at 80% 70%, rgba(245,158,11,0.07) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(10,15,30,0.4), rgba(10,15,30,0.85))",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32 pb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-electric text-xs font-medium tracking-[0.25em] uppercase block mb-5"
        >
          Reach Out
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-soft-white leading-tight mb-4"
        >
          Get In Touch{" "}
          <span className="text-electric">With Us</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="h-0.5 w-28 mx-auto mb-5 rounded-full"
          style={{
            background: "linear-gradient(to right, #3B82F6, #F59E0B)",
            transformOrigin: "left center",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-muted text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
        >
          We'd love to hear from you
        </motion.p>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0a0f1e)" }}
      />
    </section>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

function inputClass(hasError: boolean) {
  return `w-full bg-white/5 border rounded-xl px-4 py-3 text-soft-white text-sm placeholder-muted/50 outline-none transition-all duration-200 focus:border-electric focus:bg-white/8 ${
    hasError ? "border-red-500/60" : "border-white/10"
  }`;
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);
    try {
      const { error } = await getSupabase().from("contact_messages").insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone || "",
        subject: data.subject,
        message: data.message,
      });
      if (error) throw error;
      setSubmitted(true);
      reset();
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center min-h-[400px]"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center mx-auto mb-6"
        >
          <motion.svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#34d399"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
          </motion.svg>
        </motion.div>
        <h3 className="font-heading font-bold text-2xl text-soft-white mb-3">
          Message Sent!
        </h3>
        <p className="text-muted text-sm leading-relaxed max-w-sm">
          We'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 px-6 py-2.5 rounded-full text-sm font-semibold border border-electric/40 text-electric hover:bg-electric/10 transition-colors duration-200"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className="glass rounded-2xl p-8"
    >
      <h2 className="font-heading font-bold text-2xl text-soft-white mb-6">
        Send Us a Message
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Full Name */}
        <div>
          <label className="text-xs text-muted/80 uppercase tracking-wider block mb-1.5">
            Full Name *
          </label>
          <input
            {...register("fullName", {
              required: "Full name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" },
            })}
            placeholder="e.g. Priya Sharma"
            className={inputClass(!!errors.fullName)}
          />
          {errors.fullName && (
            <p className="text-red-400 text-xs mt-1.5">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-xs text-muted/80 uppercase tracking-wider block mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            placeholder="e.g. priya@email.com"
            className={inputClass(!!errors.email)}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs text-muted/80 uppercase tracking-wider block mb-1.5">
            Phone Number
          </label>
          <input
            type="tel"
            {...register("phone", {
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Enter a valid 10-digit Indian mobile number",
              },
            })}
            placeholder="e.g. 9876543210"
            className={inputClass(!!errors.phone)}
          />
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1.5">{errors.phone.message}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label className="text-xs text-muted/80 uppercase tracking-wider block mb-1.5">
            Subject *
          </label>
          <select
            {...register("subject", { required: "Please select a subject" })}
            className={inputClass(!!errors.subject)}
          >
            <option value="" className="bg-navy">Select a subject</option>
            <option value="General Inquiry" className="bg-navy">General Inquiry</option>
            <option value="Admissions" className="bg-navy">Admissions</option>
            <option value="Fee Related" className="bg-navy">Fee Related</option>
            <option value="Complaint" className="bg-navy">Complaint</option>
            <option value="Other" className="bg-navy">Other</option>
          </select>
          {errors.subject && (
            <p className="text-red-400 text-xs mt-1.5">{errors.subject.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="text-xs text-muted/80 uppercase tracking-wider block mb-1.5">
            Message *
          </label>
          <textarea
            rows={5}
            {...register("message", {
              required: "Message is required",
              minLength: { value: 10, message: "Message must be at least 10 characters" },
            })}
            placeholder="Write your message here..."
            className={`${inputClass(!!errors.message)} resize-none`}
          />
          {errors.message && (
            <p className="text-red-400 text-xs mt-1.5">{errors.message.message}</p>
          )}
        </div>

        <AnimatePresence>
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-2 text-red-400 text-sm p-3 rounded-xl bg-red-500/10 border border-red-500/20"
            >
              <AlertCircle size={14} className="shrink-0" />
              {submitError}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-navy bg-gold glow-gold hover:bg-gold-dark transition-all duration-300 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send size={18} />
              Send Message
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}

// ─── Contact Info Cards ────────────────────────────────────────────────────────

const infoCards = [
  {
    icon: MapPin,
    title: "Address",
    lines: ["NH-16, Bheemunipatnam,", "Visakhapatnam – 531 163"],
    color: "#3B82F6",
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+91 891 234 5678 (Main)", "+91 891 234 5679 (Admissions)"],
    color: "#10B981",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@vizaginternational.edu.in", "admissions@vizaginternational.edu.in"],
    color: "#F59E0B",
  },
  {
    icon: Clock,
    title: "Office Hours",
    lines: ["Mon–Fri: 8:00 AM – 5:00 PM", "Saturday: 9:00 AM – 1:00 PM"],
    color: "#8B5CF6",
  },
];

function ContactInfoCards() {
  return (
    <div className="flex flex-col gap-4">
      {infoCards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="glass rounded-2xl p-5 flex items-start gap-4 hover:border-white/15 transition-all duration-300"
            style={{ border: `1px solid ${card.color}20` }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: `${card.color}15`, border: `1px solid ${card.color}30` }}
            >
              <Icon size={18} style={{ color: card.color }} />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-soft-white text-sm mb-1.5">
                {card.title}
              </h3>
              {card.lines.map((line) => (
                <p key={line} className="text-muted text-sm leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Main Contact Section ─────────────────────────────────────────────────────

function ContactMain() {
  return (
    <section className="relative py-20 bg-navy overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.05) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <ContactForm />
          <ContactInfoCards />
        </div>
      </div>
    </section>
  );
}

// ─── Map Placeholder ──────────────────────────────────────────────────────────

function MapPlaceholder() {
  return (
    <section className="relative py-6 bg-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="glass rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(59,130,246,0.2)" }}
        >
          <div
            className="relative flex flex-col items-center justify-center"
            style={{
              height: "320px",
              background:
                "linear-gradient(135deg, rgba(10,20,50,0.95) 0%, rgba(15,30,60,0.9) 50%, rgba(10,15,30,0.98) 100%)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative z-10 flex flex-col items-center gap-5">
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full border border-electric/40"
                />
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(59,130,246,0.2)",
                    border: "2px solid rgba(59,130,246,0.5)",
                    boxShadow: "0 0 30px rgba(59,130,246,0.3)",
                  }}
                >
                  <MapPin size={26} className="text-electric" />
                </div>
              </div>

              <div className="text-center">
                <p className="font-heading font-semibold text-soft-white text-lg mb-1">
                  Vizag International School
                </p>
                <p className="text-muted text-sm">NH-16, Bheemunipatnam, Visakhapatnam – 531 163</p>
              </div>

              <a
                href="https://maps.google.com/?q=Bheemunipatnam+Visakhapatnam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-electric/20 border border-electric/40 text-electric hover:bg-electric/30 transition-all duration-200"
              >
                <ExternalLink size={14} />
                View on Google Maps
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "What is the admission process?",
    a: "Fill the online form, attend a friendly aptitude assessment at our campus, submit the required documents, and complete the fee payment to confirm your seat.",
  },
  {
    q: "What curriculum does the school follow?",
    a: "We follow the CBSE curriculum with additional international exposure programs including Cambridge IGCSE tracks and IB preparation modules for senior students.",
  },
  {
    q: "What are the school timings?",
    a: "School timings are 8:30 AM to 3:30 PM, Monday through Saturday. Office hours are 8:00 AM to 5:00 PM on weekdays and 9:00 AM to 1:00 PM on Saturdays.",
  },
  {
    q: "Is transportation available?",
    a: "Yes, GPS-tracked school buses cover 30+ routes across Visakhapatnam. All buses are fitted with CCTV cameras and supervised by trained staff for student safety.",
  },
  {
    q: "How can I track my child's progress?",
    a: "Through our Parent Dashboard, accessible 24/7 via web and mobile. View attendance, marks, announcements, and communicate directly with teachers anytime.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-20 bg-navy overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(245,158,11,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-electric text-xs font-medium tracking-[0.25em] uppercase">
            FAQ
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-soft-white mt-2">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-2xl overflow-hidden"
                style={{
                  border: isOpen
                    ? "1px solid rgba(59,130,246,0.3)"
                    : "1px solid rgba(255,255,255,0.08)",
                  transition: "border-color 0.3s",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span
                    className={`font-heading font-semibold text-base transition-colors duration-200 pr-4 ${
                      isOpen ? "text-electric" : "text-soft-white"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`shrink-0 transition-colors duration-200 ${
                      isOpen ? "text-electric" : "text-muted"
                    }`}
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-6 pb-5 border-t border-white/8 pt-4">
                        <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactClient() {
  return (
    <main className="bg-navy overflow-x-hidden">
      <Navbar />
      <ContactHero />
      <ContactMain />
      <MapPlaceholder />
      <FAQSection />
      <Footer />
    </main>
  );
}
