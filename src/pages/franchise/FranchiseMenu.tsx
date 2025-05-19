
import { useState } from "react";
import FranchiseSidebar from "@/components/franchise/FranchiseSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Burger Classic",
    description: "Bœuf, cheddar, salade, tomate, oignon, sauce spéciale",
    price: 9.90,
    category: "burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Burger Cheese",
    description: "Double bœuf, double cheddar, oignon, ketchup",
    price: 10.90,
    category: "burgers",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Burger Végétarien",
    description: "Steak végétal, salade, tomate, oignon, sauce aux herbes",
    price: 9.50,
    category: "burgers",
    image: "https://images.unsplash.com/photo-1550950158-d0d960dff51b?w=500&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Frites Maison",
    description: "Pommes de terre fraîches, sel de mer",
    price: 3.90,
    category: "sides",
    image: "https://images.unsplash.com/photo-1630384060421-082abb3c4860?w=500&h=300&fit=crop"
  },
  {
    id: 5,
    name: "Onion Rings",
    description: "Oignons frais, pâte à frire croustillante",
    price: 4.50,
    category: "sides",
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=500&h=300&fit=crop"
  },
  {
    id: 6,
    name: "Coca-Cola",
    description: "33cl, avec ou sans glaçons",
    price: 2.50,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=500&h=300&fit=crop"
  },
  {
    id: 7,
    name: "Limonade Maison",
    description: "Citrons frais, sucre de canne, menthe",
    price: 3.90,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&h=300&fit=crop"
  }
];

const FranchiseMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCategory, setCurrentCategory] = useState("all");
  
  // Filter menu items based on search term and current category
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (currentCategory === "all") return matchesSearch;
    return matchesSearch && item.category === currentCategory;
  });

  const handleEditItem = (id: number) => {
    toast({
      title: "Modification du produit",
      description: `Le produit #${id} est en cours d'édition.`
    });
  };

  const handleDeleteItem = (id: number) => {
    toast({
      title: "Produit supprimé",
      description: `Le produit #${id} a été supprimé.`,
      variant: "destructive"
    });
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      <FranchiseSidebar />
      
      <main className="flex-1 lg:ml-56 p-4 md:p-6">
        <header className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Menu du restaurant</h1>
              <p className="text-muted-foreground">Gérez les articles de votre menu</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un produit
            </Button>
          </div>
        </header>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un produit"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" onValueChange={setCurrentCategory}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="burgers">Burgers</TabsTrigger>
            <TabsTrigger value="sides">Accompagnements</TabsTrigger>
            <TabsTrigger value="drinks">Boissons</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button 
                        variant="secondary" 
                        size="icon"
                        onClick={() => handleEditItem(item.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <span className="text-lg font-bold">{item.price.toFixed(2)} €</span>
                    <span className="text-muted-foreground capitalize">{item.category}</span>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredItems.length === 0 && (
              <div className="bg-background border rounded-lg p-8 text-center">
                <p className="text-muted-foreground">Aucun produit ne correspond à votre recherche</p>
              </div>
            )}
          </TabsContent>
          
          {/* Les autres onglets utilisent la même logique de filtrage */}
          <TabsContent value="burgers" className="mt-0">
            {/* Contenu filtré par la logique ci-dessus */}
          </TabsContent>
          
          <TabsContent value="sides" className="mt-0">
            {/* Contenu filtré par la logique ci-dessus */}
          </TabsContent>
          
          <TabsContent value="drinks" className="mt-0">
            {/* Contenu filtré par la logique ci-dessus */}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default FranchiseMenu;
