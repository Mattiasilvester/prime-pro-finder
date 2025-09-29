export interface Professional {
  id: string;
  slug: string;
  name: string;
  category: ProfessionalCategory;
  city: string;
  region: string;
  bio: string;
  photo: string;
  isPartner: boolean;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  priceRange: string;
  availableOnline: boolean;
  distance?: number;
  specializations: string[];
  services: Service[];
  contact: ContactInfo;
  social: SocialLinks;
  experience: string;
  certifications: string[];
}

export interface Service {
  name: string;
  description: string;
  price: number;
  duration: string;
  online: boolean;
}

export interface ContactInfo {
  email: string;
  phone: string;
  website?: string;
  address: string;
}

export interface SocialLinks {
  instagram?: string;
  tiktok?: string;
  linkedin?: string;
}

export type ProfessionalCategory = 
  | 'personal_trainer' 
  | 'nutritionist' 
  | 'physiotherapist' 
  | 'mental_coach' 
  | 'other';

export const categoryLabels: Record<ProfessionalCategory, string> = {
  personal_trainer: 'Personal Trainer',
  nutritionist: 'Nutrizionista',
  physiotherapist: 'Fisioterapista',
  mental_coach: 'Mental Coach',
  other: 'Altro'
};

export interface SearchFilters {
  query: string;
  category: ProfessionalCategory | '';
  city: string;
  availableOnline: boolean;
  priceRange: [number, number];
  maxDistance: number;
  minRating: number;
  nearMe: boolean;
}