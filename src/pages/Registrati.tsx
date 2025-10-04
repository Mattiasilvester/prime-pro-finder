import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { signUpPortalUser } from '@/lib/supabase-portal';
import { toast } from 'sonner';

const Registrati = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validazioni base
    if (!formData.name || !formData.email || !formData.password) {
      setError('Tutti i campi sono obbligatori');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Le password non coincidono');
      return;
    }

    if (formData.password.length < 6) {
      setError('La password deve essere di almeno 6 caratteri');
      return;
    }

    if (!acceptTerms) {
      setError('Devi accettare i Termini di Servizio');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Registrazione con Supabase
      const { data: signUpData, error: signUpError } = await signUpPortalUser(
        formData.email,
        formData.password,
        formData.name
      );

      if (signUpError) {
        // Gestisci errori comuni Supabase
        if (signUpError.message === 'EMAIL_ALREADY_EXISTS' || signUpError.message.includes('already registered')) {
          setError('Questa email è già registrata. Se hai l\'app Performance Prime, vai alla pagina di accesso.');
          setShowLoginButton(true);
          toast.error('Email già registrata. Prova ad accedere.');
        } else if (signUpError.message.includes('Password should be')) {
          setError('La password è troppo debole. Usa almeno 6 caratteri.');
          toast.error('Password troppo debole');
        } else if (signUpError.message.includes('weak and easy to guess')) {
          setError('Password troppo debole e facilmente indovinabile. Scegline una più sicura.');
          toast.error('Password troppo debole');
        } else if (signUpError.message.includes('Invalid email')) {
          setError('Email non valida. Controlla il formato.');
          toast.error('Email non valida');
        } else if (signUpError.message.includes('User already registered')) {
          setError('Utente già registrato con questa email.');
          toast.error('Email già registrata');
        } else {
          // Traduci altri errori generici
          let translatedError = signUpError.message;
          if (signUpError.message.includes('already registered')) {
            translatedError = 'Email già registrata';
          } else if (signUpError.message.includes('network')) {
            translatedError = 'Errore di connessione. Riprova più tardi.';
          }
          
          setError(translatedError);
          toast.error('Errore durante la registrazione');
        }
        setIsLoading(false);
        return;
      }

      if (!signUpData.user) {
        setError('Errore durante la creazione dell\'account');
        toast.error('Errore durante la registrazione');
        setIsLoading(false);
        return;
      }

      // 2. Auto-login dopo registrazione
      toast.success('Account creato con successo!');
      
      const loginResult = await login(formData.email, formData.password);

      if (loginResult.success) {
        toast.success('Benvenuto in Performance Prime!');
        navigate('/profilo');
      } else {
        // Registrazione ok ma login fallito (raro)
        toast.info('Account creato! Effettua il login.');
        navigate('/accedi');
      }
    } catch (error) {
      console.error('Errore registrazione:', error);
      setError('Errore imprevisto. Riprova più tardi.');
      toast.error('Errore durante la registrazione');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Card Registrazione */}
          <div className="bg-white rounded-lg shadow-xl border-2 border-gray-200 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Unisciti a <span className="text-gold">Performance Prime</span>
              </h1>
              <p className="text-muted-foreground">
                Crea il tuo account gratuito
              </p>
            </div>

            {/* Info Alert - Utenti App */}
            <Alert className="mb-6 border-[#EEBA2B] bg-[#EEBA2B]/10">
              <AlertDescription className="text-sm">
                <strong>Hai già l'app Performance Prime?</strong>{' '}
                Effettua direttamente l'<Link to="/accedi" className="underline font-semibold text-black hover:text-[#EEBA2B]">accesso</Link> con le tue credenziali esistenti.
              </AlertDescription>
            </Alert>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
                {error}
                {showLoginButton && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="mt-3 w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                    asChild
                  >
                    <Link to="/accedi">
                      Vai al Login
                    </Link>
                  </Button>
                )}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nome Completo */}
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Mario Rossi"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nome@esempio.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Minimo 6 caratteri"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              {/* Conferma Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Conferma Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Ripeti la password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  className="mt-0.5"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-tight cursor-pointer">
                  Accetto i{' '}
                  <Link to="/termini" className="text-gold hover:text-gold/80 font-medium">
                    Termini di Servizio
                  </Link>{' '}
                  e la{' '}
                  <Link to="/privacy" className="text-gold hover:text-gold/80 font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-black text-white hover:bg-black/90 font-semibold py-6"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'Creazione account...' : 'Crea Account'}
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

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Hai già un account?
              </p>
              <Button 
                variant="outline" 
                className="w-full border-gold text-gold hover:bg-gold hover:text-black font-semibold"
                size="lg"
                asChild
              >
                <Link to="/accedi">
                  Accedi
                </Link>
              </Button>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-8 bg-gradient-hero rounded-lg p-6 text-white">
            <h3 className="font-bold text-lg mb-4 text-center">
              Vantaggi dell'Account <span className="text-gold">Gratuito</span>
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5">✓</span>
                <span>Salva i tuoi professionisti preferiti</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5">✓</span>
                <span>Gestisci le tue prenotazioni in un unico posto</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5">✓</span>
                <span>Ricevi notifiche e promemoria</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5">✓</span>
                <span>Accesso alle offerte esclusive</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Registrati;

