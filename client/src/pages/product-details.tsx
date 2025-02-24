import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/store/cart-store";
import { useAuth } from "@/store/auth-store";
import { ArrowLeft, ShoppingCart, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { getProduct } from "@/lib/api";
import { formatCurrency } from "@/config";

export default function ProductDetails() {
  const { id } = useParams();
  const { toast } = useToast();
  const { addToCart, isLoading: isAddingToCart } = useCart();
  const { user, token } = useAuth();
  const [, navigate] = useLocation();

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => getProduct(id!, token),
    retry: false
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/">
            <Button>
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      await addToCart(product);
      toast({
        title: "Added to cart",
        description: `${product.title} has been added to your cart`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add to cart"
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square relative rounded-lg overflow-hidden bg-muted">
          <img 
            src={product.image} 
            alt={product.title}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-2xl font-semibold mb-4">{formatCurrency(product.price)}</p>
          <p className="text-muted-foreground mb-8">{product.description}</p>

          <Button 
            onClick={handleAddToCart} 
            size="lg"
            disabled={isAddingToCart}
          >
            {isAddingToCart ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding to Cart...
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}