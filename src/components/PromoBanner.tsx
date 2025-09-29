import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export const PromoBanner = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-black via-primary to-gold/90">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-gold" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sei abbonato Performance Prime?
          </h2>
          <p className="text-xl opacity-90 mb-6">
            Ottieni il <span className="font-bold text-gold">10% di sconto</span> su tutti i Partner Ufficiali!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gold text-black hover:bg-gold/90 font-semibold">
              Diventa Abbonato
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Scopri i Vantaggi
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
