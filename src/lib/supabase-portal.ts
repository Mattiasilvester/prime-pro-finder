/**
 * Supabase Portal Helpers
 * 
 * IMPORTANTE: Tutte le funzioni usano tabelle portal_* per evitare conflitti
 * con le tabelle dell'app mobile Performance Prime.
 * 
 * Database condiviso: Performance Prime App + Prime Pro Finder Portal
 */

import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';
import type {
  PortalUser,
  CreatePortalUser,
  UpdatePortalUser,
  PortalFavorite,
  PortalFavoriteWithProfessional,
  CreatePortalFavorite,
  PortalBooking,
  PortalBookingWithDetails,
  CreatePortalBooking,
  UpdatePortalBooking,
  BookingStatus,
  PortalReview,
  PortalReviewWithUser,
  CreatePortalReview,
  PortalNotification,
  CreatePortalNotification,
} from '@/types/portal';

// ============================================================================
// TYPES PER RESPONSE
// ============================================================================

type SupabaseResponse<T> = {
  data: T | null;
  error: Error | null;
};

// ============================================================================
// 1. AUTENTICAZIONE
// ============================================================================

/**
 * Registra un nuovo utente nel portale
 * IMPORTANTE: Aggiunge source='portal' per trigger automatico portal_users
 * Se l'email è già registrata (utente app), ritorna errore specifico
 */
export async function signUpPortalUser(
  email: string,
  password: string,
  fullName: string
): Promise<SupabaseResponse<{ user: any; session: any }>> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          source: 'portal', // CRITICO: Marca come utente portal!
        },
      },
    });

    if (error) {
      // Se email già registrata, ritorna errore specifico
      if (error.message.includes('already registered') || error.message.includes('User already registered')) {
        return { 
          data: null, 
          error: new Error('EMAIL_ALREADY_EXISTS') 
        };
      }
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

/**
 * Login utente portale
 * Se l'utente esiste in auth.users ma NON in portal_users (utente app),
 * crea automaticamente il profilo portal con has_pp_app = true
 */
export async function signInPortalUser(
  email: string,
  password: string
): Promise<SupabaseResponse<{ user: User; session: Session }>> {
  
  try {
    // 1. Autentica con Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { data: null, error };
    }

    if (!data.user) {
      return { data: null, error: new Error('User not found') };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

/**
 * Logout utente
 */
export async function signOutUser(): Promise<SupabaseResponse<void>> {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { data: null, error };
    }

    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

/**
 * Recupera la sessione utente corrente
 */
export async function getCurrentPortalUser(): Promise<SupabaseResponse<any>> {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      return { data: null, error };
    }

    return { data: data.user, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

/**
 * Recupera il profilo completo dell'utente da portal_users
 */
export async function getPortalUserProfile(
  userId: string
): Promise<SupabaseResponse<PortalUser>> {
  try {
    // Timeout ridotto a 3 secondi per prestazioni migliori
    const timeoutPromise = new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error('Query timeout after 3s')), 3000)
    );
    
    const query = supabase
      .from('portal_users')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    const { data, error } = await Promise.race([query, timeoutPromise]);

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    // Gestione specifica del timeout
    if (error instanceof Error && error.message.includes('timeout')) {
      console.warn('[getPortalUserProfile] Timeout - using cached data');
      return { data: null, error: null };
    }
    
    return { data: null, error: error as Error };
  }
}

// ============================================================================
// 2. PROFILO
// ============================================================================

/**
 * Aggiorna il profilo utente in portal_users
 */
export async function updatePortalUserProfile(
  userId: string,
  updates: UpdatePortalUser
): Promise<SupabaseResponse<PortalUser>> {
  try {
    // Timeout ridotto per operazioni di update
    const timeoutPromise = new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error('Update timeout after 2s')), 2000)
    );

    const query = supabase
      .from('portal_users')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    const { data, error } = await Promise.race([query, timeoutPromise]);

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    if (error instanceof Error && error.message.includes('timeout')) {
      console.warn('[updatePortalUserProfile] Timeout - update may have succeeded');
      return { data: null, error: new Error('Update timeout') };
    }
    return { data: null, error: error as Error };
  }
}

