
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { restaurants, cuisines } from "@/data/restaurantsData";
import FiltersPanel from "@/components/restaurants/FiltersPanel";
import MobileFilters from "@/components/restaurants/MobileFilters";
import SearchBar from "@/components/restaurants/SearchBar";
import RestaurantList from "@/components/restaurants/RestaurantList";
import { toast } from "sonner";

const RestaurantsPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [deliveryTimeMax, setDeliveryTimeMax] = useState(60);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  // Fonction pour filtrer les restaurants en fonction des critères
  const filterRestaurants = () => {
    const filtered = restaurants.filter((restaurant) => {
      // Filtre par terme de recherche
      if (searchTerm && !restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !restaurant.cuisineType.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Filtre par type de cuisine
      if (selectedCuisines.length > 0) {
        const restaurantCuisines = restaurant.cuisineType.split('•').map(c => c.trim());
        if (!selectedCuisines.some(cuisine => 
          restaurantCuisines.some(rc => rc.toLowerCase().includes(cuisine.toLowerCase())))) {
          return false;
        }
      }

      // Filtre par temps de livraison
      const deliveryTime = restaurant.deliveryTime;
      const maxMinutes = parseInt(deliveryTime.split('-')[1]);
      if (maxMinutes > deliveryTimeMax) {
        return false;
      }

      // Filtre par prix (simplifiée)
      // Dans une application réelle, nous aurions un vrai attribut de prix
      const deliveryFee = parseFloat(restaurant.deliveryFee.replace('€', '.').replace(',', '.'));
      if (deliveryFee < priceRange[0] || deliveryFee > priceRange[1]) {
        return false;
      }

      return true;
    });

    setFilteredRestaurants(filtered);

    // Notification quand les filtres sont appliqués
    if (searchTerm || selectedCuisines.length > 0 || deliveryTimeMax < 60 || priceRange[0] > 0 || priceRange[1] < 20) {
      toast(`${filtered.length} restaurants trouvés`, {
        description: "Les filtres ont été appliqués avec succès."
      });
    }
  };

  // Mise à jour des résultats lors du changement de filtres
  useEffect(() => {
    filterRestaurants();
  }, [searchTerm, selectedCuisines, deliveryTimeMax, priceRange]);

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const resetFilters = () => {
    setPriceRange([0, 20]);
    setDeliveryTimeMax(60);
    setSelectedCuisines([]);
    setSearchTerm("");
    toast("Filtres réinitialisés", {
      description: "Tous les restaurants sont affichés."
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-20">
              <FiltersPanel
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                deliveryTimeMax={deliveryTimeMax}
                setDeliveryTimeMax={setDeliveryTimeMax}
                selectedCuisines={selectedCuisines}
                toggleCuisine={toggleCuisine}
                cuisines={cuisines}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h1 className="text-2xl font-bold">Restaurants</h1>
              
              <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onFilterToggle={() => setIsFilterOpen(true)}
              />
            </div>

            {/* Indication des filtres actifs */}
            {(selectedCuisines.length > 0 || deliveryTimeMax < 60 || priceRange[0] > 0 || priceRange[1] < 20) && (
              <div className="bg-muted p-2 rounded-md mb-4 flex justify-between items-center">
                <div className="text-sm">
                  <span className="font-medium">Filtres actifs: </span>
                  {selectedCuisines.length > 0 && (
                    <span className="mr-2">Cuisines ({selectedCuisines.length})</span>
                  )}
                  {deliveryTimeMax < 60 && (
                    <span className="mr-2">Max {deliveryTimeMax} min</span>
                  )}
                  {(priceRange[0] > 0 || priceRange[1] < 20) && (
                    <span>Prix: {priceRange[0]}€ - {priceRange[1]}€</span>
                  )}
                </div>
                <button 
                  onClick={resetFilters}
                  className="text-sm text-goodfood-500 hover:text-goodfood-600"
                >
                  Réinitialiser
                </button>
              </div>
            )}

            {filteredRestaurants.length > 0 ? (
              <RestaurantList restaurants={filteredRestaurants} />
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">Aucun restaurant trouvé</h3>
                <p className="text-muted-foreground mb-4">
                  Essayez d'ajuster vos critères de recherche ou de filtrage.
                </p>
                <button
                  onClick={resetFilters}
                  className="text-goodfood-500 hover:text-goodfood-600"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filters */}
      <MobileFilters
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        deliveryTimeMax={deliveryTimeMax}
        setDeliveryTimeMax={setDeliveryTimeMax}
        selectedCuisines={selectedCuisines}
        toggleCuisine={toggleCuisine}
        cuisines={cuisines}
        onReset={resetFilters}
      />

      <Footer />
    </div>
  );
};

export default RestaurantsPage;
