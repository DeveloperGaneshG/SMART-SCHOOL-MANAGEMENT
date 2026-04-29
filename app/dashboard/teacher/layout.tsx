"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Home,
  BookOpen,
  CheckSquare,
  PenLine,
  BarChart2,
  Users,
  GraduationCap,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bell,
} from "lucide-react";

const NAV_ITEMS: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Overview", href: "/dashboard/teacher", icon: Home },
  { label: "My Classes", href: "/dashboard/teacher/classes", icon: BookOpen },
  { label: "Attendance Entry", href: "/dashboard/teacher/attendance", icon: CheckSquare },
  { label: "Marks Entry", href: "/dashboard/teacher/marks", icon: PenLine },
  { label: "Performance", href: "/dashboard/teacher/performance", icon: BarChart2 },
  { label: "Students", href: "/dashboard/teacher/students", icon: Users },
];

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(" ");
  const initials =
    parts.length >= 2 ? parts[0][0] + parts[parts.length - 1][0] : parts[0].slice(0, 2);
  return (
    <div className="w-9 h-9 rounded-full bg-electric flex items-center justify-center shrink-0 glow-blue">
      <span className="text-white text-xs font-bold uppercase">{initials}</span>
    </div>
  );
}

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const userName = session?.user?.name ?? "Mr. Rajesh Kumar";

  async function handleSignOut() {
    await signOut({ redirect: false });
    router.push("/login");
  }

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-full flex flex-col py-6 px-4 overflow-y-auto"
      style={{ background: "#0D1426" }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between mb-8 px-2">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-electric flex items-center justify-center glow-blue shrink-0">
            <GraduationCap size={16} className="text-white" />
          </div>
          <div>
            <p className="font-heading font-bold text-soft-white text-xs leading-tight">
              Vizag International
            </p>
            <p className="text-electric text-[10px] tracking-wide">School</p>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-muted hover:text-soft-white lg:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Teacher card */}
      <div className="glass rounded-xl p-3 mb-6 border border-white/10">
        <div className="flex items-center gap-3">
          <Initials name={userName} />
          <div className="min-w-0">
            <p className="text-soft-white text-sm font-semibold truncate">{userName}</p>
            <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-electric/15 text-electric border border-electric/20">
              Class Teacher – Grade 9A
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        <p className="text-muted/60 text-[10px] font-semibold tracking-widest uppercase px-3 mb-2">
          Navigation
        </p>
        {NAV_ITEMS.map(({ label, href, icon: Icon }, i) => {
          const isActive = pathname === href;
          return (
            <motion.div
              key={href}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.05 + i * 0.06 }}
            >
              <Link
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                  isActive
                    ? "bg-electric/15 text-electric border border-electric/25"
                    : "text-muted hover:text-soft-white hover:bg-white/5"
                }`}
              >
                <Icon
                  size={17}
                  className={isActive ? "text-electric" : "text-muted group-hover:text-soft-white"}
                />
                {label}
                {isActive && <ChevronRight size={14} className="ml-auto text-electric" />}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Sign out */}
      <button
        onClick={handleSignOut}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-red-400 hover:bg-red-500/8 transition-all duration-200 mt-4"
      >
        <LogOut size={17} />
        Sign Out
      </button>
    </motion.aside>
  );
}

export default function TeacherDashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const userName = session?.user?.name ?? "Mr. Rajesh Kumar";

  const pageTitle = NAV_ITEMS.find((n) => pathname === n.href)?.label ?? "Dashboard";

  const now = new Date();
  const dateString = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-navy flex">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col w-[260px] shrink-0 fixed inset-y-0 left-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              className="fixed inset-y-0 left-0 w-[260px] z-50 lg:hidden"
            >
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        {/* Top header */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-white/8"
          style={{ background: "rgba(10,15,30,0.85)", backdropFilter: "blur(12px)" }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-muted hover:text-soft-white transition-colors"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="font-heading font-bold text-soft-white text-lg leading-tight">
                {pageTitle}
              </h1>
              <p className="text-muted text-xs hidden sm:block">{dateString}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors text-muted hover:text-soft-white">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full" />
            </button>
            <Initials name={userName} />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
