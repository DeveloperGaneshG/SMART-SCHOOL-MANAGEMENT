"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Trash2,
  ChevronDown,
  ChevronUp,
  Mail,
  Inbox,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { getSupabase } from "@/lib/getSupabase()";
import type { ContactMessage } from "@/lib/getSupabase()";

function getReadIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem("admin_read_messages");
    return stored ? new Set(JSON.parse(stored) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function saveReadIds(ids: Set<string>) {
  try {
    localStorage.setItem("admin_read_messages", JSON.stringify([...ids]));
  } catch {
    // ignore
  }
}

function Toast({
  message,
  type,
  onDone,
}: {
  message: string;
  type?: "success" | "error";
  onDone: () => void;
}) {
  const isError = type === "error";
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={() => setTimeout(onDone, 2200)}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl border backdrop-blur-xl text-sm font-medium shadow-2xl ${
        isError
          ? "border-red-500/30 bg-red-500/15 text-red-400"
          : "border-emerald-500/30 bg-emerald-500/15 text-emerald-400"
      }`}
    >
      {isError ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
      {message}
    </motion.div>
  );
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);

  useEffect(() => {
    setReadIds(getReadIds());
    fetchMessages();
  }, []);

  async function fetchMessages() {
    setLoading(true);
    try {
      const { data, error } = await getSupabase()
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setMessages(data as ContactMessage[]);
    } catch {
      // silently show empty state
    } finally {
      setLoading(false);
    }
  }

  function toggleExpand(id: string) {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      if (!readIds.has(id)) {
        const next = new Set([...readIds, id]);
        setReadIds(next);
        saveReadIds(next);
      }
    }
  }

  async function deleteMessage(id: string) {
    const prev = messages;
    setMessages((m) => m.filter((msg) => msg.id !== id));
    if (expandedId === id) setExpandedId(null);
    try {
      const { error } = await getSupabase().from("contact_messages").delete().eq("id", id);
      if (error) throw error;
    } catch {
      setMessages(prev);
      setToast({ message: "Something went wrong. Please try again.", type: "error" });
    }
  }

  const unreadCount = messages.filter((m) => !readIds.has(m.id)).length;

  return (
    <div className="space-y-6">
      {/* Heading */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-heading font-bold text-2xl text-soft-white">Contact Messages</h2>
        <p className="text-muted text-sm mt-1">Messages submitted from the website contact form</p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-4 max-w-sm"
      >
        <div className="glass rounded-2xl p-4 border border-white/8 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-electric/10">
            <MessageSquare size={18} className="text-electric" />
          </div>
          <div>
            <p className="text-2xl font-heading font-bold text-electric">
              {loading ? "â€”" : messages.length}
            </p>
            <p className="text-muted text-xs">Total Messages</p>
          </div>
        </div>
        <div className="glass rounded-2xl p-4 border border-white/8 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gold/10">
            <Mail size={18} className="text-gold" />
          </div>
          <div>
            <p className="text-2xl font-heading font-bold text-gold">
              {loading ? "â€”" : unreadCount}
            </p>
            <p className="text-muted text-xs">Unread</p>
          </div>
        </div>
      </motion.div>

      {/* Messages list */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass rounded-2xl p-5 border border-white/8 animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-3 bg-white/8 rounded w-32" />
                <div className="h-3 bg-white/5 rounded w-48" />
              </div>
              <div className="h-3 bg-white/8 rounded w-48 mb-2" />
              <div className="h-3 bg-white/5 rounded w-64" />
            </div>
          ))}
        </div>
      ) : messages.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl border border-white/8 p-16 text-center"
        >
          <Inbox size={48} className="text-muted/30 mx-auto mb-4" />
          <p className="font-heading font-semibold text-soft-white text-lg mb-2">No messages yet</p>
          <p className="text-muted text-sm max-w-xs mx-auto leading-relaxed">
            Messages from the contact form will appear here.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => {
              const isExpanded = expandedId === msg.id;
              const isRead = readIds.has(msg.id);
              const dateStr = new Date(msg.created_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });
              const timeStr = new Date(msg.created_at).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <div
                    className="glass rounded-2xl overflow-hidden transition-all duration-200"
                    style={{
                      border: isRead
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "1px solid rgba(59,130,246,0.25)",
                    }}
                  >
                    {/* Card header â€” click to expand */}
                    <button
                      onClick={() => toggleExpand(msg.id)}
                      className="w-full text-left px-5 py-4 hover:bg-white/3 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          {/* Name + email + phone row */}
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-1.5">
                            {!isRead && (
                              <span className="w-2 h-2 rounded-full bg-electric shrink-0" />
                            )}
                            <span className="text-soft-white font-semibold text-sm truncate">
                              {msg.full_name}
                            </span>
                            <span className="text-muted text-xs">Â·</span>
                            <span className="text-muted text-xs truncate">{msg.email}</span>
                            {msg.phone && (
                              <>
                                <span className="text-muted text-xs">Â·</span>
                                <span className="text-muted text-xs">{msg.phone}</span>
                              </>
                            )}
                          </div>
                          {/* Subject */}
                          <p className="text-soft-white text-sm font-medium mb-1">{msg.subject}</p>
                          {/* Preview */}
                          {!isExpanded && (
                            <p className="text-muted text-xs line-clamp-2 leading-relaxed">
                              {msg.message}
                            </p>
                          )}
                        </div>
                        {/* Date + chevron */}
                        <div className="flex items-center gap-2 shrink-0 mt-0.5">
                          <span className="text-muted text-xs">{dateStr}</span>
                          {isExpanded ? (
                            <ChevronUp size={14} className="text-muted" />
                          ) : (
                            <ChevronDown size={14} className="text-muted" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Expanded body */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="px-5 pb-4 border-t border-white/8 pt-4">
                            <p className="text-soft-white text-sm leading-relaxed whitespace-pre-wrap">
                              {msg.message}
                            </p>
                            <div className="flex items-center justify-between mt-4">
                              <p className="text-muted text-xs">
                                {dateStr} at {timeStr}
                              </p>
                              <button
                                onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id); }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200"
                              >
                                <Trash2 size={12} /> Delete
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
