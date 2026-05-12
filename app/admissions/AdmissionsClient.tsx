"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  ClipboardList,
  FileText,
  User,
  Users,
  Upload,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Phone,
  Mail,
  MapPin,
  Star,
  Shield,
  Clock,
  AlertCircle,
  Check,
} from "lucide-react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { getSupabase } from "@/lib/supabase";

function AdmissionsHero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-navy" style={{ minHeight: "60vh" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(59,130,246,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(245,158,11,0.08) 0%, transparent 60%)" }} />
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,15,30,0.4), rgba(10,15,30,0.85))" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32 pb-16">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 glow-gold" style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.4)" }}>
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-gold text-xs font-semibold tracking-widest uppercase">Seats Filling Fast</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-soft-white leading-tight mb-4">
          Begin Your <span className="text-electric">Journey</span> With Us
        </motion.h1>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }} className="h-0.5 w-28 mx-auto mb-5 rounded-full" style={{ background: "linear-gradient(to right, #3B82F6, #F59E0B)", transformOrigin: "left center" }} />

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.0 }} className="text-muted text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Admissions Open for 2025–26. Join 2,500+ students already experiencing world-class education at Vizag International School.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #0a0f1e)" }} />
    </section>
  );
}

const processSteps = [
  { number: "01", icon: FileText,      title: "Fill Online Form",       desc: "Complete our simple online application form with student and parent details.",               color: "#3B82F6" },
  { number: "02", icon: ClipboardList, title: "Document Verification",  desc: "Upload the required documents. Our team verifies them within 2 business days.",             color: "#F59E0B" },
  { number: "03", icon: User,          title: "Entrance Assessment",    desc: "Students attend a friendly aptitude test and interaction session at our campus.",            color: "#10B981" },
  { number: "04", icon: CheckCircle,   title: "Confirmation & Fee",     desc: "Receive your admission letter and complete the fee payment to secure your seat.",            color: "#8B5CF6" },
];

function ProcessSteps() {
  return (
    <section className="relative py-24 bg-navy overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }} className="text-center mb-16">
          <span className="text-electric text-xs font-medium tracking-[0.25em] uppercase">How It Works</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-soft-white mt-2">Admission Process</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px hidden lg:block">
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }} className="h-full origin-left" style={{ background: "linear-gradient(to right, #3B82F6, #F59E0B, #10B981, #8B5CF6)" }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.number} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, delay: i * 0.12 }} className="relative flex flex-col items-center text-center">
                  <div className="relative w-20 h-20 rounded-full flex items-center justify-center mb-5 z-10" style={{ background: `${step.color}15`, border: `2px solid ${step.color}40`, boxShadow: `0 0 20px ${step.color}30` }}>
                    <Icon size={28} style={{ color: step.color }} />
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: step.color, color: "#0a0f1e" }}>{step.number}</div>
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-soft-white mb-2">{step.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

type FormValues = {
  studentName: string;
  dob: string;
  gender: string;
  class: string;
  previousSchool: string;
  fatherName: string;
  motherName: string;
  phone: string;
  email: string;
  address: string;
  terms: boolean;
};

const classes = ["Class 1","Class 2","Class 3","Class 4","Class 5","Class 6","Class 7","Class 8","Class 9","Class 10","Class 11","Class 12"];
const documents = [
  { id: "birthCert", label: "Birth Certificate" },
  { id: "marksheet", label: "Previous Year Marksheet" },
  { id: "transfer",  label: "Transfer Certificate" },
  { id: "photos",    label: "Passport Size Photos (4 copies)" },
  { id: "aadhar",    label: "Aadhar Card (Student)" },
];

const stepFields: Record<number, (keyof FormValues)[]> = {
  1: ["studentName", "dob", "gender", "class", "previousSchool"],
  2: ["fatherName", "motherName", "phone", "email", "address"],
};

function inputClass(hasError: boolean) {
  return `w-full bg-white/5 border rounded-xl px-4 py-3 text-soft-white text-sm placeholder-muted/50 outline-none transition-all duration-200 focus:border-electric focus:bg-white/8 ${hasError ? "border-red-500/60" : "border-white/10"}`;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5">
      <AlertCircle size={11} />
      {message}
    </p>
  );
}

