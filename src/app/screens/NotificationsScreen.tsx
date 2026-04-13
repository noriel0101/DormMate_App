import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ChevronLeft,
  AlertTriangle,
  Info,
  AlertCircle,
  Wrench,
} from "lucide-react";

const tabs = ["All", "System", "Maintenance", "Emergency"];

const notifications = [
  {
    id: 1,
    type: "maintenance",
    title: "Water Interruption Notice",
    description: "Scheduled maintenance on April 15, 8AM-12PM",
    time: "2 hours ago",
    priority: "warning",
  },
  {
    id: 2,
    type: "system",
    title: "Rent Payment Reminder",
    description: "Monthly rent is due on April 30. Pay early to avoid penalties.",
    time: "1 day ago",
    priority: "info",
  },
  {
    id: 3,
    type: "maintenance",
    title: "Elevator Maintenance Complete",
    description: "The elevator is now back in operation.",
    time: "2 days ago",
    priority: "info",
  },
  {
    id: 4,
    type: "emergency",
    title: "Fire Drill Announcement",
    description: "Fire drill scheduled for April 20 at 2:00 PM. Please participate.",
    time: "3 days ago",
    priority: "emergency",
  },
  {
    id: 5,
    type: "system",
    title: "New House Rules",
    description: "Updated house rules have been posted. Please review them.",
    time: "1 week ago",
    priority: "info",
  },
];

export function NotificationsScreen() {
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();

  const getIcon = (type: string) => {
    switch (type) {
      case "emergency":
        return AlertTriangle;
      case "maintenance":
        return Wrench;
      case "system":
        return Info;
      default:
        return AlertCircle;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "emergency":
        return "bg-destructive/10 text-destructive border-destructive";
      case "warning":
        return "bg-accent/10 text-accent border-accent";
      default:
        return "bg-primary/10 text-primary border-primary";
    }
  };

  const filteredNotifications =
    activeTab === "All"
      ? notifications
      : notifications.filter(
          (n) => n.type.toLowerCase() === activeTab.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate("/app")}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Notifications</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "bg-background text-foreground border border-border"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="px-6 space-y-3">
        {filteredNotifications.map((notification) => {
          const Icon = getIcon(notification.type);
          return (
            <motion.div
              key={notification.id}
              whileTap={{ scale: 0.98 }}
              className={`bg-white rounded-xl p-4 border-l-4 ${getPriorityColor(
                notification.priority
              )}`}
            >
              <div className="flex gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    notification.priority === "emergency"
                      ? "bg-destructive/10"
                      : notification.priority === "warning"
                      ? "bg-accent/10"
                      : "bg-primary/10"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      notification.priority === "emergency"
                        ? "text-destructive"
                        : notification.priority === "warning"
                        ? "text-accent"
                        : "text-primary"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold mb-1">{notification.title}</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
