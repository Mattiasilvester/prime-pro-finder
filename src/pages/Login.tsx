'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getPortalUserProfile } from '@/lib/supabase-portal'

export default function Login() {
  const [email, setEmail] = useState('mattiasilvestri@gmail.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const navigate = useNavigate()

  useEffect(() => {
    console.log('🎬 COMPONENT MOUNTED')
    setMounted(true)
    window.scrollTo(0, 0)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🚀 1. FORM SUBMITTED')
    console.log('📧 2. Email:', email)
    console.log('🔑 3. Password length:', password.length)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    
    if (!email || !password) {
      console.error('❌ Empty fields')
      setError('Compila tutti i campi')
      return
    }

    setLoading(true)
    setError('')
    console.log('⏳ 4. Setting loading TRUE')

    try {
      console.log('🔄 5. About to call Supabase signInWithPassword...')
      
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      })

      console.log('📦 6. SUPABASE RESPONSE:', {
        hasData: !!data,
        hasUser: !!data?.user,
        hasSession: !!data?.session,
        error: authError?.message || null
      })

      if (authError) {
        console.error('❌ 7. AUTH ERROR:', authError)
        setError(authError.message === 'Invalid login credentials' 
          ? 'Email o password non corretti' 
          : authError.message)
        setLoading(false)
        return
      }

      if (!data.session) {
        console.error('❌ 8. NO SESSION returned')
        setError('Errore di autenticazione')
        setLoading(false)
        return
      }

      console.log('✅ 9. LOGIN SUCCESS!')
      console.log('👤 User ID:', data.user?.id)
      console.log('🎫 Session:', data.session.access_token.substring(0, 20) + '...')
      
      // 10. Verifica profilo portal
      console.log('🔍 10. Checking portal profile...')
      const { data: profile, error: profileError } = await getPortalUserProfile(data.user.id)
      
      if (profileError) {
        console.error('❌ Profile check error:', profileError)
        setError('Errore nel recupero del profilo')
        setLoading(false)
        return
      }

      // 11. Se non c'è profilo, crea automaticamente
      if (!profile) {
        console.log('🆕 11. No profile found, creating base profile...')
        
        const { error: createError } = await supabase
          .from('portal_users')
          .insert({
            id: data.user.id,
            full_name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'Utente',
            email: data.user.email!,
            phone: '+393000000000', // Placeholder
            has_pp_app: false,
            pp_subscription_status: 'free',
            is_portal_user: true,
            is_verified: true,
            is_active: true,
          })

        if (createError) {
          // Se è un errore di chiave duplicata (23505), fai UPDATE invece
          if (createError.code === '23505') {
            console.log('🔄 Profile already exists, updating instead')
            
            const { error: updateError } = await supabase
              .from('portal_users')
              .update({
                full_name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'Utente',
                email: data.user.email!,
                phone: '+393000000000', // Placeholder
                has_pp_app: false,
                pp_subscription_status: 'free',
                is_portal_user: true,
                is_verified: true,
                is_active: true,
              })
              .eq('id', data.user.id)

            if (updateError) {
              console.error('❌ Profile update error:', updateError)
              console.error('❌ Update error details:', {
                message: updateError.message,
                code: updateError.code,
                details: updateError.details,
                hint: updateError.hint
              })
              
              setError(`Errore nell'aggiornamento del profilo: ${updateError.message}`)
              setLoading(false)
              return
            } else {
              console.log('✅ Profile updated successfully')
            }
          } else {
            console.error('❌ Profile creation error:', createError)
            console.error('❌ Error details:', {
              message: createError.message,
              code: createError.code,
              details: createError.details,
              hint: createError.hint
            })
            
            setError(`Errore nella creazione del profilo: ${createError.message}`)
            setLoading(false)
            return
          }
        } else {
          console.log('✅ Profile created successfully')
        }
      } else {
        console.log('✅ 11. Profile already exists')
      }

      console.log('🎯 12. Redirecting to profile...')
      navigate('/profilo')

    } catch (err) {
      console.error('💥 CATCH ERROR:', err)
      setError('Errore di connessione. Riprova.')
      setLoading(false)
    }
  }

  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Card Login */}
          <div className="bg-white rounded-lg shadow-xl border-2 border-gray-200 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Accedi a <span className="text-gold">Performance Prime</span>
              </h1>
              <p className="text-muted-foreground">
                Inserisci le tue credenziali per accedere
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="mattiasilvestri@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                  disabled={loading}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a 
                    href="/recupera-password" 
                    className="text-sm text-gold hover:text-gold/80 font-medium"
                  >
                    Password dimenticata?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                  disabled={loading}
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-black text-white hover:bg-black/90 font-semibold py-6"
                size="lg"
                disabled={loading}
              >
                {loading ? 'Accesso in corso...' : 'Accedi'}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-muted-foreground">oppure</span>
              </div>
            </div>

            {/* Registrazione */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Non hai ancora un account?
              </p>
              <Button 
                variant="outline" 
                className="w-full border-gold text-gold hover:bg-gold hover:text-black font-semibold"
                size="lg"
                onClick={() => navigate('/registrati')}
              >
                Crea un account
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Accedendo accetti i nostri{' '}
            <a href="/termini" className="text-gold hover:text-gold/80 font-medium">
              Termini di Servizio
            </a>{' '}
            e la{' '}
            <a href="/privacy" className="text-gold hover:text-gold/80 font-medium">
              Privacy Policy
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

