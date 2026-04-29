"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const words = ["Shaping", "Tomorrow's", "Leaders"];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.7 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 55, rotateX: -28 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.9, ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number] },
  },
};

export default function Hero() {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0A0F1E" }}
    >
      {/* Video background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeIn" }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/videos/hero-animation.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ backgroundColor: "rgba(10, 15, 30, 0.60)" }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #0a0f1e)",
        }}
      />

      {/* Hero content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
          <span className="text-electric text-xs font-medium tracking-widest uppercase">
            Admissions Open 2025–26
          </span>
        </motion.div>

        {/* Staggered headline */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-heading font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-soft-white leading-none mb-2"
          style={{ perspective: "1200px" }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className="inline-block mr-[0.2em] last:mr-0"
              style={{ transformOrigin: "bottom center", display: "inline-block" }}
            >
              {i === 1 ? (
                <span className="text-electric">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-muted text-base sm:text-lg md:text-xl max-w-2xl mx-auto mt-5 mb-10 leading-relaxed"
        >
          Vizag International School nurtures young minds with world-class
          education, values-driven learning, and a legacy of excellence spanning
          25 years in Visakhapatnam.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#admissions"
            className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 rounded-full bg-gold text-navy font-semibold text-base transition-all duration-300 glow-gold hover:scale-105 hover:bg-gold-dark"
          >
            Apply for Admission
          </a>
          <a
            href="#about"
            className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 rounded-full border border-electric text-electric font-semibold text-base transition-all duration-300 hover:bg-electric hover:text-navy hover:scale-105"
          >
            Explore School
          </a>
        </motion.div>
      </div>

      {/* Bounce scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
      >
        <span className="text-muted text-[10px] tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
