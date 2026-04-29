"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  {
    value: 2500,
    suffix: "+",
    label: "Students",
    sub: "Enrolled across all grades",
  },
  {
    value: 150,
    suffix: "+",
    label: "Teachers",
    sub: "Dedicated educators",
  },
  {
    value: 25,
    suffix: " Yrs",
    label: "Legacy",
    sub: "Years of excellence",
  },
  {
    value: 98,
    suffix: "%",
    label: "Pass Rate",
    sub: "Consistent results",
  },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      stats.forEach((stat, i) => {
        const el = counterRefs.current[i];
        if (!el) return;
        const obj = { val: 0 };

        gsap.to(obj, {
          val: stat.value,
          duration: 2.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate() {
            el.textContent = `${Math.round(obj.val)}${stat.suffix}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 bg-navy overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-electric text-xs font-medium tracking-[0.25em] uppercase">
            Our Numbers
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-soft-white mt-2">
            Excellence by the Numbers
          </h2>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="glass rounded-2xl p-6 sm:p-8 text-center cursor-default"
            >
              {/* Counter */}
              <span
                ref={(el) => {
                  counterRefs.current[i] = el;
                }}
                className="font-heading font-bold text-4xl sm:text-5xl text-electric block"
              >
                0
              </span>

              {/* Label */}
              <span className="font-heading font-semibold text-lg sm:text-xl text-soft-white mt-2 block">
                {stat.label}
              </span>

              {/* Sub label */}
              <span className="text-muted text-xs sm:text-sm mt-1 block leading-relaxed">
                {stat.sub}
              </span>

              {/* Decorative line */}
              <div className="mt-4 mx-auto w-10 h-0.5 rounded-full bg-electric opacity-40" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
