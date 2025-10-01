import { useState, useMemo, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { mockProfessionals } from '@/data/professionals';
import { categoryLabels, ProfessionalCategory } from '@/types/professional';
import { ProfessionalCard } from '@/components/ProfessionalCard';
import { SearchBar } from '@/components/SearchBar';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Validate category
  if (!category || !categoryLabels[category as ProfessionalCategory]) {
    return <Navigate to="/professionisti" replace />;
  }

  const categoryKey = category as ProfessionalCategory;
  const categoryLabel = categoryLabels[categoryKey];

  const filteredProfessionals = useMemo(() => {
    let filtered = mockProfessionals.filter(prof => prof.category === categoryKey);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(prof => 
        prof.name.toLowerCase().includes(query) ||
        prof.bio.toLowerCase().includes(query) ||
        prof.city.toLowerCase().includes(query)
      );
    }

    // Sort: Partners first, then by rating
    filtered.sort((a, b) => {
      if (a.isPartner && !b.isPartner) return -1;
      if (!a.isPartner && b.isPartner) return 1;
      return b.rating - a.rating;
    });

    return filtered;
  }, [categoryKey, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <header className="bg-gradient-hero border-b">
        <div className="container mx-auto py-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl font-bold mb-4">
              {categoryLabel} Professionisti
            </h1>
            <p className="text-xl opacity-90 mb-8">
              I migliori {categoryLabel.toLowerCase()} d'Italia per il tuo benessere
            </p>
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={`Cerca ${categoryLabel.toLowerCase()}...`}
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8">
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Professionisti', href: '/professionisti' },
            { label: categoryLabel, href: `/professionisti/${category}` }
          ]}
        />

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-6">
            {filteredProfessionals.length} {categoryLabel} Trovati
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProfessionals.map((professional) => (
              <ProfessionalCard 
                key={professional.id} 
                professional={professional} 
              />
            ))}
          </div>

          {filteredProfessionals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Nessun {categoryLabel.toLowerCase()} trovato per questa ricerca.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;