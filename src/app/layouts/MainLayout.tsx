import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, Building2, CreditCard, MessageCircle, Sparkles, User } from "lucide-react";
import { motion } from "motion/react";

const navItems = [
  { path: "/app", icon: Home, label: "Home" },
  { path: "/app/dorms", icon: Building2, label: "Dorms" },
  { path: "/app/payments", icon: CreditCard, label: "Payments" },
  { path: "/app/messages", icon: MessageCircle, label: "Messages" },
  { path: "/app/ai-assist", icon: Sparkles, label: "AI Assist" },
];

export function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === "/app") {
      return location.pathname === "/app";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="h-screen bg-background flex flex-col max-w-md mx-auto relative">
      <div className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-border px-2 py-3 safe-area-inset-bottom"
      >
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-1 min-w-[56px] relative"
              >
                <div className="relative">
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      active ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  {active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    />
                  )}
                </div>
                <span
                  className={`text-[10px] transition-colors ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </motion.nav>
    </div>
  );
}
