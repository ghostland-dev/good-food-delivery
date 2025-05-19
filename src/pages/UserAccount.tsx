
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  CreditCard, 
  MapPin, 
  ShoppingBag, 
  Heart, 
  Bell, 
  LogOut,
  Edit,
  Plus,
  Trash2,
  Check,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

// Types pour les données utilisateur
interface Order {
  id: string;
  date: string;
  restaurant: string;
  total: number;
  status: "livré" | "en cours" | "en préparation" | "annulé";
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: "card";
  last4: string;
  expiry: string;
  brand: string;
  isDefault: boolean;
}

interface FavoriteRestaurant {
  id: number;
  name: string;
  image: string;
  cuisineType: string;
}

// Données fictives pour l'utilisateur
const mockUserData = {
  name: "Marie Dupont",
  email: "marie.dupont@example.com",
  phone: "06 12 34 56 78",
  orders: [
    {
      id: "ORD-1234",
      date: "15 Mai 2025",
      restaurant: "Le Burger Gourmand",
      total: 29.90,
      status: "livré",
      items: [
        { name: "Classic Cheese", quantity: 2, price: 9.90 },
        { name: "Frites Maison", quantity: 1, price: 3.90 },
        { name: "Soda", quantity: 2, price: 2.50 }
      ]
    },
    {
      id: "ORD-1235",
      date: "10 Mai 2025",
      restaurant: "Sushi Master",
      total: 35.50,
      status: "livré",
      items: [
        { name: "California Roll", quantity: 1, price: 12.50 },
        { name: "Maki Saumon", quantity: 1, price: 10.90 },
        { name: "Gyoza", quantity: 1, price: 7.50 },
        { name: "Thé Vert", quantity: 1, price: 3.50 }
      ]
    },
    {
      id: "ORD-1236",
      date: "19 Mai 2025",
      restaurant: "Pizzeria Napoli",
      total: 23.80,
      status: "en cours",
      items: [
        { name: "Pizza Margherita", quantity: 1, price: 12.90 },
        { name: "Tiramisu", quantity: 1, price: 6.90 },
        { name: "Eau", quantity: 1, price: 2.00 }
      ]
    }
  ] as Order[],
  addresses: [
    {
      id: "addr-1",
      name: "Domicile",
      address: "123 Rue de Paris",
      city: "Paris",
      postalCode: "75001",
      isDefault: true
    },
    {
      id: "addr-2",
      name: "Bureau",
      address: "45 Avenue Victor Hugo",
      city: "Paris",
      postalCode: "75016",
      isDefault: false
    }
  ] as Address[],
  paymentMethods: [
    {
      id: "pm-1",
      type: "card",
      last4: "4242",
      expiry: "04/26",
      brand: "Visa",
      isDefault: true
    },
    {
      id: "pm-2",
      type: "card",
      last4: "1234",
      expiry: "09/25",
      brand: "Mastercard",
      isDefault: false
    }
  ] as PaymentMethod[],
  favorites: [
    {
      id: 1,
      name: "Le Burger Gourmand",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=300",
      cuisineType: "Burgers • Américain"
    },
    {
      id: 3,
      name: "Sushi Master",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=300",
      cuisineType: "Japonais • Sushi"
    },
    {
      id: 9,
      name: "Fresh & Green",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=300",
      cuisineType: "Vegan • Salades"
    }
  ] as FavoriteRestaurant[]
};

