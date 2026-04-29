"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { Trophy, TrendingUp, CheckCircle, Star, Send, CheckCheck } from "lucide-react";

const gradePerf = [
  { grade: "Gr 6", midTerm: 78, final: 81 },
  { grade: "Gr 7", midTerm: 75, final: 78 },
  { grade: "Gr 8", midTerm: 79, final: 82 },
  { grade: "Gr 9", midTerm: 73, final: 76 },
  { grade: "Gr 10", midTerm: 76, final: 79 },
  { grade: "Gr 11", midTerm: 80, final: 83 },
  { grade: "Gr 12", midTerm: 74, final: 77 },
];

const subjectData = [
  { subject: "Math", score: 79 },
  { subject: "Science", score: 82 },
  { subject: "English", score: 76 },
  { subject: "Hindi", score: 71 },
  { subject: "Social", score: 74 },
  { subject: "Computer", score: 85 },
];

const TOP_STUDENTS = [
  { name: "Divya Singh", class: "Grade 12A", score: 97, grade: "A+" },
  { name: "Arjun Sharma", class: "Grade 10A", score: 95, grade: "A+" },
  { name: "Sneha Varma", class: "Grade 9B", score: 94, grade: "A+" },
  { name: "Ananya Nair", class: "Grade 8A", score: 93, grade: "A+" },
  { name: "Pooja Krishnan", class: "Grade 8B", score: 91, grade: "A+" },
  { name: "Meera Pillai", class: "Grade 6B", score: 90, grade: "A" },
  { name: "Kavya Gupta", class: "Grade 6A", score: 89, grade: "A" },
  { name: "Karan Mehta", class: "Grade 9A", score: 88, grade: "A" },
  { name: "Nikhil Sharma", class: "Grade 12B", score: 87, grade: "A" },
  { name: "Priya Reddy", class: "Grade 10B", score: 86, grade: "A" },
];

const BOTTOM_STUDENTS = [
  { name: "Arun Tiwari", class: "Grade 10C", score: 58, grade: "D" },
  { name: "Akash Rao", class: "Grade 11A", score: 61, grade: "D" },
  { name: "Rahul Joshi", class: "Grade 7A", score: 64, grade: "C" },
  { name: "Rohit Patel", class: "Grade 11B", score: 67, grade: "C" },
  { name: "Siddharth Iyer", class: "Grade 7B", score: 69, grade: "C" },
  { name: "Ravi Kumar", class: "Grade 8C", score: 70, grade: "C" },
  { name: "Priti Devi", class: "Grade 9C", score: 71, grade: "C" },
  { name: "Mohan Rao", class: "Grade 12C", score: 72, grade: "C" },
  { name: "Sundar Pillai", class: "Grade 6C", score: 73, grade: "C" },
  { name: "Lalitha Nair", class: "Grade 11C", score: 74, grade: "C" },
];

const RANK_STYLES = ["text-yellow-400", "text-slate-300", "text-orange-400"];

const tooltipStyle = {
  contentStyle: { background: "#0D1426", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10 },
  labelStyle: { color: "#94A3B8" },
  itemStyle: { color: "#F1F5F9" },
};

