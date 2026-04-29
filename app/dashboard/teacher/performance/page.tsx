"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Bell } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ClassData {
  distribution: { grade: string; count: number }[];
  trend: { label: string; avg: number }[];
  topStudents: { rank: number; name: string; avg: number; grade: string; trend: "up" | "down" | "same" }[];
  needsAttention: { name: string; avg: number }[];
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const CLASSES = ["Grade 9A", "Grade 8B", "Grade 10A"];

const CLASS_DATA: Record<string, ClassData> = {
  "Grade 9A": {
    distribution: [
      { grade: "A+", count: 4 },
      { grade: "A", count: 5 },
      { grade: "B+", count: 3 },
      { grade: "B", count: 2 },
      { grade: "C", count: 1 },
      { grade: "F", count: 0 },
    ],
    trend: [
      { label: "UT1", avg: 74 },
      { label: "UT2", avg: 78 },
      { label: "UT3", avg: 82 },
      { label: "Mid Term", avg: 80 },
    ],
    topStudents: [
      { rank: 1, name: "Divya Singh", avg: 94, grade: "A+", trend: "up" },
      { rank: 2, name: "Arjun Sharma", avg: 92, grade: "A+", trend: "up" },
      { rank: 3, name: "Sneha Reddy", avg: 86, grade: "A", trend: "same" },
      { rank: 4, name: "Priya Patel", avg: 84, grade: "A", trend: "up" },
      { rank: 5, name: "Aakash Nair", avg: 76, grade: "B+", trend: "down" },
    ],
    needsAttention: [
      { name: "Nikhil Gupta", avg: 58 },
      { name: "Kiran Kumar", avg: 65 },
    ],
  },
  "Grade 8B": {
    distribution: [
      { grade: "A+", count: 2 },
      { grade: "A", count: 4 },
      { grade: "B+", count: 4 },
      { grade: "B", count: 3 },
      { grade: "C", count: 1 },
      { grade: "F", count: 1 },
    ],
    trend: [
      { label: "UT1", avg: 68 },
      { label: "UT2", avg: 71 },
      { label: "UT3", avg: 74 },
      { label: "Mid Term", avg: 72 },
    ],
    topStudents: [
      { rank: 1, name: "Ananya Rao", avg: 96, grade: "A+", trend: "up" },
      { rank: 2, name: "Pooja Mehta", avg: 83, grade: "A", trend: "same" },
      { rank: 3, name: "Kiran Kumar", avg: 75, grade: "B+", trend: "up" },
      { rank: 4, name: "Aakash Nair", avg: 73, grade: "B+", trend: "down" },
      { rank: 5, name: "Priya Patel", avg: 70, grade: "B+", trend: "up" },
    ],
    needsAttention: [
      { name: "Rohit Das", avg: 55 },
    ],
  },
  "Grade 10A": {
    distribution: [
      { grade: "A+", count: 3 },
      { grade: "A", count: 4 },
      { grade: "B+", count: 3 },
      { grade: "B", count: 3 },
      { grade: "C", count: 2 },
      { grade: "F", count: 0 },
    ],
    trend: [
      { label: "UT1", avg: 65 },
      { label: "UT2", avg: 68 },
      { label: "UT3", avg: 71 },
      { label: "Mid Term", avg: 70 },
    ],
    topStudents: [
      { rank: 1, name: "Lakshmi Devi", avg: 91, grade: "A+", trend: "up" },
      { rank: 2, name: "Meera Joshi", avg: 81, grade: "A", trend: "up" },
      { rank: 3, name: "Arjun Sharma", avg: 79, grade: "B+", trend: "same" },
      { rank: 4, name: "Suresh Babu", avg: 73, grade: "B+", trend: "down" },
      { rank: 5, name: "Divya Singh", avg: 70, grade: "B+", trend: "up" },
    ],
    needsAttention: [
      { name: "Rahul Verma", avg: 56 },
      { name: "Vikram Pillai", avg: 68 },
    ],
  },
};

const PIE_COLORS: Record<string, string> = {
  "A+": "#10b981",
  A: "#22c55e",
  "B+": "#3B82F6",
  B: "#38bdf8",
  C: "#F59E0B",
  F: "#ef4444",
};

const GRADE_STYLE: Record<string, string> = {
  "A+": "text-emerald-400",
  A: "text-green-400",
  "B+": "text-blue-400",
  B: "text-sky-400",
  C: "text-yellow-400",
  F: "text-red-400",
};

const MEDAL: Record<number, { bg: string; text: string; label: string }> = {
  1: { bg: "bg-gold/15", text: "text-gold", label: "🥇" },
  2: { bg: "bg-slate-400/15", text: "text-slate-300", label: "🥈" },
  3: { bg: "bg-amber-700/15", text: "text-amber-600", label: "🥉" },
};

function TrendIcon({ trend }: { trend: "up" | "down" | "same" }) {
  if (trend === "up") return <TrendingUp size={13} className="text-emerald-400" />;
  if (trend === "down") return <TrendingDown size={13} className="text-red-400" />;
  return <Minus size={13} className="text-muted" />;
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────
function LineTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass border border-white/15 rounded-xl px-3 py-2 text-xs">
      <p className="text-muted mb-1">{label}</p>
      <p className="text-electric font-bold">{payload[0].value}%</p>
    </div>
  );
}

function PieTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass border border-white/15 rounded-xl px-3 py-2 text-xs">
      <p className="font-bold" style={{ color: payload[0].payload.fill }}>
        Grade {payload[0].name}
      </p>
      <p className="text-muted">{payload[0].value} students</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PerformancePage() {
  const [activeClass, setActiveClass] = useState("Grade 9A");
  const data = CLASS_DATA[activeClass];

  const pieData = data.distribution
    .filter((d) => d.count > 0)
    .map((d) => ({ name: d.grade, value: d.count, fill: PIE_COLORS[d.grade] }));

  return (
    <div className="max-w-6xl mx-auto">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h2 className="font-heading font-bold text-2xl text-soft-white">
          Class Performance Insights
        </h2>
        <p className="text-muted text-sm mt-0.5">Analytics and insights for each class</p>
      </motion.div>

      {/* Class selector */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.06 }}
        className="flex gap-2 mb-6"
      >
        {CLASSES.map((cls) => (
          <button
            key={cls}
            onClick={() => setActiveClass(cls)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-150 ${
              activeClass === cls
                ? "bg-electric/15 text-electric border-electric/30"
                : "border-white/10 text-muted hover:border-white/20 hover:text-soft-white"
            }`}
          >
            {cls}
          </button>
        ))}
      </motion.div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Pie chart */}
        <motion.div
          key={`pie-${activeClass}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="glass rounded-2xl border border-white/10 p-5"
        >
          <h3 className="text-soft-white font-semibold text-sm mb-4">
            Performance Distribution
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                cx="40%"
                cy="50%"
                outerRadius={85}
                innerRadius={48}
                paddingAngle={3}
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span style={{ color: "#94a3b8", fontSize: 11 }}>Grade {value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Line chart */}
        <motion.div
          key={`line-${activeClass}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="glass rounded-2xl border border-white/10 p-5"
        >
          <h3 className="text-soft-white font-semibold text-sm mb-4">
            Test-wise Score Trend
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data.trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[50, 100]}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <Tooltip content={<LineTooltip />} />
              <Line
                type="monotone"
                dataKey="avg"
                stroke="#3B82F6"
                strokeWidth={2.5}
                dot={{ fill: "#3B82F6", r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#60a5fa", strokeWidth: 0 }}
                animationDuration={800}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top 5 + Needs Attention */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top 5 students */}
        <motion.div
          key={`top-${activeClass}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.14 }}
          className="lg:col-span-2 glass rounded-2xl border border-white/10 p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={15} className="text-gold" />
            <h3 className="text-soft-white font-semibold text-sm">Top 5 Students</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted text-xs border-b border-white/8">
                <th className="text-left pb-2.5 font-medium">Rank</th>
                <th className="text-left pb-2.5 font-medium">Student</th>
                <th className="text-right pb-2.5 font-medium">Avg Score</th>
                <th className="text-right pb-2.5 font-medium">Grade</th>
                <th className="text-right pb-2.5 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody>
              {data.topStudents.map((s, i) => {
                const medal = MEDAL[s.rank];
                return (
                  <motion.tr
                    key={s.rank}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: 0.2 + i * 0.05 }}
                    className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors"
                  >
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold ${
                          medal ? `${medal.bg} ${medal.text}` : "bg-white/5 text-muted"
                        }`}
                      >
                        {medal ? medal.label : s.rank}
                      </span>
                    </td>
                    <td className="py-3 text-soft-white font-medium">{s.name}</td>
                    <td className="py-3 text-right text-soft-white/80 font-semibold">
                      {s.avg}
                    </td>
                    <td className={`py-3 text-right font-bold ${GRADE_STYLE[s.grade] ?? "text-soft-white"}`}>
                      {s.grade}
                    </td>
                    <td className="py-3">
                      <div className="flex justify-end">
                        <TrendIcon trend={s.trend} />
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>

        {/* Needs attention */}
        <motion.div
          key={`attn-${activeClass}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="glass rounded-2xl border border-white/10 p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={15} className="text-red-400" />
            <h3 className="text-soft-white font-semibold text-sm">Needs Attention</h3>
          </div>

          {data.needsAttention.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center mb-2">
                <TrendingUp size={18} className="text-emerald-400" />
              </div>
              <p className="text-emerald-400 text-sm font-medium">All students on track!</p>
              <p className="text-muted text-xs mt-1">No students below 60%</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {data.needsAttention.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.28 + i * 0.06 }}
                  className="p-3.5 rounded-xl border border-red-500/20 bg-red-500/6"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <p className="text-soft-white text-sm font-semibold">{s.name}</p>
                      <p className="text-red-400 text-xs mt-0.5 font-medium">
                        Avg: {s.avg}% · Below 60%
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center shrink-0">
                      <AlertTriangle size={14} className="text-red-400" />
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/25 text-red-400 text-xs font-medium hover:bg-red-500/10 transition-colors">
                    <Bell size={11} />
                    Send Notice
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
