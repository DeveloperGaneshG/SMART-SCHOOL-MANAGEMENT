"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Users,
  GraduationCap,
  Briefcase,
  Wrench,
  Pencil,
  Phone,
  Mail,
  X,
} from "lucide-react";

type StaffMember = {
  id: number;
  name: string;
  designation: string;
  department: "Teaching" | "Administration" | "Support";
  subject: string;
  experience: number;
  contact: string;
  email: string;
  status: "Active" | "On Leave";
};

const STAFF: StaffMember[] = [
  { id: 1, name: "Mr. Rajesh Kumar", designation: "Class Teacher", department: "Teaching", subject: "Mathematics", experience: 12, contact: "+91 98765 43210", email: "rajesh@vizag.edu", status: "Active" },
  { id: 2, name: "Ms. Priya Nair", designation: "Science Teacher", department: "Teaching", subject: "Physics", experience: 8, contact: "+91 87654 32109", email: "priya@vizag.edu", status: "Active" },
  { id: 3, name: "Dr. Anand Rajan", designation: "HOD English", department: "Teaching", subject: "English Literature", experience: 18, contact: "+91 76543 21098", email: "anand@vizag.edu", status: "Active" },
  { id: 4, name: "Mrs. Sunita Mehta", designation: "Computer Teacher", department: "Teaching", subject: "Computer Science", experience: 6, contact: "+91 65432 10987", email: "sunita@vizag.edu", status: "Active" },
  { id: 5, name: "Mr. Sanjay Verma", designation: "Social Studies Teacher", department: "Teaching", subject: "Social Studies", experience: 10, contact: "+91 54321 09876", email: "sanjay@vizag.edu", status: "Active" },
  { id: 6, name: "Ms. Kavitha Rao", designation: "Hindi Teacher", department: "Teaching", subject: "Hindi", experience: 9, contact: "+91 43210 98765", email: "kavitha@vizag.edu", status: "On Leave" },
  { id: 7, name: "Mr. Dinesh Chandra", designation: "Sports Coach", department: "Teaching", subject: "Physical Education", experience: 15, contact: "+91 32109 87654", email: "dinesh@vizag.edu", status: "Active" },
  { id: 8, name: "Mrs. Rekha Iyer", designation: "Principal Secretary", department: "Administration", subject: "Admin", experience: 7, contact: "+91 21098 76543", email: "rekha@vizag.edu", status: "Active" },
  { id: 9, name: "Mr. Arun Pillai", designation: "Accounts Manager", department: "Administration", subject: "Finance", experience: 11, contact: "+91 10987 65432", email: "arun@vizag.edu", status: "Active" },
  { id: 10, name: "Ms. Neha Gupta", designation: "Admissions Officer", department: "Administration", subject: "Admin", experience: 4, contact: "+91 98760 34521", email: "neha@vizag.edu", status: "Active" },
  { id: 11, name: "Mr. Suresh Babu", designation: "Maintenance Head", department: "Support", subject: "Technical", experience: 20, contact: "+91 87651 23098", email: "suresh.b@vizag.edu", status: "Active" },
  { id: 12, name: "Mrs. Lalitha Devi", designation: "Librarian", department: "Support", subject: "Library", experience: 13, contact: "+91 76542 10987", email: "lalitha@vizag.edu", status: "Active" },
];

const DEPT_COLORS: Record<string, string> = {
  Teaching: "bg-electric/15 text-electric border-electric/25",
  Administration: "bg-gold/15 text-gold border-gold/25",
  Support: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
};

const AVATAR_GRADIENTS = [
  "from-electric to-blue-400",
  "from-purple-500 to-pink-500",
  "from-gold to-orange-400",
  "from-emerald-500 to-teal-400",
  "from-red-500 to-rose-400",
  "from-indigo-500 to-violet-400",
];

function getInitials(name: string) {
  const parts = name.replace(/^(Mr\.|Ms\.|Mrs\.|Dr\.)\s+/, "").trim().split(" ");
  return parts.length >= 2 ? parts[0][0] + parts[parts.length - 1][0] : parts[0].slice(0, 2);
}

