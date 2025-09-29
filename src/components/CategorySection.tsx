import { Professional } from '@/types/professional';
import { ProfessionalCard } from './ProfessionalCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  title: string;
  emoji?: string;
  professionals: Professional[];
  categorySlug?: string;
  isPartnerSection?: boolean;
  totalCount?: number;
}

export const CategorySection = ({
  title,
  emoji,
  professionals,
  categorySlug,
  isPartnerSection = false,
  totalCount,
}: CategorySectionProps) => {
  if (professionals.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">
            {emoji && <span className="mr-2">{emoji}</span>}
            {title}
          </h2>
          {categorySlug && totalCount && totalCount > 6 && (
            <Button variant="outline" asChild>
              <Link to={`/professionisti/${categorySlug}`}>
                Vedi tutti ({totalCount})
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>

        {/* Cards Grid or Horizontal Scroll */}
        {isPartnerSection ? (
          <div className="flex overflow-x-auto gap-6 pb-4 -mx-4 px-4 scrollbar-hide">
            {professionals.map((professional) => (
              <div key={professional.id} className="flex-shrink-0 w-[340px]">
                <ProfessionalCard professional={professional} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionals.slice(0, 6).map((professional) => (
              <ProfessionalCard key={professional.id} professional={professional} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
