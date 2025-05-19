
import { useState, useEffect } from "react";
import RestaurantCard from "@/components/RestaurantCard";
import { Restaurant } from "@/data/restaurantsData";

interface RestaurantListProps {
  restaurants: Restaurant[];
}

const RestaurantList = ({ restaurants }: RestaurantListProps) => {
  const [visibleRestaurants, setVisibleRestaurants] = useState<Restaurant[]>([]);
  
  // Effet d'affichage progressif des restaurants
  useEffect(() => {
    setVisibleRestaurants([]);
    
    const showRestaurants = async () => {
      for (let i = 0; i < restaurants.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setVisibleRestaurants(prev => [...prev, restaurants[i]]);
      }
    };
    
    showRestaurants();
  }, [restaurants]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {visibleRestaurants.map((restaurant, index) => (
        <div 
          key={restaurant.id} 
          className="animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <RestaurantCard {...restaurant} />
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
