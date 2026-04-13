import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Building2 } from "lucide-react";

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
          <Building2 className="w-14 h-14 text-primary" />
        </div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-white mb-2"
        >
          DormMate
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/90 text-lg"
        >
          Find. Stay. Manage. Together.
        </motion.p>
      </motion.div>
    </div>
  );
}
