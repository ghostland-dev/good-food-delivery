
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FranchiseSidebar from "@/components/franchise/FranchiseSidebar";
import DeliveryMap from "@/components/map/DeliveryMap";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { Button } from "@/components/ui/button";

// Données de démonstration pour les graphiques
const monthlyData = [
  { name: 'Jan', ventes: 3200, commandes: 245 },
  { name: 'Fév', ventes: 3400, commandes: 260 },
  { name: 'Mar', ventes: 3800, commandes: 290 },
  { name: 'Avr', ventes: 4200, commandes: 320 },
  { name: 'Mai', ventes: 4532, commandes: 324 },
];

const COLORS = ['#F97316', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B'];

const FranchiseAnalytics = () => {
  const [mapView, setMapView] = useState<'heatmap' | 'delivery'>('heatmap');

  // Positions des restaurants et clients pour la carte
  const franchiseLocation: [number, number] = [48.8566, 2.3522]; // Paris
  const deliveryLocations = [
    { name: "Restaurant Principal", position: franchiseLocation, type: "restaurant" as const },
    { name: "Client récurrent", position: [48.8584, 2.2945] as [number, number], type: "client" as const },
    { name: "Zone de livraison fréquente", position: [48.8738, 2.3596] as [number, number], type: "client" as const },
    { name: "Zone de livraison fréquente", position: [48.8656, 2.3212] as [number, number], type: "client" as const },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <FranchiseSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Analytiques</h1>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Revenu Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€4,532.89</div>
              <p className="text-xs text-muted-foreground mt-1">+12.5% du mois dernier</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Commandes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">324</div>
              <p className="text-xs text-muted-foreground mt-1">+5.2% du mois dernier</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground mt-1">+18.3% du mois dernier</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8/5</div>
              <p className="text-xs text-muted-foreground mt-1">+0.2 du mois dernier</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Ventes Mensuelles</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="ventes" stroke="#F97316" fill="#FEC6A1" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Produits Populaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Burger Classic", sales: 76, percentage: 24 },
                  { name: "Frites Maison", sales: 62, percentage: 19 },
                  { name: "Pizza Margherita", sales: 53, percentage: 16 },
                  { name: "Salade César", sales: 41, percentage: 13 },
                  { name: "Tiramisu", sales: 29, percentage: 9 },
                ].map((product, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-full">
                      <div className="flex justify-between mb-1">
                        <span>{product.name}</span>
                        <span className="font-medium">{product.sales} ventes</span>
                      </div>
                      <div className="w-full bg-muted h-2 rounded-full">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${product.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-6">
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Carte des Livraisons</CardTitle>
              <div className="flex space-x-2">
                <Button 
                  variant={mapView === 'heatmap' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setMapView('heatmap')}
                >
                  Zones chaudes
                </Button>
                <Button 
                  variant={mapView === 'delivery' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setMapView('delivery')}
                >
                  Livraisons
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DeliveryMap
                center={franchiseLocation}
                zoom={13}
                locations={deliveryLocations}
                height="400px"
                showRoute={false}
              />
              <div className="mt-4">
                <h3 className="text-sm font-medium">Statistiques de livraison</h3>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div className="bg-muted/30 p-3 rounded-md">
                    <p className="text-sm text-muted-foreground">Distance moyenne</p>
                    <p className="font-medium">2.8 km</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <p className="text-sm text-muted-foreground">Temps moyen</p>
                    <p className="font-medium">18 min</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <p className="text-sm text-muted-foreground">Zone populaire</p>
                    <p className="font-medium">Saint-Germain</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Commandes par Heure</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { heure: '11h', commandes: 12 },
                    { heure: '12h', commandes: 28 },
                    { heure: '13h', commandes: 35 },
                    { heure: '14h', commandes: 22 },
                    { heure: '15h', commandes: 15 },
                    { heure: '16h', commandes: 10 },
                    { heure: '17h', commandes: 14 },
                    { heure: '18h', commandes: 25 },
                    { heure: '19h', commandes: 42 },
                    { heure: '20h', commandes: 38 },
                    { heure: '21h', commandes: 30 },
                    { heure: '22h', commandes: 18 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="heure" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="commandes" fill="#F97316" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Méthodes de Paiement</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Carte Bancaire', value: 68 },
                      { name: 'PayPal', value: 15 },
                      { name: 'Apple Pay', value: 10 },
                      { name: 'Google Pay', value: 5 },
                      { name: 'Espèces', value: 2 },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {[
                      { name: 'Carte Bancaire', value: 68 },
                      { name: 'PayPal', value: 15 },
                      { name: 'Apple Pay', value: 10 },
                      { name: 'Google Pay', value: 5 },
                      { name: 'Espèces', value: 2 },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Part']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FranchiseAnalytics;
