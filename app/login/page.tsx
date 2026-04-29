"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  GraduationCap,
  CheckCircle2,
  Loader2,
  BookOpen,
  Bell,
  BarChart2,
  ArrowLeft,
} from "lucide-react";

// ─── Floating particle dots for branding panel ───────────────────────────────
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 8 + 6,
  delay: Math.random() * 4,
}));

function BrandParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-electric opacity-20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -20, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {/* Decorative rings */}
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border border-electric/10" />
      <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full border border-electric/10" />
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full border border-gold/10" />
    </div>
  );
}

// ─── Role tabs ────────────────────────────────────────────────────────────────
type Role = "parent" | "teacher" | "admin";

const ROLES: { id: Role; label: string }[] = [
  { id: "parent", label: "Parent" },
  { id: "teacher", label: "Teacher" },
  { id: "admin", label: "Admin" },
];

const DEMO_CREDS: Record<Role, { email: string; password: string }> = {
  parent: { email: "parent@vizag.edu", password: "parent123" },
  teacher: { email: "teacher@vizag.edu", password: "teacher123" },
  admin: { email: "admin@vizag.edu", password: "admin123" },
};

// ─── Feature points ───────────────────────────────────────────────────────────
const FEATURES = [
  { icon: BarChart2, text: "Track your child's progress" },
  { icon: Bell, text: "Stay updated with announcements" },
  { icon: BookOpen, text: "Access reports anytime" },
];

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>("parent");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      const session = await getSession();
      const role = session?.user?.role ?? "parent";
      router.push(`/dashboard/${role}`);
    } else {
      setError("Invalid email or password. Please check your credentials.");
      setLoading(false);
    }
  }

  function fillDemo(role: Role) {
    setSelectedRole(role);
    setEmail(DEMO_CREDS[role].email);
    setPassword(DEMO_CREDS[role].password);
    setError("");
  }

  return (
    <div className="min-h-screen flex bg-navy">
      {/* ── LEFT BRANDING PANEL (40%) ── */}
      <div
        className="hidden lg:flex lg:w-[40%] flex-col justify-between p-10 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #0D1426 0%, #0a0f1e 60%, #0f1a35 100%)" }}
      >
        <BrandParticles />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 relative z-10"
        >
          <div className="w-10 h-10 rounded-xl bg-electric flex items-center justify-center glow-blue shrink-0">
            <GraduationCap size={20} className="text-white" />
          </div>
          <div>
            <p className="font-heading font-bold text-soft-white text-sm leading-tight">
              Vizag International School
            </p>
            <p className="text-electric text-xs font-normal tracking-wide">
              Est. 1999 · Visakhapatnam
            </p>
          </div>
        </motion.div>

        {/* Center content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10"
        >
          <h2 className="font-heading font-bold text-4xl text-soft-white leading-tight mb-3">
            Empowering Education,
            <br />
            <span className="text-gold">Inspiring Futures</span>
          </h2>
          <p className="text-muted text-sm leading-relaxed mb-8">
            Your all-in-one portal for tracking academic progress, staying
            connected with the school, and nurturing your child's growth.
          </p>

          <div className="flex flex-col gap-4">
            {FEATURES.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center shrink-0 border border-electric/20">
                  <Icon size={15} className="text-electric" />
                </div>
                <span className="text-soft-white/80 text-sm">{text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom stat strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center gap-6 relative z-10"
        >
          {[["2500+", "Students"], ["150+", "Teachers"], ["98%", "Pass Rate"]].map(
            ([val, label]) => (
              <div key={label}>
                <p className="font-heading font-bold text-gold text-lg">{val}</p>
                <p className="text-muted text-xs">{label}</p>
              </div>
            )
          )}
        </motion.div>
      </div>

      {/* ── RIGHT FORM PANEL (60%) ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        {/* Back to website */}
        <Link
          href="/"
          className="absolute top-6 left-6 flex items-center gap-1.5 text-muted hover:text-soft-white transition-colors duration-200 text-xs group"
        >
          <ArrowLeft size={13} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
          Back to Website
        </Link>

        {/* Mobile logo */}
        <div className="absolute top-14 left-6 flex items-center gap-2 lg:hidden">
          <div className="w-8 h-8 rounded-lg bg-electric flex items-center justify-center">
            <GraduationCap size={16} className="text-white" />
          </div>
          <span className="font-heading font-bold text-soft-white text-sm">
            Vizag International School
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="w-full max-w-md"
        >
          {/* Heading */}
          <div className="mb-8">
            <h1 className="font-heading font-bold text-3xl text-soft-white mb-1">
              Welcome Back
            </h1>
            <p className="text-muted text-sm">Sign in to your dashboard</p>
          </div>

          {/* Role selector */}
          <div className="flex gap-2 p-1 glass rounded-xl mb-6 border border-white/10">
            {ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  setSelectedRole(r.id);
                  setError("");
                }}
                className="relative flex-1 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none"
              >
                {selectedRole === r.id && (
                  <motion.div
                    layoutId="role-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    selectedRole === r.id ? "text-navy" : "text-muted"
                  }`}
                >
                  {r.label}
                </span>
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="block text-xs text-muted mb-1.5 font-medium">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@vizag.edu"
                required
                className="w-full px-4 py-3 rounded-xl text-sm text-soft-white placeholder-muted/50 glass border border-white/10 focus:border-electric/60 focus:outline-none focus:ring-1 focus:ring-electric/30 transition-all duration-200 bg-transparent"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-muted font-medium">Password</label>
                <button
                  type="button"
                  className="text-xs text-electric hover:text-blue-400 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 pr-11 rounded-xl text-sm text-soft-white placeholder-muted/50 glass border border-white/10 focus:border-electric/60 focus:outline-none focus:ring-1 focus:ring-electric/30 transition-all duration-200 bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-soft-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Sign In button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-navy flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed glow-gold hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6">
            <p className="text-xs text-muted text-center mb-3">
              — Demo credentials —
            </p>
            <div className="flex flex-col gap-2">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => fillDemo(r.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all duration-200 text-left group ${
                    selectedRole === r.id
                      ? "border-gold/40 bg-gold/5"
                      : "border-white/8 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={13}
                      className={
                        selectedRole === r.id ? "text-gold" : "text-muted/40"
                      }
                    />
                    <span className="text-xs font-medium text-soft-white/80 capitalize">
                      {r.label}
                    </span>
                  </div>
                  <span className="text-xs text-muted font-mono">
                    {DEMO_CREDS[r.id].email}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
