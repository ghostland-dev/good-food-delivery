
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-full bg-goodfood-300 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-goodfood-700"
              >
                <path d="M15 11h.01" />
                <path d="M11 15h.01" />
                <path d="M16 16h.01" />
                <path d="m2 16 20 6-6-20A20 20 0 0 0 2 16" />
                <path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4" />
              </svg>
            </div>
            <span className="text-xl font-bold text-goodfood-500">Good Food</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/restaurants" className="text-foreground hover:text-goodfood-500 transition-colors">
            Restaurants
          </Link>
          <Link to="/categories" className="text-foreground hover:text-goodfood-500 transition-colors">
            Catégories
          </Link>
          <Link to="/about" className="text-foreground hover:text-goodfood-500 transition-colors">
            À propos
          </Link>
          <Link to="/contact" className="text-foreground hover:text-goodfood-500 transition-colors">
            Contact
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-2">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-goodfood-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>
          <Link to="/login">
            <Button className="bg-goodfood-300 text-foreground hover:bg-goodfood-400">
              <User className="mr-2 h-4 w-4" />
              Connexion
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-30 bg-white p-4 flex flex-col animate-fade-in">
          <nav className="flex flex-col gap-4 py-4">
            <Link 
              to="/restaurants" 
              className="text-foreground hover:text-goodfood-500 transition-colors text-lg py-2 border-b"
              onClick={() => setIsMenuOpen(false)}
            >
              Restaurants
            </Link>
            <Link 
              to="/categories" 
              className="text-foreground hover:text-goodfood-500 transition-colors text-lg py-2 border-b"
              onClick={() => setIsMenuOpen(false)}
            >
              Catégories
            </Link>
            <Link 
              to="/about" 
              className="text-foreground hover:text-goodfood-500 transition-colors text-lg py-2 border-b"
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </Link>
            <Link 
              to="/contact" 
              className="text-foreground hover:text-goodfood-500 transition-colors text-lg py-2 border-b"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/cart" 
              className="flex items-center gap-2 text-foreground hover:text-goodfood-500 transition-colors text-lg py-2 border-b"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart className="h-5 w-5" /> 
              Panier
              <span className="ml-1 bg-goodfood-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link 
              to="/login" 
              className="flex items-center gap-2 text-foreground hover:text-goodfood-500 transition-colors text-lg py-2 border-b"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-5 w-5" />
              Connexion
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
