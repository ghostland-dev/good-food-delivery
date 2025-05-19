
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, Truck, Info, Plus, Minus, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data for restaurant
const restaurantData = {
  id: 1,
  name: "Le Burger Gourmand",
  image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1200",
  cuisineType: "Burgers • Américain",
  rating: 4.8,
  ratingsCount: 324,
  deliveryTime: "20-30 min",
  deliveryFee: "2,99€",
  promoted: true,
  description: "Les meilleurs burgers gourmets de la ville, préparés avec des ingrédients frais et locaux. Nos recettes originales sauront satisfaire tous les amateurs de burgers.",
  address: "23 Rue de la Paix, 75001 Paris",
  minimumOrder: 15,
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

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const RestaurantDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(restaurantData.categories[0].id);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (itemId: number, name: string, price: number) => {
    setCart((prev) => {
      const itemIndex = prev.findIndex((item) => item.id === itemId);
      if (itemIndex > -1) {
        const updatedCart = [...prev];
        updatedCart[itemIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prev, { id: itemId, name, price, quantity: 1 }];
      }
    });

    toast({
      title: "Ajouté au panier",
      description: "Article ajouté avec succès.",
    });
  };

  const decreaseQuantity = (itemId: number) => {
    setCart((prev) => {
      const itemIndex = prev.findIndex((item) => item.id === itemId);
      if (itemIndex > -1) {
        const updatedCart = [...prev];
        if (updatedCart[itemIndex].quantity === 1) {
          return prev.filter((item) => item.id !== itemId);
        } else {
          updatedCart[itemIndex].quantity -= 1;
        }
        return updatedCart;
      }
      return prev;
    });
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    toast({
      title: "Commande validée",
      description: "Votre commande est en cours de préparation.",
    });
    setCart([]);
  };

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
                    {restaurantData.categories.map((category) => (
                      <TabsTrigger key={category.id} value={category.id}>
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {restaurantData.categories.map((category) => (
                  <TabsContent key={category.id} value={category.id}>
                    <div className="mb-6">
                      <h2 className="text-xl font-bold mb-4">{category.name}</h2>
                      <div className="space-y-4">
                        {category.items.map((item) => (
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
                                  onClick={() =>
                                    addToCart(item.id, item.name, item.price)
                                  }
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
              <div className="sticky top-20 bg-white border rounded-lg p-4">
                <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
                  <ShoppingBag className="h-5 w-5" />
                  Votre commande
                </h3>

                {cart.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    <p>Votre panier est vide</p>
                    <p className="text-sm mt-2">
                      Commande minimum: {restaurantData.minimumOrder} €
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="max-h-64 overflow-y-auto mb-4">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center py-2 border-b last:border-b-0"
                        >
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-gray-500">
                              {item.price.toFixed(2)} €
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => decreaseQuantity(item.id)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span>{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() =>
                                addToCart(item.id, item.name, item.price)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 border-t pt-4">
                      <div className="flex justify-between">
                        <span>Sous-total</span>
                        <span>{getTotalPrice().toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Frais de livraison</span>
                        <span>{restaurantData.deliveryFee}</span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t">
                        <span>Total</span>
                        <span>
                          {(
                            getTotalPrice() +
                            parseFloat(restaurantData.deliveryFee.replace(",", "."))
                          ).toFixed(2)}{" "}
                          €
                        </span>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-4 bg-goodfood-500 hover:bg-goodfood-600"
                      onClick={handleCheckout}
                      disabled={getTotalPrice() < restaurantData.minimumOrder}
                    >
                      {getTotalPrice() < restaurantData.minimumOrder
                        ? `Minimum ${restaurantData.minimumOrder} €`
                        : `Passer la commande (${getTotalItems()})`}
                    </Button>
                  </>
                )}
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
