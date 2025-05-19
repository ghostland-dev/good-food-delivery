
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterToggle: () => void;
}

const SearchBar = ({ searchTerm, onSearchChange, onFilterToggle }: SearchBarProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Rechercher un restaurant..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button
        variant="outline"
        className="md:hidden"
        onClick={onFilterToggle}
      >
        <SlidersHorizontal className="h-4 w-4 mr-2" />
        Filtres
      </Button>
    </div>
  );
};

export default SearchBar;
