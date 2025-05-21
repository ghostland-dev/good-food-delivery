
import { Button } from "@/components/ui/button";
import { ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { CartItem } from "@/hooks/useCart";

interface CartSidebarProps {
  cartItems: CartItem[];
  restaurantName: string;
  minimumOrder: number;
  deliveryFee: string;
  onRemoveItem: (itemId: number) => void;
  onUpdateQuantity: (itemId: number, quantity: number) => void;
  onCheckout: () => void;
  getTotal: () => number;
}

const CartSidebar = ({
  cartItems,
  restaurantName,
  minimumOrder,
  deliveryFee,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
  getTotal
}: CartSidebarProps) => {
  const numericDeliveryFee = parseFloat(deliveryFee.replace(",", "."));
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = getTotal();

  return (
    <div className="bg-white border rounded-lg p-4">
      <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
        <ShoppingBag className="h-5 w-5" />
        Votre commande
      </h3>

      {cartItems.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          <p>Votre panier est vide</p>
          <p className="text-sm mt-2">
            Commande minimum: {minimumOrder} €
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm mb-3 font-medium">{restaurantName}</p>
          <div className="max-h-64 overflow-y-auto mb-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-2 border-b last:border-b-0"
              >
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">
                    {item.price.toFixed(2)} €
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between">
              <span>Sous-total</span>
              <span>{subtotal.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between">
              <span>Frais de livraison</span>
              <span>{deliveryFee}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total</span>
              <span>
                {(subtotal + numericDeliveryFee).toFixed(2)} €
              </span>
            </div>
          </div>

          <Button
            className="w-full mt-4 bg-goodfood-500 hover:bg-goodfood-600"
            onClick={onCheckout}
            disabled={subtotal < minimumOrder}
          >
            {subtotal < minimumOrder
              ? `Minimum ${minimumOrder} €`
              : `Passer la commande (${totalItems})`}
          </Button>
        </>
      )}
    </div>
  );
};

export default CartSidebar;
