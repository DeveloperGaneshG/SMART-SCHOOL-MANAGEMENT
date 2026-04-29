"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, Trophy, FlaskConical, BookOpen, Mic2, Bus } from "lucide-react";

const facilities = [
  {
    icon: Monitor,
    title: "Smart Classrooms",
    desc: "Interactive digital boards and multimedia-enabled spaces with real-time student feedback systems.",
    color: "#3B82F6",
  },
  {
    icon: Trophy,
    title: "Sports Complex",
    desc: "Olympic-standard facilities including a swimming pool, cricket ground, and indoor courts.",
    color: "#F59E0B",
  },
  {
    icon: FlaskConical,
    title: "Science Labs",
    desc: "Fully equipped physics, chemistry, and biology labs with modern instruments and safety standards.",
    color: "#10B981",
  },
  {
    icon: BookOpen,
    title: "Library",
    desc: "Over 50,000 volumes, digital archives, and quiet study zones curated for research and discovery.",
    color: "#8B5CF6",
  },
  {
    icon: Mic2,
    title: "Auditorium",
    desc: "A 1,200-seat air-conditioned auditorium with professional acoustics and lighting for every event.",
    color: "#EC4899",
  },
  {
    icon: Bus,
    title: "Transport",
    desc: "GPS-tracked fleet covering 30+ routes with trained drivers ensuring safe, punctual commutes.",
    color: "#F59E0B",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function FacilitiesGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.1 });

  return (
    <section className="relative py-28 bg-navy overflow-hidden">
      {/* Background accents */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 20% 70%, rgba(59,130,246,0.05) 0%, transparent 60%), " +
            "radial-gradient(ellipse 40% 35% at 80% 20%, rgba(245,158,11,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-electric text-xs font-medium tracking-[0.25em] uppercase">
            Infrastructure
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-soft-white mt-2">
            World-Class Facilities
          </h2>
          <p className="text-muted text-base sm:text-lg mt-3 max-w-xl mx-auto leading-relaxed">
            Every corner of our campus is designed to inspire learning,
            creativity, and holistic growth.
          </p>
        </motion.div>

        {/* Staggered card grid */}
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {facilities.map((facility) => {
            const Icon = facility.icon;
            return (
              <motion.div
                key={facility.title}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  boxShadow: `0 20px 50px ${facility.color}28, 0 0 0 1px ${facility.color}20`,
                  transition: { duration: 0.28 },
                }}
                className="glass rounded-2xl p-7 cursor-default group"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${facility.color}15`,
                    border: `1px solid ${facility.color}30`,
                  }}
                >
                  <Icon size={22} style={{ color: facility.color }} />
                </div>

                {/* Title */}
                <h3 className="font-heading font-semibold text-xl text-soft-white mb-2">
                  {facility.title}
                </h3>

                {/* Description */}
                <p className="text-muted text-sm leading-relaxed">
                  {facility.desc}
                </p>

                {/* Bottom accent */}
                <div
                  className="mt-5 h-0.5 w-0 rounded-full group-hover:w-full transition-all duration-500"
                  style={{ background: `${facility.color}60` }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
