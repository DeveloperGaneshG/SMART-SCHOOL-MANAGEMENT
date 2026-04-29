"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import type { LucideIcon } from "lucide-react";
import {
  Users,
  BookOpen,
  PenLine,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle2,
  FileEdit,
  UserCheck,
  MessageSquare,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// ─── Animated counter ─────────────────────────────────────────────────────────
function useCounter(target: number, duration = 1200) {
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
const SCHEDULE = [
  { time: "9:00 AM", subject: "Mathematics", grade: "Grade 9A", room: "Room 204", startHour: 9 },
  { time: "11:00 AM", subject: "Mathematics", grade: "Grade 8B", room: "Room 108", startHour: 11 },
  { time: "2:00 PM", subject: "Mathematics", grade: "Grade 10A", room: "Room 301", startHour: 14 },
];

const CHART_DATA = [
  { grade: "Grade 8B", avg: 74 },
  { grade: "Grade 9A", avg: 82 },
  { grade: "Grade 10A", avg: 71 },
];

const ACTIVITY = [
  {
    icon: UserCheck,
    text: "Marked attendance for Grade 9A",
    time: "Today 9:15 AM",
    color: "#10b981",
  },
  {
    icon: PenLine,
    text: "Added marks for Unit Test 3 – Grade 9A",
    time: "Yesterday",
    color: "#3B82F6",
  },
  {
    icon: FileEdit,
    text: "Added marks for Chapter Test – Grade 8B",
    time: "2 days ago",
    color: "#3B82F6",
  },
  {
    icon: UserCheck,
    text: "Marked attendance for Grade 10A",
    time: "2 days ago",
    color: "#10b981",
  },
  {
    icon: MessageSquare,
    text: "Added remarks for Arjun Sharma",
    time: "3 days ago",
    color: "#F59E0B",
  },
];

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  color,
  label,
  value,
  suffix,
  delay,
}: {
  icon: LucideIcon;
  color: string;
  label: string;
  value: number;
  suffix: string;
  delay: number;
}) {
  const counted = useCounter(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-colors duration-300"
    >
      <div className="mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}20` }}
        >
          <Icon size={18} style={{ color }} />
        </div>
      </div>
      <p className="font-heading font-bold text-2xl text-soft-white">
        {counted}
        <span className="text-base font-normal text-muted ml-0.5">{suffix}</span>
      </p>
      <p className="text-muted text-xs mt-1">{label}</p>
    </motion.div>
  );
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass border border-white/15 rounded-xl px-3 py-2 text-xs">
      <p className="text-muted mb-1">{label}</p>
      <p className="text-gold font-bold">{payload[0].value}%</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TeacherOverviewPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ").slice(-2, -1)[0] ?? "Rajesh";

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const currentHour = new Date().getHours();
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

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
          {greeting}, Mr. Rajesh! 👋
        </h2>
        <p className="text-muted text-sm mt-0.5">You have 3 classes today</p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Users} color="#3B82F6" label="My Students" value={42} suffix="" delay={0.1} />
        <StatCard icon={BookOpen} color="#10b981" label="Classes Today" value={3} suffix="" delay={0.16} />
        <StatCard icon={PenLine} color="#F59E0B" label="Pending Marks" value={8} suffix="" delay={0.22} />
        <StatCard icon={TrendingUp} color="#a855f7" label="Avg Class Score" value={78} suffix="%" delay={0.28} />
      </div>

      <div className="grid lg:grid-cols-5 gap-6 mb-6">
        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="lg:col-span-2 glass rounded-2xl p-5 border border-white/10"
        >
          <div className="flex items-center gap-2 mb-5">
            <Clock size={15} className="text-electric" />
            <h3 className="text-soft-white font-semibold text-sm">Today's Schedule</h3>
          </div>
          <div className="flex flex-col gap-3">
            {SCHEDULE.map((cls, i) => {
              const isCurrent =
                currentHour >= cls.startHour && currentHour < cls.startHour + 2;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.38 + i * 0.08 }}
                  className={`flex gap-3 p-3 rounded-xl border transition-colors duration-200 ${
                    isCurrent
                      ? "bg-electric/10 border-electric/30"
                      : "border-white/8 hover:border-white/15 hover:bg-white/3"
                  }`}
                >
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <span
                      className={`text-[11px] font-bold ${isCurrent ? "text-electric" : "text-muted"}`}
                    >
                      {cls.time}
                    </span>
                    {isCurrent && (
                      <span className="px-1.5 py-0.5 rounded-full bg-electric/20 text-electric text-[9px] font-semibold">
                        LIVE
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 border-l border-white/10 pl-3">
                    <p className="text-soft-white text-xs font-semibold">{cls.subject}</p>
                    <p className="text-muted text-[11px]">{cls.grade}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin size={10} className="text-muted/60" />
                      <span className="text-muted/60 text-[10px]">{cls.room}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Class Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="lg:col-span-3 glass rounded-2xl p-5 border border-white/10"
        >
          <h3 className="text-soft-white font-semibold text-sm mb-5">
            Class Performance Overview
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={CHART_DATA} barSize={36}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="grade"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Bar dataKey="avg" radius={[6, 6, 0, 0]}>
                {CHART_DATA.map((_, i) => (
                  <Cell
                    key={i}
                    fill={hoveredBar === i ? "#3B82F6" : "#F59E0B"}
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                    style={{ cursor: "pointer", transition: "fill 0.2s" }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-1 mt-2">
            <div className="w-2.5 h-2.5 rounded-sm bg-gold" />
            <span className="text-muted text-[11px]">Average Score (%)</span>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.44 }}
        className="glass rounded-2xl p-5 border border-white/10"
      >
        <h3 className="text-soft-white font-semibold text-sm mb-4">Recent Activity</h3>
        <div className="flex flex-col gap-1">
          {ACTIVITY.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.5 + i * 0.07 }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/4 transition-colors duration-150"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${item.color}18` }}
                >
                  <Icon size={14} style={{ color: item.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-soft-white/85 text-xs font-medium leading-snug">
                    {item.text}
                  </p>
                </div>
                <span className="text-muted/70 text-[11px] shrink-0">{item.time}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
