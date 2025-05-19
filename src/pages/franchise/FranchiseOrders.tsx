
import { useState } from "react";
import FranchiseSidebar from "@/components/franchise/FranchiseSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

type OrderStatus = "pending" | "preparing" | "ready" | "delivering" | "completed" | "cancelled";

interface Order {
  id: number;
  customer: string;
  items: string[];
  total: number;
  status: OrderStatus;
  time: string;
  address: string;
}

const orders: Order[] = [
  {
    id: 4832,
    customer: "Thomas Martin",
    items: ["Burger Classic", "Frites", "Coca-Cola"],
    total: 15.90,
    status: "pending",
    time: "Il y a 2 min",
    address: "14 Rue de Paris, 75001 Paris"
  },
  {
    id: 4831,
    customer: "Marie Dupont",
    items: ["Pizza Margherita", "Tiramisu"],
    total: 18.50,
    status: "preparing",
    time: "Il y a 15 min",
    address: "22 Avenue Victor Hugo, 75016 Paris"
  },
  {
    id: 4830,
    customer: "Jean Dubois",
    items: ["Salade César", "Eau minérale"],
    total: 9.90,
    status: "ready",
    time: "Il y a 25 min",
    address: "5 Boulevard Haussmann, 75009 Paris"
  },
  {
    id: 4829,
    customer: "Sophie Bernard",
    items: ["Burger Cheese", "Frites", "Milkshake"],
    total: 16.80,
    status: "delivering",
    time: "Il y a 40 min",
    address: "8 Rue de Rivoli, 75004 Paris"
  },
  {
    id: 4828,
    customer: "Lucas Petit",
    items: ["Chicken Wings", "Frites", "Bière"],
    total: 19.50,
    status: "completed",
    time: "Il y a 2h",
    address: "30 Rue de la Paix, 75002 Paris"
  },
  {
    id: 4827,
    customer: "Emma Leclerc",
    items: ["Wrap Poulet", "Salade", "Jus d'orange"],
    total: 14.20,
    status: "cancelled",
    time: "Il y a 3h",
    address: "11 Rue Saint-Antoine, 75004 Paris"
  }
];

const statusLabels: Record<OrderStatus, string> = {
  "pending": "En attente",
  "preparing": "En préparation",
  "ready": "Prêt",
  "delivering": "En livraison",
  "completed": "Terminé",
  "cancelled": "Annulé"
};

const statusColors: Record<OrderStatus, string> = {
  "pending": "bg-yellow-100 text-yellow-800",
  "preparing": "bg-blue-100 text-blue-800",
  "ready": "bg-purple-100 text-purple-800",
  "delivering": "bg-indigo-100 text-indigo-800",
  "completed": "bg-green-100 text-green-800",
  "cancelled": "bg-red-100 text-red-800"
};

const FranchiseOrders = () => {
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filter === "all" || order.status === filter;
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.id.toString().includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const updateOrderStatus = (orderId: number, newStatus: OrderStatus) => {
    toast({
      title: "Statut mis à jour",
      description: `La commande #${orderId} est maintenant ${statusLabels[newStatus].toLowerCase()}.`,
    });
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      <FranchiseSidebar />
      
      <main className="flex-1 lg:ml-56 p-4 md:p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Gestion des commandes</h1>
          <p className="text-muted-foreground">Suivez et gérez toutes vos commandes</p>
        </header>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom ou n° de commande"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 items-center">
            <Filter size={18} className="text-muted-foreground" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="preparing">En préparation</SelectItem>
                <SelectItem value="ready">Prêt</SelectItem>
                <SelectItem value="delivering">En livraison</SelectItem>
                <SelectItem value="completed">Terminé</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="bg-white rounded-md shadow-sm border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium">Commande</th>
                  <th className="px-4 py-3 text-left font-medium">Client</th>
                  <th className="px-4 py-3 text-left font-medium">Articles</th>
                  <th className="px-4 py-3 text-left font-medium">Total</th>
                  <th className="px-4 py-3 text-left font-medium">Statut</th>
                  <th className="px-4 py-3 text-left font-medium">Heure</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">#{order.id}</td>
                    <td className="px-4 py-3">{order.customer}</td>
                    <td className="px-4 py-3">
                      <span className="block truncate max-w-[200px]">
                        {order.items.join(", ")}
                      </span>
                    </td>
                    <td className="px-4 py-3">{order.total.toFixed(2)} €</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{order.time}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          disabled={order.status === "completed" || order.status === "cancelled"}
                          onClick={() => {
                            const nextStatus: Record<OrderStatus, OrderStatus> = {
                              "pending": "preparing",
                              "preparing": "ready",
                              "ready": "delivering",
                              "delivering": "completed",
                              "completed": "completed",
                              "cancelled": "cancelled"
                            };
                            updateOrderStatus(order.id, nextStatus[order.status]);
                          }}
                        >
                          {order.status === "pending" && "Préparer"}
                          {order.status === "preparing" && "Marquer prêt"}
                          {order.status === "ready" && "En livraison"}
                          {order.status === "delivering" && "Terminer"}
                          {order.status === "completed" && "Terminé"}
                          {order.status === "cancelled" && "Annulé"}
                        </Button>
                        
                        {order.status !== "completed" && order.status !== "cancelled" && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => updateOrderStatus(order.id, "cancelled")}
                          >
                            Annuler
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredOrders.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">Aucune commande trouvée</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FranchiseOrders;
