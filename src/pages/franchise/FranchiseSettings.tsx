
import React from 'react';
import FranchiseSidebar from '@/components/franchise/FranchiseSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

const FranchiseSettings = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <FranchiseSidebar />
      
      <div className="flex-1 p-4 lg:p-8 lg:ml-56">
        <h1 className="text-3xl font-bold mb-6">Paramètres</h1>
        
        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profil du restaurant</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="hours">Horaires d'ouverture</TabsTrigger>
            <TabsTrigger value="delivery">Livraison</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informations du restaurant</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="restaurantName">Nom du restaurant</Label>
                    <Input id="restaurantName" defaultValue="Restaurant Demo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" defaultValue="+33 1 23 45 67 89" type="tel" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="contact@restaurant-demo.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Site web</Label>
                    <Input id="website" defaultValue="https://restaurant-demo.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input id="address" defaultValue="123 Rue du Commerce, 75015 Paris" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea 
                    id="description" 
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    defaultValue="Restaurant traditionnel proposant une cuisine française authentique avec des produits frais et locaux." 
                  />
                </div>
                
                <Button className="bg-primary hover:bg-primary/90">Sauvegarder</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Préférences de notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Nouvelles commandes</p>
                      <p className="text-sm text-muted-foreground">Recevoir des notifications pour chaque nouvelle commande</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Commandes annulées</p>
                      <p className="text-sm text-muted-foreground">Recevoir des notifications lorsqu'une commande est annulée</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Livraisons</p>
                      <p className="text-sm text-muted-foreground">Recevoir des notifications sur les mises à jour de livraison</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Rapports quotidiens</p>
                      <p className="text-sm text-muted-foreground">Recevoir un résumé quotidien des performances</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="hours">
            <Card>
              <CardHeader>
                <CardTitle>Horaires d'ouverture</CardTitle>
              </CardHeader>
              <CardContent>
                {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].map((day, index) => (
                  <div key={day} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pb-4 border-b last:border-0">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <Switch defaultChecked={index < 6} id={`open-${day}`} />
                      </div>
                      <Label htmlFor={`open-${day}`}>{day}</Label>
                    </div>
                    <div className="space-y-2">
                      <Label>Ouverture</Label>
                      <Input type="time" defaultValue="11:30" disabled={index === 6} />
                    </div>
                    <div className="space-y-2">
                      <Label>Fermeture</Label>
                      <Input type="time" defaultValue="22:30" disabled={index === 6} />
                    </div>
                  </div>
                ))}
                
                <Button className="mt-4 bg-primary hover:bg-primary/90">Sauvegarder</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="delivery">
            <Card>
              <CardHeader>
                <CardTitle>Options de livraison</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Livraison à domicile</p>
                      <p className="text-sm text-muted-foreground">Proposer la livraison à domicile</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">À emporter</p>
                      <p className="text-sm text-muted-foreground">Proposer le service à emporter</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sur place</p>
                      <p className="text-sm text-muted-foreground">Proposer la restauration sur place</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deliveryRadius">Rayon de livraison (km)</Label>
                  <Input id="deliveryRadius" type="number" defaultValue="5" min="1" max="20" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="minOrderAmount">Montant minimum de commande (€)</Label>
                  <Input id="minOrderAmount" type="number" defaultValue="15" min="0" step="0.5" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deliveryFee">Frais de livraison (€)</Label>
                  <Input id="deliveryFee" type="number" defaultValue="2.50" min="0" step="0.5" />
                </div>
                
                <Button className="bg-primary hover:bg-primary/90">Sauvegarder</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FranchiseSettings;
