
export interface Certification {
  name: string;
  organization: string;
  year: number;
}

export interface Schedule {
  day: string;
  availability: string[];
}

export interface PricingOption {
  duration: string;
  months: number;
  price: number;
  discountPercentage: number;
}

export interface Trainer {
  id: string;
  name: string;
  image: string;
  specialty: string;
  experience: number;
  rating: number;
  reviews: number;
  certifications: Certification[];
  bio: string;
  price: number; // Base price in INR
  pricingOptions: PricingOption[];
  specialties: string[];
  availability: Schedule[];
  isAvailable: boolean;
  popularity: number;
}

export interface CheckoutData {
  trainer: Trainer;
  selectedDay: string;
  selectedTime: string;
  selectedPlan: PricingOption;
}

export type SortOption = 'price' | 'popularity' | 'rating' | 'experience';
export type FilterOptions = {
  experience: number;
  rating: number;
  specialties: string[];
  availability: boolean;
};
