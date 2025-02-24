import { useState } from "react";
import { Link } from "wouter";
import { Product } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart-store";
import { useAuth } from "@/store/auth-store";
import { ShoppingCart, Loader2 } from "lucide-react";
import { LoginDialog } from "./login-dialog";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/config";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isLoading } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    if (!user) {
      setShowLoginDialog(true);
      return;
    }

    try {
      setIsAddingToCart(true);
      await addToCart(product, 1);
      toast({
        title: "Success",
        description: `${product.title} has been added to your cart`,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to add item to cart";
      if (message.includes("Session expired")) {
        setShowLoginDialog(true);
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <>
      <Card className="h-full flex flex-col group bg-[#98fb98]/20 backdrop-blur-lg border-emerald-200">
        <Link href={`/product/${product.productId}`}>
          <div className="relative aspect-square overflow-hidden rounded-t-lg bg-white">
            <img
              src={product.image}
              alt={product.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        <CardContent className="flex-1 p-4">
          <Link href={`/product/${product.productId}`}>
            <h3 className="font-medium text-base mb-2 hover:text-emerald-700 cursor-pointer line-clamp-2 text-gray-800">
              {product.title}
            </h3>
          </Link>
          <p className="text-gray-700 text-sm line-clamp-2 mb-3">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-lg font-bold text-emerald-700">{formatCurrency(product.price)}</span>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            size="sm" 
            onClick={handleAddToCart} 
            disabled={isLoading || isAddingToCart}
          >
            {isAddingToCart ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <LoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog}
        afterLogin={() => {
          setShowLoginDialog(false);
          handleAddToCart();
        }}
      />
    </>
  );
}