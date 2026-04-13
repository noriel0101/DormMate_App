import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  CreditCard,
  AlertCircle,
  MessageCircle,
  Bell,
  Home as HomeIcon,
  Wifi,
  ChevronRight,
  Sparkles,
  User,
} from "lucide-react";

export function HomeScreen() {
  const navigate = useNavigate();
  const storedData = JSON.parse(localStorage.getItem("studentData") || "{}");
  const greetingName = storedData.name || "Juan";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Hi, {greetingName} 👋</h1>
            <p className="text-muted-foreground text-sm">Welcome back to DormMate</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/app/profile")}
              className="w-12 h-12 bg-background rounded-full flex items-center justify-center"
            >
              <User className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => navigate("/app/notifications")}
              className="w-12 h-12 bg-background rounded-full flex items-center justify-center relative"
            >
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Current Dorm Card */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-white"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm mb-1">Current Dorm</p>
              <h3 className="text-xl font-bold">Sunflower Residence</h3>
              <p className="text-white/90 text-sm">Room 203-B</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <HomeIcon className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-6 pt-4 border-t border-white/20">
            <div>
              <p className="text-white/80 text-xs">Monthly Rent</p>
              <p className="font-bold text-lg">₱6,500</p>
            </div>
            <div>
              <p className="text-white/80 text-xs">Due Date</p>
              <p className="font-bold text-lg">Apr 30</p>
            </div>
            <div>
              <p className="text-white/80 text-xs">Status</p>
              <div className="bg-secondary px-3 py-1 rounded-full">
                <p className="text-xs font-medium">Active</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Summary Cards */}
      <div className="px-6 py-6 space-y-4">
        <h2 className="font-semibold mb-3">Quick Overview</h2>

        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/app/payments")}
          className="bg-white rounded-2xl p-5 flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Rent Due</p>
            <p className="font-bold text-xl text-accent">₱6,500</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </motion.div>

        <motion.div
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-2xl p-5 flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
            <Wifi className="w-6 h-6 text-secondary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Dorm Status</p>
            <p className="font-bold">All systems operational</p>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 pb-6">
        <h2 className="font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/app/payments")}
            className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 text-center"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium">Pay Rent</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/app/ai-assist")}
            className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-4 flex flex-col items-center gap-2 text-center relative overflow-hidden"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-white">AI Assist</span>
            <div className="absolute top-1 right-1 bg-secondary text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
              NEW
            </div>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 text-center"
          >
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-accent" />
            </div>
            <span className="text-sm font-medium">Report Issue</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/app/messages")}
            className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 text-center"
          >
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-secondary" />
            </div>
            <span className="text-sm font-medium">Message</span>
          </motion.button>
        </div>
      </div>

      {/* Announcements Preview */}
      <div className="px-6 pb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Recent Announcements</h2>
          <button
            onClick={() => navigate("/app/notifications")}
            className="text-sm text-primary font-medium"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl p-4 border-l-4 border-primary"
          >
            <p className="font-medium mb-1">Water Interruption Notice</p>
            <p className="text-sm text-muted-foreground">
              Scheduled maintenance on April 15, 8AM-12PM
            </p>
            <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl p-4 border-l-4 border-secondary"
          >
            <p className="font-medium mb-1">Rent Payment Reminder</p>
            <p className="text-sm text-muted-foreground">
              Monthly rent is due on April 30. Pay early to avoid penalties.
            </p>
            <p className="text-xs text-muted-foreground mt-2">1 day ago</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
