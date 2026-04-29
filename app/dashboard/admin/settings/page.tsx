"use client";

import { motion } from "framer-motion";
import { Settings, Bell, Shield, Palette, Globe, Database, Key, Save } from "lucide-react";

const SECTIONS = [
  {
    icon: Bell,
    title: "Notifications",
    description: "Configure email and in-app notification preferences",
    color: "text-electric",
    bg: "bg-electric/10",
    fields: [
      { label: "Email notifications for new admissions", type: "toggle", defaultOn: true },
      { label: "Attendance alert when below 75%", type: "toggle", defaultOn: true },
      { label: "Weekly summary report email", type: "toggle", defaultOn: false },
    ],
  },
  {
    icon: Shield,
    title: "Security",
    description: "Manage passwords, sessions and access control",
    color: "text-gold",
    bg: "bg-gold/10",
    fields: [
      { label: "Two-factor authentication", type: "toggle", defaultOn: false },
      { label: "Session timeout (minutes)", type: "input", defaultValue: "30" },
    ],
  },
  {
    icon: Globe,
    title: "School Information",
    description: "Update school name, address and academic year settings",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    fields: [
      { label: "School Name", type: "input", defaultValue: "Vizag International School" },
      { label: "Academic Year", type: "input", defaultValue: "2025–2026" },
      { label: "School Address", type: "input", defaultValue: "Visakhapatnam, Andhra Pradesh" },
    ],
  },
  {
    icon: Database,
    title: "Data & Backup",
    description: "Manage data exports, backups and retention policies",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    fields: [
      { label: "Auto-backup every night", type: "toggle", defaultOn: true },
      { label: "Data retention period (months)", type: "input", defaultValue: "24" },
    ],
  },
];

function Toggle({ defaultOn }: { defaultOn: boolean }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" defaultChecked={defaultOn} className="sr-only peer" />
      <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-electric" />
    </label>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-heading font-bold text-2xl text-soft-white">Settings</h2>
        <p className="text-muted text-sm mt-1">Manage school system preferences and configuration</p>
      </motion.div>

      {/* Admin profile card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="glass rounded-2xl p-5 border border-gold/20 flex flex-col sm:flex-row sm:items-center gap-4"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold to-orange-400 flex items-center justify-center shrink-0">
          <span className="text-white text-xl font-bold">SR</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-soft-white font-semibold text-lg">Dr. Suresh Rao</p>
          <p className="text-muted text-sm">admin@vizag.edu</p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gold/15 text-gold border border-gold/25">
            School Administrator
          </span>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 text-muted hover:text-soft-white hover:border-white/30 text-sm font-medium transition-colors">
            <Key size={14} /> Change Password
          </button>
        </div>
      </motion.div>

      {/* Settings sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {SECTIONS.map((section, i) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="glass rounded-2xl p-5 border border-white/8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${section.bg}`}>
                  <Icon size={18} className={section.color} />
                </div>
                <div>
                  <h3 className="text-soft-white font-semibold text-sm">{section.title}</h3>
                  <p className="text-muted text-xs">{section.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                {section.fields.map((field) => (
                  <div key={field.label} className="flex items-center justify-between gap-3">
                    <label className="text-muted text-sm flex-1">{field.label}</label>
                    {field.type === "toggle" ? (
                      <Toggle defaultOn={field.defaultOn ?? false} />
                    ) : (
                      <input
                        defaultValue={field.defaultValue}
                        className="w-40 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-soft-white focus:outline-none focus:border-electric/50 transition-colors text-right"
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Save button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-end"
      >
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gold text-white text-sm font-semibold hover:bg-gold-dark transition-colors">
          <Save size={16} /> Save Changes
        </button>
      </motion.div>
    </div>
  );
}
