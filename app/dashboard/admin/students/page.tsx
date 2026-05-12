"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  X,
  GraduationCap,
  UserCheck,
  UserMinus,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import type { Student } from "@/lib/supabase";

const GRADES = ["All Classes", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];

const EMPTY_FORM = {
  name: "",
  dob: "",
  gender: "",
  grade: "",
  section: "",
  parentName: "",
  contact: "",
  email: "",
};

type UIStudent = {
  id: string;
  name: string;
  roll: string;
  grade: string;
  section: string;
  parent: string;
  contact: string;
  attendance: number;
  status: string;
};

function mapStudent(s: Student): UIStudent {
  return {
    id: s.id,
    name: s.full_name,
    roll: s.roll_number,
    grade: s.class,
    section: s.section,
    parent: s.parent_name,
    contact: s.parent_phone,
    attendance: s.attendance_percent,
    status: s.status,
  };
}

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(" ");
  const ini = parts.length >= 2 ? parts[0][0] + parts[parts.length - 1][0] : parts[0].slice(0, 2);
  return (
    <div className="w-8 h-8 rounded-full bg-electric/20 border border-electric/30 flex items-center justify-center shrink-0">
      <span className="text-electric text-xs font-bold uppercase">{ini}</span>
    </div>
  );
}

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
      {Array.from({ length: 8 }).map((_, i) => (
        <tr key={i} className="border-b border-white/5">
          <td className="px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/8 animate-pulse shrink-0" />
              <div className="h-3 bg-white/8 rounded animate-pulse w-24" />
            </div>
          </td>
          {Array.from({ length: 5 }).map((_, j) => (
            <td key={j} className="px-4 py-4">
              <div className="h-3 bg-white/8 rounded animate-pulse" style={{ width: j === 1 ? "80px" : "60px" }} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default function StudentsPage() {
  const [students, setStudents] = useState<UIStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("All Classes");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    setLoading(true);
    try {
      const { data, error } = await getSupabase()
        .from("students")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setStudents((data as Student[]).map(mapStudent));
    } catch {
      // silently show empty state
    } finally {
      setLoading(false);
    }
  }

  const filtered = students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.roll.toLowerCase().includes(search.toLowerCase());
    const matchGrade = gradeFilter === "All Classes" || s.grade === gradeFilter;
    const matchStatus = statusFilter === "All" || s.status.toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchGrade && matchStatus;
  });

  const counts = {
    total: students.length,
    active: students.filter((s) => s.status.toLowerCase() === "active").length,
    inactive: students.filter((s) => s.status.toLowerCase() !== "active").length,
  };

  async function handleAddStudent() {
    if (!form.name || !form.grade) return;
    setSaving(true);
    try {
      const rollNum = `VIS-${Date.now().toString().slice(-6)}`;
      const { data, error } = await getSupabase()
        .from("students")
        .insert({
          full_name: form.name,
          date_of_birth: form.dob || null,
          gender: form.gender || "",
          class: form.grade,
          section: form.section || "",
          roll_number: rollNum,
          parent_name: form.parentName || "",
          parent_email: form.email || "",
          parent_phone: form.contact || "",
          address: "",
          attendance_percent: 0,
          status: "active",
        })
        .select()
        .single();
      if (error) throw error;
      setStudents((prev) => [mapStudent(data as Student), ...prev]);
      setShowModal(false);
      setForm(EMPTY_FORM);
      setToast({ message: "Student added successfully!", type: "success" });
    } catch {
      setToast({ message: "Something went wrong. Please try again.", type: "error" });
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const { error } = await getSupabase().from("students").delete().eq("id", deleteId);
      if (error) throw error;
      setStudents((prev) => prev.filter((s) => s.id !== deleteId));
      setDeleteId(null);
      setToast({ message: "Student removed successfully.", type: "success" });
    } catch {
      setToast({ message: "Something went wrong. Please try again.", type: "error" });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-heading font-bold text-2xl text-soft-white">Student Management</h2>
        <p className="text-muted text-sm mt-1">
          {loading ? "Loading studentsâ€¦" : `Manage all ${counts.total} enrolled students`}
        </p>
      </motion.div>

      {/* Summary cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { icon: GraduationCap, label: "Total Enrolled", value: loading ? "â€”" : counts.total, color: "text-electric", bg: "bg-electric/10" },
          { icon: UserCheck, label: "Active", value: loading ? "â€”" : counts.active, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { icon: UserMinus, label: "Inactive", value: loading ? "â€”" : counts.inactive, color: "text-red-400", bg: "bg-red-500/10" },
          { icon: UserPlus, label: "New This Year", value: "â€”", color: "text-gold", bg: "bg-gold/10" },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className="glass rounded-2xl p-4 border border-white/8 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${bg}`}>
              <Icon size={18} className={color} />
            </div>
            <div>
              <p className={`text-soft-white font-bold text-lg font-heading ${color}`}>{value}</p>
              <p className="text-muted text-xs">{label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Action bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-wrap gap-3 items-center"
      >
        <div className="relative flex-1 min-w-[220px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, roll, class..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-soft-white placeholder:text-muted focus:outline-none focus:border-electric/50 transition-colors"
          />
        </div>
        <select
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-soft-white focus:outline-none focus:border-electric/50 transition-colors"
        >
          {GRADES.map((g) => <option key={g} value={g} className="bg-[#0D1426]">{g}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-soft-white focus:outline-none focus:border-electric/50 transition-colors"
        >
          {["All", "Active", "Inactive"].map((s) => <option key={s} value={s} className="bg-[#0D1426]">{s}</option>)}
        </select>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold text-white text-sm font-semibold hover:bg-gold-dark transition-colors"
        >
          <Plus size={16} /> Add New Student
        </button>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl border border-white/8 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/8">
                <th className="text-left text-muted text-[11px] font-semibold uppercase tracking-wide px-5 py-4">Student</th>
                <th className="text-left text-muted text-[11px] font-semibold uppercase tracking-wide px-4 py-4">Roll No</th>
                <th className="text-left text-muted text-[11px] font-semibold uppercase tracking-wide px-4 py-4">Class</th>
                <th className="text-left text-muted text-[11px] font-semibold uppercase tracking-wide px-4 py-4 hidden md:table-cell">Parent Contact</th>
                <th className="text-left text-muted text-[11px] font-semibold uppercase tracking-wide px-4 py-4">Attend.</th>
                <th className="text-left text-muted text-[11px] font-semibold uppercase tracking-wide px-4 py-4">Status</th>
                <th className="text-left text-muted text-[11px] font-semibold uppercase tracking-wide px-4 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <TableSkeleton />
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <GraduationCap size={40} className="text-muted/30 mx-auto mb-3" />
                    <p className="text-muted text-sm font-medium">No students found</p>
                    <p className="text-muted/60 text-xs mt-1">Try adjusting your search or filters</p>
                  </td>
                </tr>
              ) : (
                filtered.map((s, i) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.04 }}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Initials name={s.name} />
                        <span className="text-soft-white text-sm font-medium">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-muted text-sm">{s.roll}</td>
                    <td className="px-4 py-3.5 text-soft-white text-sm">{s.grade} {s.section}</td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <p className="text-soft-white text-sm">{s.parent}</p>
                      <p className="text-muted text-xs">{s.contact}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-sm font-medium ${s.attendance >= 90 ? "text-emerald-400" : s.attendance >= 75 ? "text-yellow-400" : "text-red-400"}`}>
                        {s.attendance}%
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                        s.status.toLowerCase() === "active"
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                          : "bg-red-500/15 text-red-400 border-red-500/25"
                      }`}>
                        {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-electric/15 text-muted hover:text-electric transition-colors">
                          <Eye size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-gold/15 text-muted hover:text-gold transition-colors">
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteId(s.id)}
                          className="p-1.5 rounded-lg hover:bg-red-500/15 text-muted hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-white/8">
          <p className="text-muted text-sm">Showing 1â€“{filtered.length} of {students.length}</p>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-lg hover:bg-white/5 text-muted hover:text-soft-white transition-colors">
              <ChevronLeft size={16} />
            </button>
            <span className="px-3 py-1 rounded-lg bg-electric/15 text-electric text-sm font-medium">1</span>
            <button className="p-1.5 rounded-lg hover:bg-white/5 text-muted hover:text-soft-white transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Add Student Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => { setShowModal(false); setForm(EMPTY_FORM); }}
            />
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-x-4 bottom-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[540px] z-50 glass border border-white/10 rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
              style={{ background: "#0D1426" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-bold text-soft-white text-xl">Add New Student</h3>
                <button onClick={() => { setShowModal(false); setForm(EMPTY_FORM); }} className="text-muted hover:text-soft-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Full Name", key: "name", type: "text", placeholder: "e.g. Arjun Sharma" },
                  { label: "Date of Birth", key: "dob", type: "date", placeholder: "" },
                  { label: "Parent Name", key: "parentName", type: "text", placeholder: "e.g. Ramesh Sharma" },
                  { label: "Contact Number", key: "contact", type: "tel", placeholder: "+91 98765 43210" },
                  { label: "Email", key: "email", type: "email", placeholder: "parent@email.com" },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-muted text-xs font-semibold mb-1.5 uppercase tracking-wide">{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-soft-white placeholder:text-muted focus:outline-none focus:border-electric/50 transition-colors"
                      style={type === "date" ? { colorScheme: "dark" } : undefined}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-muted text-xs font-semibold mb-1.5 uppercase tracking-wide">Gender</label>
                  <select
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-soft-white focus:outline-none focus:border-electric/50 transition-colors"
                  >
                    <option value="" className="bg-[#0D1426]">Select gender</option>
                    <option value="Male" className="bg-[#0D1426]">Male</option>
                    <option value="Female" className="bg-[#0D1426]">Female</option>
                    <option value="Other" className="bg-[#0D1426]">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-muted text-xs font-semibold mb-1.5 uppercase tracking-wide">Class</label>
                  <select
                    value={form.grade}
                    onChange={(e) => setForm({ ...form, grade: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-soft-white focus:outline-none focus:border-electric/50 transition-colors"
                  >
                    <option value="" className="bg-[#0D1426]">Select class</option>
                    {["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((g) => (
                      <option key={g} value={g} className="bg-[#0D1426]">{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-muted text-xs font-semibold mb-1.5 uppercase tracking-wide">Section</label>
                  <select
                    value={form.section}
                    onChange={(e) => setForm({ ...form, section: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-soft-white focus:outline-none focus:border-electric/50 transition-colors"
                  >
                    <option value="" className="bg-[#0D1426]">Select section</option>
                    {["A", "B", "C", "D", "E"].map((s) => (
                      <option key={s} value={s} className="bg-[#0D1426]">Section {s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => { setShowModal(false); setForm(EMPTY_FORM); }}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-white/15 text-muted hover:text-soft-white hover:border-white/30 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddStudent}
                  disabled={saving || !form.name || !form.grade}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gold text-white text-sm font-semibold hover:bg-gold-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Savingâ€¦</>
                  ) : "Save Student"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50"
              onClick={() => { if (!deleting) setDeleteId(null); }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 glass border border-red-500/20 rounded-2xl p-6 w-[340px]"
              style={{ background: "#0D1426" }}
            >
              <div className="w-12 h-12 rounded-full bg-red-500/15 border border-red-500/25 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={20} className="text-red-400" />
              </div>
              <h3 className="font-heading font-bold text-soft-white text-lg text-center mb-2">
                Delete Student
              </h3>
              <p className="text-muted text-sm text-center leading-relaxed mb-6">
                Are you sure you want to delete this student? This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  disabled={deleting}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-white/15 text-muted hover:text-soft-white text-sm font-medium transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {deleting ? (
                    <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Deletingâ€¦</>
                  ) : "Delete"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
