"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── Types & mock data ────────────────────────────────────────────────────────
type DayStatus = "present" | "absent" | "late" | "holiday" | "none";

const MONTHLY_DATA: Record<string, Record<number, DayStatus>> = {
  "2026-04": {
    1: "present", 2: "present", 3: "late", 4: "holiday", 5: "holiday",
    6: "present", 7: "absent", 8: "present", 9: "present", 10: "present",
    11: "holiday", 12: "holiday", 13: "present", 14: "late", 15: "present",
    16: "present", 17: "present", 18: "holiday", 19: "holiday", 20: "present",
    21: "absent", 22: "present", 23: "present", 24: "present", 25: "holiday",
    26: "holiday", 27: "present", 28: "present", 29: "present", 30: "present",
  },
  "2026-03": {
    1: "holiday", 2: "present", 3: "present", 4: "present", 5: "late",
    6: "present", 7: "holiday", 8: "holiday", 9: "present", 10: "present",
    11: "present", 12: "absent", 13: "present", 14: "holiday", 15: "holiday",
    16: "present", 17: "present", 18: "present", 19: "present", 20: "late",
    21: "holiday", 22: "holiday", 23: "present", 24: "present", 25: "absent",
    26: "present", 27: "present", 28: "holiday", 29: "holiday", 30: "present", 31: "present",
  },
};

const MONTHLY_STATS = [
  { month: "November", present: 20, absent: 0, late: 2, pct: 100 },
  { month: "December", present: 18, absent: 1, late: 1, pct: 95 },
  { month: "January", present: 22, absent: 2, late: 1, pct: 92 },
  { month: "February", present: 19, absent: 1, late: 2, pct: 95 },
  { month: "March", present: 23, absent: 2, late: 3, pct: 93 },
  { month: "April", present: 20, absent: 2, late: 3, pct: 92 },
];

const STATUS_STYLE: Record<DayStatus, string> = {
  present: "bg-emerald-500/80 text-white border-emerald-500/40",
  absent: "bg-red-500/80 text-white border-red-500/40",
  late: "bg-yellow-500/80 text-navy border-yellow-500/40",
  holiday: "bg-white/5 text-muted/40 border-white/5",
  none: "bg-transparent border-transparent text-transparent",
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ─── Circular progress ─────────────────────────────────────────────────────────
function CircularProgress({ pct }: { pct: number }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const [offset, setOffset] = useState(circ);
  useEffect(() => {
    const id = setTimeout(() => setOffset(circ * (1 - pct / 100)), 100);
    return () => clearTimeout(id);
  }, [circ, pct]);

  return (
    <svg viewBox="0 0 100 100" className="w-28 h-28 -rotate-90">
      <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
      <circle
        cx="50" cy="50" r={r}
        fill="none"
        stroke="#3B82F6"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
      />
      <text
        x="50" y="54"
        textAnchor="middle"
        fill="#F1F5F9"
        fontSize="18"
        fontWeight="bold"
        style={{ transform: "rotate(90deg)", transformOrigin: "50px 50px" }}
      >
        {pct}%
      </text>
    </svg>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function AttendancePage() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-indexed

  function navigate(dir: -1 | 1) {
    setViewMonth((m) => {
      const next = m + dir;
      if (next < 0) { setViewYear((y) => y - 1); return 11; }
      if (next > 11) { setViewYear((y) => y + 1); return 0; }
      return next;
    });
  }

  const monthKey = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}`;
  const dayData = MONTHLY_DATA[monthKey] ?? {};

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: Array<{ day: number | null; status: DayStatus }> = [];
  for (let i = 0; i < firstDay; i++) cells.push({ day: null, status: "none" });
  for (let d = 1; d <= daysInMonth; d++) {
    const weekday = new Date(viewYear, viewMonth, d).getDay();
    const isWeekend = weekday === 0 || weekday === 6;
    cells.push({ day: d, status: isWeekend ? "holiday" : (dayData[d] ?? "present") });
  }

  const present = cells.filter((c) => c.status === "present").length;
  const absent = cells.filter((c) => c.status === "absent").length;
  const late = cells.filter((c) => c.status === "late").length;
  const total = present + absent + late;
  const pct = total > 0 ? Math.round(((present + late * 0.5) / total) * 100) : 0;

  const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString("en-IN", {
    month: "long", year: "numeric",
  });

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="font-heading font-bold text-xl text-soft-white">
          Attendance Calendar
        </h2>
        <p className="text-muted text-sm">Arjun Sharma · Grade 9 – Section A</p>
      </motion.div>

      {/* Calendar card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="glass rounded-2xl p-6 border border-white/10 mb-6"
      >
        {/* Month nav */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-white/8 text-muted hover:text-soft-white transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <h3 className="font-heading font-semibold text-soft-white text-base">
            {monthLabel}
          </h3>
          <button
            onClick={() => navigate(1)}
            className="p-2 rounded-lg hover:bg-white/8 text-muted hover:text-soft-white transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 mb-2">
          {WEEKDAYS.map((d) => (
            <div key={d} className="text-center text-muted text-xs font-medium py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((cell, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: idx * 0.005 }}
              className={`aspect-square flex items-center justify-center rounded-lg text-xs font-medium border ${STATUS_STYLE[cell.status]}`}
            >
              {cell.day}
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-white/8">
          {[
            { color: "bg-emerald-500", label: "Present" },
            { color: "bg-red-500", label: "Absent" },
            { color: "bg-yellow-500", label: "Late" },
            { color: "bg-white/10", label: "Holiday / Weekend" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded ${color}`} />
              <span className="text-muted text-xs">{label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass rounded-2xl p-6 border border-white/10 mb-6"
      >
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Ring */}
          <div className="relative shrink-0">
            <CircularProgress pct={pct} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-muted text-[10px]">Attendance</span>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1 w-full">
            {[
              { label: "Total Days", value: 180, color: "text-soft-white" },
              { label: "Present", value: present + 146, color: "text-emerald-400" },
              { label: "Absent", value: absent + 8, color: "text-red-400" },
              { label: "Late", value: late + 1, color: "text-yellow-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="glass rounded-xl p-3 border border-white/8 text-center">
                <p className={`font-heading font-bold text-2xl ${color}`}>{value}</p>
                <p className="text-muted text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Monthly breakdown table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.32 }}
        className="glass rounded-2xl p-6 border border-white/10"
      >
        <h3 className="text-soft-white font-semibold text-sm mb-4">
          Monthly Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted border-b border-white/8">
                {["Month", "Present", "Absent", "Late", "Attendance %"].map((h) => (
                  <th key={h} className="text-left pb-3 font-medium pr-4 last:text-right">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MONTHLY_STATS.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors"
                >
                  <td className="py-3 text-soft-white/90 font-medium pr-4">{row.month}</td>
                  <td className="py-3 text-emerald-400 pr-4">{row.present}</td>
                  <td className="py-3 text-red-400 pr-4">{row.absent}</td>
                  <td className="py-3 text-yellow-400 pr-4">{row.late}</td>
                  <td className="py-3 text-right">
                    <span className={`font-semibold ${row.pct >= 95 ? "text-emerald-400" : row.pct >= 85 ? "text-blue-400" : "text-yellow-400"}`}>
                      {row.pct}%
                    </span>
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
