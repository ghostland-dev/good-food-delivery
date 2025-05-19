
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import RestaurantsPage from "./pages/RestaurantsPage";
import RestaurantDetail from "./pages/RestaurantDetail";
import CategoriesPage from "./pages/CategoriesPage";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import UserAccount from "./pages/UserAccount";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import FranchiseHome from "./pages/franchise/FranchiseHome";
import FranchiseOrders from "./pages/franchise/FranchiseOrders";
import FranchiseMenu from "./pages/franchise/FranchiseMenu";
import FranchiseAnalytics from "./pages/franchise/FranchiseAnalytics";
import FranchiseSettings from "./pages/franchise/FranchiseSettings";
import DriverHome from "./pages/driver/DriverHome";
import DriverOrders from "./pages/driver/DriverOrders";
import DriverProfile from "./pages/driver/DriverProfile";
import DriverEarnings from "./pages/driver/DriverEarnings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:id" element={<CategoriesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<UserAccount />} />
          
          {/* Franchise Routes */}
          <Route path="/franchise" element={<FranchiseHome />} />
          <Route path="/franchise/orders" element={<FranchiseOrders />} />
          <Route path="/franchise/menu" element={<FranchiseMenu />} />
          <Route path="/franchise/analytics" element={<FranchiseAnalytics />} />
          <Route path="/franchise/settings" element={<FranchiseSettings />} />
          
          {/* Driver Routes */}
          <Route path="/driver" element={<DriverHome />} />
          <Route path="/driver/orders" element={<DriverOrders />} />
          <Route path="/driver/profile" element={<DriverProfile />} />
          <Route path="/driver/earnings" element={<DriverEarnings />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
