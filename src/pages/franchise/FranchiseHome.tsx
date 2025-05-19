
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FranchiseSidebar from "@/components/franchise/FranchiseSidebar";
import { ArrowUp, ArrowDown, Users, Package, DollarSign } from "lucide-react";

const FranchiseHome = () => {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <FranchiseSidebar />
      
      <main className="flex-1 lg:ml-56 p-4 md:p-6">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Tableau de bord</h1>
              <p className="text-muted-foreground">Bienvenue dans votre espace franchise</p>
            </div>
            <Button>Nouvelle promotion</Button>
          </div>
        </header>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Chiffre d'affaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-2xl font-bold">2 340 €</p>
                  <p className="text-sm text-green-600 flex items-center">
                    <ArrowUp size={14} className="mr-1" /> +12%
                  </p>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Commandes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-sm text-green-600 flex items-center">
                    <ArrowUp size={14} className="mr-1" /> +18%
                  </p>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <Package className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Nouveaux clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-green-600 flex items-center">
                    <ArrowUp size={14} className="mr-1" /> +8%
                  </p>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Panier moyen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-2xl font-bold">24,50 €</p>
                  <p className="text-sm text-red-600 flex items-center">
                    <ArrowDown size={14} className="mr-1" /> -3%
                  </p>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Commandes récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between items-center border-b pb-2 last:border-0">
                    <div>
                      <p className="font-medium">Commande #{1000 + i}</p>
                      <p className="text-sm text-muted-foreground">Il y a {i * 10} minutes</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{(18.5 + i * 2).toFixed(2)} €</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        i % 3 === 0 ? "bg-yellow-100 text-yellow-800" :
                        i % 3 === 1 ? "bg-green-100 text-green-800" :
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {i % 3 === 0 ? "En préparation" :
                         i % 3 === 1 ? "Terminé" :
                         "En livraison"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Produits populaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Burger Classic", "Frites Maison", "Coca-Cola", "Salade César"].map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b pb-2 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                        <span className="text-xs font-medium">{i + 1}</span>
                      </div>
                      <p className="font-medium">{item}</p>
                    </div>
                    <p className="text-sm font-medium">{120 - i * 15} ventes</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default FranchiseHome;