const UserAccount = () => {
  const { toast } = useToast();
  const [userData, setUserData] = useState(mockUserData);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
  });

  // Fonction pour mettre à jour le profil
  const updateProfile = () => {
    setUserData(prev => ({
      ...prev,
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone
    }));
    setEditingProfile(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
  };

  // Fonction pour définir une adresse par défaut
  const setDefaultAddress = (id: string) => {
    setUserData(prev => ({
      ...prev,
      addresses: prev.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    }));
    toast({
      title: "Adresse mise à jour",
      description: "Votre adresse par défaut a été modifiée.",
    });
  };

  // Fonction pour supprimer une adresse
  const deleteAddress = (id: string) => {
    setUserData(prev => ({
      ...prev,
      addresses: prev.addresses.filter(addr => addr.id !== id)
    }));
    toast({
      title: "Adresse supprimée",
      description: "L'adresse a été supprimée de votre compte.",
    });
  };

  // Fonction pour définir une méthode de paiement par défaut
  const setDefaultPayment = (id: string) => {
    setUserData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    }));
    toast({
      title: "Méthode de paiement mise à jour",
      description: "Votre méthode de paiement par défaut a été modifiée.",
    });
  };

  // Fonction pour supprimer une méthode de paiement
  const deletePaymentMethod = (id: string) => {
    setUserData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.filter(method => method.id !== id)
    }));
    toast({
      title: "Méthode de paiement supprimée",
      description: "La méthode de paiement a été supprimée de votre compte.",
    });
  };

  // Fonction pour supprimer un restaurant favori
  const removeFavorite = (id: number) => {
    setUserData(prev => ({
      ...prev,
      favorites: prev.favorites.filter(fav => fav.id !== id)
    }));
    toast({
      title: "Favori supprimé",
      description: "Le restaurant a été retiré de vos favoris.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-goodfood-100 rounded-full flex items-center justify-center mr-3">
                    <User className="h-6 w-6 text-goodfood-600" />
                  </div>
                  <div>
                    <h2 className="font-bold">{userData.name}</h2>
                    <p className="text-sm text-gray-500">{userData.email}</p>
                  </div>
                </div>

                <nav className="space-y-1">
                  <a 
                    href="#profile" 
                    className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-50"
                    onClick={() => document.getElementById('profile-tab')?.click()}
                  >
                    <User className="h-5 w-5 mr-3" />
                    Mon profil
                  </a>
                  <a 
                    href="#orders" 
                    className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-50"
                    onClick={() => document.getElementById('orders-tab')?.click()}
                  >
                    <ShoppingBag className="h-5 w-5 mr-3" />
                    Mes commandes
                  </a>
                  <a 
                    href="#addresses" 
                    className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-50"
                    onClick={() => document.getElementById('addresses-tab')?.click()}
                  >
                    <MapPin className="h-5 w-5 mr-3" />
                    Mes adresses
                  </a>
                  <a 
                    href="#payment" 
                    className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-50"
                    onClick={() => document.getElementById('payment-tab')?.click()}
                  >
                    <CreditCard className="h-5 w-5 mr-3" />
                    Moyens de paiement
                  </a>
                  <a 
                    href="#favorites" 
                    className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-50"
                    onClick={() => document.getElementById('favorites-tab')?.click()}
                  >
                    <Heart className="h-5 w-5 mr-3" />
                    Mes favoris
                  </a>
                  <a 
                    href="#notifications" 
                    className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-50"
                    onClick={() => document.getElementById('notifications-tab')?.click()}
                  >
                    <Bell className="h-5 w-5 mr-3" />
                    Notifications
                  </a>
                  <Separator className="my-2" />
                  <a 
                    href="/logout" 
                    className="flex items-center p-3 rounded-lg text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Déconnexion
                  </a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              <Tabs defaultValue="profile">
                <TabsList className="w-full flex mb-6">
                  <TabsTrigger id="profile-tab" value="profile" className="flex-1">Mon profil</TabsTrigger>
                  <TabsTrigger id="orders-tab" value="orders" className="flex-1">Commandes</TabsTrigger>
                  <TabsTrigger id="addresses-tab" value="addresses" className="flex-1">Adresses</TabsTrigger>
                  <TabsTrigger id="payment-tab" value="payment" className="flex-1">Paiement</TabsTrigger>
                  <TabsTrigger id="favorites-tab" value="favorites" className="flex-1">Favoris</TabsTrigger>
                  <TabsTrigger id="notifications-tab" value="notifications" className="flex-1">Notifications</TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile">
                  <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">Informations personnelles</h2>
                      {!editingProfile ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditingProfile(true)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setEditingProfile(false);
                              setProfileData({
                                name: userData.name,
                                email: userData.email,
                                phone: userData.phone,
                              });
                            }}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Annuler
                          </Button>
                          <Button 
                            size="sm"
                            className="bg-goodfood-500 hover:bg-goodfood-600"
                            onClick={updateProfile}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Enregistrer
                          </Button>
                        </div>
                      )}
                    </div>

                    {!editingProfile ? (
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">Nom complet</p>
                          <p>{userData.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Adresse email</p>
                          <p>{userData.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Téléphone</p>
                          <p>{userData.phone}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Nom complet</Label>
                          <Input 
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Adresse email</Label>
                          <Input 
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input 
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-white p-6 rounded-lg border shadow-sm mt-6">
                    <h2 className="text-xl font-bold mb-6">Sécurité</h2>
                    <Button variant="outline">
                      Modifier le mot de passe
                    </Button>
                  </div>
                </TabsContent>

                {/* Orders Tab */}
                <TabsContent value="orders">
                  <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <h2 className="text-xl font-bold mb-6">Mes commandes</h2>
                    
                    {userData.orders.length > 0 ? (
                      <div className="space-y-6">
                        {userData.orders.map((order) => (
                          <div key={order.id} className="border rounded-lg p-4">
                            <div className="flex flex-wrap justify-between items-start mb-4">
                              <div>
                                <p className="font-bold">{order.restaurant}</p>
                                <p className="text-sm text-gray-500">{order.date}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold">{order.total.toFixed(2)} €</p>
                                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  order.status === 'livré' ? 'bg-green-100 text-green-800' :
                                  order.status === 'en cours' ? 'bg-blue-100 text-blue-800' :
                                  order.status === 'en préparation' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div className="mt-4">
                              <p className="font-medium mb-2">Articles</p>
                              <ul className="space-y-2">
                                {order.items.map((item, index) => (
                                  <li key={index} className="flex justify-between text-sm">
                                    <span>{item.quantity}x {item.name}</span>
                                    <span>{(item.price * item.quantity).toFixed(2)} €</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="mt-4 flex justify-between">
                              <p className="text-xs text-gray-500">Commande #{order.id}</p>
                              <Button variant="link" className="text-goodfood-500 p-0 h-auto">
                                Détails
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Vous n'avez pas encore de commande</h3>
                        <p className="text-gray-500 mb-4">
                          Explorez nos restaurants et faites votre première commande.
                        </p>
                        <Button className="bg-goodfood-500 hover:bg-goodfood-600">
                          Découvrir les restaurants
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Addresses Tab */}
                <TabsContent value="addresses">
                  <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">Mes adresses</h2>
                      <Button className="bg-goodfood-500 hover:bg-goodfood-600">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter une adresse
                      </Button>
                    </div>
                    
                    {userData.addresses.length > 0 ? (
                      <div className="grid gap-4">
                        {userData.addresses.map((address) => (
                          <div key={address.id} className={`border rounded-lg p-4 ${address.isDefault ? 'border-goodfood-500 bg-goodfood-50' : ''}`}>
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-bold">{address.name}</p>
                                  {address.isDefault && (
                                    <span className="bg-goodfood-100 text-goodfood-800 text-xs px-2 py-0.5 rounded">
                                      Par défaut
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-700 mt-1">{address.address}</p>
                                <p className="text-gray-700">{address.postalCode} {address.city}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => deleteAddress(address.id)}>
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </div>
                            
                            {!address.isDefault && (
                              <Button 
                                variant="link" 
                                className="text-goodfood-500 p-0 h-auto mt-2"
                                onClick={() => setDefaultAddress(address.id)}
                              >
                                Définir comme adresse par défaut
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Vous n'avez pas encore d'adresse</h3>
                        <p className="text-gray-500 mb-4">
                          Ajoutez une adresse pour faciliter vos commandes.
                        </p>
                        <Button className="bg-goodfood-500 hover:bg-goodfood-600">
                          Ajouter une adresse
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Payment Tab */}
                <TabsContent value="payment">
                  <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">Moyens de paiement</h2>
                      <Button className="bg-goodfood-500 hover:bg-goodfood-600">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter un moyen de paiement
                      </Button>
                    </div>
                    
                    {userData.paymentMethods.length > 0 ? (
                      <div className="grid gap-4">
                        {userData.paymentMethods.map((method) => (
                          <div key={method.id} className={`border rounded-lg p-4 ${method.isDefault ? 'border-goodfood-500 bg-goodfood-50' : ''}`}>
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-bold">{method.brand} •••• {method.last4}</p>
                                  {method.isDefault && (
                                    <span className="bg-goodfood-100 text-goodfood-800 text-xs px-2 py-0.5 rounded">
                                      Par défaut
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-500 mt-1">Expire: {method.expiry}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => deletePaymentMethod(method.id)}>
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </div>
                            
                            {!method.isDefault && (
                              <Button 
                                variant="link" 
                                className="text-goodfood-500 p-0 h-auto mt-2"
                                onClick={() => setDefaultPayment(method.id)}
                              >
                                Définir comme moyen de paiement par défaut
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Vous n'avez pas encore de moyen de paiement</h3>
                        <p className="text-gray-500 mb-4">
                          Ajoutez un moyen de paiement pour faciliter vos commandes.
                        </p>
                        <Button className="bg-goodfood-500 hover:bg-goodfood-600">
                          Ajouter un moyen de paiement
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Favorites Tab */}
                <TabsContent value="favorites">
                  <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <h2 className="text-xl font-bold mb-6">Mes restaurants favoris</h2>
                    
                    {userData.favorites.length > 0 ? (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {userData.favorites.map((restaurant) => (
                          <div key={restaurant.id} className="border rounded-lg overflow-hidden">
                            <div className="aspect-[4/3] w-full">
                              <img
                                src={restaurant.image}
                                alt={restaurant.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-bold">{restaurant.name}</h3>
                                  <p className="text-gray-500 text-sm">{restaurant.cuisineType}</p>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => removeFavorite(restaurant.id)}
                                >
                                  <Heart className="h-5 w-5 fill-goodfood-500 text-goodfood-500" />
                                </Button>
                              </div>
                              <Button 
                                className="w-full mt-3 bg-goodfood-500 hover:bg-goodfood-600"
                                onClick={() => window.location.href = `/restaurant/${restaurant.id}`}
                              >
                                Commander
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Vous n'avez pas encore de favoris</h3>
                        <p className="text-gray-500 mb-4">
                          Ajoutez des restaurants à vos favoris pour les retrouver facilement.
                        </p>
                        <Button className="bg-goodfood-500 hover:bg-goodfood-600">
                          Découvrir les restaurants
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications">
                  <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <h2 className="text-xl font-bold mb-6">Préférences de notifications</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Notifications par email</p>
                          <p className="text-sm text-gray-500">Recevez des emails concernant vos commandes et nos offres</p>
                        </div>
                        <div className="flex items-center h-6">
                          <input
                            type="checkbox"
                            id="email-notifications"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-goodfood-500 focus:ring-goodfood-500"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Notifications push</p>
                          <p className="text-sm text-gray-500">Recevez des notifications sur votre appareil</p>
                        </div>
                        <div className="flex items-center h-6">
                          <input
                            type="checkbox"
                            id="push-notifications"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-goodfood-500 focus:ring-goodfood-500"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Promotions et offres spéciales</p>
                          <p className="text-sm text-gray-500">Soyez informé des nouveautés et offres exclusives</p>
                        </div>
                        <div className="flex items-center h-6">
                          <input
                            type="checkbox"
                            id="promo-notifications"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-goodfood-500 focus:ring-goodfood-500"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Rappels de commande</p>
                          <p className="text-sm text-gray-500">Recevez des rappels pour les commandes programmées</p>
                        </div>
                        <div className="flex items-center h-6">
                          <input
                            type="checkbox"
                            id="reminder-notifications"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-goodfood-500 focus:ring-goodfood-500"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Button className="mt-6 bg-goodfood-500 hover:bg-goodfood-600">
                      Enregistrer les préférences
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserAccount;
