"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Phone, MapPin, User, Calendar, TrendingUp, Award } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────
interface StudentFull {
  roll: number;
  name: string;
  grade: string;
  class: string;
  attendance: number;
  avgMarks: number;
  dob: string;
  parent: string;
  contact: string;
  address: string;
  attendanceHistory: { month: string; pct: number }[];
  recentMarks: { test: string; marks: number; max: number; grade: string }[];
}

// ─── Mock data ────────────────────────────────────────────────────────────────
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

const STUDENTS: StudentFull[] = [
  { roll: 1, name: "Arjun Sharma", grade: "A+", class: "Grade 9A", attendance: 94, avgMarks: 92, dob: "12 Mar 2010", parent: "Ramesh Sharma", contact: "+91 98765 43210", address: "12, Beach Road, Visakhapatnam", attendanceHistory: [{month:"Nov",pct:90},{month:"Dec",pct:95},{month:"Jan",pct:92},{month:"Feb",pct:88},{month:"Mar",pct:96},{month:"Apr",pct:94}], recentMarks: [{test:"Unit Test 3",marks:46,max:50,grade:"A+"},{test:"Mid Term",marks:88,max:100,grade:"A+"},{test:"Chapter Test",marks:43,max:50,grade:"A+"}] },
  { roll: 2, name: "Priya Patel", grade: "A", class: "Grade 9A", attendance: 88, avgMarks: 84, dob: "5 Jun 2010", parent: "Sunil Patel", contact: "+91 91234 56789", address: "34, MVP Colony, Visakhapatnam", attendanceHistory: [{month:"Nov",pct:85},{month:"Dec",pct:90},{month:"Jan",pct:88},{month:"Feb",pct:86},{month:"Mar",pct:90},{month:"Apr",pct:88}], recentMarks: [{test:"Unit Test 3",marks:42,max:50,grade:"A"},{test:"Mid Term",marks:80,max:100,grade:"A"},{test:"Chapter Test",marks:41,max:50,grade:"A"}] },
  { roll: 3, name: "Rahul Verma", grade: "B+", class: "Grade 9A", attendance: 72, avgMarks: 74, dob: "18 Sep 2010", parent: "Ajay Verma", contact: "+91 99887 65432", address: "78, Seethammadhara, Visakhapatnam", attendanceHistory: [{month:"Nov",pct:70},{month:"Dec",pct:75},{month:"Jan",pct:72},{month:"Feb",pct:68},{month:"Mar",pct:74},{month:"Apr",pct:72}], recentMarks: [{test:"Unit Test 3",marks:37,max:50,grade:"B+"},{test:"Mid Term",marks:72,max:100,grade:"B+"},{test:"Chapter Test",marks:36,max:50,grade:"B+"}] },
  { roll: 4, name: "Sneha Reddy", grade: "A", class: "Grade 9A", attendance: 91, avgMarks: 86, dob: "22 Jan 2010", parent: "Venkat Reddy", contact: "+91 90001 23456", address: "5, Steel Plant Colony, Visakhapatnam", attendanceHistory: [{month:"Nov",pct:88},{month:"Dec",pct:92},{month:"Jan",pct:91},{month:"Feb",pct:90},{month:"Mar",pct:93},{month:"Apr",pct:91}], recentMarks: [{test:"Unit Test 3",marks:43,max:50,grade:"A"},{test:"Mid Term",marks:84,max:100,grade:"A"},{test:"Chapter Test",marks:42,max:50,grade:"A"}] },
  { roll: 5, name: "Kiran Kumar", grade: "B", class: "Grade 9A", attendance: 68, avgMarks: 65, dob: "30 Jul 2010", parent: "Ravi Kumar", contact: "+91 88887 77665", address: "90, Gajuwaka, Visakhapatnam", attendanceHistory: [{month:"Nov",pct:65},{month:"Dec",pct:70},{month:"Jan",pct:68},{month:"Feb",pct:64},{month:"Mar",pct:70},{month:"Apr",pct:68}], recentMarks: [{test:"Unit Test 3",marks:32,max:50,grade:"B"},{test:"Mid Term",marks:63,max:100,grade:"B"},{test:"Chapter Test",marks:31,max:50,grade:"B"}] },
  { roll: 6, name: "Divya Singh", grade: "A+", class: "Grade 9A", attendance: 96, avgMarks: 94, dob: "14 Apr 2010", parent: "Harish Singh", contact: "+91 97777 88899", address: "21, Lawsons Bay, Visakhapatnam", attendanceHistory: [{month:"Nov",pct:95},{month:"Dec",pct:97},{month:"Jan",pct:96},{month:"Feb",pct:95},{month:"Mar",pct:98},{month:"Apr",pct:96}], recentMarks: [{test:"Unit Test 3",marks:48,max:50,grade:"A+"},{test:"Mid Term",marks:93,max:100,grade:"A+"},{test:"Chapter Test",marks:47,max:50,grade:"A+"}] },
  { roll: 7, name: "Aakash Nair", grade: "B+", class: "Grade 9A", attendance: 80, avgMarks: 76, dob: "9 Nov 2010", parent: "Suresh Nair", contact: "+91 86666 55443", address: "67, NAD Junction, Visakhapatnam", attendanceHistory: [{month:"Nov",pct:78},{month:"Dec",pct:82},{month:"Jan",pct:80},{month:"Feb",pct:76},{month:"Mar",pct:82},{month:"Apr",pct:80}], recentMarks: [{test:"Unit Test 3",marks:38,max:50,grade:"B+"},{test:"Mid Term",marks:75,max:100,grade:"B+"},{test:"Chapter Test",marks:37,max:50,grade:"B+"}] },
  { roll: 8, name: "Pooja Mehta", grade: "A", class: "Grade 8B", attendance: 89, avgMarks: 83, dob: "3 Feb 2011", parent: "Mukesh Mehta", contact: "+91 95551 22334", address: "45, Madhurawada, Visakhapatnam", attendanceHistory: [{month:"Nov",pct:86},{month:"Dec",pct:90},{month:"Jan",pct:89},{month:"Feb",pct:87},{month:"Mar",pct:91},{month:"Apr",pct:89}], recentMarks: [{test:"Unit Test 3",marks:41,max:50,grade:"A"},{test:"Mid Term",marks:82,max:100,grade:"A"},{test:"Chapter Test",marks:40,max:50,grade:"A"}] },
  { roll: 9, name: "Rohit Das", grade: "C", class: "Grade 8B", attendance: 61, avgMarks: 55, dob: "27 Aug 2011", parent: "Pramod Das", contact: "+91 84444 33221", address: "13, Rushikonda, Visakhapatnam", attendanceHistory: [{month:"Nov",pct:60},{month:"Dec",pct:65},{month:"Jan",pct:61},{month:"Feb",pct:58},{month:"Mar",pct:63},{month:"Apr",pct:61}], recentMarks: [{test:"Unit Test 3",marks:27,max:50,grade:"C"},{test:"Mid Term",marks:55,max:100,grade:"C"},{test:"Chapter Test",marks:26,max:50,grade:"C"}] },
  { roll: 10, name: "Ananya Rao", grade: "A+", class: "Grade 8B", attendance: 98, avgMarks: 96, dob: "16 Dec 2011", parent: "Krishna Rao", contact: "+91 93333 44556", address: "8, BHPV Colony, Visakhapatnam", attendanceHistory: [{month:"Nov",pct:97},{month:"Dec",pct:99},{month:"Jan",pct:98},{month:"Feb",pct:97},{month:"Mar",pct:100},{month:"Apr",pct:98}], recentMarks: [{test:"Unit Test 3",marks:49,max:50,grade:"A+"},{test:"Mid Term",marks:96,max:100,grade:"A+"},{test:"Chapter Test",marks:48,max:50,grade:"A+"}] },
  { roll: 11, name: "Vikram Pillai", grade: "B", class: "Grade 10A", attendance: 77, avgMarks: 68, dob: "20 May 2010", parent: "Anand Pillai", contact: "+91 92222 11009", address: "56, Dwaraka Nagar, Visakhapatnam", attendanceHistory: [{month:"Nov",pct:75},{month:"Dec",pct:78},{month:"Jan",pct:77},{month:"Feb",pct:74},{month:"Mar",pct:79},{month:"Apr",pct:77}], recentMarks: [{test:"Unit Test 3",marks:34,max:50,grade:"B"},{test:"Mid Term",marks:67,max:100,grade:"B"},{test:"Chapter Test",marks:33,max:50,grade:"B"}] },
  { roll: 12, name: "Meera Joshi", grade: "A", class: "Grade 10A", attendance: 85, avgMarks: 81, dob: "8 Oct 2009", parent: "Deepak Joshi", contact: "+91 87654 32109", address: "23, Siripuram, Visakhapatnam", attendanceHistory: [{month:"Nov",pct:83},{month:"Dec",pct:87},{month:"Jan",pct:85},{month:"Feb",pct:82},{month:"Mar",pct:88},{month:"Apr",pct:85}], recentMarks: [{test:"Unit Test 3",marks:40,max:50,grade:"A"},{test:"Mid Term",marks:80,max:100,grade:"A"},{test:"Chapter Test",marks:39,max:50,grade:"A"}] },
  { roll: 13, name: "Suresh Babu", grade: "B+", class: "Grade 10A", attendance: 82, avgMarks: 73, dob: "11 Mar 2010", parent: "Nagaraju Babu", contact: "+91 80000 99887", address: "34, Kommadi, Visakhapatnam", attendanceHistory: [{month:"Nov",pct:80},{month:"Dec",pct:84},{month:"Jan",pct:82},{month:"Feb",pct:79},{month:"Mar",pct:84},{month:"Apr",pct:82}], recentMarks: [{test:"Unit Test 3",marks:36,max:50,grade:"B+"},{test:"Mid Term",marks:73,max:100,grade:"B+"},{test:"Chapter Test",marks:35,max:50,grade:"B+"}] },
  { roll: 14, name: "Lakshmi Devi", grade: "A+", class: "Grade 10A", attendance: 93, avgMarks: 91, dob: "25 Jul 2009", parent: "Srinivas Devi", contact: "+91 98001 77664", address: "19, Hanumanthavaka, Visakhapatnam", attendanceHistory: [{month:"Nov",pct:91},{month:"Dec",pct:95},{month:"Jan",pct:93},{month:"Feb",pct:90},{month:"Mar",pct:95},{month:"Apr",pct:93}], recentMarks: [{test:"Unit Test 3",marks:45,max:50,grade:"A+"},{test:"Mid Term",marks:91,max:100,grade:"A+"},{test:"Chapter Test",marks:44,max:50,grade:"A+"}] },
  { roll: 15, name: "Nikhil Gupta", grade: "C", class: "Grade 9A", attendance: 65, avgMarks: 58, dob: "2 Jan 2011", parent: "Mohan Gupta", contact: "+91 76543 21098", address: "88, Waltair Uplands, Visakhapatnam", attendanceHistory: [{month:"Nov",pct:63},{month:"Dec",pct:67},{month:"Jan",pct:65},{month:"Feb",pct:61},{month:"Mar",pct:67},{month:"Apr",pct:65}], recentMarks: [{test:"Unit Test 3",marks:29,max:50,grade:"C"},{test:"Mid Term",marks:57,max:100,grade:"C"},{test:"Chapter Test",marks:28,max:50,grade:"C"}] },
];

