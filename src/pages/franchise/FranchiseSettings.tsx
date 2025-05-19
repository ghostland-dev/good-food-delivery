
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import FranchiseSidebar from "@/components/franchise/FranchiseSidebar";

const FranchiseSettings = () => {
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: "Burger Palace",
    address: "123 Rue de la Paix, Paris",
    phone: "01 23 45 67 89",
    email: "contact@burgerpalace.fr",
  });

  const [notifications, setNotifications] = useState({
    orderNotifications: true,
    marketingEmails: false,
    customerReviews: true,
    appUpdates: true,
  });

  const handleRestaurantInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRestaurantInfo({
      ...restaurantInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  const handleSaveRestaurantInfo = () => {
    toast({
      title: "Profil mis à jour",
      description: "Les informations de votre restaurant ont été mises à jour."
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Préférences sauvegardées",
      description: "Vos préférences de notification ont été mises à jour."
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <FranchiseSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Paramètres</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profil Restaurant</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="payment">Paiements</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informations du Restaurant</CardTitle>
                <CardDescription>
                  Mettez à jour les informations de votre restaurant qui seront visibles pour les clients.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du restaurant</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={restaurantInfo.name}
                    onChange={handleRestaurantInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input 
                    id="address" 
                    name="address"
                    value={restaurantInfo.address}
                    onChange={handleRestaurantInfoChange}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      value={restaurantInfo.phone}
                      onChange={handleRestaurantInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email"
                      value={restaurantInfo.email}
                      onChange={handleRestaurantInfoChange}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveRestaurantInfo}>
                  Enregistrer les modifications
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Préférences de notification</CardTitle>
                <CardDescription>
                  Configurez vos préférences de notification pour rester informé des activités importantes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notifications de commande</p>
                    <p className="text-sm text-muted-foreground">Recevez des alertes lors de nouvelles commandes</p>
                  </div>
                  <Switch 
                    checked={notifications.orderNotifications}
                    onCheckedChange={() => handleNotificationChange('orderNotifications')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Emails marketing</p>
                    <p className="text-sm text-muted-foreground">Recevez des informations sur nos promotions</p>
                  </div>
                  <Switch 
                    checked={notifications.marketingEmails}
                    onCheckedChange={() => handleNotificationChange('marketingEmails')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Avis clients</p>
                    <p className="text-sm text-muted-foreground">Soyez notifié des nouveaux avis clients</p>
                  </div>
                  <Switch 
                    checked={notifications.customerReviews}
                    onCheckedChange={() => handleNotificationChange('customerReviews')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mises à jour de l'application</p>
                    <p className="text-sm text-muted-foreground">Soyez informé des nouvelles fonctionnalités</p>
                  </div>
                  <Switch 
                    checked={notifications.appUpdates}
                    onCheckedChange={() => handleNotificationChange('appUpdates')}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveNotifications}>
                  Enregistrer les préférences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Informations de paiement</CardTitle>
                <CardDescription>
                  Gérez vos méthodes de paiement et vos informations bancaires.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center h-40">
                  <p className="text-muted-foreground">Paramètres de paiement à implémenter</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Sécurité du compte</CardTitle>
                <CardDescription>
                  Gérez les paramètres de sécurité de votre compte.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center h-40">
                  <p className="text-muted-foreground">Paramètres de sécurité à implémenter</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FranchiseSettings;
