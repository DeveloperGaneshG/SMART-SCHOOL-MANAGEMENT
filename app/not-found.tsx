"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, MessageCircle } from "lucide-react";

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            left: `${(i * 17 + 5) % 100}%`,
            top: `${(i * 23 + 10) % 100}%`,
            background: i % 2 === 0 ? "rgba(59,130,246,0.4)" : "rgba(245,158,11,0.35)",
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.15, 0.6, 0.15],
          }}
          transition={{
            repeat: Infinity,
            duration: 3 + (i % 4),
            delay: (i * 0.3) % 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center relative overflow-hidden">
      <Particles />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.07) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center px-6 max-w-lg mx-auto"
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="font-heading font-bold text-[9rem] sm:text-[11rem] leading-none mb-4 select-none"
            style={{
              color: "#F59E0B",
              textShadow:
                "0 0 40px rgba(245,158,11,0.35), 0 0 80px rgba(245,158,11,0.15)",
            }}
          >
            404
          </h1>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-heading font-bold text-2xl sm:text-3xl text-soft-white mb-4"
        >
          Oops! Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted text-base leading-relaxed mb-10"
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold bg-electric text-white glow-blue hover:bg-blue-500 transition-all duration-300 hover:scale-105"
          >
            <Home size={18} />
            Go Back Home
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold border border-white/20 text-soft-white hover:bg-white/5 transition-all duration-300"
          >
            <MessageCircle size={18} />
            Contact Support
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
