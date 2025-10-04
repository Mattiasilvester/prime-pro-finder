import { Star, MapPin, Euro, Badge, Zap, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Professional, categoryLabels } from '@/types/professional';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { addToPortalFavorites, removeFromPortalFavorites, checkIsFavorite } from '@/lib/supabase-portal';
import { toast } from 'sonner';

interface ProfessionalCardProps {
  professional: Professional;
}

export const ProfessionalCard = ({ professional }: ProfessionalCardProps) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  // Check if professional is in favorites
  useEffect(() => {
    if (user?.id) {
      checkFavoriteStatus();
    }
  }, [user?.id, professional.id]);

  const checkFavoriteStatus = async () => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await checkIsFavorite(user.id, professional.id);
      if (!error && data) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Errore verifica preferito:', error);
    }
  };

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation();
    
    console.log('🔄 Toggle preferito:', {
      userId: user?.id,
      professionalId: professional.id,
      isFavorite,
      userAuthenticated: !!user
    });
    
    if (!user?.id) {
      toast.error('Devi essere loggato per salvare i preferiti');
      return;
    }

    if (!professional.id) {
      toast.error('ID professionista non valido');
      console.error('❌ Professional ID missing:', professional);
      return;
    }

    setIsLoading(true);

    try {
      if (isFavorite) {
        // Remove from favorites
        console.log('🗑️ Rimuovendo dai preferiti...');
        const { error } = await removeFromPortalFavorites(user.id, professional.id);
        if (error) {
          console.error('❌ Errore rimozione preferito:', error);
          toast.error(`Errore nel rimuovere dai preferiti: ${error.message}`);
          return;
        }
        setIsFavorite(false);
        toast.success('Rimosso dai preferiti');
        console.log('✅ Rimosso dai preferiti con successo');
      } else {
        // Add to favorites
        console.log('➕ Aggiungendo ai preferiti...');
        const { data, error } = await addToPortalFavorites(user.id, professional.id);
        if (error) {
          console.error('❌ Errore aggiunta preferito:', error);
          console.error('❌ Error details:', {
            message: error.message,
            code: (error as any).code,
            details: (error as any).details,
            hint: (error as any).hint
          });
          toast.error(`Errore nel salvare nei preferiti: ${error.message}`);
          return;
        }
        setIsFavorite(true);
        toast.success('Aggiunto ai preferiti');
        console.log('✅ Aggiunto ai preferiti con successo:', data);
      }
    } catch (error) {
      console.error('💥 Errore toggle preferito:', error);
      toast.error('Errore durante l\'operazione');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link to={profileUrl} className="block">
      <Card className={cn(
        "group overflow-hidden transition-all duration-300 animate-fade-in cursor-pointer",
        isPartner 
          ? "bg-black border-2 border-[#EEBA2B] shadow-[0_8px_30px_rgba(238,186,43,0.3)] hover:shadow-[0_12px_40px_rgba(238,186,43,0.4)]" 
          : "bg-white border-2 border-gray-200 shadow-md hover:scale-[1.02] hover:shadow-xl hover:border-gray-300"
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
            {/* Heart Button */}
            <div className="absolute top-3 right-3 z-10">
              <button
                onClick={handleFavoriteToggle}
                disabled={isLoading}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110",
                  isFavorite 
                    ? "bg-red-500 text-white" 
                    : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-500"
                )}
              >
                <Heart 
                  className={cn(
                    "w-4 h-4 transition-all duration-200",
                    isFavorite ? "fill-current" : ""
                  )}
                />
              </button>
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

          {/* Heart Button for non-partners */}
          {!isPartner && (
            <div className="absolute top-3 right-3 z-10">
              <button
                onClick={handleFavoriteToggle}
                disabled={isLoading}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110",
                  isFavorite 
                    ? "bg-red-500 text-white" 
                    : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-500"
                )}
              >
                <Heart 
                  className={cn(
                    "w-4 h-4 transition-all duration-200",
                    isFavorite ? "fill-current" : ""
                  )}
                />
              </button>
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
            <div className="flex flex-col">
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
              {/* Partner discount banner */}
              {isPartner && (
                <div className="mt-1">
                  <div className="bg-gold/20 text-gold px-2 py-1 rounded text-xs font-medium inline-block">
                    -10% Abbonati PP
                  </div>
                </div>
              )}
            </div>

            <Button 
              variant={isPartner ? "secondary" : "default"}
              size="sm"
              className={cn(
                "transition-all duration-200",
                isPartner 
                  ? "bg-gold text-black hover:bg-gold/90 font-medium" 
                  : "hover:scale-105"
              )}
            >
              Contatta
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
};