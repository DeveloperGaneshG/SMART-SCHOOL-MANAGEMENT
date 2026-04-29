"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Target,
  Eye,
  Award,
  BookOpen,
  Star,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden bg-navy"
      style={{ minHeight: "70vh" }}
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(59,130,246,0.13) 0%, transparent 60%), " +
              "radial-gradient(ellipse 60% 50% at 70% 60%, rgba(245,158,11,0.07) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,15,30,0.3), rgba(10,15,30,0.82))",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32 pb-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-electric text-xs font-medium tracking-[0.25em] uppercase block mb-5"
        >
          Our Story
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-soft-white leading-tight mb-5"
        >
          About Vizag{" "}
          <span className="text-electric">International</span> School
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="h-0.5 w-28 mx-auto mb-6 rounded-full"
          style={{
            background: "linear-gradient(to right, #3B82F6, #F59E0B)",
            transformOrigin: "left center",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-muted text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
        >
          25 Years of Excellence in Education
        </motion.p>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0a0f1e)" }}
      />
    </section>
  );
}

function MissionVision() {
  return (
    <section className="relative py-24 bg-navy overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-electric text-xs font-medium tracking-[0.25em] uppercase">
            Our Purpose
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-soft-white mt-2">
            Mission &amp; Vision
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
              y: -6,
              boxShadow: "0 20px 50px rgba(59,130,246,0.18), 0 0 0 1px rgba(59,130,246,0.12)",
            }}
            className="glass rounded-2xl p-8 cursor-default"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
              style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.25)" }}
            >
              <Target size={22} className="text-electric" />
            </div>
            <h3 className="font-heading font-bold text-2xl text-soft-white mb-3">Our Mission</h3>
            <div className="w-10 h-0.5 bg-electric rounded-full mb-4 opacity-50" />
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              To provide a transformative educational experience that empowers every student with
              knowledge, critical thinking, and values — preparing them to lead with integrity and
              purpose in a rapidly evolving global landscape.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
              y: -6,
              boxShadow: "0 20px 50px rgba(245,158,11,0.14), 0 0 0 1px rgba(245,158,11,0.12)",
            }}
            className="glass rounded-2xl p-8 cursor-default"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
              style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)" }}
            >
              <Eye size={22} className="text-gold" />
            </div>
            <h3 className="font-heading font-bold text-2xl text-soft-white mb-3">Our Vision</h3>
            <div className="w-10 h-0.5 bg-gold rounded-full mb-4 opacity-50" />
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              To be the premier institution in Visakhapatnam that nurtures globally competent,
              ethically grounded, and creatively empowered individuals who contribute meaningfully
              to society and the world.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const milestones = [
  { year: "1999", title: "School Founded", desc: "Vizag International School opened its doors with a founding batch of 120 students and a vision to redefine education in Visakhapatnam.", color: "#3B82F6" },
  { year: "2005", title: "First 100% Board Results", desc: "Our first batch of Class 10 students achieved 100% results — a milestone that set the tone for academic excellence for generations to come.", color: "#F59E0B" },
  { year: "2012", title: "New Campus Expansion", desc: "A state-of-the-art 15-acre campus was inaugurated, including smart classrooms, science labs, a sports complex, and a 1,200-seat auditorium.", color: "#10B981" },
  { year: "2018", title: "International Curriculum", desc: "Introduced Cambridge IGCSE and International Baccalaureate tracks, opening global pathways and study-abroad opportunities for our students.", color: "#8B5CF6" },
  { year: "2024", title: "Digital Smart School Initiative", desc: "Launched AI-powered smart classrooms, a digital library, and a comprehensive student management platform — entering a new era of education.", color: "#F59E0B" },
];

function TimelineCard({ m, align }: { m: (typeof milestones)[0]; align: "left" | "right" }) {
  return (
    <div
      className={`glass rounded-2xl p-6 ${align === "right" ? "md:text-right" : ""}`}
      style={{ borderColor: `${m.color}20` }}
    >
      <span className="font-heading font-bold text-3xl sm:text-4xl block mb-1" style={{ color: m.color }}>
        {m.year}
      </span>
      <h3 className="font-heading font-semibold text-lg text-soft-white mb-2">{m.title}</h3>
      <p className="text-muted text-sm leading-relaxed">{m.desc}</p>
    </div>
  );
}

