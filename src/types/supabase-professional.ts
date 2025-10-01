/**
 * Type mapping tra database Supabase e applicazione frontend
 * Questi types estendono quelli generati automaticamente da Supabase
 */

import { Tables } from '@/integrations/supabase/types';

// Type base dal database
export type ProfessionalRow = Tables<'professionals'>;

// Type esteso per l'applicazione (con campi calcolati/trasformati)
export interface ProfessionalExtended {
  // Campi base database
  id: string;
  slug: string;
  full_name: string;
  headline: string | null;
  bio: string | null;
  category: 'pt' | 'nutrizionista' | 'fisioterapista' | 'mental_coach' | 'osteopata';
  is_partner: boolean;
  photo_url: string | null;
  city: string;
  starting_price: number | null;
  rating_avg: number | null;
  rating_count: number | null;
  services: ServiceDB[] | null;
  available_online: boolean;
  active: boolean;
  
  // Campi esistenti dal vecchio schema
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  company_name: string;
  
  // Metadata
  created_at: string;
  updated_at: string;
}

export interface ServiceDB {
  name: string;
  description: string;
  price: number;
  duration: string;
  online: boolean;
}

/**
 * Mappa il category enum del database al formato frontend
 */
export function mapCategory(dbCategory: string): 'personal_trainer' | 'nutritionist' | 'physiotherapist' | 'mental_coach' | 'other' {
  const mapping: Record<string, 'personal_trainer' | 'nutritionist' | 'physiotherapist' | 'mental_coach' | 'other'> = {
    'pt': 'personal_trainer',
    'nutrizionista': 'nutritionist',
    'fisioterapista': 'physiotherapist',
    'mental_coach': 'mental_coach',
    'osteopata': 'other',
  };
  
  return mapping[dbCategory] || 'other';
}

/**
 * Trasforma un record dal database nel formato Professional dell'app
 */
export function transformProfessional(dbProf: Partial<ProfessionalRow>): any {
  return {
    id: dbProf.id || '',
    slug: (dbProf as any).slug || `${dbProf.first_name?.toLowerCase()}-${dbProf.last_name?.toLowerCase()}`,
    name: (dbProf as any).full_name || `${dbProf.first_name} ${dbProf.last_name}`,
    category: mapCategory(dbProf.category || 'pt'),
    city: (dbProf as any).city || (dbProf as any).vat_city || '',
    region: '', // Da calcolare o aggiungere al DB
    bio: (dbProf as any).bio || '',
    photo: (dbProf as any).photo_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${dbProf.id}`,
    isPartner: (dbProf as any).is_partner || false,
    rating: (dbProf as any).rating_avg || 0,
    reviewCount: (dbProf as any).rating_count || 0,
    startingPrice: (dbProf as any).starting_price || 50,
    priceRange: `€${(dbProf as any).starting_price || 50}-${((dbProf as any).starting_price || 50) + 30}`,
    availableOnline: (dbProf as any).available_online || false,
    specializations: [], // Da aggiungere al DB o estrarre da services
    services: (dbProf as any).services || [],
    contact: {
      email: dbProf.email || '',
      phone: dbProf.phone || '',
      address: `${dbProf.vat_address || ''}, ${(dbProf as any).city || dbProf.vat_city || ''}`.trim(),
    },
    social: {},
    experience: '', // Da aggiungere al DB
    certifications: [], // Da aggiungere al DB
  };
}

