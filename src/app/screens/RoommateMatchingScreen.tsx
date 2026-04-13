import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { User, MessageCircle, Heart, Filter, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { Slider } from '../components/ui/slider';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { UserProfile, MatchScore } from '../types';
import { findMatches } from '../utils/matching';
import { sampleUsers } from '../data/users';

export function RoommateMatchingScreen() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<MatchScore[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [filteredMatches, setFilteredMatches] = useState<MatchScore[]>([]);
  const [filters, setFilters] = useState({
    minScore: 0,
    locations: [] as string[],
    budgetMin: 0,
    budgetMax: 10000,
    amenities: [] as string[],
    interests: [] as string[],
    ageMin: 18,
    ageMax: 25,
    showFilters: false
  });

  const allLocations = Array.from(new Set(sampleUsers.flatMap(u => u.requirements.location)));
  const allAmenities = Array.from(new Set(sampleUsers.flatMap(u => u.requirements.amenities)));
  const allInterests = Array.from(new Set(sampleUsers.flatMap(u => u.interests || [])));

  useEffect(() => {
    // Get current user from localStorage or use default
    const studentData = JSON.parse(localStorage.getItem('studentData') || '{}');
    const user: UserProfile = {
      id: 'current',
      name: studentData.name || 'Juan dela Cruz',
      email: studentData.email || 'juan.delacruz@email.com',
      phone: studentData.phone || '+63 912 345 6789',
      studentId: studentData.studentId || '2024-12345',
      school: studentData.school || 'UP Diliman',
      year: studentData.year || '3rd Year',
      course: studentData.course || 'Computer Science',
      age: studentData.age || 20,
      preferences: {
        smoking: 'never',
        drinking: 'socially',
        pets: false,
        cleanliness: 'clean',
        studyHabits: 'quiet',
        sleepSchedule: 'early_bird',
        guests: 'occasionally',
        cooking: 'sometimes'
      },
      requirements: {
        budget: { min: 3000, max: 5000 },
        location: ['Quezon City', 'Makati'],
        roomType: 'shared',
        amenities: ['wifi', 'laundry', 'kitchen'],
        moveInDate: '2024-08-01',
        leaseDuration: 'long_term'
      }
    };
    setCurrentUser(user);

    // Calculate matches
    const matchResults = findMatches(user, sampleUsers);
    setMatches(matchResults);
    setFilteredMatches(matchResults);
  }, []);

  useEffect(() => {
    let filtered = matches;

    // Filter by minimum score
    if (filters.minScore > 0) {
      filtered = filtered.filter(match => match.score >= filters.minScore);
    }

    // Filter by locations
    if (filters.locations.length > 0) {
      filtered = filtered.filter(match => {
        const user = sampleUsers.find(u => u.id === match.userId);
        return user && filters.locations.some(loc => user.requirements.location.includes(loc));
      });
    }

    // Filter by budget
    filtered = filtered.filter(match => {
      const user = sampleUsers.find(u => u.id === match.userId);
      return user && user.requirements.budget.min <= filters.budgetMax && user.requirements.budget.max >= filters.budgetMin;
    });

    // Filter by amenities
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(match => {
        const user = sampleUsers.find(u => u.id === match.userId);
        return user && filters.amenities.some(amenity => user.requirements.amenities.includes(amenity));
      });
    }

    // Filter by interests
    if (filters.interests.length > 0) {
      filtered = filtered.filter(match => {
        const user = sampleUsers.find(u => u.id === match.userId);
        return user && user.interests && filters.interests.some(interest => user.interests!.includes(interest));
      });
    }

    // Filter by age
    filtered = filtered.filter(match => {
      const user = sampleUsers.find(u => u.id === match.userId);
      return user && user.age && user.age >= filters.ageMin && user.age <= filters.ageMax;
    });

    setFilteredMatches(filtered);
  }, [matches, filters]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getMatchUser = (userId: string) => {
    return sampleUsers.find(user => user.id === userId);
  };

  if (!currentUser) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Roommate Matches</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader>
                <SheetTitle>Filter Matches</SheetTitle>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div>
                  <Label className="text-base font-medium">Minimum Match Score</Label>
                  <div className="mt-2">
                    <Slider
                      value={[filters.minScore]}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, minScore: value[0] }))}
                      max={100}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>0%</span>
                      <span>{filters.minScore}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Budget Range (₱)</Label>
                  <div className="mt-2 space-y-2">
                    <div>
                      <Label className="text-sm">Min: ₱{filters.budgetMin}</Label>
                      <Slider
                        value={[filters.budgetMin]}
                        onValueChange={(value) => setFilters(prev => ({ ...prev, budgetMin: value[0] }))}
                        max={10000}
                        min={0}
                        step={500}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Max: ₱{filters.budgetMax}</Label>
                      <Slider
                        value={[filters.budgetMax]}
                        onValueChange={(value) => setFilters(prev => ({ ...prev, budgetMax: value[0] }))}
                        max={10000}
                        min={0}
                        step={500}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Age Range</Label>
                  <div className="mt-2 space-y-2">
                    <div>
                      <Label className="text-sm">Min: {filters.ageMin} years</Label>
                      <Slider
                        value={[filters.ageMin]}
                        onValueChange={(value) => setFilters(prev => ({ ...prev, ageMin: value[0] }))}
                        max={30}
                        min={18}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Max: {filters.ageMax} years</Label>
                      <Slider
                        value={[filters.ageMax]}
                        onValueChange={(value) => setFilters(prev => ({ ...prev, ageMax: value[0] }))}
                        max={30}
                        min={18}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">Preferred Locations</Label>
                  <div className="space-y-3">
                    {allLocations.map((location) => (
                      <div key={location} className="flex items-center space-x-2">
                        <Checkbox
                          id={location}
                          checked={filters.locations.includes(location)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters(prev => ({
                                ...prev,
                                locations: [...prev.locations, location]
                              }));
                            } else {
                              setFilters(prev => ({
                                ...prev,
                                locations: prev.locations.filter(l => l !== location)
                              }));
                            }
                          }}
                        />
                        <Label htmlFor={location} className="text-sm">
                          {location}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">Required Amenities</Label>
                  <div className="space-y-3">
                    {allAmenities.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={filters.amenities.includes(amenity)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters(prev => ({
                                ...prev,
                                amenities: [...prev.amenities, amenity]
                              }));
                            } else {
                              setFilters(prev => ({
                                ...prev,
                                amenities: prev.amenities.filter(a => a !== amenity)
                              }));
                            }
                          }}
                        />
                        <Label htmlFor={amenity} className="text-sm capitalize">
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">Shared Interests</Label>
                  <div className="space-y-3">
                    {allInterests.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={filters.interests.includes(interest)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters(prev => ({
                                ...prev,
                                interests: [...prev.interests, interest]
                              }));
                            } else {
                              setFilters(prev => ({
                                ...prev,
                                interests: prev.interests.filter(i => i !== interest)
                              }));
                            }
                          }}
                        />
                        <Label htmlFor={interest} className="text-sm">
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setFilters({ minScore: 0, locations: [], budgetMin: 0, budgetMax: 10000, amenities: [], interests: [], ageMin: 18, ageMax: 25, showFilters: false })}
                  >
                    Clear Filters
                  </Button>
                  <Button className="flex-1" onClick={() => setFilters(prev => ({ ...prev, showFilters: false }))}>
                    Apply
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <p className="text-muted-foreground">
          Find compatible roommates based on your preferences
        </p>
      </div>

      {/* Matches List */}
      <div className="px-6 space-y-4">
        {filteredMatches.map((match, index) => {
          const user = getMatchUser(match.userId);
          if (!user) return null;

          return (
            <motion.div
              key={match.userId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback>
                        <User className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {user.school} • {user.year}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-white text-sm font-medium ${getScoreColor(match.score)}`}>
                        <Heart className="w-3 h-3" />
                        {match.score}%
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {user.bio}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {user.interests?.slice(0, 3).map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Why you match:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {match.reasons.slice(0, 3).map((reason, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => navigate(`/app/messages/${user.id}`)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                    <Button size="sm" className="flex-1" onClick={() => navigate(`/app/user/${match.userId}`)}>
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredMatches.length === 0 && (
        <div className="px-6 py-12 text-center">
          <User className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No matches found</h3>
          <p className="text-muted-foreground">
            Try adjusting your preferences or check back later for new potential roommates.
          </p>
        </div>
      )}
    </div>
  );
}