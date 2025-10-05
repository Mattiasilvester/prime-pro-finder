/**
 * Type mapping tra database Supabase e applicazione frontend
 * Questi types estendono quelli generati automaticamente da Supabase
 */

import { Database } from '@/integrations/supabase/types';
import type { Professional, ProfessionalCategory } from './professional';

// Type base dal database
export type ProfessionalRow = Database['public']['Tables']['professionals']['Row'];

/**
 * Mappa il category enum del database al formato frontend
 */
export function mapCategory(dbCategory: string): ProfessionalCategory {
  const mapping: Record<string, ProfessionalCategory> = {
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
export function transformProfessional(dbProf: ProfessionalRow): Professional {
  const slug = dbProf.slug || `${dbProf.full_name?.toLowerCase()}`.replace(/\s+/g, '-');
  const fullName = dbProf.full_name || 'Professionista';
  const city = dbProf.city || '';
  const startingPrice = dbProf.starting_price || 50;
  
  return {
    id: dbProf.id,
    slug,
    name: fullName,
    category: mapCategory(dbProf.category),
    city,
    region: '', // Da calcolare o aggiungere al DB
    bio: dbProf.bio || dbProf.headline || `Professionista ${mapCategory(dbProf.category)}`,
    photo: dbProf.photo_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${dbProf.id}`,
    isPartner: dbProf.is_partner === true,
    rating: dbProf.rating_avg || 0,
    reviewCount: dbProf.rating_count || 0,
    startingPrice,
    priceRange: `€${startingPrice}-${startingPrice + 30}`,
    availableOnline: dbProf.available_online === true,
    specializations: [], // Da aggiungere al DB o estrarre da services
    services: Array.isArray(dbProf.services) ? dbProf.services.map(s => ({
      name: s.name || '',
      description: s.description || '',
      price: s.price || 0,
      duration: s.duration || '',
      online: s.online || false
    })) : [],
    contact: {
      email: dbProf.full_name.includes('@') ? dbProf.full_name : '',
      phone: '',
      address: city,
    },
    social: {},
    experience: '', // Da aggiungere al DB
    certifications: [], // Da aggiungere al DB
  };
}

