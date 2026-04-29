"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, GraduationCap } from "lucide-react";

const navLinks = [
  { label: "Home",       href: "/" },
  { label: "About",      href: "/about" },
  { label: "Admissions", href: "/admissions" },
  { label: "Gallery",    href: "/gallery" },
  { label: "Contact",    href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY }             = useScroll();
  const pathname                = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-electric flex items-center justify-center glow-blue shrink-0">
                <GraduationCap size={18} className="text-white" />
              </div>
              <span className="font-heading font-bold text-soft-white text-sm sm:text-base leading-tight">
                Vizag International
                <br />
                <span className="text-electric text-xs sm:text-sm font-normal tracking-wide">
                  School
                </span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop nav links */}
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center gap-8"
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors duration-200 relative group ${
                      active ? "text-soft-white" : "text-muted hover:text-soft-white"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px rounded-full transition-all duration-300 ${
                        active ? "w-full bg-gold" : "w-0 bg-electric group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </motion.ul>

          {/* Desktop CTA + mobile hamburger */}
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden md:flex items-center gap-3"
            >
              <Link
                href="/login"
                className="inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold border border-electric text-electric transition-all duration-300 hover:bg-electric/10 hover:scale-105"
              >
                Login
              </Link>
              <Link
                href="/admissions"
                className="inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold bg-gold text-navy transition-all duration-300 glow-gold hover:scale-105 hover:bg-gold-dark"
              >
                Apply Now
              </Link>
            </motion.div>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden text-soft-white p-1 z-50 relative"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="block">
                    <X size={24} />
                  </motion.span>
                ) : (
                  <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} className="block">
                    <Menu size={24} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-navy glass flex flex-col px-8 pt-28 pb-12"
          >
            <ul className="flex flex-col gap-7">
              {navLinks.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <motion.li key={link.label} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.07 }}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`font-heading text-2xl transition-colors duration-200 ${
                        active ? "text-gold" : "text-soft-white hover:text-electric"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }} className="mt-12 flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center w-full px-6 py-3.5 rounded-full font-semibold border border-electric text-electric text-base hover:bg-electric/10 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/admissions"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center w-full px-6 py-3.5 rounded-full font-semibold bg-gold text-navy glow-gold text-base"
              >
                Apply for Admission
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
