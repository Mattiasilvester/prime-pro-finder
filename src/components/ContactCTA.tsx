import { Phone, MessageCircle, Calendar, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Professional } from '@/types/professional';
import { cn } from '@/lib/utils';

interface ContactCTAProps {
  professional: Professional;
}

export const ContactCTA = ({ professional }: ContactCTAProps) => {
  const whatsappMessage = encodeURIComponent(
    `Ciao ${professional.name}, ho visto il tuo profilo su Performance Prime e vorrei informazioni sui tuoi servizi.`
  );
  
  const whatsappUrl = `https://wa.me/${professional.contact.phone.replace(/\D/g, '')}?text=${whatsappMessage}`;

  return (
    <div className="space-y-4">
      {/* Main CTA Card */}
      <Card className={cn(
        "sticky top-4",
        professional.isPartner && "border-partner-border shadow-partner"
      )}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Prenota una Consulenza
          </CardTitle>
          {professional.isPartner && (
            <div className="text-sm text-gold font-medium">
              Sconto 10% per abbonati PP
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {professional.priceRange}
            </div>
            <div className="text-sm text-muted-foreground">
              per sessione
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              className="w-full h-12 text-base font-medium"
              onClick={() => window.open(whatsappUrl, '_blank')}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contatta via WhatsApp
            </Button>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.open(`tel:${professional.contact.phone}`, '_self')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Chiama ora
            </Button>
          </div>

          <div className="pt-4 border-t text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{professional.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({professional.reviewCount} recensioni)
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Risposta rapida garantita
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Info Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Esperienza:</span>
              <span className="font-medium">{professional.experience}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Disponibile online:</span>
              <span className={cn(
                "font-medium",
                professional.availableOnline ? "text-green-600" : "text-red-600"
              )}>
                {professional.availableOnline ? "Sì" : "No"}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Città:</span>
              <span className="font-medium">{professional.city}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t z-50">
        <Button 
          className="w-full h-12 text-base font-medium"
          onClick={() => window.open(whatsappUrl, '_blank')}
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Prenota Consulenza
        </Button>
      </div>
    </div>
  );
};