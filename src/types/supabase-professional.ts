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
export function transformProfessional(dbProf: any): any {
  const slug = dbProf.slug || `${dbProf.first_name?.toLowerCase()}-${dbProf.last_name?.toLowerCase()}`.replace(/\s+/g, '-');
  const fullName = dbProf.full_name || `${dbProf.first_name || ''} ${dbProf.last_name || ''}`.trim();
  const city = dbProf.city || dbProf.vat_city || '';
  const startingPrice = dbProf.starting_price || 50;
  
  return {
    id: dbProf.id || '',
    slug,
    name: fullName,
    category: mapCategory(dbProf.category || 'pt'),
    city,
    region: '', // Da calcolare o aggiungere al DB
    bio: dbProf.bio || dbProf.headline || `Professionista ${mapCategory(dbProf.category || 'pt')}`,
    photo: dbProf.photo_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${dbProf.id}`,
    isPartner: dbProf.is_partner === true,
    rating: dbProf.rating_avg || 0,
    reviewCount: dbProf.rating_count || 0,
    startingPrice,
    priceRange: `€${startingPrice}-${startingPrice + 30}`,
    availableOnline: dbProf.available_online === true,
    specializations: [], // Da aggiungere al DB o estrarre da services
    services: Array.isArray(dbProf.services) ? dbProf.services : [],
    contact: {
      email: dbProf.email || '',
      phone: dbProf.phone || '',
      address: `${dbProf.vat_address || ''}, ${city}`.replace(/^,\s*/, '').trim() || city,
    },
    social: {},
    experience: '', // Da aggiungere al DB
    certifications: [], // Da aggiungere al DB
  };
}

