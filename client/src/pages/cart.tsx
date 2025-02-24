import { useCart } from "@/store/cart-store";
import { useAuth } from "@/store/auth-store";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/config";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#7fffd4] to-[#98fb98] py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white/50 backdrop-blur-lg rounded-lg p-8 text-center max-w-2xl mx-auto">
            <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-emerald-600" />
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-700 mb-6">Start adding some amazing wellness products to your cart!</p>
            <Button
              onClick={() => setLocation("/")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold py-6 transition-colors"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7fffd4] to-[#98fb98] py-6 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-4">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Shopping Cart</h1>
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white/50 backdrop-blur-lg rounded-lg p-4 flex flex-col sm:flex-row gap-4"
              >
                <div className="w-full sm:w-24 h-24 bg-white rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-800 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="h-8 w-8 bg-[#98fb98]/20 border-emerald-300 text-gray-800 hover:bg-[#98fb98]/30 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 bg-[#98fb98]/20 border-emerald-300 text-gray-800 hover:bg-[#98fb98]/30 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="bg-[#98fb98]/20 border-emerald-300 text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      <span>Remove</span>
                    </Button>
                  </div>
                </div>
                <div className="text-right sm:ml-4">
                  <p className="text-lg font-medium text-gray-800">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                  <p className="text-sm text-gray-500">{formatCurrency(item.price)} each</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white/50 backdrop-blur-lg rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <Separator className="my-4 bg-emerald-200" />
                <div className="flex justify-between text-lg font-semibold text-gray-800">
                  <span>Total</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold py-6 transition-colors"
                  onClick={() => setLocation("/checkout")}
                  disabled={!user}
                >
                  {user ? "Proceed to Checkout" : "Login to Checkout"}
                </Button>
                {!user && (
                  <p className="text-sm text-gray-500 text-center mt-2">
                    Please{" "}
                    <Button
                      variant="link"
                      className="text-emerald-600 hover:text-emerald-700 p-0 h-auto font-normal"
                      onClick={() => setLocation("/login")}
                    >
                      login
                    </Button>{" "}
                    to continue with checkout
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}