/**
 * Types per le tabelle portal_* su Supabase
 * Database condiviso con Performance Prime App
 * 
 * IMPORTANTE: Tutte le tabelle del portale web usano prefisso portal_
 * per evitare conflitti con le tabelle dell'app mobile
 */

// ============================================================================
// PORTAL USERS
// ============================================================================

export interface PortalUser {
  id: string; // UUID - collegato a auth.users.id
  full_name: string;
  email: string;
  avatar_url?: string | null;
  is_subscribed: boolean; // Abbonamento Performance Prime attivo
  has_pp_app: boolean; // Se l'utente ha anche l'app mobile PP
  pp_subscription_status: 'free' | 'premium' | 'pro'; // Livello abbonamento
  phone?: string | null;
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // ISO 8601 timestamp
}

// Subset per creazione nuovo utente
export interface CreatePortalUser {
  id: string; // Da auth.users.id
  full_name: string;
  email: string;
  avatar_url?: string | null;
  phone?: string | null;
}

// Subset per aggiornamento profilo
export interface UpdatePortalUser {
  full_name?: string;
  email?: string;
  avatar_url?: string | null;
  phone?: string | null;
  updated_at?: string;
}

// ============================================================================
// PORTAL FAVORITES
// ============================================================================

export interface PortalFavorite {
  id: string; // UUID
  user_id: string; // -> portal_users.id
  professional_id: string; // -> professionals.id
  created_at: string; // ISO 8601 timestamp
}

// Con dati professionista joinati (per query)
export interface PortalFavoriteWithProfessional extends PortalFavorite {
  professional: {
    id: string;
    slug: string;
    full_name: string;
    category: string;
    city: string;
    photo_url?: string;
    is_partner: boolean;
    rating_avg: number;
    starting_price: number;
  };
}

// Per creazione nuovo preferito
export interface CreatePortalFavorite {
  user_id: string;
  professional_id: string;
}

// ============================================================================
// PORTAL BOOKINGS
// ============================================================================

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type BookingSource = 'portal' | 'app' | 'direct';

export interface PortalBooking {
  id: string; // UUID
  user_id: string; // -> portal_users.id
  professional_id: string; // -> professionals.id
  booking_date: string; // ISO 8601 timestamp
  booking_time: string; // HH:MM format
  service_name: string;
  service_price: number;
  duration_minutes: number;
  status: BookingStatus;
  booking_source: BookingSource;
  notes?: string | null;
  cancellation_reason?: string | null;
  cancelled_at?: string | null;
  confirmed_at?: string | null;
  completed_at?: string | null;
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // ISO 8601 timestamp
}

// Con dati utente e professionista joinati
export interface PortalBookingWithDetails extends PortalBooking {
  user: {
    id: string;
    full_name: string;
    email: string;
    phone?: string;
  };
  professional: {
    id: string;
    full_name: string;
    category: string;
    city: string;
    photo_url?: string;
    phone?: string;
    email?: string;
  };
}

// Per creazione nuova prenotazione
export interface CreatePortalBooking {
  user_id: string;
  professional_id: string;
  booking_date: string;
  booking_time: string;
  service_name: string;
  service_price: number;
  duration_minutes: number;
  notes?: string;
  booking_source?: BookingSource;
}

// Per aggiornamento prenotazione
export interface UpdatePortalBooking {
  booking_date?: string;
  booking_time?: string;
  status?: BookingStatus;
  notes?: string;
  cancellation_reason?: string;
  cancelled_at?: string;
  confirmed_at?: string;
  completed_at?: string;
  updated_at?: string;
}

// ============================================================================
// PORTAL REVIEWS
// ============================================================================

export type ReviewSource = 'portal' | 'app';

export interface PortalReview {
  id: string; // UUID
  user_id: string; // -> portal_users.id
  professional_id: string; // -> professionals.id
  booking_id?: string | null; // -> portal_bookings.id (opzionale)
  rating: number; // 1-5 stelle
  content: string; // Testo recensione
  review_source: ReviewSource;
  is_verified: boolean; // Se la recensione è verificata (da booking completato)
  helpful_count: number; // Numero di "utile" ricevuti
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // ISO 8601 timestamp
}

// Con dati utente joinati
export interface PortalReviewWithUser extends PortalReview {
  user: {
    id: string;
    full_name: string;
    avatar_url?: string;
  };
}

// Per creazione nuova recensione
export interface CreatePortalReview {
  user_id: string;
  professional_id: string;
  booking_id?: string;
  rating: number;
  content: string;
  review_source?: ReviewSource;
}

// Per aggiornamento recensione
export interface UpdatePortalReview {
  rating?: number;
  content?: string;
  updated_at?: string;
}

// ============================================================================
// PORTAL NOTIFICATIONS
// ============================================================================

export type NotificationType = 
  | 'booking_confirmed' 
  | 'booking_cancelled' 
  | 'booking_reminder'
  | 'new_message'
  | 'review_request'
  | 'promo'
  | 'system';

export interface PortalNotification {
  id: string; // UUID
  user_id: string; // -> portal_users.id
  type: NotificationType;
  title: string;
  message: string;
  link_url?: string | null; // URL per azione (es: /prenotazioni/123)
  is_read: boolean;
  read_at?: string | null; // ISO 8601 timestamp
  created_at: string; // ISO 8601 timestamp
}

// Per creazione nuova notifica
export interface CreatePortalNotification {
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  link_url?: string;
}

// ============================================================================
// PORTAL SEARCH HISTORY (Analytics)
// ============================================================================

export interface PortalSearchHistory {
  id: string; // UUID
  user_id?: string | null; // Opzionale - può essere ricerca anonima
  search_query: string;
  category?: string | null;
  city?: string | null;
  filters_applied?: Record<string, any> | null; // JSON con filtri
  results_count: number;
  clicked_professional_id?: string | null; // Se ha cliccato su un risultato
  created_at: string; // ISO 8601 timestamp
}

// ============================================================================
// PORTAL CONTACT REQUESTS
// ============================================================================

export type ContactRequestStatus = 'pending' | 'replied' | 'closed';

export interface PortalContactRequest {
  id: string; // UUID
  user_id?: string | null; // Opzionale - può essere contatto anonimo
  professional_id: string; // -> professionals.id
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  status: ContactRequestStatus;
  replied_at?: string | null;
  created_at: string; // ISO 8601 timestamp
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

// Response type generico per query Supabase
export interface PortalQueryResponse<T> {
  data: T | null;
  error: Error | null;
}

// Paginazione
export interface PortalPagination {
  page: number;
  pageSize: number;
  totalCount?: number;
  totalPages?: number;
}

// Filtri comuni
export interface PortalFilters {
  startDate?: string;
  endDate?: string;
  status?: string;
  userId?: string;
  professionalId?: string;
}

