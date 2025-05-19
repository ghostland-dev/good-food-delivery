
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface FiltersPanelProps {
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  deliveryTimeMax: number;
  setDeliveryTimeMax: (time: number) => void;
  selectedCuisines: string[];
  toggleCuisine: (cuisine: string) => void;
  cuisines: string[];
}

const FiltersPanel = ({
  priceRange,
  setPriceRange,
  deliveryTimeMax,
  setDeliveryTimeMax,
  selectedCuisines,
  toggleCuisine,
  cuisines,
}: FiltersPanelProps) => {
  return (
    <div className="bg-white p-4 rounded-lg border">
      <h3 className="font-medium text-lg mb-4">Filtres</h3>

      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-3">Prix</h4>
          <Slider
            defaultValue={[0, 20]}
            max={20}
            step={1}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>{priceRange[0]}€</span>
            <span>{priceRange[1]}€</span>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-3">Temps de livraison</h4>
          <div className="mb-2 text-sm text-gray-500">
            Max: {deliveryTimeMax} min
          </div>
          <Slider
            defaultValue={[60]}
            max={90}
            step={5}
            value={[deliveryTimeMax]}
            onValueChange={(value) => setDeliveryTimeMax(value[0])}
          />
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-3">Cuisine</h4>
          <div className="space-y-2">
            {cuisines.map((cuisine) => (
              <div key={cuisine} className="flex items-center space-x-2">
                <Checkbox
                  id={`cuisine-${cuisine}`}
                  checked={selectedCuisines.includes(cuisine)}
                  onCheckedChange={() => toggleCuisine(cuisine)}
                />
                <Label htmlFor={`cuisine-${cuisine}`}>{cuisine}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersPanel;