export default function StaffPage() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = STAFF.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.designation.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "All" || s.department === deptFilter;
    return matchSearch && matchDept;
  });

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-heading font-bold text-2xl text-soft-white">Staff Management</h2>
        <p className="text-muted text-sm mt-1">Manage all 156 school staff members</p>
      </motion.div>

      {/* Summary cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { icon: Users, label: "Total Staff", value: "156", color: "text-electric", bg: "bg-electric/10" },
          { icon: GraduationCap, label: "Teachers", value: "98", color: "text-purple-400", bg: "bg-purple-500/10" },
          { icon: Briefcase, label: "Admin Staff", value: "32", color: "text-gold", bg: "bg-gold/10" },
          { icon: Wrench, label: "Support Staff", value: "26", color: "text-emerald-400", bg: "bg-emerald-500/10" },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className="glass rounded-2xl p-4 border border-white/8 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${bg}`}>
              <Icon size={18} className={color} />
            </div>
            <div>
              <p className="text-soft-white font-bold text-lg font-heading">{value}</p>
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
            placeholder="Search by name or designation..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-soft-white placeholder:text-muted focus:outline-none focus:border-electric/50 transition-colors"
          />
        </div>
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-soft-white focus:outline-none focus:border-electric/50 transition-colors"
        >
          {["All", "Teaching", "Administration", "Support"].map((d) => (
            <option key={d} value={d} className="bg-[#0D1426]">{d === "All" ? "All Departments" : d}</option>
          ))}
        </select>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold text-white text-sm font-semibold hover:bg-gold-dark transition-colors"
        >
          <Plus size={16} /> Add New Staff
        </button>
      </motion.div>

      {/* Staff Cards Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filtered.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.06 }}
            onMouseEnter={() => setHoveredId(member.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="glass rounded-2xl p-5 border border-white/8 hover:border-white/15 transition-all duration-300 relative group"
          >
            {/* Edit button on hover */}
            <AnimatePresence>
              {hoveredId === member.id && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute top-4 right-4 p-1.5 rounded-lg bg-gold/15 text-gold hover:bg-gold/25 transition-colors"
                >
                  <Pencil size={13} />
                </motion.button>
              )}
            </AnimatePresence>

            <div className="flex items-start gap-3 mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]} flex items-center justify-center shrink-0`}>
                <span className="text-white text-sm font-bold uppercase">
                  {getInitials(member.name)}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-soft-white font-semibold text-sm leading-tight truncate pr-6">{member.name}</p>
                <p className="text-muted text-xs mt-0.5">{member.designation}</p>
                <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border ${DEPT_COLORS[member.department]}`}>
                  {member.department}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              {member.department === "Teaching" && (
                <div className="flex items-center justify-between">
                  <span className="text-muted text-xs">Subject</span>
                  <span className="text-soft-white text-xs font-medium">{member.subject}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-muted text-xs">Experience</span>
                <span className="text-soft-white text-xs font-medium">{member.experience} years</span>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-white/8">
                <Phone size={11} className="text-muted shrink-0" />
                <span className="text-muted text-xs truncate">{member.contact}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={11} className="text-muted shrink-0" />
                <span className="text-muted text-xs truncate">{member.email}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/8 flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                member.status === "Active"
                  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                  : "bg-yellow-500/15 text-yellow-400 border-yellow-500/25"
              }`}>
                {member.status}
              </span>
              <span className="text-muted text-xs">ID #{String(member.id).padStart(3, "0")}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Add Staff Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-x-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[520px] z-50 border border-white/10 rounded-2xl p-6"
              style={{ background: "#0D1426" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-bold text-soft-white text-xl">Add New Staff</h3>
                <button onClick={() => setShowModal(false)} className="text-muted hover:text-soft-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {["Full Name", "Designation", "Contact", "Email"].map((label) => (
                  <div key={label}>
                    <label className="block text-muted text-xs font-semibold mb-1.5 uppercase tracking-wide">{label}</label>
                    <input
                      placeholder={`Enter ${label.toLowerCase()}`}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-soft-white placeholder:text-muted focus:outline-none focus:border-electric/50 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-muted text-xs font-semibold mb-1.5 uppercase tracking-wide">Department</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-soft-white focus:outline-none focus:border-electric/50 transition-colors">
                    {["Teaching", "Administration", "Support"].map((d) => <option key={d} value={d} className="bg-[#0D1426]">{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-muted text-xs font-semibold mb-1.5 uppercase tracking-wide">Experience (Years)</label>
                  <input
                    type="number"
                    placeholder="e.g. 5"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-soft-white placeholder:text-muted focus:outline-none focus:border-electric/50 transition-colors"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-white/15 text-muted hover:text-soft-white text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gold text-white text-sm font-semibold hover:bg-gold-dark transition-colors"
                >
                  Save Staff
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
