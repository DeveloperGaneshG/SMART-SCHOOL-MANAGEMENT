"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ClipboardList, CheckCircle, Clock, XCircle, Eye, Check, X, AlertCircle } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import type { Admission } from "@/lib/supabase";

type AppStatus = "Approved" | "Pending" | "Rejected" | "Under Review";

type Application = {
  id: string;
  student: string;
  classApplied: string;
  parent: string;
  date: string;
  status: AppStatus;
};

function mapAdmission(a: Admission): Application {
  const statusMap: Record<string, AppStatus> = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
  };
  return {
    id: a.id,
    student: a.student_name,
    classApplied: a.applying_for_class,
    parent: a.father_name,
    date: new Date(a.created_at).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    status: statusMap[a.status] ?? "Pending",
  };
}

const trendData = [
  { month: "Nov", apps: 14 },
  { month: "Dec", apps: 18 },
  { month: "Jan", apps: 22 },
  { month: "Feb", apps: 28 },
  { month: "Mar", apps: 31 },
  { month: "Apr", apps: 11 },
];

const STATUS_STYLES: Record<AppStatus, string> = {
  Approved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  Pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
  Rejected: "bg-red-500/15 text-red-400 border-red-500/25",
  "Under Review": "bg-electric/15 text-electric border-electric/25",
};

