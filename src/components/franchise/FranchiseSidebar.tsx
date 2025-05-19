
import { Link, useLocation } from "react-router-dom";
import { Home, PackageOpen, BarChart3, Settings, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const FranchiseSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: "Tableau de bord", path: "/franchise" },
    { icon: PackageOpen, label: "Commandes", path: "/franchise/orders" },
    { icon: Menu, label: "Menu", path: "/franchise/menu" },
    { icon: BarChart3, label: "Analyses", path: "/franchise/analytics" },
    { icon: Settings, label: "Paramètres", path: "/franchise/settings" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const NavLink = ({ item }: { item: typeof menuItems[0] }) => (
    <Link
      to={item.path}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                ${isActive(item.path)
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"}`}
    >
      <item.icon size={18} />
      <span>{item.label}</span>
    </Link>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col h-screen w-56 border-r bg-background p-4 fixed">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-primary">GoodFood</h1>
          <p className="text-xs text-muted-foreground">Espace Franchise</p>
        </div>
        
        <nav className="space-y-1 flex-1">
          {menuItems.map((item) => (
            <NavLink key={item.path} item={item} />
          ))}
        </nav>
        
        <div className="pt-4 border-t mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="font-medium text-xs text-primary-foreground">FR</span>
            </div>
            <div>
              <p className="text-sm font-medium">Restaurant Demo</p>
              <p className="text-xs text-muted-foreground">Administrateur</p>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Mobile Sidebar */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu size={18} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="p-4">
              <h1 className="text-xl font-bold text-primary">GoodFood</h1>
              <p className="text-xs text-muted-foreground">Espace Franchise</p>
            </div>
            <nav className="space-y-1 p-4">
              {menuItems.map((item) => (
                <NavLink key={item.path} item={item} />
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default FranchiseSidebar;
