import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  getCurrentPortalUser,
  getPortalUserProfile,
  signInPortalUser,
  signOutUser,
} from '@/lib/supabase-portal';
import type { PortalUser } from '@/types/portal';

// Hook per gestire l'autenticazione utente
// ✅ Integrato con Supabase Auth + portal_users

interface User {
  id: string;
  name: string;
  email: string;
  isSubscribed: boolean;
  avatar_url?: string;
}

/**
 * Mappa PortalUser (da Supabase) → User (interface app)
 */
function mapPortalUserToUser(portalUser: PortalUser): User {
  return {
    id: portalUser.id,
    name: portalUser.full_name,
    email: portalUser.email,
    isSubscribed: portalUser.pp_subscription_status !== 'free',
  };
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carica lo stato di autenticazione al mount
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);

      try {
        // 1. Verifica se c'è una sessione attiva (query veloce)
        const { data: authUser, error: authError } = await getCurrentPortalUser();

        if (authError || !authUser) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        // 2. Usa SOLO i dati da auth.users (1 query invece di 2)
        const finalUser = {
          id: authUser.id,
          name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Utente',
          email: authUser.email!,
          isSubscribed: authUser.user_metadata?.pp_subscription_status !== 'free' || false,
          avatar_url: authUser.user_metadata?.avatar_url || undefined,
        };
        setUser(finalUser);
        setIsLoading(false); // ✅ Loading false SUBITO - UNA SOLA QUERY
      } catch (error) {
        console.error('Errore check auth:', error);
        setUser(null);
        setIsLoading(false);
      }
    };

    checkAuth();

    // 4. Ascolta i cambiamenti di autenticazione
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          // Utente ha fatto login - usa solo dati auth
          const userData = {
            id: session.user.id,
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Utente',
            email: session.user.email!,
            isSubscribed: session.user.user_metadata?.pp_subscription_status !== 'free' || false,
            avatar_url: session.user.user_metadata?.avatar_url || undefined,
          };
          setUser(userData);
        } else if (event === 'SIGNED_OUT') {
          // Utente ha fatto logout
          setUser(null);
        } else if (event === 'TOKEN_REFRESHED') {
          // Token aggiornato - nessuna azione necessaria con auth-only
          console.log('Token refreshed');
        }
      }
    );

    // Cleanup listener
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  /**
   * Login con email e password
   * BREAKING CHANGE: Ora accetta (email, password) invece di (userData)
   */
  const login = async (email: string, password: string): Promise<{ 
    success: boolean; 
    error?: string 
  }> => {
    console.log('[useAuth.login] START with email:', email);
    
    try {
      console.log('[useAuth.login] Setting isLoading TRUE');
      setIsLoading(true);

      // 1. Autentica con Supabase
      console.log('[useAuth.login] Calling signInPortalUser...');
      const { data: authData, error: authError } = await signInPortalUser(
        email,
        password
      );
      console.log('[useAuth.login] signInPortalUser returned:', { authData, authError });

      if (authError || !authData.user) {
        console.log('[useAuth.login] Auth FAILED:', authError?.message);
        return { 
          success: false, 
          error: authError?.message || 'Credenziali non valide' 
        };
      }

      console.log('[useAuth.login] Auth SUCCESS, user id:', authData.user.id);

      // 2. Usa SOLO dati da auth.users (nessuna query aggiuntiva)
      console.log('[useAuth.login] Using auth user data directly...');
      const userData = {
        id: authData.user.id,
        name: authData.user.user_metadata?.full_name || authData.user.email?.split('@')[0] || 'Utente',
        email: authData.user.email!,
        isSubscribed: authData.user.user_metadata?.pp_subscription_status !== 'free' || false,
        avatar_url: authData.user.user_metadata?.avatar_url || undefined,
      };
      
      // 3. Setta user immediatamente
      console.log('[useAuth.login] Setting user state...');
      setUser(userData);
      console.log('[useAuth.login] User set successfully');

      return { success: true };
    } catch (error) {
      console.error('[useAuth.login] EXCEPTION:', error);
      return { 
        success: false, 
        error: 'Errore durante il login. Riprova.' 
      };
    } finally {
      console.log('[useAuth.login] Setting isLoading FALSE');
      setIsLoading(false);
    }
  };

  /**
   * Logout utente
   */
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Supabase logout
      await signOutUser();
      
      // Pulisci state (onAuthStateChange lo farà anche)
      setUser(null);
    } catch (error) {
      console.error('Errore logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };
};

