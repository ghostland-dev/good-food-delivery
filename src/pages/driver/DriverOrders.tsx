
import DriverHeader from "@/components/driver/DriverHeader";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface DeliveryOrder {
  id: string;
  date: string;
  restaurant: string;
  address: string;
  amount: number;
  status: "completed" | "cancelled";
}

const orders: DeliveryOrder[] = [
  {
    id: "CMD-4523",
    date: "Aujourd'hui, 14:30",
    restaurant: "Burger House",
    address: "12 Rue de la Paix, 75002 Paris",
    amount: 6.50,
    status: "completed"
  },
  {
    id: "CMD-4522",
    date: "Aujourd'hui, 13:15",
    restaurant: "Sushi Shop",
    address: "24 Avenue Victor Hugo, 75016 Paris",
    amount: 7.20,
    status: "completed"
  },
  {
    id: "CMD-4521",
    date: "Aujourd'hui, 12:05",
    restaurant: "Pizza Roma",
    address: "8 Boulevard Saint-Germain, 75005 Paris",
    amount: 6.80,
    status: "completed"
  },
  {
    id: "CMD-4520",
    date: "Hier, 20:45",
    restaurant: "Thai Yummy",
    address: "3 Rue Oberkampf, 75011 Paris",
    amount: 8.10,
    status: "completed"
  },
  {
    id: "CMD-4519",
    date: "Hier, 19:20",
    restaurant: "Kebab Royal",
    address: "35 Rue de Belleville, 75019 Paris",
    amount: 5.50,
    status: "cancelled"
  },
  {
    id: "CMD-4518",
    date: "Hier, 18:00",
    restaurant: "Pasta Fresca",
    address: "17 Rue des Martyrs, 75009 Paris",
    amount: 7.00,
    status: "completed"
  },
  {
    id: "CMD-4517",
    date: "15/05/2023, 14:30",
    restaurant: "Vegan Delight",
    address: "42 Rue du Faubourg Saint-Antoine, 75012 Paris",
    amount: 6.90,
    status: "completed"
  }
];

const DriverOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  
  // Filter orders based on search term and current tab
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (currentTab === "all") return matchesSearch;
    if (currentTab === "completed") return matchesSearch && order.status === "completed";
    if (currentTab === "cancelled") return matchesSearch && order.status === "cancelled";
    
    return matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <DriverHeader />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Historique des livraisons</h1>
          <p className="text-muted-foreground">Consultez vos livraisons passées</p>
        </header>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une livraison"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" onValueChange={setCurrentTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">Toutes</TabsTrigger>
            <TabsTrigger value="completed">Terminées</TabsTrigger>
            <TabsTrigger value="cancelled">Annulées</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12 bg-background rounded-lg border">
                <p className="text-muted-foreground">Aucune livraison trouvée</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <Card key={order.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-1 p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                            <div>
                              <span className="font-medium">{order.restaurant}</span>
                              <span className="text-muted-foreground text-sm ml-2">{order.id}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{order.date}</span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">{order.address}</p>
                          
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-sm font-medium">Rémunération</span>
                              <span className="font-bold text-lg ml-2">{order.amount.toFixed(2)} €</span>
                            </div>
                            
                            <span 
                              className={`text-xs px-2 py-1 rounded-full ${
                                order.status === "completed" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {order.status === "completed" ? "Terminée" : "Annulée"}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-center bg-muted p-4 sm:p-6 border-t sm:border-t-0 sm:border-l">
                          <Button variant="outline">Voir détails</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
            {/* Le contenu sera filtré par la logique ci-dessus */}
          </TabsContent>
          
          <TabsContent value="cancelled" className="mt-0">
            {/* Le contenu sera filtré par la logique ci-dessus */}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DriverOrders;
