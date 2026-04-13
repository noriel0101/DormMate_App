import { useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ChevronLeft,
  User,
  MessageCircle,
  Heart,
  MapPin,
  Calendar,
  DollarSign,
  Home,
  Users,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import { sampleUsers } from "../data/users";
import { UserProfile } from "../types";

export function UserProfileScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = sampleUsers.find(u => u.id === id);

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">User not found</h2>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => `₱${amount.toLocaleString()}`;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Profile</h1>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-white"
        >
          <div className="flex items-start gap-4 mb-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-white/20 text-white text-2xl">
                <User className="w-10 h-10" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
              <p className="text-white/90 mb-1">{user.email}</p>
              <p className="text-white/80 text-sm">{user.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
            <div>
              <p className="text-white/80 text-xs mb-1">Student ID</p>
              <p className="font-bold">{user.studentId}</p>
            </div>
            <div>
              <p className="text-white/80 text-xs mb-1">University</p>
              <p className="font-bold text-sm">{user.school}</p>
            </div>
            <div>
              <p className="text-white/80 text-xs mb-1">Year Level</p>
              <p className="font-bold">{user.year}</p>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-white/80 text-xs mb-1">Course</p>
            <p className="font-bold">{user.course}</p>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-6 space-y-6">
        {/* Bio */}
        {user.bio && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{user.bio}</p>
            </CardContent>
          </Card>
        )}

        {/* Interests */}
        {user.interests && user.interests.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest) => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lifestyle Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Lifestyle Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Smoking</p>
                <p className="capitalize">{user.preferences.smoking}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Drinking</p>
                <p className="capitalize">{user.preferences.drinking}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pets</p>
                <p>{user.preferences.pets ? 'Open to pets' : 'No pets'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cleanliness</p>
                <p className="capitalize">{user.preferences.cleanliness.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Study Habits</p>
                <p className="capitalize">{user.preferences.studyHabits}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sleep Schedule</p>
                <p className="capitalize">{user.preferences.sleepSchedule.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Guests</p>
                <p className="capitalize">{user.preferences.guests}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cooking</p>
                <p className="capitalize">{user.preferences.cooking}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accommodation Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Home className="w-5 h-5" />
              Accommodation Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                Budget: {formatCurrency(user.requirements.budget.min)} - {formatCurrency(user.requirements.budget.max)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                Locations: {user.requirements.location.join(', ')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                Room Type: {user.requirements.roomType === 'any' ? 'Any' : user.requirements.roomType.charAt(0).toUpperCase() + user.requirements.roomType.slice(1)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                Move-in: {formatDate(user.requirements.moveInDate)}
              </span>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Required Amenities</p>
              <div className="flex flex-wrap gap-2">
                {user.requirements.amenities.map((amenity) => (
                  <Badge key={amenity} variant="outline" className="capitalize">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 pb-6">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate(`/app/messages/${user.id}`)}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Message
          </Button>
          <Button className="flex-1">
            <Heart className="w-4 h-4 mr-2" />
            Connect
          </Button>
        </div>
      </div>
    </div>
  );
}