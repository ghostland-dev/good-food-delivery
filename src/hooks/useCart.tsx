
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  restaurantId: number;
  restaurantName: string;
}

interface UseCartReturn {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getCartRestaurantId: () => number | null;
  getCartRestaurantName: () => string;
}

export const useCart = (): UseCartReturn => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Charger le panier depuis le localStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem("goodfood_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
  }, []);

  // Mettre à jour le localStorage lorsque le panier change
  useEffect(() => {
    localStorage.setItem("goodfood_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setCart((prev) => {
      // Vérifier si on essaie d'ajouter un item d'un restaurant différent
      if (prev.length > 0 && prev[0].restaurantId !== item.restaurantId) {
        toast({
          title: "Attention",
          description: "Votre panier contient des articles d'un autre restaurant. Voulez-vous vider votre panier?",
          action: (
            <button 
              onClick={() => {
                setCart([{ ...item, quantity: item.quantity || 1 }]);
                toast({
                  title: "Panier mis à jour",
                  description: "Votre panier a été vidé et l'article a été ajouté."
                });
              }}
              className="bg-goodfood-500 text-white px-3 py-1.5 rounded text-xs font-medium"
            >
              Vider et ajouter
            </button>
          )
        });
        return prev;
      }

      // Sinon, ajouter normalement
      const itemIndex = prev.findIndex((cartItem) => cartItem.id === item.id);
      if (itemIndex > -1) {
        const updatedCart = [...prev];
        updatedCart[itemIndex].quantity += item.quantity || 1;
        return updatedCart;
      } else {
        return [...prev, { ...item, quantity: item.quantity || 1 }];
      }
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartRestaurantId = () => {
    return cart.length > 0 ? cart[0].restaurantId : null;
  };

  const getCartRestaurantName = () => {
    return cart.length > 0 ? cart[0].restaurantName : "";
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    getCartRestaurantId,
    getCartRestaurantName
  };
};
