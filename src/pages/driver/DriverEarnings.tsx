
import React from 'react';
import DriverHeader from '@/components/driver/DriverHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data for earnings charts
const weeklyData = [
  { day: 'Lun', earnings: 45 },
  { day: 'Mar', earnings: 52 },
  { day: 'Mer', earnings: 38 },
  { day: 'Jeu', earnings: 61 },
  { day: 'Ven', earnings: 78 },
  { day: 'Sam', earnings: 87 },
  { day: 'Dim', earnings: 65 },
];

const monthlyData = [
  { week: 'Sem 1', earnings: 312 },
  { week: 'Sem 2', earnings: 287 },
  { week: 'Sem 3', earnings: 345 },
  { week: 'Sem 4', earnings: 392 },
];

const earningsBreakdown = [
  { name: 'Livraisons', value: 75 },
  { name: 'Pourboires', value: 15 },
  { name: 'Primes', value: 10 },
];

const COLORS = ['#fb923c', '#d97706', '#fdba74'];

const DriverEarnings = () => {
  return (
    <div className="min-h-screen bg-background">
      <DriverHeader />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mes revenus</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-muted-foreground">Cette semaine</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">426,00 €</p>
              <p className="text-sm text-green-600">+8.2% par rapport à la semaine dernière</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-muted-foreground">Ce mois</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1 336,00 €</p>
              <p className="text-sm text-green-600">+12.5% par rapport au mois dernier</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-muted-foreground">Total des pourboires</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">87,50 €</p>
              <p className="text-sm text-muted-foreground">Ce mois</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="weekly" className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="weekly">Hebdomadaire</TabsTrigger>
              <TabsTrigger value="monthly">Mensuel</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Télécharger</Button>
              <Button variant="outline" size="sm">Filtrer</Button>
            </div>
          </div>
          
          <Card>
            <TabsContent value="weekly" className="mt-0">
              <CardHeader>
                <CardTitle>Revenus hebdomadaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={weeklyData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} €`, 'Revenus']} />
                      <Line type="monotone" dataKey="earnings" stroke="#fb923c" strokeWidth={3} dot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="monthly" className="mt-0">
              <CardHeader>
                <CardTitle>Revenus mensuels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} €`, 'Revenus']} />
                      <Line type="monotone" dataKey="earnings" stroke="#fb923c" strokeWidth={3} dot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </TabsContent>
          </Card>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Répartition des revenus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={earningsBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {earningsBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, '']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Historique des paiements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: '15 Mai 2025', amount: '685,00 €', status: 'Payé' },
                  { date: '1 Mai 2025', amount: '651,00 €', status: 'Payé' },
                  { date: '15 Avril 2025', amount: '592,50 €', status: 'Payé' },
                  { date: '1 Avril 2025', amount: '578,25 €', status: 'Payé' },
                ].map((payment, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">{payment.date}</p>
                      <p className="text-sm text-muted-foreground">Virement bancaire</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{payment.amount}</p>
                      <p className="text-sm text-green-600">{payment.status}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="ghost" className="w-full mt-4">Voir tout l'historique</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverEarnings;
