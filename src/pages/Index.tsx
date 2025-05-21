
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import RestaurantSection from "@/components/RestaurantSection";
import AppSection from "@/components/AppSection";
import TestimonialSection from "@/components/TestimonialSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeliveryMap from "@/components/map/DeliveryMap";
import { LatLngTuple } from "leaflet";

const Index = () => {
  // Sample data for the map to showcase delivery functionality on homepage
  const locations = [
    {
      name: "GoodFood HQ",
      position: [48.8566, 2.3522] as LatLngTuple,
      type: "restaurant" as const,
      description: "Notre siège social"
    },
    {
      name: "Livraison en cours",
      position: [48.8606, 2.3376] as LatLngTuple,
      type: "client" as const,
      description: "Livraison prévue dans 10 minutes"
    }
  ];

  // Properly define the route path as an array of LatLngTuple
  const routePath: LatLngTuple[] = [
    [48.8566, 2.3522] as LatLngTuple,
    [48.8580, 2.3450] as LatLngTuple,
    [48.8595, 2.3420] as LatLngTuple,
    [48.8606, 2.3376] as LatLngTuple
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <CategorySection />
        <RestaurantSection />
        
        {/* Showcase map feature with improved visuals */}
        <section className="bg-gradient-to-b from-muted/30 to-background py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Suivez vos livraisons en temps réel</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Notre technologie de pointe vous permet de suivre votre commande 
                en temps réel, de la cuisine jusqu'à votre porte.
              </p>
            </div>
            <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg">
              <DeliveryMap 
                locations={locations}
                routePath={routePath}
                height="400px"
                zoom={14}
                center={[48.8586, 2.3450] as LatLngTuple}
                className="w-full border border-muted rounded-xl"
              />
            </div>
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Utilisez notre application mobile pour profiter pleinement du suivi GPS.
              </p>
            </div>
          </div>
        </section>
        
        <AppSection />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
