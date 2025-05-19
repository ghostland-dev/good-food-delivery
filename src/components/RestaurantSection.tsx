
import RestaurantCard from "./RestaurantCard";

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
];

const RestaurantSection = () => {
  return (
    <section className="py-10">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">Restaurants populaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} {...restaurant} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RestaurantSection;
