
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    userType: "client"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Compte créé",
      description: `Votre compte ${formData.userType} a été créé avec succès.`,
    });
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary">GoodFood</h2>
            <p className="mt-2 text-muted-foreground">Créer votre compte</p>
          </div>

          <Tabs defaultValue="client" onValueChange={(value) => setFormData({...formData, userType: value})}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="client">Client</TabsTrigger>
              <TabsTrigger value="franchise">Franchise</TabsTrigger>
              <TabsTrigger value="driver">Livreur</TabsTrigger>
            </TabsList>
            
            <TabsContent value="client" className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground">
                    J'accepte les conditions générales d'utilisation
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-goodfood-300 hover:bg-goodfood-400 text-foreground">Créer un compte</Button>
              </form>
            </TabsContent>
            
            <TabsContent value="franchise" className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du restaurant</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email professionnel</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground">
                    J'accepte les conditions générales pour les franchises
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-goodfood-300 hover:bg-goodfood-400 text-foreground">Rejoindre en tant que franchise</Button>
              </form>
            </TabsContent>
            
            <TabsContent value="driver" className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox id="vehicle" />
                  <Label htmlFor="vehicle" className="text-sm text-muted-foreground">
                    Je possède un véhicule pour effectuer des livraisons
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground">
                    J'accepte les conditions générales pour les livreurs
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-goodfood-300 hover:bg-goodfood-400 text-foreground">Rejoindre en tant que livreur</Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="text-center text-sm text-muted-foreground">
            Vous avez déjà un compte?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Se connecter
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