export default function PerformancePage() {
  const [noticeSent, setNoticeSent] = useState<Set<string>>(new Set());
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  function sendNotice(name: string) {
    setNoticeSent((prev) => new Set(prev).add(name));
    setToastMsg(`Parent notice sent for ${name}`);
    setTimeout(() => setToastMsg(null), 3000);
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-heading font-bold text-2xl text-soft-white">Performance Analytics</h2>
        <p className="text-muted text-sm mt-1">School-wide academic performance insights</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex flex-wrap gap-3"
      >
        <select className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-soft-white focus:outline-none focus:border-electric/50 transition-colors">
          {["All Exams", "Mid Term", "Final Exam", "Unit Test"].map((e) => (
            <option key={e} className="bg-[#0D1426]">{e}</option>
          ))}
        </select>
        <select className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-soft-white focus:outline-none focus:border-electric/50 transition-colors">
          {["2025–2026", "2024–2025", "2023–2024"].map((y) => (
            <option key={y} className="bg-[#0D1426]">{y}</option>
          ))}
        </select>
      </motion.div>

      {/* KPI cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { icon: TrendingUp, label: "School Average", value: "79.4%", color: "text-electric", bg: "bg-electric/10" },
          { icon: Trophy, label: "Highest Grade", value: "Grade 11", sub: "83.2%", color: "text-gold", bg: "bg-gold/10" },
          { icon: CheckCircle, label: "Pass Rate", value: "96.8%", color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { icon: Star, label: "Top Performer", value: "Divya Singh", sub: "97%", color: "text-purple-400", bg: "bg-purple-500/10" },
        ].map(({ icon: Icon, label, value, sub, color, bg }) => (
          <div key={label} className="glass rounded-2xl p-4 border border-white/8">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${bg} mb-3`}>
              <Icon size={18} className={color} />
            </div>
            <p className={`text-lg font-heading font-bold ${color}`}>{value}</p>
            {sub && <p className="text-muted text-xs mt-0.5">{sub}</p>}
            <p className="text-muted text-xs mt-1">{label}</p>
          </div>
        ))}
      </motion.div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="glass rounded-2xl p-5 border border-white/8"
        >
          <h3 className="font-heading font-semibold text-soft-white mb-4">Mid Term vs Final Exam</h3>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={gradePerf} barGap={4} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="grade" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 100]} tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} formatter={(v) => [`${v}%`]} />
              <Legend wrapperStyle={{ color: "#94A3B8", fontSize: 12 }} />
              <Bar dataKey="midTerm" name="Mid Term" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="final" name="Final Exam" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-5 border border-white/8"
        >
          <h3 className="font-heading font-semibold text-soft-white mb-4">Subject Performance Radar</h3>
          <ResponsiveContainer width="100%" height={230}>
            <RadarChart data={subjectData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#94A3B8", fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#94A3B8", fontSize: 10 }} />
              <Radar
                name="School Average"
                dataKey="score"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
                dot={{ fill: "#3B82F6", r: 4 }}
              />
              <Tooltip {...tooltipStyle} formatter={(v) => [`${v}%`, "Score"]} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top 10 Students */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass rounded-2xl border border-white/8 overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-white/8">
          <h3 className="font-heading font-semibold text-soft-white">Top 10 Students – School Wide</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/8">
                {["Rank", "Name", "Class", "Score", "Grade"].map((h) => (
                  <th key={h} className="text-left text-muted text-[11px] font-semibold uppercase tracking-wide px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TOP_STUDENTS.map((s, i) => (
                <motion.tr
                  key={s.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.04 }}
                  className="border-b border-white/5 hover:bg-white/3 transition-colors"
                >
                  <td className="px-5 py-3">
                    <span className={`font-bold text-sm ${RANK_STYLES[i] ?? "text-muted"}`}>
                      {i < 3 ? ["🥇", "🥈", "🥉"][i] : `#${i + 1}`}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-soft-white text-sm font-medium">{s.name}</td>
                  <td className="px-5 py-3 text-muted text-sm">{s.class}</td>
                  <td className="px-5 py-3 text-emerald-400 text-sm font-semibold">{s.score}%</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                      {s.grade}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Bottom 10 Students */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl border border-red-500/15 overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between">
          <div>
            <h3 className="font-heading font-semibold text-soft-white">Students Needing Attention</h3>
            <p className="text-muted text-xs mt-0.5">Bottom 10 performers – consider parent outreach</p>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-red-500/15 text-red-400 border border-red-500/25">
            Needs Attention
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/8">
                {["Rank", "Name", "Class", "Score", "Grade", "Action"].map((h) => (
                  <th key={h} className="text-left text-muted text-[11px] font-semibold uppercase tracking-wide px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BOTTOM_STUDENTS.map((s, i) => (
                <motion.tr
                  key={s.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.04 }}
                  className="border-b border-white/5 hover:bg-red-500/3 transition-colors"
                >
                  <td className="px-5 py-3 text-muted text-sm">#{i + 1}</td>
                  <td className="px-5 py-3 text-soft-white text-sm font-medium">{s.name}</td>
                  <td className="px-5 py-3 text-muted text-sm">{s.class}</td>
                  <td className="px-5 py-3 text-red-400 text-sm font-semibold">{s.score}%</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-red-500/15 text-red-400 border border-red-500/25">
                      {s.grade}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => !noticeSent.has(s.name) && sendNotice(s.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        noticeSent.has(s.name)
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 cursor-default"
                          : "bg-red-500/15 text-red-400 border border-red-500/25 hover:bg-red-500/25"
                      }`}
                    >
                      {noticeSent.has(s.name) ? (
                        <><CheckCheck size={12} /> Sent</>
                      ) : (
                        <><Send size={12} /> Notify Parent</>
                      )}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium backdrop-blur-sm"
          >
            <CheckCircle size={16} /> {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
