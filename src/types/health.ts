
export interface HealthInfo {
  height: string;
  weight: string;
  age: string;
  currentHealthCondition: string;
  previousHealthConditions: string;
  allergies: string;
  medications: string;
  fitnessGoals: string[];
  activityLevel: string;
}

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
