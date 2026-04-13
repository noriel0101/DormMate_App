import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Search, Wallet, Users, ChevronRight } from "lucide-react";

const slides = [
  {
    icon: Search,
    title: "Find affordable dorms easily",
    description: "Browse hundreds of verified dormitories near your campus with detailed information and reviews.",
  },
  {
    icon: Wallet,
    title: "Manage rent payments in ₱",
    description: "Track your rent, utilities, and deposits. Pay easily with GCash, bank transfer, or card.",
  },
  {
    icon: Users,
    title: "Connect with landlords & roommates",
    description: "Chat directly with landlords, stay updated with announcements, and build your dorm community.",
  },
];

export function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/login");
    }
  };

  const handleSkip = () => {
    navigate("/login");
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-8">
              {(() => {
                const Icon = slides[currentSlide].icon;
                return <Icon className="w-16 h-16 text-primary" />;
              })()}
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {slides[currentSlide].title}
            </h2>
            <p className="text-muted-foreground max-w-sm">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-8 space-y-4">
        <div className="flex gap-2 justify-center mb-6">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
        >
          {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          <ChevronRight className="w-5 h-5" />
        </button>

        {currentSlide < slides.length - 1 && (
          <button
            onClick={handleSkip}
            className="w-full text-muted-foreground py-4 font-medium hover:text-foreground transition-colors"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