const CLASS_TABS = ["All", "Grade 9A", "Grade 8B", "Grade 10A"];

const GRADE_STYLE: Record<string, string> = {
  "A+": "text-emerald-400",
  A: "text-green-400",
  "B+": "text-blue-400",
  B: "text-sky-400",
  C: "text-yellow-400",
  F: "text-red-400",
};

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  return parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0].slice(0, 2);
}

// ─── Student Modal ─────────────────────────────────────────────────────────────
function StudentModal({ student, idx, onClose }: { student: StudentFull; idx: number; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/15 p-6"
        style={{ background: "#0D1426" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length]} flex items-center justify-center shrink-0`}
            >
              <span className="text-white font-bold text-lg uppercase">{getInitials(student.name)}</span>
            </div>
            <div>
              <h3 className="font-heading font-bold text-soft-white text-lg">{student.name}</h3>
              <p className="text-muted text-sm">{student.class} · Roll #{student.roll}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted hover:text-soft-white transition-colors p-1">
            <X size={18} />
          </button>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { icon: Calendar, label: "Date of Birth", val: student.dob },
            { icon: User, label: "Parent Name", val: student.parent },
            { icon: Phone, label: "Contact", val: student.contact },
            { icon: MapPin, label: "Address", val: student.address },
          ].map(({ icon: Icon, label, val }) => (
            <div key={label} className="glass rounded-xl p-3 border border-white/8">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon size={11} className="text-electric" />
                <span className="text-muted text-[10px] font-semibold uppercase tracking-wide">{label}</span>
              </div>
              <p className="text-soft-white text-xs font-medium">{val}</p>
            </div>
          ))}
        </div>

        {/* Attendance chart */}
        <div className="glass rounded-xl border border-white/8 p-4 mb-4">
          <p className="text-soft-white text-xs font-semibold mb-3">Attendance – Last 6 Months</p>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={student.attendanceHistory} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 10 }} axisLine={false} tickLine={false} width={25} />
              <Tooltip
                contentStyle={{ background: "#131929", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 11 }}
                labelStyle={{ color: "#94a3b8" }}
                itemStyle={{ color: "#10b981" }}
                formatter={(v) => [`${v}%`, "Attendance"]}
              />
              <Bar dataKey="pct" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent marks */}
        <div className="glass rounded-xl border border-white/8 p-4">
          <p className="text-soft-white text-xs font-semibold mb-3">Recent Marks</p>
          <table className="w-full text-xs">
            <thead>
              <tr className="text-muted border-b border-white/8">
                <th className="text-left pb-2 font-medium">Test</th>
                <th className="text-right pb-2 font-medium">Marks</th>
                <th className="text-right pb-2 font-medium">Grade</th>
              </tr>
            </thead>
            <tbody>
              {student.recentMarks.map((m, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0">
                  <td className="py-2 text-soft-white/80">{m.test}</td>
                  <td className="py-2 text-right text-muted">{m.marks}/{m.max}</td>
                  <td className={`py-2 text-right font-bold ${GRADE_STYLE[m.grade] ?? "text-soft-white"}`}>
                    {m.grade}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState<{ student: StudentFull; idx: number } | null>(null);

  const filtered = STUDENTS.filter((s) => {
    const matchClass = activeTab === "All" || s.class === activeTab;
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.roll.toString().includes(search);
    return matchClass && matchSearch;
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h2 className="font-heading font-bold text-2xl text-soft-white">My Students</h2>
        <p className="text-muted text-sm mt-0.5">View and manage all your students across classes</p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="flex flex-wrap gap-3 items-center mb-5"
      >
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/15 bg-white/5 text-soft-white text-sm focus:outline-none focus:border-electric/50 placeholder:text-muted/50 transition-colors"
          />
        </div>

        {/* Class tabs */}
        <div className="flex gap-1.5 flex-wrap">
          {CLASS_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-150 ${
                activeTab === tab
                  ? "bg-electric/15 text-electric border-electric/30"
                  : "border-white/10 text-muted hover:border-white/20 hover:text-soft-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Count */}
        <span className="text-muted text-xs px-3 py-2 rounded-xl border border-white/10 bg-white/3 shrink-0">
          {filtered.length} student{filtered.length !== 1 ? "s" : ""}
        </span>
      </motion.div>

      {/* Cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((student, i) => {
          const needsAttention = student.attendance < 75;
          const globalIdx = STUDENTS.indexOf(student);
          return (
            <motion.div
              key={student.roll}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className={`glass rounded-2xl p-5 border transition-all duration-300 group cursor-pointer hover:-translate-y-1 ${
                needsAttention
                  ? "border-red-500/25 hover:border-red-500/40"
                  : "border-white/10 hover:border-electric/30"
              }`}
              style={{
                boxShadow: needsAttention
                  ? undefined
                  : "0 0 0 0 transparent",
              }}
              whileHover={
                needsAttention
                  ? {}
                  : { boxShadow: "0 0 28px rgba(59,130,246,0.15)" }
              }
              onClick={() => setSelectedStudent({ student, idx: globalIdx })}
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${AVATAR_GRADIENTS[globalIdx % AVATAR_GRADIENTS.length]} flex items-center justify-center shrink-0`}
                >
                  <span className="text-white font-bold text-sm uppercase">
                    {getInitials(student.name)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-soft-white font-bold text-sm leading-snug truncate">
                    {student.name}
                  </p>
                  <p className="text-muted text-[11px]">
                    {student.class} · Roll #{student.roll}
                  </p>
                </div>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="glass rounded-lg p-2 border border-white/6 text-center">
                  <p className="text-muted text-[10px] mb-0.5">Attend.</p>
                  <p
                    className={`font-bold text-sm ${
                      student.attendance < 75 ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {student.attendance}%
                  </p>
                </div>
                <div className="glass rounded-lg p-2 border border-white/6 text-center">
                  <p className="text-muted text-[10px] mb-0.5">Avg</p>
                  <p className="font-bold text-sm text-blue-400">{student.avgMarks}</p>
                </div>
                <div className="glass rounded-lg p-2 border border-white/6 text-center">
                  <p className="text-muted text-[10px] mb-0.5">Grade</p>
                  <p className={`font-bold text-sm ${GRADE_STYLE[student.grade] ?? "text-soft-white"}`}>
                    {student.grade}
                  </p>
                </div>
              </div>

              {/* Status badge + View button */}
              <div className="flex items-center justify-between">
                <span
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border ${
                    needsAttention
                      ? "bg-red-500/15 text-red-400 border-red-500/25"
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  }`}
                >
                  {needsAttention ? "Needs Attention" : "Good Standing"}
                </span>
                <span className="text-electric text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  View Details →
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <StudentModal
            student={selectedStudent.student}
            idx={selectedStudent.idx}
            onClose={() => setSelectedStudent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
