import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Settings, Heart, Calendar as CalendarIcon, LogOut, Save, X, Camera } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { updatePortalUserProfile, getPortalFavorites } from '@/lib/supabase-portal';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { PhotoUploader } from '@/components/PhotoUploader';
import { PhotoCropper } from '@/components/PhotoCropper';

const Profilo = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editData, setEditData] = useState({
    full_name: '',
    email: ''
  });
  const [localUserData, setLocalUserData] = useState(user);
  const [showPhotoUploader, setShowPhotoUploader] = useState(false);
  const [showPhotoCropper, setShowPhotoCropper] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadFavoritesCount();
  }, []);

  useEffect(() => {
    if (user?.id) {
      loadFavoritesCount();
    }
  }, [user?.id]);

  // Listen for favorite changes from other components
  useEffect(() => {
    const handleFavoriteChanged = () => {
      loadFavoritesCount();
    };

    window.addEventListener('favoriteAdded', handleFavoriteChanged);
    window.addEventListener('favoriteRemoved', handleFavoriteChanged);

    return () => {
      window.removeEventListener('favoriteAdded', handleFavoriteChanged);
      window.removeEventListener('favoriteRemoved', handleFavoriteChanged);
    };
  }, []);

  // Aggiorna i dati locali quando user cambia
  useEffect(() => {
    if (user) {
      setLocalUserData(user);
    }
  }, [user]);

  // Usa dati locali per evitare re-render
  const userData = localUserData || {
    name: 'Mario Rossi',
    email: 'mario.rossi@esempio.com',
    isSubscribed: true
  };
  const memberSince = 'Gennaio 2025';

  const loadFavoritesCount = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await getPortalFavorites(user.id);
      if (error) {
        console.error('Errore caricamento preferiti:', error);
        return;
      }
      
      if (data) {
        setFavoritesCount(data.length);
      }
    } catch (error) {
      console.error('Errore caricamento preferiti:', error);
    }
  };

  const handleEditStart = () => {
    setEditData({
      full_name: userData.name,
      email: userData.email
    });
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditData({ full_name: '', email: '' });
  };

  const handleSave = async () => {
    if (!user?.id) {
      toast.error('Errore: utente non trovato');
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('🔄 Salvataggio profilo:', {
        userId: user.id,
        full_name: editData.full_name,
        email: editData.email
      });

      // Aggiorna i metadata dell'utente in auth.users
      const { data, error } = await supabase.auth.updateUser({
        data: {
          full_name: editData.full_name,
          email: editData.email
        }
      });

      console.log('📦 Risultato salvataggio:', { data, error });

      if (error) {
        console.error('❌ Errore salvataggio:', error);
        toast.error(`Errore nell'aggiornamento: ${error.message}`);
        return;
      }

      toast.success('Profilo aggiornato con successo!');
      setIsEditing(false);
      
      // Aggiorna i dati locali immediatamente senza refresh
      if (data?.user && localUserData) {
        setLocalUserData({
          ...localUserData,
          name: data.user.user_metadata?.full_name || editData.full_name,
          email: data.user.email || editData.email
        });
        console.log('Profilo aggiornato localmente:', data.user);
      }
      
    } catch (error) {
      console.error('Errore aggiornamento:', error);
      toast.error('Errore durante l\'aggiornamento');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handlePhotoSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setSelectedImageUrl(imageUrl);
      setShowPhotoCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoCrop = async (croppedImageUrl: string) => {
    if (!user?.id) {
      toast.error('Errore: utente non trovato');
      return;
    }

    try {
      // Convert base64 to blob
      const response = await fetch(croppedImageUrl);
      const blob = await response.blob();
      
      // Upload to Supabase storage (or use base64 directly)
      // For now, we'll store the base64 in user metadata
      const { data, error } = await supabase.auth.updateUser({
        data: {
          avatar_url: croppedImageUrl
        }
      });

      if (error) {
        toast.error('Errore nel salvataggio della foto');
        return;
      }

      // Update local state
      if (localUserData) {
        setLocalUserData({
          ...localUserData,
          avatar_url: croppedImageUrl
        });
      }

      toast.success('Foto profilo aggiornata!');
    } catch (error) {
      console.error('Errore salvataggio foto:', error);
      toast.error('Errore durante il salvataggio');
    }
  };

  // Mostra loading solo se non abbiamo nemmeno dati di fallback
  if (!user && !localUserData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento profilo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="container mx-auto text-center">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:opacity-80 transition-opacity relative group border-0.5 border-gold"
            onClick={() => setShowPhotoUploader(true)}
          >
            {localUserData?.avatar_url ? (
              <img 
                src={localUserData.avatar_url} 
                alt="Foto profilo" 
                className="w-full h-full rounded-full object-cover brightness-125 contrast-120 saturate-115"
              />
            ) : (
              <div className="w-full h-full bg-gold rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-black" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">
            Benvenuto, <span className="text-gold">{userData.name}</span>
          </h1>
          <p className="text-xl opacity-90">
            {userData.isSubscribed ? (
              <>
                <span className="font-bold">Membro <span className="text-white">P</span><span className="text-gold">P</span></span>
              </>
            ) : (
              'Membro'
            )}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Informazioni Account */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-6 h-6 text-gold" />
                  <h2 className="text-xl font-bold">Informazioni Account</h2>
                </div>
                
                {!isEditing ? (
                  <>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Nome</p>
                        <p className="font-semibold">{userData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-semibold">{userData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Membro dal</p>
                        <p className="font-semibold">{memberSince}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4" 
                      size="sm"
                      onClick={handleEditStart}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Modifica Profilo
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="edit-name">Nome</Label>
                        <Input
                          id="edit-name"
                          value={editData.full_name}
                          onChange={(e) => setEditData({ ...editData, full_name: e.target.value })}
                          className="mt-1"
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-email">Email</Label>
                        <Input
                          id="edit-email"
                          type="email"
                          value={editData.email}
                          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                          className="mt-1"
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Membro dal</p>
                        <p className="font-semibold">{memberSince}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleEditCancel}
                        disabled={isLoading}
                        className="flex-1"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Annulla
                      </Button>
                      <Button 
                        size="sm"
                        onClick={handleSave}
                        disabled={isLoading}
                        className="flex-1 bg-gold text-black hover:bg-gold/90"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {isLoading ? 'Salvataggio...' : 'Salva'}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Abbonamento */}
            <Card className="hover:shadow-lg transition-shadow bg-black text-white border-2 border-gold">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                    <span className="text-black text-xs font-bold">PP</span>
                  </div>
                  <h2 className="text-xl font-bold">Performance Prime</h2>
                </div>
                {userData.isSubscribed ? (
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      Il tuo abbonamento è <span className="text-gold font-bold">attivo</span>
                    </p>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm text-gray-400 mb-1">Vantaggi attivi:</p>
                      <ul className="space-y-1 text-sm">
                        <li>✓ Sconto 10% su servizi Partner</li>
                        <li>✓ Accesso prioritario</li>
                        <li>✓ Supporto dedicato</li>
                      </ul>
                    </div>
                    <Button className="w-full bg-gold text-black hover:bg-gold/90" size="sm">
                      Gestisci Abbonamento
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      Scopri i vantaggi di Performance Prime
                    </p>
                    <Button className="w-full bg-gold text-black hover:bg-gold/90 font-semibold">
                      Abbonati Ora
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preferiti */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-gold" />
                  <h2 className="text-xl font-bold">Preferiti</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Hai salvato {favoritesCount} professionist{favoritesCount === 1 ? 'a' : 'i'} nei preferiti
                </p>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="sm"
                  onClick={() => navigate('/preferiti')}
                >
                  Vedi Preferiti
                </Button>
              </CardContent>
            </Card>

            {/* Prenotazioni */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <CalendarIcon className="w-6 h-6 text-gold" />
                  <h2 className="text-xl font-bold">Prenotazioni</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Gestisci le tue sessioni e appuntamenti
                </p>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="sm"
                  onClick={() => navigate('/prenotazioni')}
                >
                  Vedi Prenotazioni
                </Button>
              </CardContent>
            </Card>

          </div>

          {/* Logout */}
          <div className="mt-8 text-center">
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </section>

      {/* Photo Uploader Modal */}
      <PhotoUploader
        isOpen={showPhotoUploader}
        onClose={() => setShowPhotoUploader(false)}
        onPhotoSelect={handlePhotoSelect}
      />

      {/* Photo Cropper Modal */}
      <PhotoCropper
        isOpen={showPhotoCropper}
        onClose={() => setShowPhotoCropper(false)}
        imageUrl={selectedImageUrl}
        onCrop={handlePhotoCrop}
      />

    </div>
  );
};

export default Profilo;


