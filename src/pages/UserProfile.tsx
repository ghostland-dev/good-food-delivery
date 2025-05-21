
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, MapPin, User, ShoppingCart, Edit, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addresses: Array<{
    id: string;
    name: string;
    address: string;
    postalCode: string;
    city: string;
    default: boolean;
  }>;
}

interface OrderSummary {
  id: string;
  date: string;
  restaurantName: string;
  restaurantId: number;
  total: number;
  status: string;
  items: Array<{name: string, quantity: number}>;
}

const UserProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addresses: []
  });
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addresses: []
  });

  useEffect(() => {
    // Charger les données utilisateur du localStorage
    const savedUserData = localStorage.getItem("goodfood_user");
    
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      setUserData(parsedData);
      setFormData(parsedData);
    } else {
      // Créer des données fictives pour la démonstration
      const demoData: UserData = {
        firstName: "Marie",
        lastName: "Dupont",
        email: "marie.dupont@example.com",
        phone: "06 12 34 56 78",
        addresses: [
          {
            id: "addr-1",
            name: "Domicile",
            address: "24 Rue du Commerce",
            postalCode: "75015",
            city: "Paris",
            default: true
          },
          {
            id: "addr-2",
            name: "Bureau",
            address: "5 Avenue des Champs-Élysées",
            postalCode: "75008",
            city: "Paris",
            default: false
          }
        ]
      };
      
      setUserData(demoData);
      setFormData(demoData);
      localStorage.setItem("goodfood_user", JSON.stringify(demoData));
    }
    
    // Charger l'historique des commandes
    const savedOrders = localStorage.getItem("goodfood_orders");
    
    if (savedOrders) {
      const orderHistory = JSON.parse(savedOrders);
      setOrders(orderHistory);
    } else {
      // Créer des commandes fictives pour la démonstration
      const demoOrders: OrderSummary[] = [
        {
          id: "ORD-1234",
          date: "2023-05-20",
          restaurantName: "Le Burger Gourmand",
          restaurantId: 1,
          total: 26.69,
          status: "delivered",
          items: [
            {name: "Classic Cheese", quantity: 2},
            {name: "Frites Maison", quantity: 1}
          ]
        },
        {
          id: "ORD-5678",
          date: "2023-05-15",
          restaurantName: "Pizzeria Napoli",
          restaurantId: 2,
          total: 31.49,
          status: "delivered",
          items: [
            {name: "Margherita", quantity: 1},
            {name: "Quattro Formaggi", quantity: 1},
            {name: "Tiramisu", quantity: 2}
          ]
        }
      ];
      
      setOrders(demoOrders);
      localStorage.setItem("goodfood_orders", JSON.stringify(demoOrders));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveProfile = () => {
    setUserData(formData);
    localStorage.setItem("goodfood_user", JSON.stringify(formData));
    setIsEditing(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès."
    });
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "delivered":
        return "Livré";
      case "delivering":
        return "En cours de livraison";
      case "preparing":
        return "En préparation";
      case "confirmed":
        return "Confirmé";
      default:
        return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "delivering":
        return "bg-blue-100 text-blue-800";
      case "preparing":
        return "bg-amber-100 text-amber-800";
      case "confirmed":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Votre compte</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="orders">Commandes</TabsTrigger>
              <TabsTrigger value="addresses">Adresses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Informations personnelles</CardTitle>
                  {!isEditing && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">Prénom</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Nom</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={handleSaveProfile}
                          className="bg-goodfood-500 hover:bg-goodfood-600"
                        >
                          Enregistrer
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setIsEditing(false);
                            setFormData(userData);
                          }}
                        >
                          Annuler
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <User className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div>
                          <p className="font-medium">
                            {userData.firstName} {userData.lastName}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5 mr-2 text-muted-foreground"
                        >
                          <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                          <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                        </svg>
                        <div>
                          <p className="font-medium">{userData.email}</p>
                          <p className="text-sm text-muted-foreground">Email</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5 mr-2 text-muted-foreground"
                        >
                          <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="font-medium">{userData.phone}</p>
                          <p className="text-sm text-muted-foreground">Téléphone</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="orders">
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Historique des commandes</h2>
                
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="overflow-hidden">
                        <div className="md:flex">
                          <div className="p-4 md:p-6 flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <ShoppingCart className="h-5 w-5 mr-2 text-muted-foreground" />
                                <h3 className="font-medium">Commande #{order.id}</h3>
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(order.status)}`}>
                                {getStatusLabel(order.status)}
                              </span>
                            </div>
                            
                            <div className="flex flex-col md:flex-row md:items-center text-sm text-muted-foreground gap-2 md:gap-4 mb-3">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{new Date(order.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{order.restaurantName}</span>
                              </div>
                            </div>
                            
                            <div className="text-sm">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between py-1">
                                  <span>
                                    {item.quantity}x {item.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                            
                            <div className="flex justify-between items-center mt-3 pt-3 border-t">
                              <div>
                                <span className="font-medium">Total:</span>{" "}
                                <span>{order.total.toFixed(2)} €</span>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => navigate(`/order-tracking/${order.id}`)}
                              >
                                Détails
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full mx-auto flex items-center justify-center mb-4">
                      <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">Aucune commande</h3>
                    <p className="text-muted-foreground">
                      Vous n'avez encore passé aucune commande.
                    </p>
                    <Button
                      className="mt-4 bg-goodfood-500 hover:bg-goodfood-600"
                      onClick={() => navigate("/restaurants")}
                    >
                      Explorer les restaurants
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="addresses">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Adresses de livraison</h2>
                  <Button className="bg-goodfood-500 hover:bg-goodfood-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une adresse
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {userData.addresses.map((address) => (
                    <Card key={address.id} className={address.default ? "border-goodfood-500" : ""}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <h3 className="font-medium">{address.name}</h3>
                            {address.default && (
                              <span className="ml-2 text-xs bg-goodfood-100 text-goodfood-800 px-2 py-0.5 rounded-full">
                                Par défaut
                              </span>
                            )}
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-sm">
                          <p>{address.address}</p>
                          <p>{address.postalCode} {address.city}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;
