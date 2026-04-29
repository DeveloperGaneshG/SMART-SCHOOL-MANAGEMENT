"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import type { LucideIcon } from "lucide-react";
import {
  TrendingUp,
  TrendingDown,
  Award,
  CreditCard,
  CalendarDays,
  User,
  ChevronRight,
  Clock,
} from "lucide-react";

// ─── Animated counter ─────────────────────────────────────────────────────────
function useCounter(target: number, duration = 1500) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(ease * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);
  return value;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const ATTENDANCE_LAST10: ("present" | "absent" | "late")[] = [
  "present", "present", "late", "present", "absent",
  "present", "present", "present", "present", "late",
];

const RECENT_MARKS = [
  { subject: "Mathematics", test: "Unit Test 3", marks: 46, max: 50, grade: "A+", date: "Apr 18" },
  { subject: "Science", test: "Chapter Test", marks: 38, max: 50, grade: "A", date: "Apr 15" },
  { subject: "English", test: "Essay Writing", marks: 43, max: 50, grade: "A+", date: "Apr 12" },
  { subject: "Hindi", test: "Grammar Test", marks: 32, max: 50, grade: "B+", date: "Apr 10" },
  { subject: "Computer Sc.", test: "Practical Exam", marks: 48, max: 50, grade: "A+", date: "Apr 8" },
];

const ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Annual Day Celebrations",
    date: "Apr 25, 2026",
    desc: "Annual Day will be held on May 10th. Students are requested to be present by 9:00 AM in school uniform.",
    category: "Event",
  },
  {
    id: 2,
    title: "Final Exam Schedule Released",
    date: "Apr 22, 2026",
    desc: "Final examinations for Grade 9 begin on May 5th. Detailed timetable has been shared on the portal.",
    category: "Academic",
  },
  {
    id: 3,
    title: "Summer Vacation Notice",
    date: "Apr 20, 2026",
    desc: "School will remain closed from May 20th to June 15th for summer vacations.",
    category: "Holiday",
  },
];

const GRADE_COLOR: Record<string, string> = {
  "A+": "text-emerald-400",
  A: "text-green-400",
  "B+": "text-blue-400",
  B: "text-blue-300",
  C: "text-yellow-400",
};

const CATEGORY_COLOR: Record<string, string> = {
  Academic: "bg-electric/15 text-electric",
  Event: "bg-gold/15 text-gold",
  Holiday: "bg-emerald-500/15 text-emerald-400",
  Urgent: "bg-red-500/15 text-red-400",
};

