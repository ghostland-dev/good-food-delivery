
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RestaurantCard from "@/components/RestaurantCard";
import { restaurants } from "@/data/restaurantsData";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Catégories disponibles
const categories = [
  {
    id: 1,
    name: "Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300",
  },
  {
    id: 2,
    name: "Pizza",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=300",
  },
  {
    id: 3,
    name: "Sushi",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=300",
  },
  {
    id: 4,
    name: "Salades",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=300",
  },
  {
    id: 5,
    name: "Desserts",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=300",
  },
  {
    id: 6,
    name: "Italien",
    image: "https://images.unsplash.com/photo-1605888969139-42cde8761bc5?q=80&w=300",
  },
  {
    id: 7,
    name: "Mexicain",
    image: "https://images.unsplash.com/photo-1464219222984-216ebffaaf85?q=80&w=300",
  },
  {
    id: 8,
    name: "Asiatique",
    image: "https://images.unsplash.com/photo-1585032226650-91b92de64c39?q=80&w=300",
  },
];

const CategoriesPage = () => {
  const { id } = useParams<{ id: string }>();
  const [activeCategory, setActiveCategory] = useState<number>(id ? parseInt(id) : 1);

  // Filtrer les restaurants par catégorie active
  const getRestaurantsByCategory = (categoryId: number) => {
    // Logique simplifiée pour associer les catégories aux restaurants
    switch (categoryId) {
      case 1: // Burgers
        return restaurants.filter(r => r.cuisineType.toLowerCase().includes("burger") || 
                                      r.cuisineType.toLowerCase().includes("américain"));
      case 2: // Pizza
        return restaurants.filter(r => r.cuisineType.toLowerCase().includes("pizza") || 
                                      r.cuisineType.toLowerCase().includes("italien"));
      case 3: // Sushi
        return restaurants.filter(r => r.cuisineType.toLowerCase().includes("sushi") ||
                                      r.cuisineType.toLowerCase().includes("japonais"));
      case 4: // Salades
        return restaurants.filter(r => r.cuisineType.toLowerCase().includes("salade") || 
                                      r.cuisineType.toLowerCase().includes("vegan"));
      case 5: // Desserts
        return restaurants.filter(r => r.cuisineType.toLowerCase().includes("dessert"));
      case 6: // Italien
        return restaurants.filter(r => r.cuisineType.toLowerCase().includes("italien"));
      case 7: // Mexicain
        return restaurants.filter(r => r.cuisineType.toLowerCase().includes("mexicain"));
      case 8: // Asiatique
        return restaurants.filter(r => r.cuisineType.toLowerCase().includes("asiatique") ||
                                      r.cuisineType.toLowerCase().includes("chinois") || 
                                      r.cuisineType.toLowerCase().includes("japonais"));
      default:
        return restaurants;
    }
  };

  const filteredRestaurants = getRestaurantsByCategory(activeCategory);
  const activeCateg = categories.find(c => c.id === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        {/* En-tête de la catégorie */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Catégorie: {activeCateg?.name}</h1>
          <p className="text-muted-foreground">
            Découvrez nos meilleurs restaurants dans cette catégorie.
          </p>
        </div>

        {/* Navigation des catégories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Explorer les catégories</h2>
          <ScrollArea className="w-full">
            <div className="flex space-x-4 pb-4">
              {categories.map((category) => (
                <div 
                  key={category.id} 
                  className={`cursor-pointer relative inline-block w-[150px] flex-shrink-0 overflow-hidden rounded-xl transition-transform ${activeCategory === category.id ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <div className="aspect-square w-full overflow-hidden rounded-xl">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-0 w-full p-4">
                      <h3 className="font-medium text-white">{category.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Liste des restaurants */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Restaurants {activeCateg?.name} ({filteredRestaurants.length})
          </h2>
          
          {filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">
                Aucun restaurant trouvé dans cette catégorie.
              </p>
              <Link 
                to="/restaurants" 
                className="text-goodfood-500 hover:text-goodfood-600"
              >
                Voir tous les restaurants
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
