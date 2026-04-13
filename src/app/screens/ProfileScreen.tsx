import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  User,
  Home,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Edit,
  Users,
  Camera,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const menuItems = [
  {
    icon: Users,
    label: "Find Roommates",
    path: "/app/roommate-matching",
    color: "primary",
  },
  {
    icon: User,
    label: "Account Settings",
    path: "/app/settings",
    color: "primary",
  },
  {
    icon: CreditCard,
    label: "Payment Methods",
    path: "/app/payments",
    color: "secondary",
  },
  {
    icon: HelpCircle,
    label: "Help & Support",
    path: "#",
    color: "accent",
  },
];

const defaultProfile = {
  name: "Juan dela Cruz",
  email: "juan.delacruz@email.com",
  phone: "+63 912 345 6789",
  studentId: "2024-12345",
  school: "UP Diliman",
  year: "3rd Year",
  course: "Computer Science",
  photo: "",
};

export function ProfileScreen() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(defaultProfile);
  const [editOpen, setEditOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("studentData") || "{}");
    setProfile({
      ...defaultProfile,
      ...stored,
    });
  }, []);

  const updateProfile = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setProfile((prev) => ({ ...prev, photo: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem("studentData", JSON.stringify(profile));
    setEditOpen(false);
  };

  return (
    <div className="min-h-screen bg-background pb-6 px-4 sm:px-6">
      {/* Header */}
      <div className="bg-white rounded-b-3xl px-6 pt-12 pb-8 shadow-sm">
        <div className="flex items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="secondary" className="px-4 py-2">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your profile information and add a profile picture.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => updateProfile("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => updateProfile("email", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => updateProfile("phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      value={profile.studentId}
                      onChange={(e) => updateProfile("studentId", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="school">University</Label>
                    <Input
                      id="school"
                      value={profile.school}
                      onChange={(e) => updateProfile("school", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year Level</Label>
                    <Input
                      id="year"
                      value={profile.year}
                      onChange={(e) => updateProfile("year", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Input
                    id="course"
                    value={profile.course}
                    onChange={(e) => updateProfile("course", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo">Profile Picture</Label>
                  <div className="flex flex-col gap-3">
                    <Button type="button" variant="outline" onClick={openFilePicker}>
                      Choose Photo
                    </Button>
                    <input
                      ref={fileInputRef}
                      id="photo"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    {profile.photo ? (
                      <img
                        src={profile.photo}
                        alt="Preview"
                        className="h-24 w-24 rounded-xl object-cover"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Select a photo to update your profile image.
                      </p>
                    )}
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-6 text-white"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="relative mx-auto md:mx-0">
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt="Profile"
                  className="h-24 w-24 rounded-full object-cover border-4 border-white"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-white/20 flex items-center justify-center border-4 border-white">
                  <User className="w-10 h-10" />
                </div>
              )}
              <div className="absolute bottom-0 right-0 rounded-full bg-white p-2 shadow-md">
                <Camera className="w-4 h-4 text-primary" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
              <p className="text-white/90 mb-1">{profile.email}</p>
              <p className="text-white/80 text-sm">{profile.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-6 border-t border-white/20 sm:grid-cols-3">
            <div>
              <p className="text-white/80 text-xs mb-1">Student ID</p>
              <p className="font-bold">{profile.studentId}</p>
            </div>
            <div>
              <p className="text-white/80 text-xs mb-1">University</p>
              <p className="font-bold text-sm">{profile.school}</p>
            </div>
            <div>
              <p className="text-white/80 text-xs mb-1">Year Level</p>
              <p className="font-bold">{profile.year}</p>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-white/80 text-xs mb-1">Course</p>
            <p className="font-bold">{profile.course}</p>
          </div>
        </motion.div>
      </div>

      {/* Current Dorm Info */}
      <div className="px-6 pb-6">
        <h2 className="font-semibold mb-3">Current Dorm</h2>
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-3xl p-5 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <div className="w-full sm:w-auto h-14 sm:h-14 bg-primary/10 rounded-xl flex items-center justify-center">
            <Home className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Sunflower Residence</p>
            <p className="text-sm text-muted-foreground">Room 203-B</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Monthly</p>
            <p className="font-bold text-primary">₱6,500</p>
          </div>
        </motion.div>
      </div>

      {/* Settings Menu */}
      <div className="px-6 pb-6">
        <h2 className="font-semibold mb-3">Settings</h2>
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(item.path)}
                className={`w-full p-5 flex items-center gap-4 ${
                  index !== menuItems.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    item.color === "primary"
                      ? "bg-primary/10"
                      : item.color === "secondary"
                      ? "bg-secondary/10"
                      : "bg-accent/10"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      item.color === "primary"
                        ? "text-primary"
                        : item.color === "secondary"
                        ? "text-secondary"
                        : "text-accent"
                    }`}
                  />
                </div>
                <span className="flex-1 text-left font-medium">
                  {item.label}
                </span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Logout */}
      <div className="px-6">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/login")}
          className="w-full bg-white rounded-3xl p-5 flex items-center gap-4 text-destructive shadow-sm"
        >
          <div className="w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center">
            <LogOut className="w-5 h-5" />
          </div>
          <span className="flex-1 text-left font-medium">Logout</span>
        </motion.button>
      </div>

      {/* App Version */}
      <div className="px-6 pt-6 pb-6">
        <p className="text-center text-sm text-muted-foreground">
          DormMate v1.0.0
        </p>
      </div>
    </div>
  );
}
