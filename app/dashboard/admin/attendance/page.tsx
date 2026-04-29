"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CalendarCheck, Users, UserMinus, Clock, ChevronUp, ChevronDown } from "lucide-react";

const TEACHERS = [
  "Mr. Rajesh Kumar", "Ms. Priya Nair", "Dr. Anand Rajan", "Mrs. Sunita Mehta",
  "Mr. Sanjay Verma", "Ms. Kavitha Rao", "Mr. Dinesh Chandra", "Mrs. Rekha Iyer",
];

const GRADES = [6, 7, 8, 9, 10, 11, 12];
const SECTIONS = ["A", "B", "C", "D", "E"];
const ATT_VALUES = [96, 88, 92, 85, 94, 78, 97, 83, 90, 76, 95, 89, 91, 72, 98, 87, 93, 80, 86, 74, 99, 82, 88, 79, 94, 85, 91, 83, 77, 96, 84, 90, 73, 92, 87, 95];

const CLASSES = (() => {
  const rows = [];
  let idx = 0;
  for (const grade of GRADES) {
    for (const sec of SECTIONS) {
      if (idx >= 36) break;
      const att = ATT_VALUES[idx];
      const total = 38 + (idx % 7);
      const present = Math.round(total * att / 100);
      rows.push({
        id: idx + 1,
        name: `Grade ${grade}${sec}`,
        teacher: TEACHERS[idx % TEACHERS.length],
        total,
        present,
        absent: total - present - Math.floor(att / 30),
        late: Math.floor(att / 30),
        pct: att,
      });
      idx++;
    }
  }
  return rows;
})();

const THIRTY_DAYS = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  value: Math.round(85 + Math.random() * 14),
}));

const HEATMAP = [
  [92, 88, 95, 91],
  [94, 90, 93, 96],
  [87, 92, 91, 94],
  [95, 89, 96, 93],
  [91, 88, 94, 92],
];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const WEEKS = ["W1", "W2", "W3", "W4"];

function heatColor(v: number) {
  if (v >= 95) return "bg-emerald-500/80 text-emerald-100";
  if (v >= 90) return "bg-emerald-500/50 text-emerald-200";
  if (v >= 85) return "bg-yellow-500/50 text-yellow-200";
  if (v >= 75) return "bg-orange-500/50 text-orange-200";
  return "bg-red-500/50 text-red-200";
}

function pctColor(v: number) {
  if (v >= 90) return "bg-emerald-500";
  if (v >= 75) return "bg-yellow-500";
  return "bg-red-500";
}

function CircularRing({ pct }: { pct: number }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg viewBox="0 0 120 120" className="w-36 h-36">
      <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
      <motion.circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke="#3B82F6"
        strokeWidth="9"
        strokeDasharray={circ}
        strokeDashoffset={circ}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        strokeLinecap="round"
        transform="rotate(-90 60 60)"
      />
      <text x="60" y="56" textAnchor="middle" fill="#F1F5F9" fontSize="18" fontWeight="700" fontFamily="serif">
        {pct}%
      </text>
      <text x="60" y="71" textAnchor="middle" fill="#94A3B8" fontSize="9">
        Present
      </text>
    </svg>
  );
}

const PAGE_SIZE = 10;

