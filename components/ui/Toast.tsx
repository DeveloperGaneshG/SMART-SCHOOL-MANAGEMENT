"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, Info, X, type LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ToastType = "success" | "error" | "warning" | "info";

type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastContextValue = {
  showToast: (message: string, type?: ToastType) => void;
};

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be called inside <ToastProvider>");
  return ctx;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const config: Record<
  ToastType,
  { icon: LucideIcon; bg: string; border: string; text: string }
> = {
  success: {
    icon: CheckCircle,
    bg: "rgba(16,185,129,0.18)",
    border: "rgba(16,185,129,0.35)",
    text: "#34d399",
  },
  error: {
    icon: XCircle,
    bg: "rgba(239,68,68,0.18)",
    border: "rgba(239,68,68,0.35)",
    text: "#f87171",
  },
  warning: {
    icon: AlertTriangle,
    bg: "rgba(245,158,11,0.18)",
    border: "rgba(245,158,11,0.35)",
    text: "#fbbf24",
  },
  info: {
    icon: Info,
    bg: "rgba(59,130,246,0.18)",
    border: "rgba(59,130,246,0.35)",
    text: "#60a5fa",
  },
};

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed top-5 right-5 z-[200] flex flex-col gap-2.5 w-80 max-w-[calc(100vw-2.5rem)]">
        <AnimatePresence>
          {toasts.map((toast) => {
            const { icon: Icon, bg, border, text } = config[toast.type];
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 60, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60, scale: 0.92 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-3 px-4 py-3.5 rounded-xl backdrop-blur-md"
                style={{
                  background: bg,
                  border: `1px solid ${border}`,
                }}
              >
                <Icon size={16} style={{ color: text }} className="mt-0.5 shrink-0" />
                <p
                  className="text-sm flex-1 leading-snug font-medium"
                  style={{ color: text }}
                >
                  {toast.message}
                </p>
                <button
                  onClick={() => dismiss(toast.id)}
                  className="text-muted hover:text-soft-white transition-colors shrink-0 mt-0.5"
                  aria-label="Dismiss"
                >
                  <X size={14} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
