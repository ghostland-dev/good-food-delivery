
import React from 'react';
import FranchiseSidebar from '@/components/franchise/FranchiseSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

// Sample data for charts
const salesData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const ordersByType = [
  { name: 'Livraison', value: 400 },
  { name: 'A emporter', value: 300 },
  { name: 'Sur place', value: 200 },
];

const FranchiseAnalytics = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <FranchiseSidebar />
      
      <div className="flex-1 p-4 lg:p-8 lg:ml-56">
        <h1 className="text-3xl font-bold mb-6">Analyses</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sales chart */}
          <Card>
            <CardHeader>
              <CardTitle>Chiffre d'affaires mensuel</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={salesData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#fb923c" fill="#fed7aa" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Orders by type */}
          <Card>
            <CardHeader>
              <CardTitle>Commandes par type</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ordersByType}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Nombre de commandes" fill="#fb923c" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance des produits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Produit</th>
                      <th className="text-left py-3 px-4">Commandes</th>
                      <th className="text-left py-3 px-4">Revenu</th>
                      <th className="text-left py-3 px-4">Évaluation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">Burger Classic</td>
                      <td className="py-3 px-4">128</td>
                      <td className="py-3 px-4">1,280€</td>
                      <td className="py-3 px-4">4.8/5</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">Frites Maison</td>
                      <td className="py-3 px-4">95</td>
                      <td className="py-3 px-4">380€</td>
                      <td className="py-3 px-4">4.7/5</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">Pizza Margherita</td>
                      <td className="py-3 px-4">76</td>
                      <td className="py-3 px-4">912€</td>
                      <td className="py-3 px-4">4.5/5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FranchiseAnalytics;
