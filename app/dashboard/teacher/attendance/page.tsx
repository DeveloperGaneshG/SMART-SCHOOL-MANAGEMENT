"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, Users, AlertCircle, Clock, ChevronDown, CheckCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { getSupabase } from "@/lib/supabase";

// â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
type AttendanceStatus = "present" | "absent" | "late";

interface Student {
  roll: number;
  name: string;
}

// â”€â”€â”€ Mock data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const CLASSES = ["Grade 9A", "Grade 8B", "Grade 10A"];

const STUDENTS_9A: Student[] = [
  { roll: 1, name: "Arjun Sharma" },
  { roll: 2, name: "Priya Patel" },
  { roll: 3, name: "Rahul Verma" },
  { roll: 4, name: "Sneha Reddy" },
  { roll: 5, name: "Kiran Kumar" },
  { roll: 6, name: "Divya Singh" },
  { roll: 7, name: "Aakash Nair" },
  { roll: 8, name: "Pooja Mehta" },
  { roll: 9, name: "Rohit Das" },
  { roll: 10, name: "Ananya Rao" },
  { roll: 11, name: "Vikram Pillai" },
  { roll: 12, name: "Meera Joshi" },
  { roll: 13, name: "Suresh Babu" },
  { roll: 14, name: "Lakshmi Devi" },
  { roll: 15, name: "Nikhil Gupta" },
];

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  return parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0].slice(0, 2);
}

const AVATAR_GRADIENTS = [
  "from-blue-500 to-purple-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-red-500",
  "from-pink-500 to-rose-600",
  "from-violet-500 to-indigo-600",
  "from-cyan-500 to-blue-600",
  "from-yellow-500 to-orange-500",
  "from-green-500 to-emerald-600",
  "from-red-500 to-pink-600",
  "from-indigo-500 to-violet-600",
  "from-teal-500 to-cyan-600",
  "from-fuchsia-500 to-purple-600",
  "from-sky-500 to-blue-600",
  "from-lime-500 to-green-600",
  "from-amber-500 to-yellow-600",
];

const STATUS_CONFIG: Record<
  AttendanceStatus,
  { label: string; activeClass: string; icon: React.ReactNode }
> = {
  present: {
    label: "Present",
    activeClass: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    icon: <CheckCircle size={12} />,
  },
  absent: {
    label: "Absent",
    activeClass: "bg-red-500/20 text-red-400 border-red-500/40",
    icon: <AlertCircle size={12} />,
  },
  late: {
    label: "Late",
    activeClass: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
    icon: <Clock size={12} />,
  },
};

