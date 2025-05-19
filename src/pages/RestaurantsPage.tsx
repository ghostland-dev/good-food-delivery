
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { restaurants, cuisines } from "@/data/restaurantsData";
import FiltersPanel from "@/components/restaurants/FiltersPanel";
import MobileFilters from "@/components/restaurants/MobileFilters";
import SearchBar from "@/components/restaurants/SearchBar";
import RestaurantList from "@/components/restaurants/RestaurantList";

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

  const resetFilters = () => {
    setPriceRange([0, 20]);
    setDeliveryTimeMax(60);
    setSelectedCuisines([]);
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

            <RestaurantList restaurants={filteredRestaurants} />
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