function Timeline() {
  return (
    <section className="relative py-24 bg-navy overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 20% 60%, rgba(59,130,246,0.05) 0%, transparent 60%)" }}
      />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-electric text-xs font-medium tracking-[0.25em] uppercase">Journey</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-soft-white mt-2">Our Story</h2>
        </motion.div>

        <div className="relative">
          <div
            className="absolute left-1/2 -translate-x-1/2 top-2 bottom-2 w-px hidden md:block"
            style={{ background: "linear-gradient(to bottom, rgba(59,130,246,0.6), rgba(59,130,246,0.1))" }}
          />

          <div className="space-y-8 md:space-y-0">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative md:pb-14"
                >
                  <div className="flex items-start gap-4 md:hidden">
                    <div className="flex flex-col items-center pt-2 shrink-0">
                      <div className="w-3 h-3 rounded-full" style={{ background: m.color, boxShadow: `0 0 10px ${m.color}90` }} />
                      {i < milestones.length - 1 && (
                        <div className="w-px h-full min-h-[60px] mt-2 opacity-25" style={{ background: m.color }} />
                      )}
                    </div>
                    <div className="flex-1"><TimelineCard m={m} align="left" /></div>
                  </div>

                  <div className="hidden md:flex items-center">
                    <div className="flex-1 flex justify-end pr-10">
                      {isLeft && <TimelineCard m={m} align="right" />}
                    </div>
                    <div className="relative z-10 shrink-0">
                      <div
                        className="w-4 h-4 rounded-full border-2"
                        style={{ borderColor: m.color, background: "#0a0f1e", boxShadow: `0 0 16px ${m.color}90, 0 0 32px ${m.color}40` }}
                      />
                    </div>
                    <div className="flex-1 pl-10">
                      {!isLeft && <TimelineCard m={m} align="left" />}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const leaders = [
  { initials: "RK", name: "Dr. Radha Krishna Murthy", title: "Principal", bio: "PhD in Education with 30+ years of experience shaping curriculum and fostering a culture of academic rigour across leading CBSE institutions.", gradient: "from-blue-800/60 to-electric/20" },
  { initials: "LP", name: "Mrs. Lakshmi Priya", title: "Vice Principal", bio: "An award-winning educator with expertise in student counselling, administrative excellence, and holistic development programmes.", gradient: "from-yellow-800/60 to-gold/20" },
  { initials: "VS", name: "Mr. Venkat Srinivas", title: "Academic Director", bio: "15 years of curriculum design experience with international frameworks including Cambridge IGCSE and IB Diploma programmes.", gradient: "from-purple-800/60 to-purple-400/20" },
];

function Leadership() {
  return (
    <section className="relative py-24 bg-navy overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 80% 30%, rgba(245,158,11,0.04) 0%, transparent 60%)" }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-electric text-xs font-medium tracking-[0.25em] uppercase">The Team</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-soft-white mt-2">Leadership Team</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
          {leaders.map((leader, i) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: i * 0.12 }}
              whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(59,130,246,0.2), 0 0 0 1px rgba(59,130,246,0.14)" }}
              className="glass rounded-2xl p-7 text-center cursor-default"
            >
              <div className={`w-20 h-20 rounded-full mx-auto mb-5 bg-gradient-to-br ${leader.gradient} flex items-center justify-center border border-white/10`}>
                <span className="font-heading font-bold text-2xl text-soft-white">{leader.initials}</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-soft-white mb-1">{leader.name}</h3>
              <span className="text-electric text-xs font-medium tracking-widest uppercase block mb-3">{leader.title}</span>
              <div className="w-8 h-0.5 bg-electric rounded-full mx-auto mb-4 opacity-40" />
              <p className="text-muted text-sm leading-relaxed">{leader.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const achievements = [
  { icon: Award, title: "Best School Award 2023", desc: "Recognized as the top school in Vizag district by the State Education Board.", color: "#F59E0B" },
  { icon: CheckCircle, title: "100% Board Results", desc: "Consistently achieving 100% pass rates in CBSE Class 10 & 12 examinations for 12 consecutive years.", color: "#10B981" },
  { icon: Star, title: "ISO 9001:2015 Certified", desc: "Internationally certified for quality management in educational processes and infrastructure.", color: "#3B82F6" },
  { icon: BookOpen, title: "Top CBSE School Vizag", desc: "Ranked #1 CBSE school in Visakhapatnam for 5 consecutive years by Education Today magazine.", color: "#8B5CF6" },
];

function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".achievement-card",
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.13, ease: "power3.out",
          scrollTrigger: { trigger: ".achievement-grid", start: "top 80%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-navy overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(59,130,246,0.05) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-electric text-xs font-medium tracking-[0.25em] uppercase">Recognition</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-soft-white mt-2">
            Achievements &amp; Awards
          </h2>
        </motion.div>

        <div className="achievement-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.title}
                className="achievement-card glass rounded-2xl p-6 cursor-default group transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${a.color}15`, border: `1px solid ${a.color}30` }}
                >
                  <Icon size={22} style={{ color: a.color }} />
                </div>
                <h3 className="font-heading font-semibold text-base text-soft-white mb-2">{a.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{a.desc}</p>
                <div className="mt-4 h-0.5 w-0 rounded-full group-hover:w-full transition-all duration-500" style={{ background: `${a.color}60` }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function AboutClient() {
  return (
    <main className="bg-navy overflow-x-hidden">
      <Navbar />
      <AboutHero />
      <MissionVision />
      <Timeline />
      <Leadership />
      <Achievements />
      <Footer />
    </main>
  );
}
