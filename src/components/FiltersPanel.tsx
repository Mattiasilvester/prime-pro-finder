import { Filter, MapPin, Euro, Star, Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { SearchFilters, categoryLabels, ProfessionalCategory } from '@/types/professional';

interface FiltersPanelProps {
  filters: SearchFilters;
  onChange: (filters: Partial<SearchFilters>) => void;
  totalResults: number;
}

export const FiltersPanel = ({ filters, onChange, totalResults }: FiltersPanelProps) => {
  const handleClearFilters = () => {
    onChange({
      query: '',
      category: '',
      city: '',
      availableOnline: false,
      priceRange: [30, 30],
      maxDistance: 50,
      minRating: 0,
      nearMe: false
    });
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filtri
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {totalResults} risultati trovati
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div className="space-y-2">
          <Label>Categoria</Label>
          <Select
            value={filters.category}
            onValueChange={(value) => onChange({ category: value as ProfessionalCategory })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tutte le categorie" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* City Filter */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Città
          </Label>
          <Input
            placeholder="Es. Milano, Roma..."
            value={filters.city}
            onChange={(e) => onChange({ city: e.target.value })}
          />
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Euro className="w-4 h-4" />
            Range di Prezzo
          </Label>
          <div className="px-2">
            <Slider
              value={[filters.priceRange[1]]}
              onValueChange={(value) => onChange({ priceRange: [30, value[0]] as [number, number] })}
              max={150}
              min={30}
              step={5}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>€30</span>
            <span>€{filters.priceRange[1]}</span>
          </div>
        </div>

        {/* Distance */}
        <div className="space-y-3">
          <Label>Distanza Massima</Label>
          <div className="px-2">
            <Slider
              value={[filters.maxDistance]}
              onValueChange={(value) => onChange({ maxDistance: value[0] })}
              max={50}
              min={5}
              step={5}
              className="w-full"
            />
          </div>
          <div className="text-sm text-muted-foreground text-center">
            {filters.maxDistance} km
          </div>
        </div>

        {/* Near Me Button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => onChange({ nearMe: !filters.nearMe })}
        >
          <MapPin className="w-4 h-4 mr-2" />
          {filters.nearMe ? 'Disabilita "Vicino a me"' : 'Vicino a me'}
        </Button>

        {/* Clear Filters */}
        <Button variant="secondary" className="w-full" onClick={handleClearFilters}>
          Cancella Filtri
        </Button>
      </CardContent>
    </Card>
  );
};