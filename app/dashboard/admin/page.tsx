"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  GraduationCap,
  Users,
  CalendarCheck,
  UserPlus,
  BookOpen,
  Trophy,
  IndianRupee,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  FileText,
  UserCheck,
  Banknote,
  type LucideIcon,
} from "lucide-react";

function useCounter(target: number, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

const attendanceData = [
  { month: "Jan", value: 92 },
  { month: "Feb", value: 89 },
  { month: "Mar", value: 94 },
  { month: "Apr", value: 91 },
  { month: "May", value: 96 },
  { month: "Jun", value: 94 },
];

const gradeData = [
  { grade: "Gr 6", score: 81 },
  { grade: "Gr 7", score: 78 },
  { grade: "Gr 8", score: 82 },
  { grade: "Gr 9", score: 76 },
  { grade: "Gr 10", score: 79 },
  { grade: "Gr 11", score: 83 },
  { grade: "Gr 12", score: 77 },
];

const staffData = [
  { name: "Teachers", value: 98, color: "#3B82F6" },
  { name: "Admin Staff", value: 32, color: "#F59E0B" },
  { name: "Support", value: 26, color: "#10B981" },
];

const recentAdmissions = [
  { name: "Rohan Mehta", class: "Grade 6", date: "24 Apr", status: "Approved" },
  { name: "Anisha Reddy", class: "Grade 9", date: "23 Apr", status: "Pending" },
  { name: "Karthik Nair", class: "Grade 7", date: "22 Apr", status: "Review" },
  { name: "Shreya Patel", class: "Grade 11", date: "21 Apr", status: "Pending" },
  { name: "Amit Kumar", class: "Grade 8", date: "20 Apr", status: "Approved" },
];

const activityLog = [
  { text: "New admission form submitted – Rohan Mehta", time: "10 min ago", icon: FileText, color: "text-electric" },
  { text: "Attendance marked for Grade 10A – Mr. Rajesh", time: "32 min ago", icon: CalendarCheck, color: "text-emerald-400" },
  { text: "Fee payment received – ₹45,000 – Class 11B", time: "1 hr ago", icon: Banknote, color: "text-gold" },
  { text: "New teacher account created – Ms. Priya Nair", time: "2 hr ago", icon: UserCheck, color: "text-purple-400" },
  { text: "Monthly report generated – April 2026", time: "3 hr ago", icon: FileText, color: "text-sky-400" },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Approved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    Pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
    Review: "bg-electric/15 text-electric border-electric/25",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${map[status] ?? ""}`}>
      {status}
    </span>
  );
}

const customTooltipStyle = {
  contentStyle: { background: "#0D1426", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10 },
  labelStyle: { color: "#94A3B8" },
  itemStyle: { color: "#F1F5F9" },
};

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function KpiCard({
  icon: Icon,
  label,
  value,
  suffix,
  prefix,
  trend,
  trendPositive,
  iconBg,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  trend: string;
  trendPositive: boolean;
  iconBg: string;
}) {
  const count = useCounter(value);
  return (
    <motion.div variants={item} className="glass rounded-2xl p-5 border border-white/8">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon size={20} className="text-white" />
        </div>
        <span
          className={`flex items-center gap-1 text-xs font-medium ${
            trendPositive ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {trendPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {trend}
        </span>
      </div>
      <p className="text-2xl font-heading font-bold text-soft-white">
        {prefix}{count.toLocaleString("en-IN")}{suffix}
      </p>
      <p className="text-muted text-sm mt-1">{label}</p>
    </motion.div>
  );
}

export default function AdminOverviewPage() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="font-heading font-bold text-2xl text-soft-white">
          {greeting}, Dr. Suresh! 👋
        </h2>
        <p className="text-muted mt-1 text-sm">Here&apos;s your school at a glance</p>
      </motion.div>

      {/* KPI Row 1 */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <KpiCard icon={GraduationCap} label="Total Students" value={2547} trend="+5.2%" trendPositive iconBg="bg-electric" />
        <KpiCard icon={Users} label="Total Staff" value={156} trend="+2.6%" trendPositive iconBg="bg-purple-500" />
        <KpiCard icon={CalendarCheck} label="Today's Attendance" value={94} suffix="%" trend="+1.8%" trendPositive iconBg="bg-emerald-500" />
        <KpiCard icon={UserPlus} label="New Admissions" value={48} trend="+12.5%" trendPositive iconBg="bg-gold" />
      </motion.div>

      {/* KPI Row 2 */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <KpiCard icon={BookOpen} label="Active Classes" value={36} trend="0%" trendPositive iconBg="bg-sky-500" />
        <KpiCard icon={Trophy} label="Avg School Score" value={79} suffix="%" trend="+3.1%" trendPositive iconBg="bg-orange-500" />
        <KpiCard icon={IndianRupee} label="Fee Collection (L)" value={12} prefix="₹" suffix=".4L" trend="+8.7%" trendPositive iconBg="bg-teal-500" />
        <KpiCard icon={AlertCircle} label="Pending Issues" value={3} trend="-25%" trendPositive={false} iconBg="bg-red-500" />
      </motion.div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-5 border border-white/8"
        >
          <h3 className="font-heading font-semibold text-soft-white mb-4">
            Monthly Attendance Trend
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={attendanceData}>
              <defs>
                <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis domain={[80, 100]} tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip {...customTooltipStyle} formatter={(v) => [`${v}%`, "Attendance"]} />
              <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2.5} fill="url(#attGrad)" dot={{ fill: "#3B82F6", r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass rounded-2xl p-5 border border-white/8"
        >
          <h3 className="font-heading font-semibold text-soft-white mb-4">
            Grade-wise Average Scores
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={gradeData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="grade" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 100]} tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip {...customTooltipStyle} formatter={(v) => [`${v}%`, "Score"]} />
              <Bar dataKey="score" fill="#F59E0B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Admissions + Staff Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass rounded-2xl p-5 border border-white/8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-soft-white">Recent Admissions</h3>
            <a href="/dashboard/admin/admissions" className="text-electric text-xs hover:underline">
              View All →
            </a>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-4 text-[11px] text-muted font-semibold uppercase tracking-wide pb-2 border-b border-white/8">
              <span className="col-span-2">Student</span>
              <span>Date</span>
              <span>Status</span>
            </div>
            {recentAdmissions.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.07 }}
                className="grid grid-cols-4 items-center text-sm"
              >
                <div className="col-span-2">
                  <p className="text-soft-white font-medium">{a.name}</p>
                  <p className="text-muted text-xs">{a.class}</p>
                </div>
                <span className="text-muted text-xs">{a.date}</span>
                <StatusBadge status={a.status} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass rounded-2xl p-5 border border-white/8"
        >
          <h3 className="font-heading font-semibold text-soft-white mb-4">Staff Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={staffData}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                animationBegin={300}
                animationDuration={1000}
              >
                {staffData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#0D1426", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10 }}
                itemStyle={{ color: "#F1F5F9" }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, color: "#94A3B8" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Activity Log */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="glass rounded-2xl p-5 border border-white/8"
      >
        <h3 className="font-heading font-semibold text-soft-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {activityLog.map((log, i) => {
            const Icon = log.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/4 transition-colors"
              >
                <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 ${log.color}`}>
                  <Icon size={15} />
                </div>
                <p className="text-soft-white text-sm flex-1">{log.text}</p>
                <span className="text-muted text-xs shrink-0">{log.time}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
