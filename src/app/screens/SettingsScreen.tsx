import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ChevronLeft,
  Moon,
  Bell,
  Lock,
  Globe,
  Info,
  ChevronRight,
} from "lucide-react";

export function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/app/profile")}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
      </div>

      {/* General Settings */}
      <div className="px-6 py-6">
        <h2 className="font-semibold mb-3 text-muted-foreground text-sm uppercase tracking-wide">
          General
        </h2>
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="p-5 flex items-center gap-4 border-b border-border">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Moon className="w-5 h-5 text-primary" />
            </div>
            <span className="flex-1 font-medium">Dark Mode</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-7 rounded-full transition-colors ${
                darkMode ? "bg-primary" : "bg-muted"
              }`}
            >
              <motion.div
                animate={{ x: darkMode ? 20 : 0 }}
                className="w-6 h-6 bg-white rounded-full m-0.5"
              />
            </button>
          </div>

          <div className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-secondary" />
            </div>
            <span className="flex-1 font-medium">Push Notifications</span>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-7 rounded-full transition-colors ${
                notifications ? "bg-primary" : "bg-muted"
              }`}
            >
              <motion.div
                animate={{ x: notifications ? 20 : 0 }}
                className="w-6 h-6 bg-white rounded-full m-0.5"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="px-6 pb-6">
        <h2 className="font-semibold mb-3 text-muted-foreground text-sm uppercase tracking-wide">
          Account
        </h2>
        <div className="bg-white rounded-2xl overflow-hidden">
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full p-5 flex items-center gap-4 border-b border-border"
          >
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
              <Lock className="w-5 h-5 text-accent" />
            </div>
            <span className="flex-1 text-left font-medium">
              Change Password
            </span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full p-5 flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium">Language</p>
              <p className="text-sm text-muted-foreground">English</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        </div>
      </div>

      {/* About */}
      <div className="px-6">
        <h2 className="font-semibold mb-3 text-muted-foreground text-sm uppercase tracking-wide">
          About
        </h2>
        <div className="bg-white rounded-2xl overflow-hidden">
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full p-5 flex items-center gap-4 border-b border-border"
          >
            <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
              <Info className="w-5 h-5 text-secondary" />
            </div>
            <span className="flex-1 text-left font-medium">
              About DormMate
            </span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </motion.button>

          <div className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Version</span>
              <span className="font-medium">1.0.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Privacy */}
      <div className="px-6 pt-6 space-y-2">
        <button className="text-sm text-primary font-medium">
          Terms of Service
        </button>
        <span className="text-muted-foreground px-2">•</span>
        <button className="text-sm text-primary font-medium">
          Privacy Policy
        </button>
      </div>
    </div>
  );
}
