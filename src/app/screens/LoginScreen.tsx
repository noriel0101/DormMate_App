import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Building2, Mail, Lock, Eye, EyeOff, User, Phone, IdCard, GraduationCap, Calendar, BookOpen } from "lucide-react";

export function LoginScreen() {
  const [activeTab, setActiveTab] = useState<"student" | "admin">("student");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Student form state
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    phone: "",
    studentId: "",
    school: "",
    year: "",
    course: "",
  });

  // Admin form state
  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("studentData", JSON.stringify(studentData));
    navigate("/app/profile");
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just navigate to home
    navigate("/app");
  };

  const handleStudentChange = (field: string, value: string) => {
    setStudentData(prev => ({ ...prev, [field]: value }));
  };

  const handleAdminChange = (field: string, value: string) => {
    setAdminData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      <div className="p-8 pt-16">
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
            <Building2 className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-muted-foreground text-center mb-8">
          Sign in to continue to DormMate
        </p>

        {/* Tabs */}
        <div className="flex gap-2 bg-muted/50 p-1 rounded-xl mb-8">
          <button
            onClick={() => setActiveTab("student")}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              activeTab === "student"
                ? "bg-white text-primary shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            Student Login
          </button>
          <button
            onClick={() => setActiveTab("admin")}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              activeTab === "admin"
                ? "bg-white text-primary shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            Admin / Landlord
          </button>
        </div>

        {/* Login Form */}
        {activeTab === "student" ? (
          <form onSubmit={handleStudentSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={studentData.name}
                  onChange={(e) => handleStudentChange("name", e.target.value)}
                  className="w-full bg-white border border-border rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={studentData.email}
                  onChange={(e) => handleStudentChange("email", e.target.value)}
                  className="w-full bg-white border border-border rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="tel"
                  placeholder="+63 912 345 6789"
                  value={studentData.phone}
                  onChange={(e) => handleStudentChange("phone", e.target.value)}
                  className="w-full bg-white border border-border rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Student ID
              </label>
              <div className="relative">
                <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="2024-12345"
                  value={studentData.studentId}
                  onChange={(e) => handleStudentChange("studentId", e.target.value)}
                  className="w-full bg-white border border-border rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                School/University
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="University of the Philippines"
                  value={studentData.school}
                  onChange={(e) => handleStudentChange("school", e.target.value)}
                  className="w-full bg-white border border-border rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Year Level
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <select
                    value={studentData.year}
                    onChange={(e) => handleStudentChange("year", e.target.value)}
                    className="w-full bg-white border border-border rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="5th Year">5th Year</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Course
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Computer Science"
                    value={studentData.course}
                    onChange={(e) => handleStudentChange("course", e.target.value)}
                    className="w-full bg-white border border-border rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Continue
            </motion.button>
          </form>
        ) : (
          <form onSubmit={handleAdminSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={adminData.email}
                  onChange={(e) => handleAdminChange("email", e.target.value)}
                  className="w-full bg-white border border-border rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={adminData.password}
                  onChange={(e) => handleAdminChange("password", e.target.value)}
                  className="w-full bg-white border border-border rounded-xl py-4 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Sign In
            </motion.button>
          </form>
        )}
      </div>
    </div>
  );
}
