
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import DriverHeader from "@/components/driver/DriverHeader";

const DriverEarnings = () => {
  const currentWeekEarnings = [
    { date: 'Lun', amount: 45.20 },
    { date: 'Mar', amount: 38.50 },
    { date: 'Mer', amount: 52.10 },
    { date: 'Jeu', amount: 28.75 },
    { date: 'Ven', amount: 63.90 },
    { date: 'Sam', amount: 85.25 },
    { date: 'Dim', amount: 76.60 }
  ];
  
  const currentMonthEarnings = [
    { week: 'Semaine 1', amount: 243.40 },
    { week: 'Semaine 2', amount: 317.25 },
    { week: 'Semaine 3', amount: 290.80 },
    { week: 'Semaine 4', amount: 328.50 }
  ];

  const paymentHistory = [
    { date: '10/05/2025', amount: 317.25, status: 'Payé' },
    { date: '03/05/2025', amount: 243.40, status: 'Payé' },
    { date: '26/04/2025', amount: 328.50, status: 'Payé' },
    { date: '19/04/2025', amount: 290.80, status: 'Payé' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DriverHeader />
      <div className="container px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mes Revenus</h1>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Revenus aujourd'hui</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€76.60</div>
              <p className="text-xs text-muted-foreground mt-1">8 livraisons</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Cette semaine</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€390.30</div>
              <p className="text-xs text-muted-foreground mt-1">42 livraisons</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ce mois</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€1,179.95</div>
              <p className="text-xs text-muted-foreground mt-1">127 livraisons</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="week" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="week">Cette Semaine</TabsTrigger>
            <TabsTrigger value="month">Ce Mois</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>
          
          <TabsContent value="week">
            <Card>
              <CardHeader>
                <CardTitle>Revenus Hebdomadaires</CardTitle>
                <CardDescription>Vos revenus pour la semaine du 13 mai au 19 mai 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72 flex items-end justify-between gap-2 pb-4 px-4">
                  {currentWeekEarnings.map((day) => (
                    <div key={day.date} className="flex flex-col items-center w-full">
                      <div className="w-full bg-goodfood-300 rounded-t-md" style={{ height: `${day.amount * 1.5}px` }}></div>
                      <p className="text-sm mt-2">{day.date}</p>
                      <p className="text-xs font-medium">{day.amount.toFixed(2)}€</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6 pt-6 border-t border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-lg font-bold">€390.30</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Livraisons</p>
                    <p className="text-lg font-bold">42</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Moyenne</p>
                    <p className="text-lg font-bold">€9.29 / livraison</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="month">
            <Card>
              <CardHeader>
                <CardTitle>Revenus Mensuels</CardTitle>
                <CardDescription>Vos revenus pour le mois de mai 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-end justify-between gap-8 pb-4 px-4">
                  {currentMonthEarnings.map((week) => (
                    <div key={week.week} className="flex flex-col items-center w-full">
                      <div className="w-full bg-goodfood-300 rounded-t-md" style={{ height: `${week.amount / 2}px` }}></div>
                      <p className="text-sm mt-2">{week.week}</p>
                      <p className="text-xs font-medium">{week.amount.toFixed(2)}€</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6 pt-6 border-t border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Total du mois</p>
                    <p className="text-lg font-bold">€1,179.95</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Livraisons</p>
                    <p className="text-lg font-bold">127</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Moyenne</p>
                    <p className="text-lg font-bold">€9.29 / livraison</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Historique de paiements</CardTitle>
                <CardDescription>Vos derniers paiements reçus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md divide-y">
                  {paymentHistory.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Paiement hebdomadaire</p>
                        <p className="text-sm text-muted-foreground">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">€{payment.amount.toFixed(2)}</p>
                        <p className="text-sm text-green-600">{payment.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  Voir tout l'historique
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Paramètres de paiement</CardTitle>
            <CardDescription>Configurer vos informations de paiement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-md mb-4">
              <p className="font-medium">Méthode de paiement actuelle</p>
              <p className="text-sm text-muted-foreground">Virement bancaire sur le compte **** 6789</p>
            </div>
            <Button variant="outline">Modifier mes informations bancaires</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverEarnings;