function AdmissionForm() {
  const [step, setStep] = useState(1);
  const [fileUploads, setFileUploads] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);

  const { register, trigger, watch, formState: { errors } } = useForm<FormValues>({ mode: "onTouched" });
  const watchAll = watch();

  const handleNext = async () => {
    const fieldsToValidate = stepFields[step];
    if (!fieldsToValidate) { setStep((s) => s + 1); return; }
    const valid = await trigger(fieldsToValidate);
    if (valid) setStep((s) => s + 1);
  };

  const onSubmit = async () => {
    const valid = await trigger(["terms"]);
    if (!valid) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const { error } = await getSupabase().from("admissions").insert({
        student_name: watchAll.studentName,
        date_of_birth: watchAll.dob,
        gender: watchAll.gender,
        applying_for_class: watchAll.class,
        previous_school: watchAll.previousSchool,
        father_name: watchAll.fatherName,
        mother_name: watchAll.motherName,
        contact_number: watchAll.phone,
        email: watchAll.email,
        address: watchAll.address,
        status: "pending",
      });
      if (error) throw error;
      setSubmitted(true);
    } catch {
      setSubmitError("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const progress = (step / 4) * 100;
  const stepLabels = ["Student Details", "Parent Details", "Documents", "Review & Submit"];
  const slideVariants = {
    enter: (dir: number) => ({ x: dir * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -60, opacity: 0 }),
  };

  const goNext = () => { setDirection(1); handleNext(); };
  const goPrev = () => { setDirection(-1); setStep((s) => s - 1); };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="glass rounded-2xl p-12 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center mx-auto mb-6">
          <Check size={36} className="text-emerald-400" />
        </motion.div>
        <h3 className="font-heading font-bold text-2xl sm:text-3xl text-soft-white mb-3">Application Submitted Successfully!</h3>
        <p className="text-muted text-sm leading-relaxed max-w-md mx-auto mb-6">
          Thank you, <span className="text-electric">{watchAll.studentName}</span>. We will contact you at <span className="text-gold">{watchAll.email}</span> within 48 hours.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs" style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}>
          <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
          <span className="text-electric">Application ID: VIS-{Date.now().toString().slice(-6)}</span>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="relative h-1 bg-white/8">
        <motion.div className="absolute left-0 top-0 h-full rounded-full" style={{ background: "linear-gradient(to right, #3B82F6, #F59E0B)" }} animate={{ width: `${progress}%` }} transition={{ duration: 0.45, ease: "easeOut" }} />
      </div>

      <div className="flex items-center justify-between px-6 pt-6 pb-2">
        {stepLabels.map((label, i) => {
          const n = i + 1;
          const done = step > n;
          const active = step === n;
          return (
            <div key={label} className="flex flex-col items-center gap-1 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${done ? "bg-electric text-navy" : active ? "border-2 border-electric text-electric" : "border border-white/15 text-muted"}`}>
                {done ? <Check size={13} /> : n}
              </div>
              <span className={`text-[10px] text-center hidden sm:block transition-colors duration-200 ${active ? "text-electric" : done ? "text-soft-white/70" : "text-muted"}`}>{label}</span>
            </div>
          );
        })}
      </div>

      <div className="px-6 pb-8 pt-4 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={step} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-xl text-soft-white mb-5">Student Details</h3>
                <div>
                  <label className="text-xs text-muted/80 uppercase tracking-wider block mb-1.5">Student Full Name *</label>
                  <input {...register("studentName", { required: "Student name is required", minLength: { value: 3, message: "Name must be at least 3 characters" } })} placeholder="e.g. Arjun Sharma" className={inputClass(!!errors.studentName)} />
                  <FieldError message={errors.studentName?.message} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted/80 uppercase tracking-wider block mb-1.5">Date of Birth *</label>
                    <input type="date" {...register("dob", { required: "Date of birth is required" })} className={inputClass(!!errors.dob)} />
                    <FieldError message={errors.dob?.message} />
                  </div>
                  <div>
                    <label className="text-xs text-muted/80 uppercase tracking-wider block mb-1.5">Gender *</label>
                    <div className="flex items-center gap-5 mt-2.5">
                      {["Male", "Female", "Other"].map((g) => (
                        <label key={g} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" value={g} {...register("gender", { required: "Gender is required" })} className="accent-electric" />
                          <span className="text-muted text-sm">{g}</span>
                        </label>
                      ))}
                    </div>
                    <FieldError message={errors.gender?.message} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted/80 uppercase tracking-wider block mb-1.5">Applying for Class *</label>
                    <select {...register("class", { required: "Please select a class" })} className={inputClass(!!errors.class)}>
                      <option value="" className="bg-navy">Select Class</option>
                      {classes.map((c) => <option key={c} value={c} className="bg-navy">{c}</option>)}
                    </select>
                    <FieldError message={errors.class?.message} />
                  </div>
                  <div>
                    <label className="text-xs text-muted/80 uppercase tracking-wider block mb-1.5">Previous School Name *</label>
                    <input {...register("previousSchool", { required: "Previous school is required" })} placeholder="e.g. St. Joseph's High School" className={inputClass(!!errors.previousSchool)} />
                    <FieldError message={errors.previousSchool?.message} />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-xl text-soft-white mb-5">Parent Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted/80 uppercase tracking-wider block mb-1.5">Father&apos;s Name *</label>
                    <input {...register("fatherName", { required: "Father's name is required" })} placeholder="e.g. Rajesh Sharma" className={inputClass(!!errors.fatherName)} />
                    <FieldError message={errors.fatherName?.message} />
                  </div>
                  <div>
                    <label className="text-xs text-muted/80 uppercase tracking-wider block mb-1.5">Mother&apos;s Name *</label>
                    <input {...register("motherName", { required: "Mother's name is required" })} placeholder="e.g. Priya Sharma" className={inputClass(!!errors.motherName)} />
                    <FieldError message={errors.motherName?.message} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted/80 uppercase tracking-wider block mb-1.5">Primary Contact Number *</label>
                    <input type="tel" {...register("phone", { required: "Phone number is required", pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit Indian mobile number" } })} placeholder="e.g. 9876543210" className={inputClass(!!errors.phone)} />
                    <FieldError message={errors.phone?.message} />
                  </div>
                  <div>
                    <label className="text-xs text-muted/80 uppercase tracking-wider block mb-1.5">Email Address *</label>
                    <input type="email" {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" } })} placeholder="e.g. rajesh@email.com" className={inputClass(!!errors.email)} />
                    <FieldError message={errors.email?.message} />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted/80 uppercase tracking-wider block mb-1.5">Home Address *</label>
                  <textarea rows={3} {...register("address", { required: "Address is required" })} placeholder="Flat / House No., Street, City, PIN Code" className={`${inputClass(!!errors.address)} resize-none`} />
                  <FieldError message={errors.address?.message} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="font-heading font-semibold text-xl text-soft-white mb-2">Documents Required</h3>
                <p className="text-muted text-sm mb-6">Please upload clear scans or photos of the following documents.</p>
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 rounded-xl transition-all duration-200" style={{ background: fileUploads[doc.id] ? "rgba(16,185,129,0.07)" : "rgba(255,255,255,0.03)", border: fileUploads[doc.id] ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(255,255,255,0.08)" }}>
                      <div className="flex items-center gap-3">
                        {fileUploads[doc.id] ? <CheckCircle size={16} className="text-emerald-400 shrink-0" /> : <div className="w-4 h-4 rounded-full border border-white/20 shrink-0" />}
                        <span className="text-sm text-soft-white">{doc.label}</span>
                      </div>
                      <label className="cursor-pointer">
                        <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => { if (e.target.files?.length) setFileUploads((prev) => ({ ...prev, [doc.id]: true })); }} />
                        <span className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all duration-200 ${fileUploads[doc.id] ? "text-emerald-400 bg-emerald-500/10" : "text-electric bg-electric/10 hover:bg-electric/20"}`}>
                          {fileUploads[doc.id] ? <><Check size={11} /> Uploaded</> : <><Upload size={11} /> Upload</>}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
                <p className="text-muted/60 text-xs mt-4">Accepted formats: PDF, JPG, PNG · Max size: 5 MB per file</p>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="font-heading font-semibold text-xl text-soft-white mb-5">Review &amp; Submit</h3>
                <div className="space-y-3 mb-6">
                  {[
                    { label: "Student Name", value: watchAll.studentName },
                    { label: "Date of Birth", value: watchAll.dob },
                    { label: "Gender", value: watchAll.gender },
                    { label: "Applying for", value: watchAll.class },
                    { label: "Previous School", value: watchAll.previousSchool },
                    { label: "Father's Name", value: watchAll.fatherName },
                    { label: "Mother's Name", value: watchAll.motherName },
                    { label: "Contact", value: watchAll.phone },
                    { label: "Email", value: watchAll.email },
                    { label: "Address", value: watchAll.address },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-start gap-4 py-2 border-b border-white/6">
                      <span className="text-muted text-xs uppercase tracking-wider shrink-0">{label}</span>
                      <span className="text-soft-white text-sm text-right">{value || <span className="text-muted/40 italic">Not filled</span>}</span>
                    </div>
                  ))}
                </div>
                <label className="flex items-start gap-3 cursor-pointer mb-4">
                  <input type="checkbox" {...register("terms", { required: "You must accept the terms to proceed" })} className="accent-electric mt-0.5" />
                  <span className="text-muted text-sm leading-relaxed">
                    I confirm all information provided is accurate and agree to the <a href="#" className="text-electric hover:underline">Terms &amp; Conditions</a> of Vizag International School.
                  </span>
                </label>
                <FieldError message={errors.terms?.message} />

                <AnimatePresence>
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2 text-red-400 text-sm mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20"
                    >
                      <AlertCircle size={14} className="shrink-0" />
                      {submitError}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button type="button" onClick={onSubmit} disabled={submitting} className="w-full py-3.5 rounded-xl font-semibold text-navy bg-gold glow-gold transition-all duration-300 hover:bg-gold-dark hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {submitting ? (
                    <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="w-4 h-4 border-2 border-navy/40 border-t-navy rounded-full" /> Submitting…</>
                  ) : "Submit Application"}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {step < 4 && (
          <div className="flex items-center justify-between mt-7 pt-6 border-t border-white/8">
            <button type="button" onClick={goPrev} disabled={step === 1} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-muted hover:text-soft-white transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronLeft size={16} /> Previous
            </button>
            <button type="button" onClick={goNext} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-electric text-white hover:bg-blue-500 glow-blue transition-all duration-200">
              Next Step <ChevronRight size={16} />
            </button>
          </div>
        )}
        {step === 4 && (
          <div className="flex items-center justify-start mt-7 pt-6 border-t border-white/8">
            <button type="button" onClick={goPrev} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-muted hover:text-soft-white transition-colors duration-200">
              <ChevronLeft size={16} /> Previous
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function AdmissionFormSection() {
  return (
    <section className="relative py-16 bg-navy overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 60% at 50% 40%, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className="text-center mb-10">
          <span className="text-electric text-xs font-medium tracking-[0.25em] uppercase">Apply Now</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-soft-white mt-2">Online Application Form</h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay: 0.1 }}>
          <AdmissionForm />
        </motion.div>
      </div>
    </section>
  );
}

const whyUs = [
  { icon: Star,   title: "Academic Excellence",    desc: "12 consecutive years of 100% board results with top rankers in state and national examinations.", color: "#F59E0B" },
  { icon: Shield, title: "Safe & Inclusive Campus", desc: "CCTV-monitored, GPS-tracked transport, and a zero-tolerance bullying policy for every student.",  color: "#3B82F6" },
  { icon: Clock,  title: "Holistic Development",   desc: "Beyond academics — sports, arts, coding clubs, and leadership programmes every semester.",          color: "#10B981" },
];

function WhyChooseUs() {
  return (
    <section className="relative py-20 bg-navy overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(245,158,11,0.04) 0%, transparent 60%)" }} />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }} className="text-center mb-12">
          <span className="text-electric text-xs font-medium tracking-[0.25em] uppercase">Our Difference</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-soft-white mt-2">Why Choose Us</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
          {whyUs.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, delay: i * 0.12 }} whileHover={{ y: -6, boxShadow: `0 20px 50px ${item.color}20` }} className="glass rounded-2xl p-7 cursor-default">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                  <Icon size={22} style={{ color: item.color }} />
                </div>
                <h3 className="font-heading font-semibold text-lg text-soft-white mb-2">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const contactCards = [
  { icon: Phone,  title: "Call Us",   detail: "+91 891 234 5678",                     sub: "Mon – Sat, 8 AM – 5 PM",      color: "#3B82F6" },
  { icon: Mail,   title: "Email Us",  detail: "admissions@vizaginternational.edu.in",  sub: "We respond within 24 hours",  color: "#F59E0B" },
  { icon: MapPin, title: "Visit Us",  detail: "NH-16, Bheemunipatnam, Visakhapatnam", sub: "PIN – 531 163, Andhra Pradesh",color: "#10B981" },
];

function ContactCards() {
  return (
    <section className="relative py-20 bg-navy overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }} className="text-center mb-12">
          <span className="text-electric text-xs font-medium tracking-[0.25em] uppercase">Get in Touch</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-soft-white mt-2">Contact for Admissions</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {contactCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, delay: i * 0.1 }} className="glass rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: `${card.color}15`, border: `1px solid ${card.color}30` }}>
                  <Icon size={20} style={{ color: card.color }} />
                </div>
                <h3 className="font-heading font-semibold text-soft-white mb-1">{card.title}</h3>
                <p className="text-electric text-sm font-medium mb-1 break-all">{card.detail}</p>
                <p className="text-muted text-xs">{card.sub}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function AdmissionsClient() {
  return (
    <main className="bg-navy overflow-x-hidden">
      <Navbar />
      <AdmissionsHero />
      <ProcessSteps />
      <AdmissionFormSection />
      <WhyChooseUs />
      <ContactCards />
      <Footer />
    </main>
  );
}