const ATTENDANCE_DOT: Record<string, string> = {
  present: "bg-emerald-500",
  absent: "bg-red-500",
  late: "bg-yellow-500",
};

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  color,
  label,
  value,
  suffix,
  trend,
  delay,
}: {
  icon: LucideIcon;
  color: string;
  label: string;
  value: number;
  suffix: string;
  trend: "up" | "down" | "neutral";
  delay: number;
}) {
  const counted = useCounter(value, 1200);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-colors duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}20` }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        {trend === "up" && <TrendingUp size={14} className="text-emerald-400" />}
        {trend === "down" && <TrendingDown size={14} className="text-red-400" />}
      </div>
      <p className="font-heading font-bold text-2xl text-soft-white">
        {counted}
        <span className="text-base font-normal text-muted ml-0.5">{suffix}</span>
      </p>
      <p className="text-muted text-xs mt-1">{label}</p>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ParentOverviewPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="font-heading font-bold text-2xl text-soft-white">
          {greeting}, {firstName}! 👋
        </h2>
        <p className="text-muted text-sm mt-0.5">
          Here's what's happening with Arjun today.
        </p>
      </motion.div>

      {/* Student info card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="glass rounded-2xl p-5 border border-white/10 mb-6 flex flex-col sm:flex-row sm:items-center gap-4"
      >
        <div className="w-14 h-14 rounded-2xl bg-electric/20 flex items-center justify-center shrink-0">
          <span className="font-heading font-bold text-electric text-xl">AS</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="font-heading font-bold text-soft-white text-lg">
              Arjun Sharma
            </h3>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              92% Attendance
            </span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
            <span className="flex items-center gap-1 text-muted text-xs">
              <User size={11} /> Grade 9 – Section A
            </span>
            <span className="flex items-center gap-1 text-muted text-xs">
              <Award size={11} /> Roll No: 2024/09/A/15
            </span>
          </div>
        </div>
        <Link
          href="/dashboard/parent/marks"
          className="text-xs text-electric flex items-center gap-1 hover:gap-2 transition-all shrink-0"
        >
          View Report <ChevronRight size={13} />
        </Link>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={CalendarDays} color="#10b981" label="Attendance" value={92} suffix="%" trend="up" delay={0.12} />
        <StatCard icon={Award} color="#3B82F6" label="Current GPA" value={87} suffix="/100" trend="up" delay={0.18} />
        <StatCard icon={CreditCard} color="#F59E0B" label="Pending Fees" value={0} suffix="₹" trend="neutral" delay={0.24} />
        <StatCard icon={Clock} color="#a855f7" label="Next Exam" value={12} suffix=" Days" trend="neutral" delay={0.3} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Attendance summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="glass rounded-2xl p-5 border border-white/10"
        >
          <h3 className="text-soft-white font-semibold text-sm mb-4">
            Last 10 Days Attendance
          </h3>
          <div className="flex gap-2 flex-wrap mb-4">
            {ATTENDANCE_LAST10.map((status, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-5 h-5 rounded-full ${ATTENDANCE_DOT[status]} opacity-90`}
                />
                <span className="text-muted text-[9px]">{i + 1}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {[
              { color: "bg-emerald-500", label: "Present" },
              { color: "bg-red-500", label: "Absent" },
              { color: "bg-yellow-500", label: "Late" },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${color}`} />
                <span className="text-muted text-[10px]">{label}</span>
              </div>
            ))}
          </div>
          <Link
            href="/dashboard/parent/attendance"
            className="mt-4 flex items-center gap-1 text-xs text-electric hover:gap-2 transition-all"
          >
            Full calendar <ChevronRight size={12} />
          </Link>
        </motion.div>

        {/* Recent marks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.42 }}
          className="glass rounded-2xl p-5 border border-white/10 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-soft-white font-semibold text-sm">Recent Marks</h3>
            <Link
              href="/dashboard/parent/marks"
              className="text-xs text-electric hover:text-blue-400 transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-muted border-b border-white/8">
                  <th className="text-left pb-2 font-medium">Subject</th>
                  <th className="text-left pb-2 font-medium">Test</th>
                  <th className="text-right pb-2 font-medium">Marks</th>
                  <th className="text-right pb-2 font-medium">Grade</th>
                  <th className="text-right pb-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_MARKS.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors"
                  >
                    <td className="py-2.5 text-soft-white/90 font-medium pr-2">
                      {row.subject}
                    </td>
                    <td className="py-2.5 text-muted pr-2">{row.test}</td>
                    <td className="py-2.5 text-right text-soft-white/80">
                      {row.marks}/{row.max}
                    </td>
                    <td className={`py-2.5 text-right font-bold ${GRADE_COLOR[row.grade] ?? "text-soft-white"}`}>
                      {row.grade}
                    </td>
                    <td className="py-2.5 text-right text-muted">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Announcements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-soft-white font-semibold text-sm">
            Latest Announcements
          </h3>
          <Link
            href="/dashboard/parent/announcements"
            className="text-xs text-electric hover:text-blue-400 transition-colors"
          >
            View All
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {ANNOUNCEMENTS.map((ann, i) => (
            <motion.div
              key={ann.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 + i * 0.07 }}
              className="glass rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors duration-200 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLOR[ann.category] ?? "bg-white/10 text-muted"}`}>
                  {ann.category}
                </span>
                <span className="text-muted text-[10px]">{ann.date}</span>
              </div>
              <p className="text-soft-white text-xs font-semibold leading-snug">
                {ann.title}
              </p>
              <p className="text-muted text-[11px] leading-relaxed line-clamp-2">
                {ann.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
