"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarCheck,
  TrendingUp,
  IndianRupee,
  ClipboardList,
  Users,
  BookOpen,
  Download,
  FileText,
  Loader2,
  CheckCircle,
  type LucideIcon,
} from "lucide-react";

type ReportCard = {
  icon: LucideIcon;
  title: string;
  description: string;
  lastGenerated: string;
  color: string;
  bg: string;
  csvData: () => string;
};

function buildCSV(title: string): string {
  const now = new Date().toLocaleDateString("en-IN");

  const datasets: Record<string, string[][]> = {
    "Attendance Report": [
      ["Student Name", "Class", "Days Present", "Days Absent", "Attendance %", "Status"],
      ["Arjun Sharma",    "10-A", "48", "2", "96%", "Excellent"],
      ["Priya Reddy",     "10-B", "45", "5", "90%", "Good"],
      ["Kiran Rao",       "9-A",  "46", "4", "92%", "Good"],
      ["Sneha Pillai",    "11-A", "49", "1", "98%", "Excellent"],
      ["Ravi Kumar",      "8-B",  "42", "8", "84%", "Average"],
      ["Divya Nair",      "12-A", "50", "0", "100%","Excellent"],
      ["Aakash Singh",    "7-A",  "44", "6", "88%", "Good"],
      ["Meera Iyer",      "6-B",  "47", "3", "94%", "Excellent"],
    ],
    "Academic Performance": [
      ["Student Name", "Class", "Math", "Science", "English", "Social", "Total", "Grade"],
      ["Arjun Sharma",  "10-A", "92", "88", "85", "90", "355", "A"],
      ["Priya Reddy",   "10-B", "96", "94", "91", "89", "370", "A+"],
      ["Kiran Rao",     "9-A",  "78", "82", "75", "80", "315", "B"],
      ["Sneha Pillai",  "11-A", "88", "91", "93", "87", "359", "A"],
      ["Ravi Kumar",    "8-B",  "65", "70", "68", "72", "275", "C"],
      ["Divya Nair",    "12-A", "98", "97", "95", "96", "386", "A+"],
      ["Aakash Singh",  "7-A",  "74", "76", "80", "78", "308", "B"],
      ["Meera Iyer",    "6-B",  "84", "86", "88", "82", "340", "A"],
    ],
    "Fee Collection Report": [
      ["Student Name", "Class", "Total Fee", "Paid Amount", "Pending", "Payment Date", "Status"],
      ["Arjun Sharma",  "10-A", "₹85,000", "₹85,000", "₹0",      "05 Apr 2026", "Paid"],
      ["Priya Reddy",   "10-B", "₹85,000", "₹85,000", "₹0",      "02 Apr 2026", "Paid"],
      ["Kiran Rao",     "9-A",  "₹80,000", "₹40,000", "₹40,000", "10 Apr 2026", "Partial"],
      ["Sneha Pillai",  "11-A", "₹90,000", "₹90,000", "₹0",      "01 Apr 2026", "Paid"],
      ["Ravi Kumar",    "8-B",  "₹75,000", "₹0",      "₹75,000", "-",           "Pending"],
      ["Divya Nair",    "12-A", "₹90,000", "₹90,000", "₹0",      "03 Apr 2026", "Paid"],
    ],
    "Admission Summary": [
      ["Application ID", "Student Name", "Class Applied", "Date", "Status", "Remarks"],
      ["VIS-001", "Rahul Mehta",   "Class 6",  "10 Apr 2026", "Approved",  "Documents verified"],
      ["VIS-002", "Anjali Verma",  "Class 9",  "11 Apr 2026", "Pending",   "Assessment scheduled"],
      ["VIS-003", "Suresh Babu",   "Class 1",  "12 Apr 2026", "Approved",  "Fee payment done"],
      ["VIS-004", "Lakshmi Rao",   "Class 11", "13 Apr 2026", "Rejected",  "Seats unavailable"],
      ["VIS-005", "Aryan Gupta",   "Class 5",  "14 Apr 2026", "Pending",   "Documents awaited"],
      ["VIS-006", "Pooja Sharma",  "Class 8",  "15 Apr 2026", "Approved",  "Documents verified"],
    ],
    "Staff Performance": [
      ["Staff Name", "Department", "Classes Taken", "Attendance", "Student Rating", "Status"],
      ["Mr. Rajesh Kumar",   "Mathematics",  "92", "96%", "4.8/5", "Excellent"],
      ["Mrs. Sunita Rao",    "Science",      "88", "94%", "4.6/5", "Excellent"],
      ["Mr. Arun Pillai",    "English",      "84", "90%", "4.4/5", "Good"],
      ["Ms. Neha Gupta",     "Social Studies","80","92%", "4.5/5", "Good"],
      ["Mr. Praveen Nair",   "Hindi",        "76", "88%", "4.2/5", "Good"],
      ["Mrs. Deepa Krishna", "Computer Sci", "90", "98%", "4.9/5", "Excellent"],
    ],
    "Annual School Report": [
      ["Metric", "Value", "Change vs Last Year", "Remarks"],
      ["Total Students",     "2,547", "+127",   "Consistent growth"],
      ["Pass Rate",          "98.4%", "+0.6%",  "Best in Vizag district"],
      ["Staff Strength",     "142",   "+8",     "New hires completed"],
      ["Fee Collection",     "₹2.1Cr","₹18.5L", "On target"],
      ["Avg Attendance",     "93.2%", "+1.4%",  "Improved"],
      ["New Admissions",     "312",   "+42",    "Strong demand"],
      ["Board Rank (Dist.)", "#1",    "–",      "4th consecutive year"],
    ],
  };

  const rows = datasets[title] ?? [
    ["Report", "Generated", "Date"],
    [title, "Vizag International School", now],
  ];

  return rows.map((r) => r.map((cell) => `"${cell}"`).join(",")).join("\r\n");
}

