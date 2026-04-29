"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Globe,
  MessageSquare,
  Camera,
  Play,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Admissions", href: "/admissions" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "#contact" },
];

const academics = [
  { label: "Primary School (1–5)", href: "#" },
  { label: "Middle School (6–8)", href: "#" },
  { label: "Secondary (9–10)", href: "#" },
  { label: "Senior Secondary (11–12)", href: "#" },
  { label: "Extra-Curricular", href: "#" },
];

const socialLinks = [
  { icon: Globe,        label: "Facebook",  href: "#" },
  { icon: MessageSquare,label: "Twitter",   href: "#" },
  { icon: Camera,       label: "Instagram", href: "#" },
  { icon: Play,         label: "YouTube",   href: "#" },
];

const contactInfo = [
  { icon: Phone, text: "+91 891 234 5678" },
  { icon: Mail, text: "info@vizaginternational.edu.in" },
  { icon: MapPin, text: "NH-16, Bheemunipatnam, Visakhapatnam – 531 163" },
];

export default function Footer() {
  return (
    <footer className="relative bg-navy overflow-hidden" id="contact">
      {/* Top glow border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent opacity-60" />
      <div
        className="absolute top-0 left-0 right-0 h-12 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(59,130,246,0.07), transparent)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6 pt-16 pb-8"
      >
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-electric flex items-center justify-center glow-blue shrink-0">
                <GraduationCap size={20} className="text-white" />
              </div>
              <span className="font-heading font-bold text-soft-white text-base leading-tight">
                Vizag International
                <br />
                <span className="text-electric text-sm font-normal tracking-wide">
                  School
                </span>
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              25 years of shaping tomorrow's leaders with world-class education,
              values, and a culture of excellence in Visakhapatnam.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-soft-white text-sm mb-4 tracking-wide uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted text-sm hover:text-electric transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-electric opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Academics */}
          <div>
            <h4 className="font-heading font-semibold text-soft-white text-sm mb-4 tracking-wide uppercase">
              Academics
            </h4>
            <ul className="space-y-2.5">
              {academics.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-muted text-sm hover:text-electric transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-electric opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h4 className="font-heading font-semibold text-soft-white text-sm mb-4 tracking-wide uppercase">
              Contact Info
            </h4>
            <ul className="space-y-3 mb-7">
              {contactInfo.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2.5">
                  <Icon
                    size={14}
                    className="text-electric mt-0.5 shrink-0"
                  />
                  <span className="text-muted text-sm leading-relaxed">
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            <h4 className="font-heading font-semibold text-soft-white text-sm mb-3 tracking-wide uppercase">
              Follow Us
            </h4>
            <div className="flex items-center gap-2.5">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 glass rounded-lg flex items-center justify-center text-muted hover:text-electric hover:glow-blue transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/8 mb-6" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-muted text-xs">
            © {new Date().getFullYear()} Vizag International School. All rights
            reserved.
          </span>
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-muted text-xs hover:text-electric transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted text-xs hover:text-electric transition-colors duration-200"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
