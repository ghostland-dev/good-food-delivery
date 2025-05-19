
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FranchiseSidebar from "@/components/franchise/FranchiseSidebar";

const FranchiseAnalytics = () => {
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
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Graphique des ventes mensuelles</p>
              </div>
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
      </div>
    </div>
  );
};

export default FranchiseAnalytics;
