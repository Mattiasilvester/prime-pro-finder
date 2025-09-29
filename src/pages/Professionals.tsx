import { useState, useMemo } from 'react';
import { mockProfessionals } from '@/data/professionals';
import { SearchFilters, Professional } from '@/types/professional';
import { ProfessionalCard } from '@/components/ProfessionalCard';
import { SearchBar } from '@/components/SearchBar';
import { FiltersPanel } from '@/components/FiltersPanel';
import { Pagination } from '@/components/Pagination';
import { EmptyState } from '@/components/EmptyState';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const ITEMS_PER_PAGE = 12;

const Professionals = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    city: '',
    availableOnline: false,
    priceRange: [30, 150],
    maxDistance: 50,
    minRating: 0,
    nearMe: false
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading] = useState(false);

  const filteredProfessionals = useMemo(() => {
    let filtered = [...mockProfessionals];

    // Text search
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(prof => 
        prof.name.toLowerCase().includes(query) ||
        prof.bio.toLowerCase().includes(query) ||
        prof.city.toLowerCase().includes(query) ||
        prof.specializations.some(spec => spec.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(prof => prof.category === filters.category);
    }

    // City filter
    if (filters.city) {
      filtered = filtered.filter(prof => 
        prof.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    // Online availability
    if (filters.availableOnline) {
      filtered = filtered.filter(prof => prof.availableOnline);
    }

    // Price range
    filtered = filtered.filter(prof => 
      prof.startingPrice >= filters.priceRange[0] && 
      prof.startingPrice <= filters.priceRange[1]
    );

    // Rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter(prof => prof.rating >= filters.minRating);
    }

    // Sort: Partners first, then by rating
    filtered.sort((a, b) => {
      if (a.isPartner && !b.isPartner) return -1;
      if (!a.isPartner && b.isPartner) return 1;
      return b.rating - a.rating;
    });

    return filtered;
  }, [filters]);

  const paginatedProfessionals = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProfessionals.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProfessionals, currentPage]);

  const totalPages = Math.ceil(filteredProfessionals.length / ITEMS_PER_PAGE);

  const handleFiltersChange = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero */}
      <header className="bg-gradient-hero border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl font-bold mb-4">
              Trova il Tuo Professionista del Benessere
            </h1>
            <p className="text-xl opacity-90 mb-8">
              I migliori personal trainer, nutrizionisti, fisioterapisti e mental coach d'Italia
            </p>
            <SearchBar 
              value={filters.query}
              onChange={(query) => handleFiltersChange({ query })}
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Professionisti', href: '/professionisti' }
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          {/* Filters Sidebar */}
          <aside className="lg:w-80">
            <FiltersPanel 
              filters={filters}
              onChange={handleFiltersChange}
              totalResults={filteredProfessionals.length}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                {filteredProfessionals.length} Professionisti Trovati
              </h2>
              <p className="text-muted-foreground">
                Pagina {currentPage} di {totalPages}
              </p>
            </div>

            {/* Loading State */}
            {isLoading && <LoadingSkeleton />}

            {/* Empty State */}
            {!isLoading && filteredProfessionals.length === 0 && <EmptyState />}

            {/* Results Grid */}
            {!isLoading && filteredProfessionals.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {paginatedProfessionals.map((professional) => (
                    <ProfessionalCard 
                      key={professional.id} 
                      professional={professional} 
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Professionals;