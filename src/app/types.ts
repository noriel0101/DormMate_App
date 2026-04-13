// Types for the DormMate app

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  studentId?: string;
  school?: string;
  year?: string;
  course?: string;
  profileImage?: string;
  age?: number;
}

export interface LifestylePreferences {
  smoking: 'never' | 'occasionally' | 'regularly';
  drinking: 'never' | 'socially' | 'frequently';
  pets: boolean;
  cleanliness: 'very_clean' | 'clean' | 'moderate' | 'messy';
  studyHabits: 'quiet' | 'moderate' | 'social';
  sleepSchedule: 'early_bird' | 'night_owl' | 'flexible';
  guests: 'rarely' | 'occasionally' | 'frequently';
  cooking: 'never' | 'sometimes' | 'often';
}

export interface AccommodationRequirements {
  budget: {
    min: number;
    max: number;
  };
  location: string[]; // preferred areas
  roomType: 'private' | 'shared' | 'any';
  amenities: string[]; // wifi, laundry, etc.
  moveInDate: string; // ISO date
  leaseDuration: 'short_term' | 'long_term' | 'any';
}

export interface UserProfile extends User {
  preferences: LifestylePreferences;
  requirements: AccommodationRequirements;
  bio?: string;
  interests?: string[];
}

export interface MatchScore {
  userId: string;
  score: number; // 0-100
  reasons: string[];
}