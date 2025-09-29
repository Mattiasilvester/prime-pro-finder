import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/SearchBar';
import { CategorySection } from '@/components/CategorySection';
import { PromoBanner } from '@/components/PromoBanner';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useState } from 'react';
import { mockProfessionals } from '@/data/professionals';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/professionisti?q=${encodeURIComponent(searchQuery)}`;
    } else {
      window.location.href = '/professionisti';
    }
  };

  // Organize professionals by category
  const partners = mockProfessionals.filter(p => p.isPartner);
  const personalTrainers = mockProfessionals.filter(p => p.category === 'personal_trainer');
  const nutritionists = mockProfessionals.filter(p => p.category === 'nutritionist');
  const physiotherapists = mockProfessionals.filter(p => p.category === 'physiotherapist');
  const mentalCoaches = mockProfessionals.filter(p => p.category === 'mental_coach');

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

      {/* Partners Section */}
      <CategorySection
        title="Partner Ufficiali Performance Prime"
        emoji="⭐"
        professionals={partners}
        isPartnerSection={true}
      />

      {/* Personal Trainers Section */}
      <CategorySection
        title="Personal Trainer"
        emoji="💪"
        professionals={personalTrainers}
        categorySlug="personal_trainer"
        totalCount={personalTrainers.length}
      />

      {/* Promo Banner */}
      <PromoBanner />

      {/* Nutritionists Section */}
      <CategorySection
        title="Nutrizionisti"
        emoji="🥗"
        professionals={nutritionists}
        categorySlug="nutritionist"
        totalCount={nutritionists.length}
      />

      {/* Physiotherapists Section */}
      <CategorySection
        title="Fisioterapisti"
        emoji="🏥"
        professionals={physiotherapists}
        categorySlug="physiotherapist"
        totalCount={physiotherapists.length}
      />

      {/* Mental Coaches Section */}
      <CategorySection
        title="Mental Coach"
        emoji="🧠"
        professionals={mentalCoaches}
        categorySlug="mental_coach"
        totalCount={mentalCoaches.length}
      />

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

export default Index;
