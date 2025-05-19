
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RestaurantCard from "@/components/RestaurantCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Search, SlidersHorizontal, X } from "lucide-react";

const restaurants = [
  {
    id: 1,
    name: "Le Burger Gourmand",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=500",
    cuisineType: "Burgers • Américain",
    rating: 4.8,
    deliveryTime: "20-30 min",
    deliveryFee: "2,99€",
    promoted: true,
  },
  {
    id: 2,
    name: "Pizzeria Napoli",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500",
    cuisineType: "Pizza • Italien",
    rating: 4.6,
    deliveryTime: "25-40 min",
    deliveryFee: "1,99€",
  },
  {
    id: 3,
    name: "Sushi Master",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=500",
    cuisineType: "Japonais • Sushi",
    rating: 4.9,
    deliveryTime: "30-45 min",
    deliveryFee: "3,99€",
  },
  {
    id: 4,
    name: "La Petite France",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500",
    cuisineType: "Français • Traditionnel",
    rating: 4.7,
    deliveryTime: "35-50 min",
    deliveryFee: "3,50€",
  },
  {
    id: 5,
    name: "Taj Mahal",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=500",
    cuisineType: "Indien • Épicé",
    rating: 4.5,
    deliveryTime: "30-45 min",
    deliveryFee: "2,99€",
  },
  {
    id: 6,
    name: "El Sombrero",
    image: "https://images.unsplash.com/photo-1464219222984-216ebffaaf85?q=80&w=500",
    cuisineType: "Mexicain • Tacos",
    rating: 4.4,
    deliveryTime: "25-40 min",
    deliveryFee: "2,50€",
  },
  {
    id: 7,
    name: "Dragon House",
    image: "https://images.unsplash.com/photo-1585032226650-91b92de64c39?q=80&w=500",
    cuisineType: "Chinois • Dim Sum",
    rating: 4.3,
    deliveryTime: "30-45 min",
    deliveryFee: "2,50€",
  },
  {
    id: 8,
    name: "Le Bistrot Parisien",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=500",
    cuisineType: "Français • Bistrot",
    rating: 4.7,
    deliveryTime: "35-50 min",
    deliveryFee: "3,50€",
  },
  {
    id: 9,
    name: "Fresh & Green",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=500",
    cuisineType: "Vegan • Salades",
    rating: 4.5,
    deliveryTime: "20-35 min",
    deliveryFee: "2,99€",
  },
];

const cuisines = [
  "Américain",
  "Italien",
  "Japonais",
  "Français",
  "Indien",
  "Mexicain",
  "Chinois",
  "Vegan",
];

const RestaurantsPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [deliveryTimeMax, setDeliveryTimeMax] = useState(60);

  const filteredRestaurants = restaurants; // Normally would filter based on state

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-20">
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
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h1 className="text-2xl font-bold">Restaurants</h1>

              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Rechercher un restaurant..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  className="md:hidden"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtres
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filters */}
      {isFilterOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40">
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-md bg-white p-4 overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg">Filtres</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

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
                        id={`mobile-cuisine-${cuisine}`}
                        checked={selectedCuisines.includes(cuisine)}
                        onCheckedChange={() => toggleCuisine(cuisine)}
                      />
                      <Label htmlFor={`mobile-cuisine-${cuisine}`}>{cuisine}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              <Button 
                className="bg-goodfood-500 hover:bg-goodfood-600"
                onClick={() => setIsFilterOpen(false)}
              >
                Appliquer les filtres
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setPriceRange([0, 20]);
                  setDeliveryTimeMax(60);
                  setSelectedCuisines([]);
                }}
              >
                Réinitialiser
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default RestaurantsPage;
