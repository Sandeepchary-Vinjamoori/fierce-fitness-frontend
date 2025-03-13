
export interface Certification {
  name: string;
  organization: string;
  year: number;
}

export interface Schedule {
  day: string;
  availability: string[];
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
  price: number;
  specialties: string[];
  availability: Schedule[];
  isAvailable: boolean;
  popularity: number;
}

export type SortOption = 'price' | 'popularity' | 'rating' | 'experience';
export type FilterOptions = {
  experience: number;
  rating: number;
  specialties: string[];
  availability: boolean;
};
