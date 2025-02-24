import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/store/cart-store";
import { ShoppingCart, Trash2, Loader2, Plus, Minus } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/store/auth-store";
import { useToast } from "@/hooks/use-toast";
import { LoginDialog } from "./login-dialog";
import { formatCurrency } from "@/config";
import { useLocation } from "wouter";

export function Cart() {
  const { items, removeFromCart, clearCart, total, isLoading, fetchCart, addToCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [_, setLocation] = useLocation();

  useEffect(() => {
    if (user && isOpen) {
      fetchCart().catch((error) => {
        if (error.message.includes("Session expired")) {
          setShowLoginDialog(true);
        } else if (!error.message.includes("Cart is empty")) {
          toast({
            variant: "destructive",
            title: "Error",
            description: error.message,
          });
        }
      });
    }
  }, [user, fetchCart, isOpen, toast]);

  const handleQuantityChange = async (item, newQuantity) => {
    try {
      if (newQuantity < 1) {
        await removeFromCart(item.productId);
        toast({
          title: "Item removed",
          description: "Item has been removed from your cart",
        });
        return;
      }

      await addToCart(item, newQuantity);
      toast({
        title: "Quantity updated",
        description: "Cart has been updated",
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Session expired")) {
          setShowLoginDialog(true);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: error.message,
          });
        }
      }
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            disabled={isLoading} 
            className="relative bg-white/70 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
          >
            <ShoppingCart className="h-5 w-5 text-emerald-600" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-gradient-to-br from-[#7fffd4] to-[#98fb98]">
          <SheetHeader>
            <SheetTitle className="text-gray-800">Shopping Cart ({items.length} items)</SheetTitle>
          </SheetHeader>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mb-4" />
              <p className="text-gray-700">Loading cart...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <ShoppingCart className="h-12 w-12 text-emerald-600 mb-4" />
              <p className="text-gray-700 mb-4">Your cart is empty</p>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => {
                  setIsOpen(false);
                  setLocation("/");
                }}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 my-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-4 py-4">
                    <div className="h-16 w-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 line-clamp-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">
                        {formatCurrency(item.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item, item.quantity - 1)}
                          disabled={isLoading}
                          className="bg-white/70 border-emerald-200 hover:bg-emerald-50"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium text-gray-800">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                          disabled={isLoading}
                          className="bg-white/70 border-emerald-200 hover:bg-emerald-50"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-bold text-gray-800">{formatCurrency(item.price * item.quantity)}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.productId)}
                        disabled={isLoading}
                        className="hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </ScrollArea>

              <Separator className="bg-emerald-200" />

              <div className="py-4">
                <div className="flex justify-between mb-4">
                  <span className="font-medium text-gray-800">Total</span>
                  <span className="font-bold text-lg text-gray-800">{formatCurrency(total)}</span>
                </div>
                <div className="space-y-2">
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => {
                      setIsOpen(false);
                      setLocation("/checkout");
                    }}
                    disabled={isLoading || items.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-emerald-200 hover:bg-emerald-50 text-gray-800"
                    onClick={() => clearCart()}
                    disabled={isLoading}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <LoginDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        afterLogin={() => {
          setShowLoginDialog(false);
          fetchCart();
        }}
      />
    </>
  );
}