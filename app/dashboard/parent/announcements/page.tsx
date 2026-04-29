"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Search, AlertTriangle, CalendarDays, BookOpen, Star, Umbrella } from "lucide-react";

// ─── Mock data ────────────────────────────────────────────────────────────────
const ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Annual Day Celebrations – May 10th",
    date: "Apr 25, 2026",
    desc: "Annual Day will be held on May 10th at the school auditorium starting 9:00 AM. All students must attend in school uniform. Parents are cordially invited. Cultural performances and prize distribution will be part of the event.",
    category: "Event",
    urgent: false,
  },
  {
    id: 2,
    title: "Final Examination Schedule Released",
    date: "Apr 22, 2026",
    desc: "Final examinations for all grades begin on May 5th, 2026. The detailed timetable has been uploaded to the portal. Students must carry their hall tickets and school ID cards. No entry without hall ticket.",
    category: "Academic",
    urgent: true,
  },
  {
    id: 3,
    title: "Summer Vacation 2026 Notice",
    date: "Apr 20, 2026",
    desc: "School will remain closed from May 20th to June 15th, 2026 for summer vacations. The new academic year (2026-27) begins on June 16th. Admission forms for new students available from May 1st.",
    category: "Holiday",
    urgent: false,
  },
  {
    id: 4,
    title: "Science Exhibition – Inter-School Competition",
    date: "Apr 18, 2026",
    desc: "Vizag International School is hosting the Annual Inter-School Science Exhibition on April 30th. Students interested in participating must submit their project proposals to the Science Department by April 25th.",
    category: "Event",
    urgent: false,
  },
  {
    id: 5,
    title: "Fee Submission Deadline – Last Date May 1st",
    date: "Apr 15, 2026",
    desc: "The last date for submission of Term 3 fees is May 1st, 2026. A late fee of ₹500 per week will be charged after the due date. Online payment is available via the parent portal. Contact accounts dept for queries.",
    category: "Academic",
    urgent: true,
  },
  {
    id: 6,
    title: "Sports Day – April 30th",
    date: "Apr 12, 2026",
    desc: "Annual Sports Day will be held on April 30th at the school sports ground. Students must arrive by 8:00 AM in their respective house colors. Refreshments will be provided. Parents are welcome to attend.",
    category: "Event",
    urgent: false,
  },
  {
    id: 7,
    title: "Board Exam Results – Grade 10 & 12",
    date: "Apr 8, 2026",
    desc: "Congratulations to all Grade 10 and Grade 12 students on their outstanding board exam results! Vizag International School achieved a 100% pass rate with 45 students scoring above 90%. Result copies available in the office.",
    category: "Academic",
    urgent: false,
  },
  {
    id: 8,
    title: "Dr. Ambedkar Jayanti – School Holiday",
    date: "Apr 5, 2026",
    desc: "School will remain closed on April 14th, 2026 on account of Dr. B.R. Ambedkar Jayanti, a national holiday. Classes will resume normally on April 15th. No homework assigned for this period.",
    category: "Holiday",
    urgent: false,
  },
];

const CATEGORIES = ["All", "Academic", "Events", "Holidays", "Urgent"] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

const CATEGORY_STYLE: Record<string, { badge: string; icon: LucideIcon }> = {
  Academic: { badge: "bg-electric/15 text-electric border-electric/20", icon: BookOpen },
  Event: { badge: "bg-gold/15 text-gold border-gold/20", icon: Star },
  Holiday: { badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20", icon: Umbrella },
};

export default function AnnouncementsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<CategoryFilter>("All");

  const filtered = useMemo(() => {
    return ANNOUNCEMENTS.filter((a) => {
      const matchesSearch =
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.desc.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        filter === "All" ||
        (filter === "Urgent" && a.urgent) ||
        (filter === "Events" && a.category === "Event") ||
        (filter === "Holidays" && a.category === "Holiday") ||
        (filter === "Academic" && a.category === "Academic");
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="font-heading font-bold text-xl text-soft-white">
          Announcements
        </h2>
        <p className="text-muted text-sm">School notices and important updates</p>
      </motion.div>

      {/* Search + filters */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="mb-5 flex flex-col sm:flex-row gap-3"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search announcements…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-soft-white placeholder-muted/50 glass border border-white/10 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/20 transition-all bg-transparent"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 p-1 glass rounded-xl border border-white/10 overflow-x-auto shrink-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors duration-200 ${
                filter === cat ? "text-navy" : "text-muted hover:text-soft-white"
              }`}
            >
              {filter === cat && (
                <motion.div
                  layoutId="ann-filter-pill"
                  className="absolute inset-0 rounded-lg bg-gold"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Announcement list */}
      <div className="flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 text-muted"
            >
              <Search size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No announcements match your search.</p>
            </motion.div>
          )}

          {filtered.map((ann, i) => {
            const style = CATEGORY_STYLE[ann.category];
            const Icon = style?.icon ?? CalendarDays;
            return (
              <motion.div
                key={ann.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className={`glass rounded-2xl p-5 border transition-colors duration-200 hover:border-white/20 ${
                  ann.urgent
                    ? "border-red-500/30 border-l-4 border-l-red-500"
                    : "border-white/10"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {ann.urgent && (
                      <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 uppercase tracking-wide">
                        <AlertTriangle size={10} />
                        Urgent
                      </span>
                    )}
                    <span className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${style?.badge ?? "bg-white/10 text-muted border-white/20"}`}>
                      <Icon size={10} />
                      {ann.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted text-xs">
                    <CalendarDays size={12} />
                    {ann.date}
                  </div>
                </div>
                <h4 className="text-soft-white font-semibold text-sm mb-2 leading-snug">
                  {ann.title}
                </h4>
                <p className="text-muted text-xs leading-relaxed">{ann.desc}</p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