function downloadCSV(title: string) {
  const csv = buildCSV(title);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `${title.replace(/\s+/g, "_")}_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const REPORT_CARDS: ReportCard[] = [
  {
    icon: CalendarCheck,
    title: "Attendance Report",
    description: "Daily, weekly & monthly attendance summary for all grades",
    lastGenerated: "27 Apr 2026",
    color: "text-electric",
    bg: "bg-electric/10",
    csvData: () => buildCSV("Attendance Report"),
  },
  {
    icon: TrendingUp,
    title: "Academic Performance",
    description: "Grade-wise exam scores, pass rates & top performers",
    lastGenerated: "25 Apr 2026",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    csvData: () => buildCSV("Academic Performance"),
  },
  {
    icon: IndianRupee,
    title: "Fee Collection Report",
    description: "Monthly fee collection status, pending dues & receipts",
    lastGenerated: "24 Apr 2026",
    color: "text-gold",
    bg: "bg-gold/10",
    csvData: () => buildCSV("Fee Collection Report"),
  },
  {
    icon: ClipboardList,
    title: "Admission Summary",
    description: "Applications received, approved, pending & rejected",
    lastGenerated: "22 Apr 2026",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    csvData: () => buildCSV("Admission Summary"),
  },
  {
    icon: Users,
    title: "Staff Performance",
    description: "Staff attendance, class completion & feedback scores",
    lastGenerated: "20 Apr 2026",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    csvData: () => buildCSV("Staff Performance"),
  },
  {
    icon: BookOpen,
    title: "Annual School Report",
    description: "Comprehensive yearly overview of all school activities",
    lastGenerated: "15 Apr 2026",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    csvData: () => buildCSV("Annual School Report"),
  },
];

const RECENT_REPORTS = [
  { name: "Monthly Attendance Report – Apr 2026",  by: "Dr. Suresh Rao",    date: "27 Apr 2026", key: "Attendance Report" },
  { name: "Q1 Academic Performance Report",        by: "Mr. Rajesh Kumar",  date: "25 Apr 2026", key: "Academic Performance" },
  { name: "Fee Collection Summary – Apr 2026",     by: "Admin Office",      date: "24 Apr 2026", key: "Fee Collection Report" },
  { name: "Staff Attendance Report – Apr 2026",    by: "Dr. Suresh Rao",    date: "22 Apr 2026", key: "Staff Performance" },
  { name: "Admissions Summary – Q1 2026",          by: "Ms. Neha Gupta",    date: "20 Apr 2026", key: "Admission Summary" },
  { name: "Grade 10 Progress Report",              by: "Mr. Rajesh Kumar",  date: "18 Apr 2026", key: "Academic Performance" },
  { name: "Annual Budget Report 2025–26",          by: "Mr. Arun Pillai",   date: "15 Apr 2026", key: "Annual School Report" },
  { name: "Student Behaviour Log – Mar 2026",      by: "Admin Office",      date: "12 Apr 2026", key: "Attendance Report" },
];

export default function ReportsPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [toast,   setToast]   = useState<string | null>(null);

  function handleGenerate(title: string) {
    if (loading) return;
    setLoading(title);
    setTimeout(() => {
      setLoading(null);
      downloadCSV(title);
      setToast(`${title} downloaded successfully!`);
      setTimeout(() => setToast(null), 3500);
    }, 1800);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-heading font-bold text-2xl text-soft-white">Reports &amp; Insights</h2>
        <p className="text-muted text-sm mt-1">Generate, download, and manage school reports</p>
      </motion.div>

      {/* Report generation cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {REPORT_CARDS.map((report, i) => {
          const Icon      = report.icon;
          const isLoading = loading === report.title;
          return (
            <motion.div
              key={report.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className="glass rounded-2xl p-5 border border-white/8 hover:border-white/15 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${report.bg} shrink-0`}>
                  <Icon size={20} className={report.color} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-soft-white font-semibold text-sm leading-tight">{report.title}</h4>
                  <p className="text-muted text-xs mt-1 leading-relaxed">{report.description}</p>
                </div>
              </div>

              <p className="text-muted text-xs mb-4 mt-auto">
                Last generated: <span className="text-soft-white">{report.lastGenerated}</span>
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleGenerate(report.title)}
                  disabled={!!loading}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border border-electric/40 text-electric hover:bg-electric/10 disabled:opacity-50 transition-all duration-200"
                >
                  {isLoading ? (
                    <><Loader2 size={13} className="animate-spin" /> Generating…</>
                  ) : (
                    <><FileText size={13} /> Generate Report</>
                  )}
                </button>
                <button
                  onClick={() => { downloadCSV(report.title); showToast(`${report.title} downloaded!`); }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-gold/15 text-gold hover:bg-gold/25 border border-gold/25 transition-colors"
                >
                  <Download size={13} /> Last
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Recent Reports table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl border border-white/8 overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-white/8">
          <h3 className="font-heading font-semibold text-soft-white">Recent Reports</h3>
          <p className="text-muted text-xs mt-0.5">Previously generated reports available for download</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/8">
                {["Report Name", "Generated By", "Date", "Format", "Download"].map((h) => (
                  <th key={h} className="text-left text-muted text-[11px] font-semibold uppercase tracking-wide px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_REPORTS.map((r, i) => (
                <motion.tr
                  key={r.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/3 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-muted shrink-0" />
                      <span className="text-soft-white text-sm">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted text-sm">{r.by}</td>
                  <td className="px-5 py-3.5 text-muted text-sm">{r.date}</td>
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                      CSV
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => { downloadCSV(r.key); showToast(`${r.name} downloaded!`); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gold/15 text-gold hover:bg-gold/25 border border-gold/25 transition-colors"
                    >
                      <Download size={12} /> Download
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
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium backdrop-blur-sm"
          >
            <CheckCircle size={16} /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