export default function AttendancePage() {
  const [page, setPage] = useState(0);
  const [sortAsc, setSortAsc] = useState(false);

  const sorted = [...CLASSES].sort((a, b) => sortAsc ? a.pct - b.pct : b.pct - a.pct);
  const pageRows = sorted.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const totalPages = Math.ceil(CLASSES.length / PAGE_SIZE);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-heading font-bold text-2xl text-soft-white">Attendance Overview</h2>
        <p className="text-muted text-sm mt-1">School-wide attendance tracking and analytics</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex flex-wrap gap-3"
      >
        <input
          type="date"
          defaultValue="2026-04-28"
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-soft-white focus:outline-none focus:border-electric/50 transition-colors"
        />
        <select className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-soft-white focus:outline-none focus:border-electric/50 transition-colors">
          <option className="bg-[#0D1426]">All Classes</option>
          {GRADES.map((g) => <option key={g} className="bg-[#0D1426]">Grade {g}</option>)}
        </select>
      </motion.div>

      {/* Today's snapshot */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-5 gap-4"
      >
        <div className="lg:col-span-2 glass rounded-2xl p-5 border border-white/8 flex items-center justify-center">
          <div className="text-center">
            <CircularRing pct={94} />
            <p className="text-muted text-xs mt-2">School-wide Today</p>
            <p className="text-soft-white text-sm font-medium mt-0.5">2,395 / 2,547 students</p>
          </div>
        </div>
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: CalendarCheck, label: "Present", value: "2,395", sub: "94.2% attendance", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
            { icon: UserMinus, label: "Absent", value: "152", sub: "5.8% absent", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
            { icon: Clock, label: "Late", value: "47", sub: "1.8% late arrivals", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
          ].map(({ icon: Icon, label, value, sub, color, bg, border }) => (
            <div key={label} className={`glass rounded-2xl p-5 border ${border} flex flex-col justify-between`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg} mb-3`}>
                <Icon size={20} className={color} />
              </div>
              <div>
                <p className={`text-3xl font-heading font-bold ${color}`}>{value}</p>
                <p className="text-soft-white text-sm font-medium mt-0.5">{label}</p>
                <p className="text-muted text-xs mt-1">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Class-wise table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass rounded-2xl border border-white/8 overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between">
          <h3 className="font-heading font-semibold text-soft-white">Class-wise Attendance</h3>
          <p className="text-muted text-xs">Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, 36)} of 36 classes</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/8">
                {["Class", "Teacher", "Total", "Present", "Absent", "Late"].map((h) => (
                  <th key={h} className="text-left text-muted text-[11px] font-semibold uppercase tracking-wide px-5 py-3">{h}</th>
                ))}
                <th
                  className="text-left text-muted text-[11px] font-semibold uppercase tracking-wide px-5 py-3 cursor-pointer select-none"
                  onClick={() => setSortAsc(!sortAsc)}
                >
                  <span className="flex items-center gap-1">
                    %{sortAsc ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((cls, i) => (
                <motion.tr
                  key={cls.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-white/5 hover:bg-white/3 transition-colors"
                >
                  <td className="px-5 py-3 text-soft-white text-sm font-medium">{cls.name}</td>
                  <td className="px-5 py-3 text-muted text-sm">{cls.teacher}</td>
                  <td className="px-5 py-3 text-muted text-sm">{cls.total}</td>
                  <td className="px-5 py-3 text-emerald-400 text-sm">{cls.present}</td>
                  <td className="px-5 py-3 text-red-400 text-sm">{cls.absent}</td>
                  <td className="px-5 py-3 text-yellow-400 text-sm">{cls.late}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${pctColor(cls.pct)}`}
                          style={{ width: `${cls.pct}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${cls.pct >= 90 ? "text-emerald-400" : cls.pct >= 75 ? "text-yellow-400" : "text-red-400"}`}>
                        {cls.pct}%
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-4 border-t border-white/8">
          <p className="text-muted text-sm">Page {page + 1} of {totalPages}</p>
          <div className="flex gap-2">
            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1.5 rounded-lg text-sm border border-white/10 text-muted hover:text-soft-white hover:border-white/25 disabled:opacity-30 transition-colors"
            >
              Previous
            </button>
            <button
              disabled={page >= totalPages - 1}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1.5 rounded-lg text-sm border border-white/10 text-muted hover:text-soft-white hover:border-white/25 disabled:opacity-30 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </motion.div>

      {/* Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-5 border border-white/8"
      >
        <h3 className="font-heading font-semibold text-soft-white mb-4">Last 4 Weeks Heatmap</h3>
        <div className="overflow-x-auto">
          <div className="min-w-[320px]">
            <div className="grid grid-cols-5 gap-2 mb-2">
              <div />
              {WEEKS.map((w) => (
                <div key={w} className="text-muted text-xs text-center font-semibold">{w}</div>
              ))}
            </div>
            {DAYS.map((day, di) => (
              <div key={day} className="grid grid-cols-5 gap-2 mb-2">
                <div className="text-muted text-xs flex items-center font-semibold">{day}</div>
                {HEATMAP[di].map((val, wi) => (
                  <motion.div
                    key={wi}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 + (di * 4 + wi) * 0.02 }}
                    title={`${day} ${WEEKS[wi]}: ${val}%`}
                    className={`rounded-lg py-2 text-center text-xs font-semibold cursor-default transition-transform hover:scale-105 ${heatColor(val)}`}
                  >
                    {val}%
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-muted">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-emerald-500/80" /><span>≥95%</span></div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-emerald-500/50" /><span>90–95%</span></div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-yellow-500/50" /><span>85–90%</span></div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-red-500/50" /><span>&lt;85%</span></div>
        </div>
      </motion.div>

      {/* 30-day trend */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass rounded-2xl p-5 border border-white/8"
      >
        <h3 className="font-heading font-semibold text-soft-white mb-4">Last 30 Days Attendance Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={THIRTY_DAYS}>
            <defs>
              <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="day" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} interval={4} />
            <YAxis domain={[75, 100]} tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "#0D1426", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10 }}
              labelStyle={{ color: "#94A3B8" }}
              itemStyle={{ color: "#F1F5F9" }}
              formatter={(v) => [`${v}%`, "Attendance"]}
              labelFormatter={(v) => `Day ${v}`}
            />
            <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fill="url(#trendGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
