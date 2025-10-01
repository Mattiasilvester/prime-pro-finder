import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/SearchBar';
import { CategorySection } from '@/components/CategorySection';
import { PromoBanner } from '@/components/PromoBanner';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { transformProfessional } from '@/types/supabase-professional';
import type { Professional } from '@/types/professional';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';

const IndexSupabase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfessionals() {
      try {
        setLoading(true);
        
        const { data, error: fetchError } = await supabase
          .from('professionals')
          .select('*')
          .eq('active', true)
          .order('is_partner', { ascending: false })
          .order('rating_avg', { ascending: false });

        if (fetchError) {
          console.error('Errore fetch Supabase:', fetchError);
          setError(fetchError.message);
        } else {
          // Trasforma i dati dal formato DB al formato app
          const transformed = (data || []).map(transformProfessional);
          setProfessionals(transformed);
        }
      } catch (err) {
        console.error('Errore generico:', err);
        setError(err instanceof Error ? err.message : 'Errore sconosciuto');
      } finally {
        setLoading(false);
      }
    }

    fetchProfessionals();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/professionisti?q=${encodeURIComponent(searchQuery)}`;
    } else {
      window.location.href = '/professionisti';
    }
  };

  // Organize professionals by category
  const partners = professionals.filter(p => p.isPartner);
  const personalTrainers = professionals.filter(p => p.category === 'personal_trainer');
  const nutritionists = professionals.filter(p => p.category === 'nutritionist');
  const physiotherapists = professionals.filter(p => p.category === 'physiotherapist');
  const mentalCoaches = professionals.filter(p => p.category === 'mental_coach');

  const categories = [
    { name: 'Personal Trainer', slug: 'personal_trainer' },
    { name: 'Nutrizionisti', slug: 'nutritionist' },
    { name: 'Fisioterapisti', slug: 'physiotherapist' },
    { name: 'Mental Coach', slug: 'mental_coach' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Caricamento professionisti...</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-red-700 mb-4">
              Errore nel caricamento
            </h2>
            <p className="text-red-600 mb-6">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Riprova
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              I Migliori Professionisti del Fitness e Benessere
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 animate-slide-up">
              Scelti e verificati da Performance Prime
            </p>
            
            {/* Search Bar */}
            <div className="mb-8 animate-scale-in">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Cerca personal trainer, nutrizionisti, città..."
              />
            </div>

            <Button 
              size="lg" 
              className="bg-gold text-black hover:bg-gold/90 font-semibold px-8 py-3 text-lg mb-8 animate-scale-in"
              onClick={handleSearch}
            >
              <Search className="w-5 h-5 mr-2" />
              Cerca Professionisti
            </Button>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {categories.map((cat) => (
                <Link 
                  key={cat.slug}
                  to={`/professionisti/${cat.slug}`}
                >
                  <Badge 
                    variant="secondary"
                    className="text-sm px-4 py-2 bg-white/10 hover:bg-white/20 border-white/20 text-white cursor-pointer transition-all"
                  >
                    {cat.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      {professionals.length > 0 && (
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">{professionals.length}</div>
                <div className="text-sm text-muted-foreground">Professionisti</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold">{partners.length}</div>
                <div className="text-sm text-muted-foreground">Partner Ufficiali</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">
                  {professionals.filter(p => p.availableOnline).length}
                </div>
                <div className="text-sm text-muted-foreground">Disponibili Online</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Partners Section */}
      {partners.length > 0 && (
        <CategorySection
          title="Partner Ufficiali Performance Prime"
          emoji="⭐"
          professionals={partners.slice(0, 6)}
          isPartnerSection={true}
        />
      )}

      {/* Personal Trainers Section */}
      {personalTrainers.length > 0 && (
        <CategorySection
          title="Personal Trainer"
          emoji="💪"
          professionals={personalTrainers.slice(0, 6)}
          categorySlug="personal_trainer"
          totalCount={personalTrainers.length}
        />
      )}

      {/* Promo Banner */}
      <PromoBanner />

      {/* Nutritionists Section */}
      {nutritionists.length > 0 && (
        <CategorySection
          title="Nutrizionisti"
          emoji="🥗"
          professionals={nutritionists.slice(0, 6)}
          categorySlug="nutritionist"
          totalCount={nutritionists.length}
        />
      )}

      {/* Physiotherapists Section */}
      {physiotherapists.length > 0 && (
        <CategorySection
          title="Fisioterapisti"
          emoji="🏥"
          professionals={physiotherapists.slice(0, 6)}
          categorySlug="physiotherapist"
          totalCount={physiotherapists.length}
        />
      )}

      {/* Mental Coaches Section */}
      {mentalCoaches.length > 0 && (
        <CategorySection
          title="Mental Coach"
          emoji="🧠"
          professionals={mentalCoaches.slice(0, 6)}
          categorySlug="mental_coach"
          totalCount={mentalCoaches.length}
        />
      )}

      {/* Empty State */}
      {professionals.length === 0 && !loading && !error && (
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Nessun professionista trovato
            </h2>
            <p className="text-muted-foreground mb-8">
              Il database è vuoto. Aggiungi alcuni professionisti per iniziare.
            </p>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Non hai trovato quello che cercavi?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Esplora il nostro database completo con filtri avanzati per trovare il professionista perfetto per te
          </p>
          <Button 
            asChild
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-3 text-lg"
          >
            <Link to="/professionisti">
              Esplora Tutti i Professionisti
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndexSupabase;

