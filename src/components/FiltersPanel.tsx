import { Filter, MapPin, Euro, Star, Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { SearchFilters, categoryLabels } from '@/types/professional';

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
      priceRange: [30, 150],
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
            onValueChange={(value) => onChange({ category: value as any })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tutte le categorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tutte le categorie</SelectItem>
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

        {/* Online Availability */}
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2">
            <Wifi className="w-4 h-4" />
            Disponibile Online
          </Label>
          <Switch
            checked={filters.availableOnline}
            onCheckedChange={(checked) => onChange({ availableOnline: checked })}
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
              value={filters.priceRange}
              onValueChange={(value) => onChange({ priceRange: value as [number, number] })}
              max={150}
              min={30}
              step={5}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>€{filters.priceRange[0]}</span>
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

        {/* Rating Filter */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Valutazione Minima
          </Label>
          <div className="px-2">
            <Slider
              value={[filters.minRating]}
              onValueChange={(value) => onChange({ minRating: value[0] })}
              max={5}
              min={0}
              step={0.5}
              className="w-full"
            />
          </div>
          <div className="text-sm text-muted-foreground text-center">
            {filters.minRating === 0 ? 'Tutte' : `${filters.minRating}+ stelle`}
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