
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import FiltersPanel from "./FiltersPanel";

interface MobileFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  deliveryTimeMax: number;
  setDeliveryTimeMax: (time: number) => void;
  selectedCuisines: string[];
  toggleCuisine: (cuisine: string) => void;
  cuisines: string[];
  onReset: () => void;
}

const MobileFilters = ({
  isOpen,
  onClose,
  priceRange,
  setPriceRange,
  deliveryTimeMax,
  setDeliveryTimeMax,
  selectedCuisines,
  toggleCuisine,
  cuisines,
  onReset,
}: MobileFiltersProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 bg-black/50 z-40">
      <div className="absolute right-0 top-0 h-full w-4/5 max-w-md bg-white p-4 overflow-y-auto animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-lg">Filtres</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <FiltersPanel
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          deliveryTimeMax={deliveryTimeMax}
          setDeliveryTimeMax={setDeliveryTimeMax}
          selectedCuisines={selectedCuisines}
          toggleCuisine={toggleCuisine}
          cuisines={cuisines}
        />

        <div className="mt-8 grid gap-4">
          <Button 
            className="bg-goodfood-500 hover:bg-goodfood-600"
            onClick={onClose}
          >
            Appliquer les filtres
          </Button>
          <Button
            variant="outline"
            onClick={onReset}
          >
            Réinitialiser
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilters;
