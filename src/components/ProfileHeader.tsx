import { Star, MapPin, Badge, Award, Clock, CheckCircle } from 'lucide-react';
import { Professional, categoryLabels } from '@/types/professional';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ProfileHeaderProps {
  professional: Professional;
}

export const ProfileHeader = ({ professional }: ProfileHeaderProps) => {
  const {
    name,
    category,
    city,
    photo,
    rating,
    reviewCount,
    isPartner,
    experience,
    certifications,
    availableOnline,
    priceRange
  } = professional;

  const categoryLabel = categoryLabels[category];

  return (
    <div className={cn(
      "rounded-lg p-8 border",
      isPartner 
        ? "bg-gradient-premium text-white border-partner-border" 
        : "bg-card"
    )}>
      {/* Partner Banner */}
      {isPartner && (
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-gold text-black px-4 py-2 rounded-full font-bold">
            <Badge className="w-5 h-5" />
            Partner Ufficiale Performance Prime
          </div>
          <p className="text-gold text-sm mt-2 font-medium">
            Sconto 10% per abbonati Performance Prime
          </p>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Profile Image */}
        <div className="relative">
          <Avatar className="w-32 h-32">
            <AvatarImage src={photo} alt={name} />
            <AvatarFallback className="text-2xl">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {isPartner && (
            <div className="absolute -top-2 -right-2 bg-gold text-black p-1 rounded-full">
              <Award className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <h1 className={cn(
            "text-3xl font-bold mb-2",
            isPartner ? "text-white" : "text-foreground"
          )}>
            {name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className={cn(
              "text-lg font-medium",
              isPartner ? "text-gold" : "text-primary"
            )}>
              {categoryLabel}
            </span>
            
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className={cn(
                isPartner ? "text-gray-300" : "text-muted-foreground"
              )}>
                {city}
              </span>
            </div>

            {availableOnline && (
              <div className="flex items-center gap-1 text-green-500">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Online</span>
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-5 h-5",
                      i < Math.floor(rating) 
                        ? "fill-yellow-400 text-yellow-400" 
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className={cn(
                "font-semibold text-lg",
                isPartner ? "text-white" : "text-foreground"
              )}>
                {rating}
              </span>
              <span className={cn(
                "text-sm",
                isPartner ? "text-gray-300" : "text-muted-foreground"
              )}>
                ({reviewCount} recensioni)
              </span>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className={cn(
                "text-sm",
                isPartner ? "text-gray-300" : "text-muted-foreground"
              )}>
                Esperienza: {experience}
              </span>
            </div>
            
            <div className={cn(
              "text-sm",
              isPartner ? "text-gray-300" : "text-muted-foreground"
            )}>
              <strong className={cn(
                isPartner ? "text-gold" : "text-primary"
              )}>
                {priceRange}
              </strong> per sessione
            </div>
          </div>

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="mt-4">
              <h3 className={cn(
                "font-medium mb-2",
                isPartner ? "text-white" : "text-foreground"
              )}>
                Certificazioni:
              </h3>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert, index) => (
                  <span
                    key={index}
                    className={cn(
                      "px-2 py-1 rounded text-xs font-medium",
                      isPartner 
                        ? "bg-gold/20 text-gold border border-gold/30" 
                        : "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};