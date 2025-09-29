import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const EmptyState = () => {
  return (
    <div className="text-center py-16">
      <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <SearchX className="w-12 h-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">
        Nessun professionista trovato
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Non abbiamo trovato professionisti che corrispondono ai tuoi criteri di ricerca. 
        Prova a modificare i filtri o la ricerca.
      </p>
      <Button variant="outline" onClick={() => window.location.reload()}>
        Resetta filtri
      </Button>
    </div>
  );
};