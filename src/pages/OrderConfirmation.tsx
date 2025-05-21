
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface OrderDetails {
  id: string;
  restaurantName: string;
  restaurantId: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalPrice: number;
  deliveryAddress: string;
  estimatedDeliveryTime: string;
  status: "confirmed" | "preparing" | "delivering" | "delivered";
}

const OrderConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Simuler un chargement des données
    const timer = setTimeout(() => {
      // Récupérer les données de commande du localStorage
      const savedOrders = localStorage.getItem("goodfood_orders");
      const orders: OrderDetails[] = savedOrders ? JSON.parse(savedOrders) : [];
      
      const currentOrder = orders.find(order => order.id === id);
      
      if (currentOrder) {
        setOrder(currentOrder);
      } else {
        // Si aucune commande n'est trouvée, créer une commande fictive pour la démonstration
        const demoOrder: OrderDetails = {
          id: id || "demo-1234",
          restaurantName: "Le Burger Gourmand",
          restaurantId: 1,
          items: [
            { name: "Classic Cheese", quantity: 2, price: 9.9 },
            { name: "Frites Maison", quantity: 1, price: 3.9 }
          ],
          totalPrice: 23.7,
          deliveryAddress: "24 Rue du Commerce, 75015 Paris",
          estimatedDeliveryTime: "30-45 min",
          status: "confirmed"
        };
        
        setOrder(demoOrder);
        
        // Sauvegarder dans le localStorage pour les futures utilisations
        orders.push(demoOrder);
        localStorage.setItem("goodfood_orders", JSON.stringify(orders));
      }
      
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);

  const handleTrackOrder = () => {
    navigate(`/order-tracking/${order?.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="w-full max-w-md text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-muted h-16 w-16 mb-4"></div>
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="rounded-full bg-goodfood-100 p-4 mb-4">
              <Check className="h-12 w-12 text-goodfood-500" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Commande confirmée !</h1>
            <p className="text-muted-foreground mb-2">
              Merci pour votre commande. Elle est en préparation.
            </p>
            <p className="text-sm font-medium">
              Numéro de commande: <span className="font-bold">{order?.id}</span>
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Détails de la commande</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">{order?.restaurantName}</h3>
                    <p className="text-sm text-muted-foreground">
                      Livraison estimée: {order?.estimatedDeliveryTime}
                    </p>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Articles</h4>
                    {order?.items.map((item, index) => (
                      <div key={index} className="flex justify-between py-2">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span>{(item.price * item.quantity).toFixed(2)} €</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between py-1">
                      <span>Sous-total</span>
                      <span>
                        {order?.totalPrice.toFixed(2)} €
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Frais de livraison</span>
                      <span>2,99 €</span>
                    </div>
                    <div className="flex justify-between py-2 font-bold border-t mt-2 pt-2">
                      <span>Total</span>
                      <span>{(order ? order.totalPrice + 2.99 : 0).toFixed(2)} €</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-1">Adresse de livraison</h4>
                    <p className="text-sm">{order?.deliveryAddress}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-col space-y-3">
              <Button 
                onClick={handleTrackOrder} 
                className="bg-goodfood-500 hover:bg-goodfood-600"
              >
                Suivre ma commande
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate("/")}
              >
                Retourner à l'accueil
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
