
import DriverHeader from "@/components/driver/DriverHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

const DriverProfile = () => {
  const handleSaveProfile = () => {
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été mises à jour avec succès."
    });
  };
  
  const handleSaveVehicle = () => {
    toast({
      title: "Véhicule mis à jour",
      description: "Les informations de votre véhicule ont été mises à jour avec succès."
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <DriverHeader />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Mon profil</h1>
          <p className="text-muted-foreground">Gérez vos informations personnelles</p>
        </header>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="space-y-1">
                <div className="w-20 h-20 mx-auto bg-primary rounded-full flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-primary-foreground">TD</span>
                </div>
                <CardTitle className="text-center">Thomas Dupont</CardTitle>
                <CardDescription className="text-center">Livreur depuis avril 2023</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-center text-sm space-y-1">
                  <p className="font-medium">Note moyenne</p>
                  <div className="flex items-center justify-center">
                    <span className="text-2xl font-bold">4.8</span>
                    <span className="text-yellow-500 ml-1">★</span>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-2 py-2">
                  <div className="text-center text-sm">
                    <p className="text-muted-foreground">Livraisons</p>
                    <p className="font-medium text-lg">284</p>
                  </div>
                  <div className="text-center text-sm">
                    <p className="text-muted-foreground">Km parcourus</p>
                    <p className="font-medium text-lg">1,462</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input id="firstName" defaultValue="Thomas" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" defaultValue="Dupont" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="thomas.dupont@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" defaultValue="06 12 34 56 78" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input id="address" defaultValue="15 Rue des Lilas" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zipcode">Code postal</Label>
                      <Input id="zipcode" defaultValue="75011" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="city">Ville</Label>
                      <Input id="city" defaultValue="Paris" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveProfile}>Enregistrer</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Informations du véhicule</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleType">Type de véhicule</Label>
                      <Select defaultValue="bike">
                        <SelectTrigger id="vehicleType">
                          <SelectValue placeholder="Sélectionnez un type de véhicule" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bike">Vélo</SelectItem>
                          <SelectItem value="ebike">Vélo électrique</SelectItem>
                          <SelectItem value="scooter">Scooter</SelectItem>
                          <SelectItem value="car">Voiture</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model">Marque / Modèle</Label>
                      <Input id="model" defaultValue="Decathlon Triban RC520" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveVehicle}>Enregistrer</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>
                  Documents nécessaires pour les livraisons
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Carte d'identité</p>
                        <p className="text-sm text-muted-foreground">Expire le 15/06/2030</p>
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Vérifié</span>
                    </div>
                  </div>
                  
                  <div className="border rounded p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Justificatif de domicile</p>
                        <p className="text-sm text-muted-foreground">Téléchargé le 02/04/2023</p>
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Vérifié</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Button variant="outline">Gérer les documents</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DriverProfile;
