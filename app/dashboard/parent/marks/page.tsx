"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import type { LucideIcon } from "lucide-react";
import { Download, TrendingUp, TrendingDown, Minus } from "lucide-react";

// Dynamic import to avoid SSR issues with Recharts
const ResponsiveContainer = dynamic(
  () => import("recharts").then((m) => m.ResponsiveContainer),
  { ssr: false }
);
const LineChart = dynamic(
  () => import("recharts").then((m) => m.LineChart),
  { ssr: false }
);
const Line = dynamic(() => import("recharts").then((m) => m.Line), { ssr: false });
const XAxis = dynamic(() => import("recharts").then((m) => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then((m) => m.YAxis), { ssr: false });
const CartesianGrid = dynamic(
  () => import("recharts").then((m) => m.CartesianGrid),
  { ssr: false }
);
const Tooltip = dynamic(() => import("recharts").then((m) => m.Tooltip), { ssr: false });
const Legend = dynamic(() => import("recharts").then((m) => m.Legend), { ssr: false });

// ─── Mock data ────────────────────────────────────────────────────────────────
const SUBJECTS = [
  { name: "Mathematics", abbr: "Math", icon: "∑", color: "#3B82F6", latest: 92, max: 100, grade: "A+" },
  { name: "Science", abbr: "Sci", icon: "⚗", color: "#10b981", latest: 76, max: 100, grade: "A" },
  { name: "English", abbr: "Eng", icon: "✍", color: "#F59E0B", latest: 86, max: 100, grade: "A+" },
  { name: "Hindi", abbr: "Hin", icon: "क", color: "#a855f7", latest: 64, max: 100, grade: "B+" },
  { name: "Social Studies", abbr: "SSt", icon: "🌍", color: "#f97316", latest: 79, max: 100, grade: "A" },
  { name: "Computer Sc.", abbr: "CS", icon: "⌨", color: "#06b6d4", latest: 96, max: 100, grade: "A+" },
];

const CHART_DATA = [
  { test: "Unit 1", Math: 78, Sci: 72, Eng: 80, Hin: 58, SSt: 70, CS: 88 },
  { test: "Unit 2", Math: 82, Sci: 68, Eng: 75, Hin: 62, SSt: 74, CS: 90 },
  { test: "Mid Term", Math: 88, Sci: 74, Eng: 84, Hin: 60, SSt: 76, CS: 94 },
  { test: "Unit 3", Math: 85, Sci: 78, Eng: 82, Hin: 64, SSt: 78, CS: 92 },
  { test: "Unit 4", Math: 92, Sci: 76, Eng: 86, Hin: 64, SSt: 79, CS: 96 },
];

const MARKS_HISTORY = [
  { subject: "Mathematics", exam: "Unit Test 4", max: 50, scored: 46, pct: 92, grade: "A+" },
  { subject: "Science", exam: "Unit Test 4", max: 50, scored: 38, pct: 76, grade: "A" },
  { subject: "English", exam: "Essay Writing", max: 50, scored: 43, pct: 86, grade: "A+" },
  { subject: "Hindi", exam: "Grammar Test", max: 50, scored: 32, pct: 64, grade: "B+" },
  { subject: "Social Studies", exam: "Chapter Test", max: 50, scored: 39, pct: 78, grade: "A" },
  { subject: "Computer Sc.", exam: "Practical Exam", max: 50, scored: 48, pct: 96, grade: "A+" },
  { subject: "Mathematics", exam: "Unit Test 3", max: 50, scored: 42, pct: 84, grade: "A+" },
  { subject: "Science", exam: "Lab Record", max: 25, scored: 23, pct: 92, grade: "A+" },
  { subject: "English", exam: "Reading Comp.", max: 30, scored: 25, pct: 83, grade: "A" },
  { subject: "Hindi", exam: "Literature Test", max: 40, scored: 26, pct: 65, grade: "B+" },
];

const GRADE_COLOR: Record<string, string> = {
  "A+": "text-emerald-400",
  A: "text-green-400",
  "B+": "text-blue-400",
  B: "text-blue-300",
  C: "text-yellow-400",
};

const TOOLTIP_STYLE = {
  contentStyle: {
    background: "#0D1426",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    color: "#F1F5F9",
    fontSize: "12px",
  },
  labelStyle: { color: "#94a3b8", marginBottom: 4 },
  cursor: { stroke: "rgba(255,255,255,0.1)" },
};

type SortKey = "subject" | "exam" | "max" | "scored" | "pct" | "grade";

// ─── Subject card ──────────────────────────────────────────────────────────────
function SubjectCard({
  subject,
  delay,
}: {
  subject: (typeof SUBJECTS)[number];
  delay: number;
}) {
  const pct = subject.latest;
  const trend = pct >= 90 ? "up" : pct >= 70 ? "neutral" : "down";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="glass rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-colors duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-base shrink-0"
          style={{ background: `${subject.color}20`, color: subject.color }}
        >
          {subject.icon}
        </div>
        {trend === "up" && <TrendingUp size={14} className="text-emerald-400" />}
        {trend === "neutral" && <Minus size={14} className="text-muted" />}
        {trend === "down" && <TrendingDown size={14} className="text-red-400" />}
      </div>
      <p className="text-soft-white text-sm font-semibold mb-0.5">{subject.name}</p>
      <div className="flex items-baseline gap-1 mb-3">
        <span className="font-heading font-bold text-2xl" style={{ color: subject.color }}>
          {subject.latest}
        </span>
        <span className="text-muted text-xs">/{subject.max}</span>
        <span className={`ml-auto text-sm font-bold ${GRADE_COLOR[subject.grade]}`}>
          {subject.grade}
        </span>
      </div>
      {/* Progress bar */}
      <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: subject.color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, delay: delay + 0.2, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function MarksPage() {
  const [mounted, setMounted] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("subject");
  const [sortDir, setSortDir] = useState<1 | -1>(1);

  useEffect(() => setMounted(true), []);

  function handleSort(key: SortKey) {
    setSortDir((d) => (sortKey === key ? (d === 1 ? -1 : 1) : 1));
    setSortKey(key);
  }

  const sorted = [...MARKS_HISTORY].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    if (typeof av === "string" && typeof bv === "string")
      return av.localeCompare(bv) * sortDir;
    return ((av as number) - (bv as number)) * sortDir;
  });

  function handleDownload() {
    alert("Report card download will be available once the full system is live. 📄");
  }

  const SortIndicator = ({ k }: { k: SortKey }) =>
    sortKey === k ? (
      <span className="ml-0.5 text-electric">{sortDir === 1 ? "↑" : "↓"}</span>
    ) : null;

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="font-heading font-bold text-xl text-soft-white">
          Marks &amp; Reports
        </h2>
        <p className="text-muted text-sm">Arjun Sharma · Academic Year 2025–26</p>
      </motion.div>

      {/* Subject cards grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {SUBJECTS.map((s, i) => (
          <SubjectCard key={s.name} subject={s} delay={0.08 + i * 0.06} />
        ))}
      </div>

      {/* Performance chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="glass rounded-2xl p-6 border border-white/10 mb-6"
      >
        <h3 className="text-soft-white font-semibold text-sm mb-5">
          Performance Trend (Last 5 Tests)
        </h3>
        {mounted && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={CHART_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="test" stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} domain={[40, 100]} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              {SUBJECTS.map((s) => (
                <Line
                  key={s.abbr}
                  type="monotone"
                  dataKey={s.abbr}
                  stroke={s.color}
                  strokeWidth={2}
                  dot={{ fill: s.color, r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </motion.div>

      {/* Marks history table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="glass rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-soft-white font-semibold text-sm">Marks History</h3>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-navy transition-all duration-200 hover:scale-105 glow-gold"
            style={{ background: "linear-gradient(135deg,#F59E0B,#D97706)" }}
          >
            <Download size={13} />
            Download Report Card
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-muted border-b border-white/8">
                {(
                  [
                    ["Subject", "subject"],
                    ["Exam Type", "exam"],
                    ["Max Marks", "max"],
                    ["Scored", "scored"],
                    ["Percentage", "pct"],
                    ["Grade", "grade"],
                  ] as [string, SortKey][]
                ).map(([label, key]) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className="text-left pb-3 font-medium pr-4 last:text-right cursor-pointer hover:text-soft-white transition-colors select-none"
                  >
                    {label}
                    <SortIndicator k={key} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors"
                >
                  <td className="py-2.5 text-soft-white/90 font-medium pr-4">
                    {row.subject}
                  </td>
                  <td className="py-2.5 text-muted pr-4">{row.exam}</td>
                  <td className="py-2.5 text-muted pr-4">{row.max}</td>
                  <td className="py-2.5 text-soft-white pr-4">{row.scored}</td>
                  <td className="py-2.5 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-12 bg-white/8 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${row.pct}%`,
                            background:
                              row.pct >= 90
                                ? "#10b981"
                                : row.pct >= 75
                                ? "#3B82F6"
                                : "#F59E0B",
                          }}
                        />
                      </div>
                      <span
                        className={
                          row.pct >= 90
                            ? "text-emerald-400"
                            : row.pct >= 75
                            ? "text-blue-400"
                            : "text-yellow-400"
                        }
                      >
                        {row.pct}%
                      </span>
                    </div>
                  </td>
                  <td className={`py-2.5 text-right font-bold ${GRADE_COLOR[row.grade] ?? "text-soft-white"}`}>
                    {row.grade}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
