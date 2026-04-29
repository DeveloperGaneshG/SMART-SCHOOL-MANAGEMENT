"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  CalendarCheck,
  TrendingUp,
  ClipboardList,
  FileBarChart,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bell,
  Shield,
} from "lucide-react";

const NAV_ITEMS: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Students", href: "/dashboard/admin/students", icon: GraduationCap },
  { label: "Staff", href: "/dashboard/admin/staff", icon: Users },
  { label: "Attendance", href: "/dashboard/admin/attendance", icon: CalendarCheck },
  { label: "Performance", href: "/dashboard/admin/performance", icon: TrendingUp },
  { label: "Admissions", href: "/dashboard/admin/admissions", icon: ClipboardList },
  { label: "Reports", href: "/dashboard/admin/reports", icon: FileBarChart },
  { label: "Messages", href: "/dashboard/admin/messages", icon: MessageSquare },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(" ");
  const initials =
    parts.length >= 2 ? parts[0][0] + parts[parts.length - 1][0] : parts[0].slice(0, 2);
  return (
    <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center shrink-0 glow-gold">
      <span className="text-white text-xs font-bold uppercase">{initials}</span>
    </div>
  );
}

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const userName = session?.user?.name ?? "Dr. Suresh Rao";

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
      <div className="flex items-center justify-between mb-8 px-2">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center glow-gold shrink-0">
            <Shield size={16} className="text-white" />
          </div>
          <div>
            <p className="font-heading font-bold text-soft-white text-xs leading-tight">
              Vizag International
            </p>
            <p className="text-gold text-[10px] tracking-wide">Admin Portal</p>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-muted hover:text-soft-white lg:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      <div className="glass rounded-xl p-3 mb-6 border border-gold/20">
        <div className="flex items-center gap-3">
          <Initials name={userName} />
          <div className="min-w-0">
            <p className="text-soft-white text-sm font-semibold truncate">{userName}</p>
            <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gold/15 text-gold border border-gold/25">
              School Administrator
            </span>
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        <p className="text-muted/60 text-[10px] font-semibold tracking-widest uppercase px-3 mb-2">
          Navigation
        </p>
        {NAV_ITEMS.map(({ label, href, icon: Icon }, i) => {
          const isActive =
            href === "/dashboard/admin" ? pathname === href : pathname.startsWith(href);
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
                    ? "bg-gold/10 text-gold border border-gold/20"
                    : "text-muted hover:text-soft-white hover:bg-white/5"
                }`}
              >
                <Icon
                  size={17}
                  className={isActive ? "text-gold" : "text-muted group-hover:text-soft-white"}
                />
                {label}
                {isActive && <ChevronRight size={14} className="ml-auto text-gold" />}
              </Link>
            </motion.div>
          );
        })}
      </nav>

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

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const userName = session?.user?.name ?? "Dr. Suresh Rao";

  const pageTitle =
    NAV_ITEMS.find((n) =>
      n.href === "/dashboard/admin" ? pathname === n.href : pathname.startsWith(n.href)
    )?.label ?? "Dashboard";

  const now = new Date();
  const dateString = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-navy flex">
      <div className="hidden lg:flex flex-col w-[260px] shrink-0 fixed inset-y-0 left-0">
        <Sidebar />
      </div>

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

      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
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

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
