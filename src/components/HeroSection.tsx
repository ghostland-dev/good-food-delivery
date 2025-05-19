
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80")',
        }}
      />
      <div className="container relative z-10 py-12 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Vos restaurants préférés,{" "}
            <span className="text-goodfood-500">livrés chez vous</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Découvrez les meilleurs plats de votre quartier et faites-vous livrer en quelques clics.
          </p>

          <div className="bg-white shadow-lg rounded-full flex items-center p-1 mb-10 max-w-md">
            <Search className="ml-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Entrez votre adresse"
              className="flex-1 py-2 px-4 bg-transparent border-none focus:outline-none text-sm md:text-base rounded-full"
            />
            <Button className="bg-goodfood-500 hover:bg-goodfood-600 rounded-full">
              Trouver des restaurants
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <Button
              className="bg-goodfood-300 text-foreground hover:bg-goodfood-400"
              size="lg"
              asChild
            >
              <Link to="/restaurants">Explorer les restaurants</Link>
            </Button>
            <Button
              variant="outline"
              className="border-goodfood-300 text-foreground hover:bg-goodfood-100"
              size="lg"
              asChild
            >
              <Link to="/signup">Devenir livreur</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
