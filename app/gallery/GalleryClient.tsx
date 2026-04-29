"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  BookOpen,
  FlaskConical,
  Music,
  Building2,
  Camera,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  ZoomIn,
} from "lucide-react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

type Category = "All" | "Events" | "Sports" | "Academics" | "Cultural" | "Infrastructure";

type GalleryItem = {
  id: number;
  title: string;
  category: Exclude<Category, "All">;
  gradient: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  height: "short" | "medium" | "tall";
};

const galleryItems: GalleryItem[] = [
  { id: 1,  title: "Annual Sports Day 2024",    category: "Sports",         gradient: "from-blue-900 via-blue-800 to-electric/50",      icon: Trophy,       height: "tall" },
  { id: 2,  title: "Science Exhibition",        category: "Academics",      gradient: "from-teal-900 via-teal-800 to-emerald-600/50",   icon: FlaskConical, height: "short" },
  { id: 3,  title: "Cultural Fest – Tarangini", category: "Cultural",       gradient: "from-purple-900 via-purple-800 to-pink-600/50",  icon: Music,        height: "medium" },
  { id: 4,  title: "New Auditorium Block",      category: "Infrastructure", gradient: "from-slate-900 via-slate-800 to-blue-700/50",   icon: Building2,    height: "short" },
  { id: 5,  title: "Inter-School Cricket Final",category: "Sports",         gradient: "from-green-900 via-green-800 to-emerald-500/50",icon: Trophy,       height: "medium" },
  { id: 6,  title: "Republic Day Celebration",  category: "Events",         gradient: "from-orange-900 via-orange-800 to-gold/50",     icon: Camera,       height: "tall" },
  { id: 7,  title: "Library Reading Week",      category: "Academics",      gradient: "from-indigo-900 via-indigo-800 to-violet-600/50",icon: BookOpen,    height: "short" },
  { id: 8,  title: "Bharatanatyam Performance", category: "Cultural",       gradient: "from-rose-900 via-rose-800 to-pink-500/50",     icon: Music,        height: "tall" },
  { id: 9,  title: "Smart Lab Inauguration",    category: "Infrastructure", gradient: "from-cyan-900 via-cyan-800 to-teal-600/50",     icon: Building2,    height: "medium" },
  { id: 10, title: "Robotics Competition",      category: "Academics",      gradient: "from-violet-900 via-violet-800 to-purple-500/50",icon: FlaskConical,height: "short" },
  { id: 11, title: "Graduation Ceremony 2024",  category: "Events",         gradient: "from-yellow-900 via-yellow-800 to-gold/60",     icon: Camera,       height: "medium" },
  { id: 12, title: "Swimming Championships",    category: "Sports",         gradient: "from-sky-900 via-sky-800 to-blue-500/50",       icon: Trophy,       height: "tall" },
];

const categories: Category[] = ["All", "Events", "Sports", "Academics", "Cultural", "Infrastructure"];

const heightMap: Record<GalleryItem["height"], string> = {
  short:  "h-44",
  medium: "h-60",
  tall:   "h-80",
};

function GalleryHero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-navy" style={{ minHeight: "55vh" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background:
          "radial-gradient(ellipse 70% 60% at 40% 40%, rgba(59,130,246,0.12) 0%, transparent 60%), " +
          "radial-gradient(ellipse 50% 40% at 70% 70%, rgba(139,92,246,0.08) 0%, transparent 60%)",
      }} />
      <div className="absolute inset-0" style={{
        backgroundImage: "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,15,30,0.4), rgba(10,15,30,0.85))" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32 pb-16">
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-electric text-xs font-medium tracking-[0.25em] uppercase block mb-5">
          Our Campus Life
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-soft-white leading-tight mb-5">
          Life at Vizag <span className="text-electric">International</span> School
        </motion.h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }} className="h-0.5 w-28 mx-auto mb-5 rounded-full" style={{ background: "linear-gradient(to right, #3B82F6, #8B5CF6)", transformOrigin: "left center" }} />
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }} className="text-muted text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Memories, Milestones &amp; Moments
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #0a0f1e)" }} />
    </section>
  );
}

