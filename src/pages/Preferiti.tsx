import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Star, Clock, Euro, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getPortalFavorites, removeFromPortalFavorites } from '@/lib/supabase-portal';
import { toast } from 'sonner';
import type { Professional } from '@/types/professional';
import type { PortalFavoriteWithProfessional } from '@/types/portal';

const Preferiti = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<PortalFavoriteWithProfessional[]>([]);
  const [professionals, setProfessionals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadFavorites();
  }, [user]);

  // Listen for favorite changes from other components
  useEffect(() => {
    const handleFavoriteRemoved = (event: CustomEvent) => {
      const { professionalId } = event.detail;
      console.log('🗑️ Favorite removed event received:', professionalId);
      
      // Remove from local state immediately
      setFavorites(prev => prev.filter(fav => fav.professional_id !== professionalId));
      setProfessionals(prev => prev.filter(prof => prof.id !== professionalId));
    };

    const handleFavoriteAdded = (event: CustomEvent) => {
      const { professional } = event.detail;
      console.log('➕ Favorite added event received:', professional);
      
      // Add to local state immediately
      const newFavorite = {
        id: `temp-${Date.now()}`,
        user_id: user?.id || '',
        professional_id: professional.id,
        created_at: new Date().toISOString(),
        professional: professional
      };
      
      setFavorites(prev => [...prev, newFavorite]);
      setProfessionals(prev => [...prev, professional]);
    };

    // Add event listeners
    window.addEventListener('favoriteRemoved', handleFavoriteRemoved as EventListener);
    window.addEventListener('favoriteAdded', handleFavoriteAdded as EventListener);

    // Cleanup
    return () => {
      window.removeEventListener('favoriteRemoved', handleFavoriteRemoved as EventListener);
      window.removeEventListener('favoriteAdded', handleFavoriteAdded as EventListener);
    };
  }, [user?.id]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOpen) {
        const target = event.target as Element;
        if (!target.closest('.dropdown-container')) {
          setDropdownOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const loadFavorites = async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      const { data, error } = await getPortalFavorites(user.id);

      if (error) {
        console.error('Errore caricamento preferiti:', error);
        return;
      }

      if (data) {
        setFavorites(data);
        // Estrai i professionisti dai preferiti
        const profs = data.map(fav => fav.professional).filter(Boolean);
        setProfessionals(profs);
      }
    } catch (error) {
      console.error('Errore caricamento preferiti:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFavorite = async (professionalId: string) => {
    if (!user?.id) return;

    setRemovingId(professionalId);

    try {
      const { error } = await removeFromPortalFavorites(user.id, professionalId);
      if (error) {
        console.error('❌ Errore rimozione preferito:', error);
        toast.error(`Errore nel rimuovere dai preferiti: ${error.message}`);
        return;
      }

      // Remove from local state immediately
      setFavorites(prev => prev.filter(fav => fav.professional_id !== professionalId));
      setProfessionals(prev => prev.filter(prof => prof.id !== professionalId));
      
      toast.success('Rimosso dai preferiti');
      
      // Emit custom event per aggiornare altre componenti
      window.dispatchEvent(new CustomEvent('favoriteRemoved', {
        detail: { professionalId }
      }));
    } catch (error) {
      console.error('💥 Errore rimozione preferito:', error);
      toast.error('Errore durante l\'operazione');
    } finally {
      setRemovingId(null);
    }
  };

  const categories = [
    { id: 'all', label: 'Tutti', count: professionals.length },
    { id: 'personal_trainer', label: 'Personal Trainer', count: professionals.filter(p => p.category === 'personal_trainer').length },
    { id: 'nutritionist', label: 'Nutrizionisti', count: professionals.filter(p => p.category === 'nutritionist').length },
    { id: 'physiotherapist', label: 'Fisioterapisti', count: professionals.filter(p => p.category === 'physiotherapist').length },
    { id: 'mental_coach', label: 'Mental Coach', count: professionals.filter(p => p.category === 'mental_coach').length },
  ];

  const filteredProfessionals = selectedCategory === 'all' 
    ? professionals 
    : professionals.filter(p => p.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'personal_trainer': return 'bg-blue-100 text-blue-800';
      case 'nutritionist': return 'bg-green-100 text-green-800';
      case 'physiotherapist': return 'bg-purple-100 text-purple-800';
      case 'mental_coach': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFilterButtonStyle = (categoryId: string, isSelected: boolean) => {
    if (isSelected) {
      // Stato selezionato - sempre oro
      return 'bg-gold text-black hover:bg-gold/90';
    }

    // Stato non selezionato - colori per categoria
    switch (categoryId) {
      case 'personal_trainer':
        return 'border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400';
      case 'nutritionist':
        return 'border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400';
      case 'physiotherapist':
        return 'border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400';
      case 'mental_coach':
        return 'border-orange-300 text-orange-700 hover:bg-orange-50 hover:border-orange-400';
      default:
        return 'border-gold text-gold hover:bg-gold hover:text-black';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'personal_trainer': return '💪';
      case 'nutritionist': return '🥗';
      case 'physiotherapist': return '🏥';
      case 'mental_coach': return '🧠';
      default: return '👤';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Caricamento preferiti...</p>
            </div>
          </div>
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
          <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-bold mb-2">
            I tuoi <span className="text-gold">Preferiti</span>
          </h1>
          <p className="text-xl opacity-90">
            {professionals.length} professionisti salvati
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          
          {/* Categories Filter */}
          <div className="mb-8">
            {/* Desktop: Mostra tutti i filtri */}
            <div className="hidden md:flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={getFilterButtonStyle(category.id, selectedCategory === category.id)}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {getCategoryIcon(category.id)} {category.label} ({category.count})
                </Button>
              ))}
            </div>

            {/* Mobile: Dropdown menu */}
            <div className="md:hidden relative dropdown-container">
              <Button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`w-full justify-between ${getFilterButtonStyle(selectedCategory, true)}`}
                variant="default"
              >
                <span>
                  {getCategoryIcon(selectedCategory)} {categories.find(c => c.id === selectedCategory)?.label} ({categories.find(c => c.id === selectedCategory)?.count})
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </Button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${getFilterButtonStyle(category.id, selectedCategory === category.id)}`}
                    >
                      {getCategoryIcon(category.id)} {category.label} ({category.count})
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          {filteredProfessionals.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {selectedCategory === 'all' ? 'Nessun preferito' : `Nessun ${categories.find(c => c.id === selectedCategory)?.label.toLowerCase()} nei preferiti`}
              </h3>
              <p className="text-gray-500 mb-6">
                {selectedCategory === 'all' 
                  ? 'Inizia a salvare i professionisti che ti interessano'
                  : 'Salva alcuni professionisti di questa categoria'
                }
              </p>
              <Button 
                className="bg-gold text-black hover:bg-gold/90"
                onClick={() => window.location.href = '/professionisti'}
              >
                Esplora Professionisti
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfessionals.map((professional) => (
                <Card key={professional.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    {/* Header with image and category */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        {professional.photo_url ? (
                          <img 
                            src={professional.photo_url} 
                            alt={professional.full_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gold flex items-center justify-center">
                            <span className="text-black text-xl font-bold">
                              {professional.full_name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getCategoryColor(professional.category)}>
                            {getCategoryIcon(professional.category)} {professional.category.replace('_', ' ')}
                          </Badge>
                          {professional.is_partner && (
                            <Badge className="bg-black text-gold border-gold">
                              Partner PP
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="font-bold text-lg text-gray-900 truncate">
                          {professional.full_name}
                        </h3>
                        
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {professional.headline}
                        </p>
                      </div>
                    </div>

                    {/* Location and rating */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{professional.city}</span>
                      </div>
                      
                      {professional.rating_avg && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{professional.rating_avg.toFixed(1)} ({professional.rating_count || 0})</span>
                        </div>
                      )}
                    </div>

                    {/* Services */}
                    {professional.services && professional.services.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-1">Servizi:</p>
                        <div className="flex flex-wrap gap-1">
                          {professional.services.slice(0, 2).map((service: any, index: number) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {typeof service === 'string' ? service : service.name || service}
                            </span>
                          ))}
                          {professional.services.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{professional.services.length - 2} altri
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Price and actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-gold font-semibold">
                        <Euro className="w-4 h-4" />
                        <span>da {professional.starting_price}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black">
                          Visualizza
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => handleRemoveFavorite(professional.id)}
                          disabled={removingId === professional.id}
                        >
                          <Heart className="w-4 h-4 fill-current" />
                          {removingId === professional.id && (
                            <span className="ml-2 text-xs">...</span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Preferiti;
