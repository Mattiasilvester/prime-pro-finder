import { Search, Star, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SearchBar } from '@/components/SearchBar';
import { useState } from 'react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/professionisti?q=${encodeURIComponent(searchQuery)}`;
    } else {
      window.location.href = '/professionisti';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Performance Prime
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-2xl mx-auto animate-slide-up">
              La piattaforma che connette atleti e appassionati di fitness 
              con i migliori professionisti del benessere in Italia
            </p>
            
            <div className="mb-8 animate-scale-in">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Cerca personal trainer, nutrizionisti, città..."
              />
            </div>

            <Button 
              size="lg" 
              className="bg-gold text-black hover:bg-gold/90 font-semibold px-8 py-3 text-lg animate-scale-in"
              onClick={handleSearch}
            >
              <Search className="w-5 h-5 mr-2" />
              Trova il Tuo Professionista
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">100+</div>
              <div className="text-muted-foreground">Professionisti Verificati</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">1000+</div>
              <div className="text-muted-foreground">Clienti Soddisfatti</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">4.8★</div>
              <div className="text-muted-foreground">Rating Medio</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Categorie Professionisti</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trova il professionista giusto per le tue esigenze di fitness e benessere
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                name: 'Personal Trainer', 
                slug: 'personal_trainer', 
                icon: Users, 
                count: '30+',
                description: 'Allenamenti personalizzati e obiettivi fitness'
              },
              { 
                name: 'Nutrizionisti', 
                slug: 'nutritionist', 
                icon: Award, 
                count: '20+',
                description: 'Piani alimentari e consulenze nutrizionali'
              },
              { 
                name: 'Fisioterapisti', 
                slug: 'physiotherapist', 
                icon: Star, 
                count: '15+',
                description: 'Riabilitazione e terapie manuali'
              },
              { 
                name: 'Mental Coach', 
                slug: 'mental_coach', 
                count: '10+',
                icon: Star,
                description: 'Supporto psicologico e motivazionale'
              }
            ].map((category) => (
              <Link
                key={category.slug}
                to={`/professionisti/${category.slug}`}
                className="bg-white rounded-lg p-6 shadow-card hover:shadow-hover transition-all duration-300 hover:scale-[1.02] group"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <category.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                  <div className="text-primary font-medium">{category.count} professionisti</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Inizia il Tuo Percorso di Benessere Oggi
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Connettiti con professionisti verificati e raggiungi i tuoi obiettivi di fitness e salute
          </p>
          <Button 
            asChild
            size="lg" 
            className="bg-gold text-black hover:bg-gold/90 font-semibold px-8 py-3 text-lg"
          >
            <Link to="/professionisti">
              Esplora Tutti i Professionisti
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
