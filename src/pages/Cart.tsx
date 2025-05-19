
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShoppingCart, Trash2, CreditCard, MapPin, ChevronRight, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Burger Classic", price: 10, quantity: 1, image: "/placeholder.svg" },
    { id: 2, name: "Frites Maison", price: 4, quantity: 2, image: "/placeholder.svg" },
    { id: 3, name: "Boisson", price: 3, quantity: 1, image: "/placeholder.svg" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast({
      title: "Article supprimé",
      description: "L'article a été retiré de votre panier",
    });
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Panier vidé",
      description: "Tous les articles ont été retirés de votre panier",
    });
  };

  const handleCheckout = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Commande confirmée",
        description: "Votre commande a été traitée avec succès !",
      });
      setCartItems([]);
      navigate("/");
    }, 1500);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 2.99;
  const finalTotal = totalPrice + deliveryFee;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Votre Panier</h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Articles ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={clearCart}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Vider le panier
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b pb-4">
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-muted-foreground">{item.price.toFixed(2)} €</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </Button>
                            </div>
                            
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-red-500 hover:text-red-700"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline"
                      onClick={() => navigate('/restaurants')}
                    >
                      Continuer les achats
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Adresse de livraison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Domicile</p>
                          <p className="text-sm text-muted-foreground">123 Rue de la Paix, 75001 Paris</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Modifier
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Résumé</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-sm">
                          <span>{item.name} x {item.quantity}</span>
                          <span>{(item.price * item.quantity).toFixed(2)} €</span>
                        </div>
                      ))}
                      
                      <div className="border-t pt-4 mt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>Sous-total</span>
                          <span>{totalPrice.toFixed(2)} €</span>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-2">
                          <span>Frais de livraison</span>
                          <span>{deliveryFee.toFixed(2)} €</span>
                        </div>
                        <div className="flex items-center justify-between font-medium mt-4 pt-2 border-t">
                          <span>Total</span>
                          <span>{finalTotal.toFixed(2)} €</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col space-y-4">
                    <Button 
                      className="w-full bg-goodfood-300 hover:bg-goodfood-400 text-foreground flex items-center justify-center gap-2"
                      onClick={handleCheckout}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        "Traitement en cours..."
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4" />
                          Passer la commande
                          <ChevronRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                    
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Livraison estimée : 30-45 minutes
                      </AlertDescription>
                    </Alert>
                  </CardFooter>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Votre panier est vide</h2>
              <p className="text-muted-foreground mb-6">Découvrez nos restaurants et ajoutez des produits à votre panier.</p>
              <Button 
                className="bg-goodfood-300 hover:bg-goodfood-400 text-foreground" 
                onClick={() => navigate('/restaurants')}
              >
                Explorer les restaurants
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
