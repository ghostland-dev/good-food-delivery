
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import RestaurantSection from "@/components/RestaurantSection";
import AppSection from "@/components/AppSection";
import TestimonialSection from "@/components/TestimonialSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeliveryMap from "@/components/map/DeliveryMap";

const Index = () => {
  // Sample data for the map to showcase delivery functionality on homepage
  const locations = [
    {
      name: "GoodFood HQ",
      position: [48.8566, 2.3522] as [number, number],
      type: "restaurant" as const,
      description: "Notre siège social"
    },
    {
      name: "Livraison en cours",
      position: [48.8606, 2.3376] as [number, number],
      type: "client" as const,
      description: "Livraison prévue dans 10 minutes"
    }
  ];

  const routePath = [
    [48.8566, 2.3522],
    [48.8580, 2.3450],
    [48.8595, 2.3420],
    [48.8606, 2.3376]
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <CategorySection />
        <RestaurantSection />
        
        {/* Showcase map feature */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Suivez vos livraisons en temps réel</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Notre technologie de pointe vous permet de suivre votre commande 
                en temps réel, de la cuisine jusqu'à votre porte.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <DeliveryMap 
                locations={locations}
                routePath={routePath}
                height="400px"
                zoom={14}
              />
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
