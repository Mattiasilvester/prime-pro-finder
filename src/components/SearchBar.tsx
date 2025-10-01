import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Cerca professionisti, specializzazioni, città..." 
}: SearchBarProps) => {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 h-12 text-base text-black bg-white border-2 border-white/20 focus:border-gold focus:ring-gold"
      />
    </div>
  );
};