function FilterTabs({ active, onChange }: { active: Category; onChange: (c: Category) => void }) {
  return (
    <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
      {categories.map((cat) => (
        <button key={cat} onClick={() => onChange(cat)} className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${active === cat ? "text-navy" : "text-muted hover:text-soft-white glass"}`}>
          {active === cat && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-electric glow-blue" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
          <span className="relative z-10">{cat}</span>
        </button>
      ))}
    </div>
  );
}

function Lightbox({ items, index, onClose, onPrev, onNext }: { items: GalleryItem[]; index: number; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  const item = items[index];
  const Icon = item.icon;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
      <button onClick={onClose} className="absolute top-5 right-5 z-10 w-10 h-10 glass rounded-full flex items-center justify-center text-muted hover:text-soft-white transition-colors duration-200" aria-label="Close"><X size={18} /></button>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 sm:left-8 z-10 w-10 h-10 glass rounded-full flex items-center justify-center text-muted hover:text-soft-white transition-colors duration-200" aria-label="Previous"><ChevronLeft size={20} /></button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 sm:right-8 z-10 w-10 h-10 glass rounded-full flex items-center justify-center text-muted hover:text-soft-white transition-colors duration-200" aria-label="Next"><ChevronRight size={20} /></button>

      <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} onClick={(e) => e.stopPropagation()} className={`relative w-full max-w-2xl rounded-2xl overflow-hidden bg-gradient-to-br ${item.gradient}`} style={{ height: "420px" }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: "rgba(0,0,0,0.35)" }}>
            <Icon size={40} className="text-white/80" />
          </div>
          <div className="text-center px-6">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-1">{item.title}</h3>
            <span className="text-white/60 text-xs uppercase tracking-widest">{item.category}</span>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 glass rounded-full px-3 py-1 text-xs text-soft-white">{index + 1} / {items.length}</div>
      </motion.div>
    </motion.div>
  );
}

function MasonryGrid({ items, onSelect }: { items: GalleryItem[]; onSelect: (i: number) => void }) {
  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
  const cardVariants = { hidden: { opacity: 0, y: 40, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1 } };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ columns: "2", columnGap: "1.25rem" }} className="sm:columns-2 lg:columns-3">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div key={item.id} variants={cardVariants} transition={{ duration: 0.55 }} className={`relative ${heightMap[item.height]} mb-5 rounded-2xl overflow-hidden cursor-pointer group break-inside-avoid`} onClick={() => onSelect(idx)} style={{ breakInside: "avoid" }}>
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-500 group-hover:scale-105`} />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-300 group-hover:opacity-0">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,0,0,0.30)" }}><Icon size={24} className="text-white/80" /></div>
              <span className="text-white/50 text-xs uppercase tracking-widest px-3 text-center">{item.category}</span>
            </div>
            <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-4">
              <ZoomIn size={24} className="text-white/90" />
              <span className="font-heading font-semibold text-sm text-white text-center leading-tight">{item.title}</span>
              <span className="text-white/50 text-xs uppercase tracking-widest">View Photo</span>
            </div>
            <div className="absolute top-3 left-3">
              <span className="text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider" style={{ background: "rgba(0,0,0,0.45)", color: "rgba(255,255,255,0.8)" }}>{item.category}</span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeFilter === "All" ? galleryItems : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <section className="relative py-20 bg-navy overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 40% at 50% 30%, rgba(59,130,246,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className="text-center mb-12">
          <span className="text-electric text-xs font-medium tracking-[0.25em] uppercase">Photo Gallery</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-soft-white mt-2">Campus Moments</h2>
        </motion.div>

        <FilterTabs active={activeFilter} onChange={setActiveFilter} />

        <AnimatePresence mode="wait">
          <motion.div key={activeFilter} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <MasonryGrid items={filtered} onSelect={setLightboxIndex} />
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filtered}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + filtered.length) % filtered.length))}
            onNext={() => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % filtered.length))}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative py-20 bg-navy overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }} className="text-center mb-10">
          <span className="text-electric text-xs font-medium tracking-[0.25em] uppercase">Take a Tour</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-soft-white mt-2">School Tour Video</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.1 }} className="glass rounded-2xl overflow-hidden cursor-pointer group" onClick={() => setPlaying(true)}>
          <div className="relative w-full flex items-center justify-center" style={{ height: "380px", background: "linear-gradient(135deg, rgba(10,20,50,0.9) 0%, rgba(20,40,80,0.8) 50%, rgba(10,15,30,0.95) 100%)" }}>
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

            {!playing ? (
              <div className="relative flex flex-col items-center gap-5">
                <div className="relative">
                  <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="absolute inset-0 rounded-full border border-electric/40" />
                  <motion.div whileHover={{ scale: 1.08 }} className="w-[72px] h-[72px] rounded-full bg-electric/20 border-2 border-electric flex items-center justify-center glow-blue">
                    <Play size={28} className="text-white ml-1" />
                  </motion.div>
                </div>
                <div className="text-center">
                  <p className="font-heading font-semibold text-soft-white text-lg">Virtual Campus Tour</p>
                  <p className="text-muted text-sm mt-1">4 minutes · Vizag International School</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 text-center px-8">
                <div className="w-16 h-16 rounded-full bg-electric/20 border-2 border-electric flex items-center justify-center">
                  <Play size={24} className="text-white ml-1" />
                </div>
                <p className="text-soft-white font-heading text-lg">Video player coming soon!</p>
                <p className="text-muted text-sm max-w-xs">Connect your school&apos;s YouTube embed URL here for the full campus tour experience.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function GalleryClient() {
  return (
    <main className="bg-navy overflow-x-hidden">
      <Navbar />
      <GalleryHero />
      <GallerySection />
      <VideoSection />
      <Footer />
    </main>
  );
}
