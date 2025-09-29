import { Star, MapPin, Euro, Badge, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Professional, categoryLabels } from '@/types/professional';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ProfessionalCardProps {
  professional: Professional;
}

export const ProfessionalCard = ({ professional }: ProfessionalCardProps) => {
  const {
    slug,
    name,
    category,
    city,
    bio,
    photo,
    isPartner,
    rating,
    reviewCount,
    startingPrice,
    availableOnline
  } = professional;

  const categoryLabel = categoryLabels[category];
  const profileUrl = `/professionisti/${category}/${encodeURIComponent(city)}/${slug}`;

  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-300 hover:shadow-hover animate-fade-in",
      isPartner 
        ? "bg-partner-bg border-partner-border shadow-partner" 
        : "bg-card hover:scale-[1.02]"
    )}>
      <CardContent className="p-0">
        {/* Partner Badge */}
        {isPartner && (
          <div className="relative">
            <div className="absolute top-3 left-3 z-10">
              <div className="bg-gradient-gold text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Badge className="w-3 h-3" />
                Partner Ufficiale PP
              </div>
            </div>
            <div className="absolute top-3 right-3 z-10">
              <div className="bg-gold/20 text-gold px-2 py-1 rounded text-xs font-medium">
                -10% Abbonati PP
              </div>
            </div>
          </div>
        )}

        {/* Photo */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={photo}
            alt={`${name} - ${categoryLabel}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Online Badge */}
          {availableOnline && (
            <div className="absolute bottom-3 left-3">
              <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Online
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={cn(
          "p-6",
          isPartner ? "text-white" : "text-foreground"
        )}>
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className={cn(
                "font-bold text-lg mb-1",
                isPartner ? "text-white" : "text-foreground"
              )}>
                {name}
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <span className={cn(
                  "font-medium",
                  isPartner ? "text-gold" : "text-primary"
                )}>
                  {categoryLabel}
                </span>
                <span className={cn(
                  isPartner ? "text-gray-300" : "text-muted-foreground"
                )}>
                  •
                </span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span className={cn(
                    isPartner ? "text-gray-300" : "text-muted-foreground"
                  )}>
                    {city}
                  </span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className={cn(
                "text-sm font-medium",
                isPartner ? "text-white" : "text-foreground"
              )}>
                {rating}
              </span>
              <span className={cn(
                "text-xs",
                isPartner ? "text-gray-300" : "text-muted-foreground"
              )}>
                ({reviewCount})
              </span>
            </div>
          </div>

          {/* Bio */}
          <p className={cn(
            "text-sm mb-4 line-clamp-2",
            isPartner ? "text-gray-300" : "text-muted-foreground"
          )}>
            {bio}
          </p>

          {/* Price & CTA */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Euro className="w-4 h-4" />
              <span className={cn(
                "font-bold",
                isPartner ? "text-gold" : "text-primary"
              )}>
                {startingPrice}
              </span>
              <span className={cn(
                "text-sm",
                isPartner ? "text-gray-300" : "text-muted-foreground"
              )}>
                /sessione
              </span>
            </div>

            <Button 
              asChild
              variant={isPartner ? "secondary" : "default"}
              size="sm"
              className={cn(
                "transition-all duration-200",
                isPartner 
                  ? "bg-gold text-black hover:bg-gold/90 font-medium" 
                  : "hover:scale-105"
              )}
            >
              <Link to={profileUrl}>
                Contatta
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};