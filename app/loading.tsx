"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-navy flex flex-col items-center justify-center z-50"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Spinning ring + logo */}
        <div className="relative w-16 h-16">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-electric border-r-electric/30"
            style={{ boxShadow: "0 0 20px rgba(59,130,246,0.25)" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-9 h-9 rounded-lg bg-electric flex items-center justify-center glow-blue">
              <GraduationCap size={18} className="text-white" />
            </div>
          </div>
        </div>

        {/* School name */}
        <div className="text-center">
          <h2 className="font-heading font-bold text-soft-white text-lg tracking-wide">
            Vizag International School
          </h2>

          {/* Dot animation */}
          <div className="flex items-center justify-center gap-1 mt-2">
            <span className="text-muted text-sm">Loading</span>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                className="text-muted text-sm"
              >
                .
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
