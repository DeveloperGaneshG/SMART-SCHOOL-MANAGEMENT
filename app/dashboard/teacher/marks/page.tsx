"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { getSupabase } from "@/lib/supabase";

// â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface Student {
  roll: number;
  name: string;
}

interface MarksRow {
  marks: string;
  remarks: string;
}

// â”€â”€â”€ Mock data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const CLASSES = ["Grade 9A", "Grade 8B", "Grade 10A"];
const EXAM_TYPES = [
  "Unit Test 1", "Unit Test 2", "Unit Test 3",
  "Mid Term", "Final Exam", "Chapter Test",
];

const STUDENTS: Student[] = [
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

// â”€â”€â”€ Grade logic â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function calcGrade(marks: number, max: number): string {
  const pct = (marks / max) * 100;
  if (pct >= 90) return "A+";
  if (pct >= 80) return "A";
  if (pct >= 70) return "B+";
  if (pct >= 60) return "B";
  if (pct >= 50) return "C";
  return "F";
}

const GRADE_STYLE: Record<string, string> = {
  "A+": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  A: "bg-green-500/20 text-green-400 border-green-500/30",
  "B+": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  B: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  C: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  F: "bg-red-500/20 text-red-400 border-red-500/30",
};

// â”€â”€â”€ Dropdown â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function Dropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex-1 min-w-[160px]">
      <label className="text-muted text-xs font-medium block mb-1.5">{label}</label>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-white/15 bg-white/5 text-soft-white text-sm hover:border-white/25 transition-colors"
        >
          {value}
          <ChevronDown
            size={14}
            className={`text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full mt-1 w-full z-20 rounded-xl border border-white/15 overflow-hidden"
              style={{ background: "#131929" }}
            >
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={`w-full px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/8 ${
                    value === opt ? "text-electric" : "text-soft-white"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

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
export default function MarksPage() {
  const { data: session } = useSession();
  void session;

  const [selectedClass, setSelectedClass] = useState("Grade 9A");
  const [examType, setExamType] = useState("Unit Test 1");
  const [maxMarks, setMaxMarks] = useState(50);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);

  const initialRows: Record<number, MarksRow> = Object.fromEntries(
    STUDENTS.map((s) => [s.roll, { marks: "", remarks: "" }])
  );
  const [rows, setRows] = useState<Record<number, MarksRow>>(initialRows);

  function setField(roll: number, field: keyof MarksRow, val: string) {
    setRows((prev) => ({ ...prev, [roll]: { ...prev[roll], [field]: val } }));
  }

  const stats = useMemo(() => {
    const nums = STUDENTS.map((s) => {
      const v = parseFloat(rows[s.roll].marks);
      return isNaN(v) ? null : v;
    }).filter((v): v is number => v !== null);

    if (nums.length === 0) return { highest: 0, lowest: 0, avg: 0, passRate: 0 };
    const highest = Math.max(...nums);
    const lowest = Math.min(...nums);
    const avg = parseFloat((nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1));
    const passThreshold = maxMarks * 0.4;
    const passRate = Math.round((nums.filter((n) => n >= passThreshold).length / nums.length) * 100);
    return { highest, lowest, avg, passRate };
  }, [rows, maxMarks]);

  async function handleSave() {
    setSaving(true);
    try {
      const records = STUDENTS.map((s) => {
        const row = rows[s.roll];
        const marksVal = parseFloat(row.marks);
        const scored = isNaN(marksVal) ? 0 : marksVal;
        const grade = isNaN(marksVal) ? "F" : calcGrade(marksVal, maxMarks);
        return {
          student_id: String(s.roll),
          subject: "Mathematics",
          exam_type: examType,
          max_marks: maxMarks,
          scored_marks: scored,
          grade,
          remarks: row.remarks,
        };
      });
      const { error } = await getSupabase().from("marks").insert(records);
      if (error) throw error;
      setToast({ message: `Marks saved for ${selectedClass} â€“ ${examType}`, type: "success" });
    } catch {
      setToast({ message: "Something went wrong. Please try again.", type: "error" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto pb-32">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h2 className="font-heading font-bold text-2xl text-soft-white">Enter Marks</h2>
        <p className="text-muted text-sm mt-0.5">Record exam and test scores for your students</p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="glass rounded-2xl p-5 border border-white/10 mb-5 flex flex-wrap gap-4 items-end"
      >
        <Dropdown label="Class" value={selectedClass} options={CLASSES} onChange={(v) => { setSelectedClass(v); setLoaded(false); }} />
        <Dropdown label="Exam Type" value={examType} options={EXAM_TYPES} onChange={setExamType} />

        <div className="flex-1 min-w-[120px]">
          <label className="text-muted text-xs font-medium block mb-1.5">Max Marks</label>
          <input
            type="number"
            min={1}
            max={200}
            value={maxMarks}
            onChange={(e) => setMaxMarks(Number(e.target.value) || 50)}
            className="w-full px-3 py-2.5 rounded-xl border border-white/15 bg-white/5 text-soft-white text-sm focus:outline-none focus:border-electric/50 transition-colors"
            style={{ colorScheme: "dark" }}
          />
        </div>

        <div className="flex-1 min-w-[140px]">
          <label className="text-muted text-xs font-medium block mb-1.5">Subject</label>
          <div className="px-3 py-2.5 rounded-xl border border-white/10 bg-white/3 text-muted text-sm">
            Mathematics
          </div>
        </div>

        <button
          onClick={() => setLoaded(true)}
          className="px-5 py-2.5 rounded-xl bg-electric text-white text-sm font-semibold hover:bg-blue-500 transition-colors glow-blue"
        >
          Load Students
        </button>
      </motion.div>

      {/* Table */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="glass rounded-2xl border border-white/10 overflow-x-auto mb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-4 py-3 text-muted text-xs font-semibold">Roll</th>
                    <th className="text-left px-4 py-3 text-muted text-xs font-semibold">Student Name</th>
                    <th className="text-center px-4 py-3 text-muted text-xs font-semibold">
                      Marks (/ {maxMarks})
                    </th>
                    <th className="text-center px-4 py-3 text-muted text-xs font-semibold">Grade</th>
                    <th className="text-left px-4 py-3 text-muted text-xs font-semibold">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {STUDENTS.map((student, i) => {
                    const row = rows[student.roll];
                    const marksVal = parseFloat(row.marks);
                    const isOver = !isNaN(marksVal) && marksVal > maxMarks;
                    const grade =
                      !isNaN(marksVal) && !isOver ? calcGrade(marksVal, maxMarks) : null;

                    return (
                      <motion.tr
                        key={student.roll}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.03 }}
                        className={`border-b border-white/6 last:border-0 transition-colors ${
                          isOver ? "bg-red-500/6" : "hover:bg-white/3"
                        }`}
                      >
                        <td className="px-4 py-3 text-muted text-xs">{student.roll}</td>
                        <td className="px-4 py-3 text-soft-white font-medium">{student.name}</td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="number"
                            min={0}
                            max={maxMarks + 1}
                            value={row.marks}
                            onChange={(e) => setField(student.roll, "marks", e.target.value)}
                            placeholder="â€”"
                            className={`w-20 text-center px-2 py-1.5 rounded-lg border text-sm bg-white/5 focus:outline-none transition-colors ${
                              isOver
                                ? "border-red-500/50 text-red-400 focus:border-red-500"
                                : "border-white/15 text-soft-white focus:border-electric/50"
                            }`}
                            style={{ colorScheme: "dark" }}
                          />
                          {isOver && (
                            <p className="text-red-400 text-[10px] mt-0.5">Exceeds max</p>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {grade ? (
                            <span
                              className={`inline-block px-2 py-0.5 rounded-lg border text-xs font-bold ${GRADE_STYLE[grade]}`}
                            >
                              {grade}
                            </span>
                          ) : (
                            <span className="text-muted/40 text-xs">â€”</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={row.remarks}
                            onChange={(e) => setField(student.roll, "remarks", e.target.value)}
                            placeholder="Optional remark..."
                            className="w-full px-2 py-1.5 rounded-lg border border-white/10 bg-white/4 text-soft-white text-xs focus:outline-none focus:border-electric/40 placeholder:text-muted/40 transition-colors"
                          />
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="glass rounded-2xl border border-white/10 p-4 mb-5 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { label: "Highest", value: stats.highest, color: "#10b981", icon: TrendingUp },
                { label: "Lowest", value: stats.lowest, color: "#ef4444", icon: TrendingDown },
                { label: "Average", value: stats.avg, color: "#3B82F6", icon: null },
                { label: "Pass %", value: `${stats.passRate}%`, color: "#F59E0B", icon: null },
              ].map(({ label, value, color }) => (
                <div key={label} className="text-center">
                  <p className="text-muted text-xs mb-1">{label}</p>
                  <p className="font-heading font-bold text-xl" style={{ color }}>
                    {value}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Save button */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full py-3 rounded-xl bg-gold text-navy text-sm font-bold hover:bg-gold-dark transition-colors glow-gold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="w-4 h-4 border-2 border-navy/40 border-t-navy rounded-full" /> Savingâ€¦</>
              ) : (
                "Save Marks"
              )}
            </button>
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
