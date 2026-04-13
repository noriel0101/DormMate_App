import { UserProfile } from '../types';

export const sampleUsers: UserProfile[] = [
  {
    id: '1',
    name: 'Juan dela Cruz',
    email: 'juan.delacruz@email.com',
    phone: '+63 912 345 6789',
    studentId: '2024-12345',
    school: 'UP Diliman',
    year: '3rd Year',
    course: 'Computer Science',
    age: 20,
    bio: 'Tech enthusiast, loves coding and gaming. Looking for a quiet study environment.',
    interests: ['Programming', 'Gaming', 'Reading'],
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
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '+63 923 456 7890',
    studentId: '2024-23456',
    school: 'Ateneo de Manila',
    year: '2nd Year',
    course: 'Psychology',
    age: 19,
    bio: 'Outgoing and friendly. Enjoys social gatherings and group activities.',
    interests: ['Music', 'Dancing', 'Travel'],
    preferences: {
      smoking: 'never',
      drinking: 'socially',
      pets: true,
      cleanliness: 'moderate',
      studyHabits: 'moderate',
      sleepSchedule: 'flexible',
      guests: 'frequently',
      cooking: 'often'
    },
    requirements: {
      budget: { min: 2500, max: 4000 },
      location: ['Makati', ' BGC'],
      roomType: 'shared',
      amenities: ['wifi', 'gym', 'kitchen'],
      moveInDate: '2024-07-15',
      leaseDuration: 'long_term'
    }
  },
  {
    id: '3',
    name: 'Pedro Reyes',
    email: 'pedro.reyes@email.com',
    phone: '+63 934 567 8901',
    studentId: '2024-34567',
    school: 'De La Salle University',
    year: '4th Year',
    course: 'Business Administration',
    age: 21,
    bio: 'Organized and goal-oriented. Prefers a clean and structured living space.',
    interests: ['Business', 'Sports', 'Photography'],
    preferences: {
      smoking: 'occasionally',
      drinking: 'socially',
      pets: false,
      cleanliness: 'very_clean',
      studyHabits: 'quiet',
      sleepSchedule: 'early_bird',
      guests: 'rarely',
      cooking: 'sometimes'
    },
    requirements: {
      budget: { min: 4000, max: 6000 },
      location: ['Makati', 'Taguig'],
      roomType: 'private',
      amenities: ['wifi', 'parking', 'security'],
      moveInDate: '2024-09-01',
      leaseDuration: 'long_term'
    }
  },
  {
    id: '4',
    name: 'Ana Garcia',
    email: 'ana.garcia@email.com',
    phone: '+63 945 678 9012',
    studentId: '2024-45678',
    school: 'UP Diliman',
    year: '1st Year',
    course: 'Engineering',
    age: 18,
    bio: 'New to the city, looking for friendly roommates to help me adjust.',
    interests: ['Engineering', 'Hiking', 'Cooking'],
    preferences: {
      smoking: 'never',
      drinking: 'never',
      pets: true,
      cleanliness: 'clean',
      studyHabits: 'moderate',
      sleepSchedule: 'night_owl',
      guests: 'occasionally',
      cooking: 'often'
    },
    requirements: {
      budget: { min: 2000, max: 3500 },
      location: ['Quezon City', 'Manila'],
      roomType: 'any',
      amenities: ['wifi', 'kitchen'],
      moveInDate: '2024-06-01',
      leaseDuration: 'any'
    }
  },
  {
    id: '5',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@email.com',
    phone: '+63 956 789 0123',
    studentId: '2024-56789',
    school: 'FEU',
    year: '3rd Year',
    course: 'Architecture',
    age: 20,
    bio: 'Creative and artistic. Loves late-night discussions and brainstorming sessions.',
    interests: ['Art', 'Design', 'Music'],
    preferences: {
      smoking: 'regularly',
      drinking: 'frequently',
      pets: true,
      cleanliness: 'moderate',
      studyHabits: 'social',
      sleepSchedule: 'night_owl',
      guests: 'frequently',
      cooking: 'never'
    },
    requirements: {
      budget: { min: 3000, max: 4500 },
      location: ['Manila', 'Quezon City'],
      roomType: 'shared',
      amenities: ['wifi', 'studio_space'],
      moveInDate: '2024-08-15',
      leaseDuration: 'long_term'
    }
  }
];