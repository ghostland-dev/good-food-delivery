
import { Link, useLocation } from "react-router-dom";
import { Home, Package, User, DollarSign, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const DriverHeader = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Accueil", path: "/driver" },
    { icon: Package, label: "Livraisons", path: "/driver/orders" },
    { icon: User, label: "Profil", path: "/driver/profile" },
    { icon: DollarSign, label: "Gains", path: "/driver/earnings" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-background border-b sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            {/* Mobile menu trigger */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu size={18} />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <div className="p-4">
                    <h1 className="text-xl font-bold text-primary">GoodFood</h1>
                    <p className="text-xs text-muted-foreground">Espace Livreur</p>
                  </div>
                  <nav className="space-y-1 p-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                          ${isActive(item.path)
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"}`}
                      >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
            
            <Link to="/driver" className="flex items-center">
              <h1 className="text-xl font-bold text-primary">GoodFood</h1>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors
                  ${isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"}`}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          
          {/* User avatar */}
          <div className="flex items-center gap-2">
            <span className="text-sm hidden md:inline-block">Thomas D.</span>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-primary-foreground">TD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DriverHeader;
