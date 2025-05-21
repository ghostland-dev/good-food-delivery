
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, Truck, Info, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/cart/CartSidebar";
import { useCart } from "@/hooks/useCart";
import { v4 as uuidv4 } from "uuid";

// Importer les données du restaurant depuis notre fichier de données
import { restaurants } from "@/data/restaurantsData";

// Mock data pour le menu du restaurant
const restaurantMenuData = {
  categories: [
    {
      id: "populaires",
      name: "Les plus populaires",
      items: [
        {
          id: 1,
          name: "Classic Cheese",
          description: "Bœuf, cheddar, salade, tomate, oignon, sauce maison",
          price: 9.9,
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300",
        },
        {
          id: 2,
          name: "Double Bacon",
          description: "Double bœuf, double bacon, cheddar, oignons caramélisés",
          price: 12.9,
          image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=300",
        },
      ],
    },
    {
      id: "burgers",
      name: "Nos Burgers",
      items: [
        {
          id: 3,
          name: "Classic Cheese",
          description: "Bœuf, cheddar, salade, tomate, oignon, sauce maison",
          price: 9.9,
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300",
        },
        {
          id: 4,
          name: "Double Bacon",
          description: "Double bœuf, double bacon, cheddar, oignons caramélisés",
          price: 12.9,
          image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=300",
        },
        {
          id: 5,
          name: "Veggie Deluxe",
          description: "Steak végétal, avocat, roquette, tomate séchée, sauce yaourt",
          price: 10.9,
          image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=300",
        },
        {
          id: 6,
          name: "Spicy Chicken",
          description: "Poulet croustillant, sauce piquante, pickles, laitue",
          price: 11.5,
          image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=300",
        },
      ],
    },
    {
      id: "sides",
      name: "Accompagnements",
      items: [
        {
          id: 7,
          name: "Frites Maison",
          description: "Frites fraîches cuites deux fois",
          price: 3.9,
          image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=300",
        },
        {
          id: 8,
          name: "Onion Rings",
          description: "Rondelles d'oignon panées et croustillantes",
          price: 4.5,
          image: "https://images.unsplash.com/photo-1639024471283-03518883512d?q=80&w=300",
        },
      ],
    },
    {
      id: "drinks",
      name: "Boissons",
      items: [
        {
          id: 9,
          name: "Soda (33cl)",
          description: "Cola, limonade, orange",
          price: 2.5,
          image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?q=80&w=300",
        },
        {
          id: 10,
          name: "Craft Beer",
          description: "Bière artisanale locale (33cl)",
          price: 5.9,
          image: "https://images.unsplash.com/photo-1586993451228-09818021e309?q=80&w=300",
        },
      ],
    },
    {
      id: "desserts",
      name: "Desserts",
      items: [
        {
          id: 11,
          name: "Milkshake",
          description: "Vanille, chocolat ou fraise",
          price: 5.5,
          image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=300",
        },
        {
          id: 12,
          name: "Brownie",
          description: "Brownie au chocolat et noix de pécan",
          price: 4.9,
          image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?q=80&w=300",
        },
      ],
    },
  ],
};

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(restaurantMenuData.categories[0].id);
  const [restaurantData, setRestaurantData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  } = useCart();

  useEffect(() => {
    // Simuler un chargement des données
    const timer = setTimeout(() => {
      // Rechercher le restaurant dans notre tableau de données
      const restaurantId = parseInt(id || "1");
      const restaurant = restaurants.find(r => r.id === restaurantId) || restaurants[0];
      
      // Ajouter des champs supplémentaires pour cet exemple
      setRestaurantData({
        ...restaurant,
        ratingsCount: 324,
        description: "Les meilleurs burgers gourmets de la ville, préparés avec des ingrédients frais et locaux. Nos recettes originales sauront satisfaire tous les amateurs de burgers.",
        address: "23 Rue de la Paix, 75001 Paris",
        minimumOrder: 15,
        categories: restaurantMenuData.categories
      });
      
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

  const handleAddToCart = (item: any) => {
    if (restaurantData) {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        restaurantId: restaurantData.id,
        restaurantName: restaurantData.name
      });

      toast({
        title: "Ajouté au panier",
        description: "Article ajouté avec succès.",
      });
    }
  };

  const handleCheckout = () => {
    // Générer un ID de commande
    const orderId = uuidv4().substring(0, 8);
    
    // Créer un objet de commande
    const order = {
      id: orderId,
      restaurantName: restaurantData.name,
      restaurantId: restaurantData.id,
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      totalPrice: getCartTotal(),
      deliveryAddress: "24 Rue du Commerce, 75015 Paris", // Adresse par défaut pour cet exemple
      estimatedDeliveryTime: restaurantData.deliveryTime,
      status: "confirmed",
      date: new Date().toISOString()
    };
    
    // Sauvegarder la commande dans le localStorage
    const savedOrders = localStorage.getItem("goodfood_orders");
    const orders = savedOrders ? JSON.parse(savedOrders) : [];
    orders.push(order);
    localStorage.setItem("goodfood_orders", JSON.stringify(orders));
    
    // Vider le panier
    clearCart();
    
    // Rediriger vers la page de confirmation
    navigate(`/order-confirmation/${orderId}`);
  };

  if (loading || !restaurantData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse space-y-4 w-full max-w-md p-8">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-64 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative h-64 md:h-80">
          <img
            src={restaurantData.image}
            alt={restaurantData.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="container h-full flex items-end pb-6">
              <div className="text-white">
                <h1 className="text-3xl md:text-4xl font-bold">
                  {restaurantData.name}
                </h1>
                <div className="flex flex-wrap gap-4 mt-2 text-sm md:text-base">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>
                      {restaurantData.rating} ({restaurantData.ratingsCount})
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{restaurantData.deliveryTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 mr-1" />
                    <span>{restaurantData.deliveryFee}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-6">
          <div className="bg-white p-4 rounded-lg border mb-6">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-goodfood-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">{restaurantData.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Adresse: {restaurantData.address}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="overflow-x-auto pb-2">
                  <TabsList className="w-max mb-6">
                    {restaurantData.categories.map((category: any) => (
                      <TabsTrigger key={category.id} value={category.id}>
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {restaurantData.categories.map((category: any) => (
                  <TabsContent key={category.id} value={category.id}>
                    <div className="mb-6">
                      <h2 className="text-xl font-bold mb-4">{category.name}</h2>
                      <div className="space-y-4">
                        {category.items.map((item: any) => (
                          <div
                            key={item.id}
                            className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                          >
                            <div className="flex-1">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {item.description}
                              </p>
                              <div className="mt-2 flex justify-between items-center">
                                <span className="font-medium">
                                  {item.price.toFixed(2)} €
                                </span>
                                <Button
                                  size="sm"
                                  className="bg-goodfood-500 hover:bg-goodfood-600"
                                  onClick={() => handleAddToCart(item)}
                                >
                                  <Plus className="h-4 w-4 mr-1" />
                                  Ajouter
                                </Button>
                              </div>
                            </div>
                            <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            <div className="w-full md:w-80 flex-shrink-0">
              <div className="sticky top-20">
                <CartSidebar
                  cartItems={cart}
                  restaurantName={restaurantData.name}
                  minimumOrder={restaurantData.minimumOrder}
                  deliveryFee={restaurantData.deliveryFee}
                  onRemoveItem={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                  onCheckout={handleCheckout}
                  getTotal={getCartTotal}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantDetail;