// â”€â”€â”€ Toast â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function Toast({
  message,
  type,
  onDone,
}: {
  message: string;
  type?: "success" | "error";
  onDone: () => void;
}) {
  const isError = type === "error";
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={() => setTimeout(onDone, 2200)}
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl border backdrop-blur-xl text-sm font-medium shadow-2xl ${
        isError
          ? "border-red-500/30 bg-red-500/15 text-red-400"
          : "border-emerald-500/30 bg-emerald-500/15 text-emerald-400"
      }`}
    >
      {isError ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
      {message}
    </motion.div>
  );
}

// â”€â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function AttendancePage() {
  const { data: session } = useSession();
  const markedBy = session?.user?.name ?? "Teacher";

  const [selectedClass, setSelectedClass] = useState("Grade 9A");
  const [classOpen, setClassOpen] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);

  const initialStatus: Record<number, AttendanceStatus> = Object.fromEntries(
    STUDENTS_9A.map((s) => [s.roll, "present" as AttendanceStatus])
  );
  const [statuses, setStatuses] = useState<Record<number, AttendanceStatus>>(initialStatus);

  const students = loaded ? STUDENTS_9A : [];

  const summary = {
    present: Object.values(statuses).filter((s) => s === "present").length,
    absent: Object.values(statuses).filter((s) => s === "absent").length,
    late: Object.values(statuses).filter((s) => s === "late").length,
  };

  function setStatus(roll: number, status: AttendanceStatus) {
    setStatuses((prev) => ({ ...prev, [roll]: status }));
  }

  function markAll(status: AttendanceStatus) {
    setStatuses(Object.fromEntries(STUDENTS_9A.map((s) => [s.roll, status])));
  }

  function handleLoad() {
    setLoaded(true);
    setSaved(false);
  }

  async function handleSubmit() {
    setSaving(true);
    try {
      const records = STUDENTS_9A.map((s) => ({
        student_id: String(s.roll),
        class: selectedClass,
        date,
        status: statuses[s.roll],
        marked_by: markedBy,
      }));
      const { error } = await getSupabase().from("attendance").insert(records);
      if (error) throw error;
      const d = new Date(date);
      const label = d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
      setSaved(true);
      setToast({ message: `Attendance saved for ${selectedClass} â€“ ${label}`, type: "success" });
    } catch {
      setToast({ message: "Something went wrong. Please try again.", type: "error" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-32">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h2 className="font-heading font-bold text-2xl text-soft-white">Mark Attendance</h2>
        <p className="text-muted text-sm mt-0.5">Record daily attendance for your classes</p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="glass rounded-2xl p-5 border border-white/10 mb-5 flex flex-wrap gap-4 items-end"
      >
        {/* Class selector */}
        <div className="flex-1 min-w-[160px]">
          <label className="text-muted text-xs font-medium block mb-1.5">Class</label>
          <div className="relative">
            <button
              onClick={() => setClassOpen(!classOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-white/15 bg-white/5 text-soft-white text-sm hover:border-white/25 transition-colors"
            >
              {selectedClass}
              <ChevronDown
                size={14}
                className={`text-muted transition-transform duration-200 ${classOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {classOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-1 w-full z-20 rounded-xl border border-white/15 overflow-hidden"
                  style={{ background: "#131929" }}
                >
                  {CLASSES.map((cls) => (
                    <button
                      key={cls}
                      onClick={() => { setSelectedClass(cls); setClassOpen(false); setLoaded(false); setSaved(false); }}
                      className={`w-full px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/8 ${
                        selectedClass === cls ? "text-electric" : "text-soft-white"
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Date */}
        <div className="flex-1 min-w-[160px]">
          <label className="text-muted text-xs font-medium block mb-1.5">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => { setDate(e.target.value); setSaved(false); }}
            className="w-full px-3 py-2.5 rounded-xl border border-white/15 bg-white/5 text-soft-white text-sm focus:outline-none focus:border-electric/50 transition-colors"
            style={{ colorScheme: "dark" }}
          />
        </div>

        {/* Subject */}
        <div className="flex-1 min-w-[140px]">
          <label className="text-muted text-xs font-medium block mb-1.5">Subject</label>
          <div className="px-3 py-2.5 rounded-xl border border-white/10 bg-white/3 text-muted text-sm">
            Mathematics
          </div>
        </div>

        {/* Load button */}
        <button
          onClick={handleLoad}
          className="px-5 py-2.5 rounded-xl bg-electric text-white text-sm font-semibold hover:bg-blue-500 transition-colors glow-blue"
        >
          Load Students
        </button>
      </motion.div>

      {/* Student list */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Bulk actions */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users size={14} className="text-muted" />
                <span className="text-muted text-xs">{students.length} students</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => markAll("present")}
                  className="px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors"
                >
                  Mark All Present
                </button>
                <button
                  onClick={() => markAll("absent")}
                  className="px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors"
                >
                  Mark All Absent
                </button>
              </div>
            </div>

            <div className="glass rounded-2xl border border-white/10 overflow-hidden">
              {students.map((student, i) => {
                const status = statuses[student.roll];
                return (
                  <motion.div
                    key={student.roll}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="flex items-center gap-4 px-5 py-3.5 border-b border-white/6 last:border-0 hover:bg-white/3 transition-colors"
                  >
                    {/* Avatar */}
                    <div
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]} flex items-center justify-center shrink-0`}
                    >
                      <span className="text-white text-[11px] font-bold uppercase">
                        {getInitials(student.name)}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-soft-white text-sm font-medium leading-snug">
                        {student.name}
                      </p>
                      <p className="text-muted text-[11px]">Roll #{student.roll}</p>
                    </div>

                    {/* Saved badge */}
                    {saved && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-medium border border-emerald-500/20 shrink-0"
                      >
                        <CheckCircle size={10} /> Saved
                      </motion.span>
                    )}

                    {/* Toggle buttons */}
                    <div className="flex gap-1.5 shrink-0">
                      {(["present", "absent", "late"] as AttendanceStatus[]).map((s) => {
                        const cfg = STATUS_CONFIG[s];
                        const isActive = status === s;
                        return (
                          <button
                            key={s}
                            onClick={() => setStatus(student.roll, s)}
                            disabled={saved}
                            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${
                              isActive
                                ? cfg.activeClass
                                : "border-white/10 text-muted hover:border-white/20 hover:text-soft-white"
                            }`}
                          >
                            {isActive && cfg.icon}
                            {cfg.label}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary bar (sticky bottom) */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="fixed bottom-0 left-0 right-0 lg:left-[260px] z-20 border-t border-white/10 px-6 py-4"
            style={{ background: "rgba(10,15,30,0.95)", backdropFilter: "blur(16px)" }}
          >
            <div className="max-w-4xl mx-auto flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-soft-white text-sm font-medium">
                    Present: <strong>{summary.present}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="text-soft-white text-sm font-medium">
                    Absent: <strong>{summary.absent}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="text-soft-white text-sm font-medium">
                    Late: <strong>{summary.late}</strong>
                  </span>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={saving || saved}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-colors glow-gold disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 ${
                  saved
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-gold text-navy hover:bg-gold-dark"
                }`}
              >
                {saving ? (
                  <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="w-4 h-4 border-2 border-navy/40 border-t-navy rounded-full" /> Savingâ€¦</>
                ) : saved ? (
                  <><CheckCircle size={15} /> Attendance Saved</>
                ) : (
                  "Submit Attendance"
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
