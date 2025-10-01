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
import { mockProfessionals } from '@/data/professionals';
import type { Professional } from '@/types/professional';

const IndexSupabase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const professionals = mockProfessionals;

  useEffect(() => {
    window.scrollTo(0, 0);
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

  console.log('Partners:', partners);
  console.log('Personal trainers:', personalTrainers);
  console.log('Total professionals:', professionals.length);

  const categories = [
    { name: 'Personal Trainer', slug: 'personal_trainer' },
    { name: 'Nutrizionisti', slug: 'nutritionist' },
    { name: 'Fisioterapisti', slug: 'physiotherapist' },
    { name: 'Mental Coach', slug: 'mental_coach' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in leading-tight md:leading-tight">
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
              className="bg-gold text-black hover:bg-gold/90 font-semibold text-lg mb-8 animate-scale-in"
              onClick={handleSearch}
            >
              <span className="flex items-center gap-2 w-full justify-center">
                <Search className="w-5 h-5" />
                Cerca Professionisti
              </span>
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
                    className="text-sm px-6 py-2.5 bg-white/10 hover:bg-white/20 border-white/20 text-white cursor-pointer transition-all w-[170px] text-center inline-flex items-center justify-center"
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
          <div className="container mx-auto">
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


      {/* Final CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto text-center">
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

