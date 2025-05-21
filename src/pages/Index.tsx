
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import RestaurantSection from "@/components/RestaurantSection";
import AppSection from "@/components/AppSection";
import TestimonialSection from "@/components/TestimonialSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <CategorySection />
        <RestaurantSection />
        <AppSection />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
