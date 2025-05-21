
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeliveryTracker from "@/components/driver/DeliveryTracker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

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

const OrderTracking = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [driverPosition, setDriverPosition] = useState<[number, number]>([48.8566, 2.3522]);
  
  // Restaurant and client location coordinates
  const restaurantLocation: [number, number] = [48.8684, 2.3388]; // Example coordinates
  const clientLocation: [number, number] = [48.8566, 2.3522]; // Example coordinates
  
  // Sample delivery route
  const deliveryRoute: [number, number][] = [
    [48.8684, 2.3388], // Restaurant
    [48.8651, 2.3412],
    [48.8645, 2.3435],
    [48.8625, 2.3467],
    [48.8603, 2.3488],
    [48.8582, 2.3507],
    [48.8566, 2.3522], // Client
  ];

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
          status: "delivering"
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

  useEffect(() => {
    // Simuler le déplacement du livreur sur l'itinéraire
    let currentPointIndex = 0;
    
    const moveDriver = () => {
      if (currentPointIndex < deliveryRoute.length - 1) {
        currentPointIndex++;
        setDriverPosition(deliveryRoute[currentPointIndex]);
      }
    };
    
    const interval = setInterval(moveDriver, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleDriverPositionChange = (position: [number, number]) => {
    setDriverPosition(position);
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Suivi de commande #{order?.id}</h1>
          
          <DeliveryTracker
            restaurantLocation={restaurantLocation}
            clientLocation={clientLocation}
            deliveryRoute={deliveryRoute}
            driverPosition={driverPosition}
            onDriverPositionChange={handleDriverPositionChange}
          />
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Détails de la commande</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium">{order?.restaurantName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {order?.items.reduce((acc, item) => acc + item.quantity, 0)} articles
                    </p>
                  </div>
                  
                  <div className="border-t pt-3">
                    <h4 className="font-medium mb-2">Articles</h4>
                    {order?.items.map((item, index) => (
                      <div key={index} className="flex justify-between py-1 text-sm">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span>{(item.price * item.quantity).toFixed(2)} €</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between py-1 text-sm">
                      <span>Total</span>
                      <span>{(order ? order.totalPrice + 2.99 : 0).toFixed(2)} €</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Statut de livraison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary w-6 h-6 flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Commande confirmée</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date().toLocaleTimeString()} - Le restaurant a reçu votre commande
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary w-6 h-6 flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Préparation en cours</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date().toLocaleTimeString()} - Votre commande est en cours de préparation
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary w-6 h-6 flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">En route</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date().toLocaleTimeString()} - Votre commande est en route avec Thomas
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="rounded-full border border-muted w-6 h-6 flex items-center justify-center mt-0.5">
                      <span className="h-3 w-3"></span>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Livré</p>
                      <p className="text-sm text-muted-foreground">
                        En attente de livraison
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTracking;
