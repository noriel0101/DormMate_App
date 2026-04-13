import { UserProfile, MatchScore, LifestylePreferences, AccommodationRequirements } from '../types';

export function calculateMatchScore(currentUser: UserProfile, potentialMatch: UserProfile): MatchScore {
  let score = 0;
  const reasons: string[] = [];

  // Lifestyle preferences matching
  const lifestyleScore = calculateLifestyleScore(currentUser.preferences, potentialMatch.preferences);
  score += lifestyleScore.score;
  reasons.push(...lifestyleScore.reasons);

  // Accommodation requirements matching
  const accommodationScore = calculateAccommodationScore(currentUser.requirements, potentialMatch.requirements);
  score += accommodationScore.score;
  reasons.push(...accommodationScore.reasons);

  // Normalize score to 0-100
  score = Math.min(100, Math.max(0, score));

  return {
    userId: potentialMatch.id,
    score,
    reasons
  };
}

function calculateLifestyleScore(pref1: LifestylePreferences, pref2: LifestylePreferences): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // Smoking compatibility
  if (pref1.smoking === pref2.smoking) {
    score += 20;
    reasons.push('Similar smoking habits');
  } else if ((pref1.smoking === 'never' && pref2.smoking === 'occasionally') ||
             (pref1.smoking === 'occasionally' && pref2.smoking === 'never')) {
    score += 10;
    reasons.push('Acceptable smoking difference');
  }

  // Drinking compatibility
  if (pref1.drinking === pref2.drinking) {
    score += 15;
    reasons.push('Similar drinking habits');
  } else if ((pref1.drinking === 'never' && pref2.drinking === 'socially') ||
             (pref1.drinking === 'socially' && pref2.drinking === 'never')) {
    score += 10;
    reasons.push('Acceptable drinking difference');
  }

  // Pets
  if (pref1.pets === pref2.pets) {
    score += 15;
    reasons.push('Pet preferences match');
  }

  // Cleanliness
  const cleanlinessDiff = Math.abs(['very_clean', 'clean', 'moderate', 'messy'].indexOf(pref1.cleanliness) -
                                   ['very_clean', 'clean', 'moderate', 'messy'].indexOf(pref2.cleanliness));
  if (cleanlinessDiff === 0) {
    score += 20;
    reasons.push('Cleanliness levels match');
  } else if (cleanlinessDiff === 1) {
    score += 15;
    reasons.push('Acceptable cleanliness difference');
  }

  // Study habits
  if (pref1.studyHabits === pref2.studyHabits) {
    score += 15;
    reasons.push('Study habits compatible');
  }

  // Sleep schedule
  if (pref1.sleepSchedule === pref2.sleepSchedule) {
    score += 10;
    reasons.push('Sleep schedules match');
  } else if (pref1.sleepSchedule === 'flexible' || pref2.sleepSchedule === 'flexible') {
    score += 10;
    reasons.push('Flexible sleep schedule');
  }

  // Guests
  if (pref1.guests === pref2.guests) {
    score += 10;
    reasons.push('Guest policies match');
  }

  // Cooking
  if (pref1.cooking === pref2.cooking) {
    score += 5;
    reasons.push('Cooking habits similar');
  }

  return { score, reasons };
}

function calculateAccommodationScore(req1: AccommodationRequirements, req2: AccommodationRequirements): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // Budget overlap
  const budgetOverlap = Math.max(0, Math.min(req1.budget.max, req2.budget.max) - Math.max(req1.budget.min, req2.budget.min));
  if (budgetOverlap > 0) {
    const overlapRatio = budgetOverlap / Math.max(req1.budget.max - req1.budget.min, req2.budget.max - req2.budget.min);
    score += overlapRatio * 20;
    reasons.push('Budget ranges overlap');
  }

  // Location preferences
  const commonLocations = req1.location.filter(loc => req2.location.includes(loc));
  if (commonLocations.length > 0) {
    score += 15;
    reasons.push('Shared location preferences');
  }

  // Room type
  if (req1.roomType === req2.roomType || req1.roomType === 'any' || req2.roomType === 'any') {
    score += 10;
    reasons.push('Room type preferences compatible');
  }

  // Amenities
  const commonAmenities = req1.amenities.filter(amenity => req2.amenities.includes(amenity));
  if (commonAmenities.length > 0) {
    score += 10;
    reasons.push('Shared amenity preferences');
  }

  // Move-in date proximity (simplified)
  const date1 = new Date(req1.moveInDate);
  const date2 = new Date(req2.moveInDate);
  const daysDiff = Math.abs((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24));
  if (daysDiff <= 30) {
    score += 10;
    reasons.push('Move-in dates align');
  } else if (daysDiff <= 90) {
    score += 5;
    reasons.push('Move-in dates somewhat align');
  }

  // Lease duration
  if (req1.leaseDuration === req2.leaseDuration || req1.leaseDuration === 'any' || req2.leaseDuration === 'any') {
    score += 10;
    reasons.push('Lease duration preferences match');
  }

  return { score, reasons };
}

export function findMatches(currentUser: UserProfile, allUsers: UserProfile[]): MatchScore[] {
  return allUsers
    .filter(user => user.id !== currentUser.id)
    .map(user => calculateMatchScore(currentUser, user))
    .sort((a, b) => b.score - a.score);
}