function Toast({
  message,
  type,
  onDone,
}: {
  message: string;
  type?: "success" | "error";
  onDone: () => void;
}) {
  const isError = type === "error";
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={() => setTimeout(onDone, 2200)}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl border backdrop-blur-xl text-sm font-medium shadow-2xl ${
        isError
          ? "border-red-500/30 bg-red-500/15 text-red-400"
          : "border-emerald-500/30 bg-emerald-500/15 text-emerald-400"
      }`}
    >
      {isError ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
      {message}
    </motion.div>
  );
}

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <tr key={i} className="border-b border-white/5">
          {Array.from({ length: 7 }).map((_, j) => (
            <td key={j} className="px-5 py-4">
              <div
                className="h-3 bg-white/8 rounded animate-pulse"
                style={{ width: j === 1 ? "120px" : j === 4 ? "90px" : "70px" }}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default function AdmissionsPage() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);

  useEffect(() => {
    async function fetchAdmissions() {
      try {
        const { data, error } = await supabase
          .from("admissions")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setApps((data as Admission[]).map(mapAdmission));
      } catch {
        // silently show empty state
      } finally {
        setLoading(false);
      }
    }
    fetchAdmissions();
  }, []);

  async function approve(id: string) {
    setApps((prev) => prev.map((a) => a.id === id ? { ...a, status: "Approved" as AppStatus } : a));
    try {
      const { error } = await getSupabase().from("admissions").update({ status: "approved" }).eq("id", id);
      if (error) throw error;
      setToast({ message: "Application approved!", type: "success" });
    } catch {
      setApps((prev) => prev.map((a) => a.id === id ? { ...a, status: "Pending" as AppStatus } : a));
      setToast({ message: "Something went wrong. Please try again.", type: "error" });
    }
  }

  async function reject(id: string) {
    setApps((prev) => prev.map((a) => a.id === id ? { ...a, status: "Rejected" as AppStatus } : a));
    try {
      const { error } = await getSupabase().from("admissions").update({ status: "rejected" }).eq("id", id);
      if (error) throw error;
      setToast({ message: "Application rejected!", type: "success" });
    } catch {
      setApps((prev) => prev.map((a) => a.id === id ? { ...a, status: "Pending" as AppStatus } : a));
      setToast({ message: "Something went wrong. Please try again.", type: "error" });
    }
  }

  const counts = {
    total: apps.length,
    approved: apps.filter((a) => a.status === "Approved").length,
    pending: apps.filter((a) => a.status === "Pending" || a.status === "Under Review").length,
    rejected: apps.filter((a) => a.status === "Rejected").length,
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-heading font-bold text-2xl text-soft-white">Admissions Management</h2>
        <p className="text-muted text-sm mt-1">Review and manage student admission applications</p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { icon: ClipboardList, label: "Total Applications", value: loading ? "â€”" : counts.total, color: "text-electric", bg: "bg-electric/10" },
          { icon: CheckCircle, label: "Approved", value: loading ? "â€”" : counts.approved, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { icon: Clock, label: "Pending Review", value: loading ? "â€”" : counts.pending, color: "text-yellow-400", bg: "bg-yellow-500/10" },
          { icon: XCircle, label: "Rejected", value: loading ? "â€”" : counts.rejected, color: "text-red-400", bg: "bg-red-500/10" },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className="glass rounded-2xl p-4 border border-white/8 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${bg}`}>
              <Icon size={18} className={color} />
            </div>
            <div>
              <p className={`text-2xl font-heading font-bold ${color}`}>{value}</p>
              <p className="text-muted text-xs">{label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Applications table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass rounded-2xl border border-white/8 overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-white/8">
          <h3 className="font-heading font-semibold text-soft-white">Applications</h3>
          <p className="text-muted text-xs mt-0.5">Click Approve or Reject to update status</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/8">
                {["App ID", "Student Name", "Class", "Parent Name", "Date", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left text-muted text-[11px] font-semibold uppercase tracking-wide px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <TableSkeleton />
              ) : apps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-muted text-sm">
                    No applications yet. Applications submitted from the website will appear here.
                  </td>
                </tr>
              ) : (
                apps.map((app, i) => (
                  <motion.tr
                    key={app.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors"
                  >
                    <td className="px-5 py-3.5 text-muted text-xs font-mono">
                      APP-{app.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="px-5 py-3.5 text-soft-white text-sm font-medium">{app.student}</td>
                    <td className="px-5 py-3.5 text-muted text-sm">{app.classApplied}</td>
                    <td className="px-5 py-3.5 text-muted text-sm">{app.parent}</td>
                    <td className="px-5 py-3.5 text-muted text-sm">{app.date}</td>
                    <td className="px-5 py-3.5">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={app.status}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${STATUS_STYLES[app.status]}`}
                        >
                          {app.status}
                        </motion.span>
                      </AnimatePresence>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 rounded-lg hover:bg-electric/15 text-muted hover:text-electric transition-colors" title="View">
                          <Eye size={14} />
                        </button>
                        {app.status !== "Approved" && (
                          <button
                            onClick={() => approve(app.id)}
                            className="p-1.5 rounded-lg hover:bg-emerald-500/15 text-muted hover:text-emerald-400 transition-colors"
                            title="Approve"
                          >
                            <Check size={14} />
                          </button>
                        )}
                        {app.status !== "Rejected" && (
                          <button
                            onClick={() => reject(app.id)}
                            className="p-1.5 rounded-lg hover:bg-red-500/15 text-muted hover:text-red-400 transition-colors"
                            title="Reject"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Live count */}
        <div className="px-5 py-3 border-t border-white/8 flex items-center gap-4 text-xs text-muted">
          <span>Approved: <span className="text-emerald-400 font-semibold">{counts.approved}</span></span>
          <span>Pending: <span className="text-yellow-400 font-semibold">{counts.pending}</span></span>
          <span>Rejected: <span className="text-red-400 font-semibold">{counts.rejected}</span></span>
        </div>
      </motion.div>

      {/* Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass rounded-2xl p-5 border border-white/8"
      >
        <h3 className="font-heading font-semibold text-soft-white mb-4">Admissions Trend â€“ Last 6 Months</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={trendData} barSize={40}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "#0D1426", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10 }}
              labelStyle={{ color: "#94A3B8" }}
              itemStyle={{ color: "#F1F5F9" }}
              formatter={(v) => [v, "Applications"]}
            />
            <Bar dataKey="apps" fill="#F59E0B" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