// ============================================================================
// 3. PREFERITI
// ============================================================================

/**
 * Recupera tutti i preferiti dell'utente con dati professionisti
 */
export async function getPortalFavorites(
  userId: string
): Promise<SupabaseResponse<PortalFavoriteWithProfessional[]>> {
  try {
    const { data, error } = await supabase
      .from('portal_favorites')
      .select(
        `
        *,
        professional:vetrina_professionals (
          id,
          slug,
          full_name,
          category,
          city,
          photo_url,
          is_partner,
          rating_avg,
          starting_price
        )
      `
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      return { data: null, error };
    }

    return { data: data as PortalFavoriteWithProfessional[], error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

/**
 * Aggiungi un professionista ai preferiti
 */
export async function addToPortalFavorites(
  userId: string,
  professionalId: string
): Promise<SupabaseResponse<PortalFavorite>> {
  try {

    const { data, error } = await supabase
      .from('portal_favorites')
      .insert({
        user_id: userId,
        professional_id: professionalId,
      })
      .select()
      .single();


    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

/**
 * Rimuovi un professionista dai preferiti
 */
export async function removeFromPortalFavorites(
  userId: string,
  professionalId: string
): Promise<SupabaseResponse<void>> {
  try {
    const { error } = await supabase
      .from('portal_favorites')
      .delete()
      .eq('user_id', userId)
      .eq('professional_id', professionalId);

    if (error) {
      return { data: null, error };
    }

    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

/**
 * Controlla se un professionista è nei preferiti
 */
export async function checkIsFavorite(
  userId: string,
  professionalId: string
): Promise<SupabaseResponse<boolean>> {
  try {
    const { data, error } = await supabase
      .from('portal_favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('professional_id', professionalId)
      .maybeSingle();

    if (error) {
      return { data: null, error };
    }

    return { data: !!data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

// ============================================================================
// 4. PRENOTAZIONI
// ============================================================================

/**
 * Recupera le prenotazioni dell'utente con dettagli professionisti
 */
export async function getPortalBookings(
  userId: string,
  status?: BookingStatus
): Promise<SupabaseResponse<PortalBookingWithDetails[]>> {
  try {
    let query = supabase
      .from('portal_bookings')
      .select(
        `
        *,
        user:portal_users!portal_bookings_user_id_fkey (
          id,
          full_name,
          email,
          phone
        ),
        professional:professionals (
          id,
          full_name,
          category,
          city,
          photo_url,
          phone,
          email
        )
      `
      )
      .eq('user_id', userId);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query.order('booking_date', {
      ascending: false,
    });

    if (error) {
      return { data: null, error };
    }

    return { data: data as PortalBookingWithDetails[], error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

/**
 * Crea una nuova prenotazione
 */
export async function createPortalBooking(
  booking: CreatePortalBooking
): Promise<SupabaseResponse<PortalBooking>> {
  try {
    const { data, error } = await supabase
      .from('portal_bookings')
      .insert({
        ...booking,
        status: 'pending',
        booking_source: booking.booking_source || 'portal',
      })
      .select()
      .single();

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

/**
 * Aggiorna lo stato di una prenotazione
 */
export async function updatePortalBookingStatus(
  bookingId: string,
  status: BookingStatus
): Promise<SupabaseResponse<PortalBooking>> {
  try {
    const updates: UpdatePortalBooking = {
      status,
      updated_at: new Date().toISOString(),
    };

    // Aggiungi timestamp specifico per lo stato
    if (status === 'confirmed') {
      updates.confirmed_at = new Date().toISOString();
    } else if (status === 'cancelled') {
      updates.cancelled_at = new Date().toISOString();
    } else if (status === 'completed') {
      updates.completed_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('portal_bookings')
      .update(updates)
      .eq('id', bookingId)
      .select()
      .single();

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

/**
 * Cancella una prenotazione
 */
export async function cancelPortalBooking(
  bookingId: string,
  reason?: string
): Promise<SupabaseResponse<PortalBooking>> {
  try {
    const { data, error } = await supabase
      .from('portal_bookings')
      .update({
        status: 'cancelled',
        cancellation_reason: reason || null,
        cancelled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

// ============================================================================
// 5. RECENSIONI
// ============================================================================

/**
 * Recupera tutte le recensioni di un professionista
 */
export async function getPortalReviews(
  professionalId: string
): Promise<SupabaseResponse<PortalReviewWithUser[]>> {
  try {
    const { data, error } = await supabase
      .from('portal_reviews')
      .select(
        `
        *,
        user:portal_users!portal_reviews_user_id_fkey (
          id,
          full_name,
          avatar_url
        )
      `
      )
      .eq('professional_id', professionalId)
      .order('created_at', { ascending: false });

    if (error) {
      return { data: null, error };
    }

    return { data: data as PortalReviewWithUser[], error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

/**
 * Recupera tutte le recensioni scritte da un utente
 */
export async function getUserPortalReviews(
  userId: string
): Promise<SupabaseResponse<PortalReview[]>> {
  try {
    const { data, error } = await supabase
      .from('portal_reviews')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

/**
 * Crea una nuova recensione
 */
export async function createPortalReview(
  review: CreatePortalReview
): Promise<SupabaseResponse<PortalReview>> {
  try {
    const { data, error } = await supabase
      .from('portal_reviews')
      .insert({
        ...review,
        review_source: review.review_source || 'portal',
        is_verified: !!review.booking_id, // Verificata se associata a booking
        helpful_count: 0,
      })
      .select()
      .single();

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

// ============================================================================
// 6. NOTIFICHE
// ============================================================================

/**
 * Recupera le notifiche dell'utente
 */
export async function getPortalNotifications(
  userId: string,
  unreadOnly: boolean = false
): Promise<SupabaseResponse<PortalNotification[]>> {
  try {
    let query = supabase
      .from('portal_notifications')
      .select('*')
      .eq('user_id', userId);

    if (unreadOnly) {
      query = query.eq('is_read', false);
    }

    const { data, error } = await query.order('created_at', {
      ascending: false,
    });

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

/**
 * Marca una notifica come letta
 */
export async function markNotificationAsRead(
  notificationId: string
): Promise<SupabaseResponse<PortalNotification>> {
  try {
    const { data, error } = await supabase
      .from('portal_notifications')
      .update({
        is_read: true,
        read_at: new Date().toISOString(),
      })
      .eq('id', notificationId)
      .select()
      .single();

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

/**
 * Marca tutte le notifiche dell'utente come lette
 */
export async function markAllNotificationsAsRead(
  userId: string
): Promise<SupabaseResponse<void>> {
  try {
    const { error } = await supabase
      .from('portal_notifications')
      .update({
        is_read: true,
        read_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) {
      return { data: null, error };
    }

    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

/**
 * Crea una nuova notifica
 */
export async function createPortalNotification(
  notification: CreatePortalNotification
): Promise<SupabaseResponse<PortalNotification>> {
  try {
    const { data, error } = await supabase
      .from('portal_notifications')
      .insert({
        ...notification,
        is_read: false,
      })
      .select()
      .single();

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Verifica se l'utente corrente è abbonato Performance Prime
 */
export async function checkUserSubscription(
  userId: string
): Promise<SupabaseResponse<boolean>> {
  try {
    const { data, error } = await supabase
      .from('portal_users')
      .select('is_subscribed, pp_subscription_status')
      .eq('id', userId)
      .single();

    if (error) {
      return { data: null, error };
    }

    const isSubscribed =
      data.is_subscribed && data.pp_subscription_status !== 'free';

    return { data: isSubscribed, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

/**
 * Conta le prenotazioni non lette/pending dell'utente
 */
export async function getPendingBookingsCount(
  userId: string
): Promise<SupabaseResponse<number>> {
  try {
    const { count, error } = await supabase
      .from('portal_bookings')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'pending');

    if (error) {
      return { data: null, error };
    }

    return { data: count || 0, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

/**
 * Conta le notifiche non lette
 */
export async function getUnreadNotificationsCount(
  userId: string
): Promise<SupabaseResponse<number>> {
  try {
    const { count, error } = await supabase
      .from('portal_notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) {
      return { data: null, error };
    }

    return { data: count || 0, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

