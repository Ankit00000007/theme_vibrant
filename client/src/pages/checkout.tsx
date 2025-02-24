import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/store/cart-store";
import { useAuth } from "@/store/auth-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/config";
import { getProfile, getWallets, placeOrder } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function CheckoutPage() {
  const { cart, items: cartItems, sum } = useCart();
  const { user, token } = useAuth();
  const { toast } = useToast();
  const [_, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [fundWallet, setFundWallet] = useState<number>(0);

  useEffect(() => {
    if (!token) {
      setLocation("/");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      setLocation("/cart");
      return;
    }

    async function loadData() {
      try {
        setIsLoading(true);
        if (!token) return;

        const [profileData, walletsData] = await Promise.all([
          getProfile(token),
          getWallets(token)
        ]);

        setProfile(profileData);
        const wallet = walletsData.find(w => w.slug === 'fund_wallet');
        setFundWallet(wallet?.value || 0);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load checkout information';
        if (message.includes('Session expired')) {
          setLocation("/");
        }
        toast({
          variant: "destructive",
          title: "Error",
          description: message
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [cartItems?.length, setLocation, token, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const orderData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      mobile: formData.get('mobile') as string,
      address_1: formData.get('house') as string,
      address_2: formData.get('village') as string,
      city: formData.get('city') as string,
      district: formData.get('district') as string,
      state: formData.get('state') as string,
      pincode: formData.get('pincode') as string,
      courier_option: "standard"
    };

    try {
      setIsSubmitting(true);
      await placeOrder(token, orderData);
      toast({
        title: "Success",
        description: "Order placed successfully!"
      });
      setLocation("/");
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to place order';
      if (message.includes('Session expired')) {
        setLocation("/");
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#7fffd4] to-[#98fb98] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-700">Loading checkout information...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#7fffd4] to-[#98fb98] flex items-center justify-center">
        <div className="text-center text-gray-700">
          <p>Failed to load profile information</p>
          <Button 
            onClick={() => setLocation("/")} 
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7fffd4] to-[#98fb98] py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card className="p-6 bg-white/50 backdrop-blur-lg border-emerald-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
            <ScrollArea className="h-[300px] mb-4">
              {cartItems?.map((item) => (
                <div key={item.id} className="flex gap-4 py-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{item.title}</h4>
                    <p className="text-sm text-gray-600">
                      {formatCurrency(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollArea>

            <Separator className="my-4 bg-emerald-200" />

            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(sum?.total_sub || 0)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST</span>
                <span>{formatCurrency(sum?.total_gst || 0)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{formatCurrency(sum?.courier_charge || 0)}</span>
              </div>
              <Separator className="my-2 bg-emerald-200" />
              <div className="flex justify-between font-semibold text-gray-800">
                <span>Total</span>
                <span>{formatCurrency(sum?.total_grand || 0)}</span>
              </div>
              <p className="text-sm text-gray-600 text-right">All taxes included</p>
            </div>
          </Card>

          {/* Payment and Shipping Details */}
          <Card className="p-6 bg-white/50 backdrop-blur-lg border-emerald-200">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Available Balance</h2>
              <p className="text-lg font-medium text-gray-800">{formatCurrency(fundWallet)}</p>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  defaultValue={profile?.name || ""} 
                  required 
                  className="bg-white/70"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  defaultValue={profile?.email || ""} 
                  required 
                  className="bg-white/70"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile</Label>
                <Input 
                  id="mobile" 
                  name="mobile" 
                  defaultValue={profile?.mobile || ""} 
                  required 
                  className="bg-white/70"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="house">House/Building</Label>
                  <Input 
                    id="house" 
                    name="house" 
                    defaultValue={profile?.house_name || ""} 
                    required 
                    className="bg-white/70"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="village">Village/Area</Label>
                  <Input 
                    id="village" 
                    name="village" 
                    defaultValue={profile?.village || ""} 
                    required 
                    className="bg-white/70"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    name="city" 
                    defaultValue={profile?.city || ""} 
                    required 
                    className="bg-white/70"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Input 
                    id="district" 
                    name="district" 
                    defaultValue={profile?.district || ""} 
                    required 
                    className="bg-white/70"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input 
                    id="state" 
                    name="state" 
                    defaultValue={profile?.state || ""} 
                    required 
                    className="bg-white/70"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input 
                    id="pincode" 
                    name="pincode" 
                    defaultValue={profile?.pincode || ""} 
                    required 
                    className="bg-white/70"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold py-6 transition-colors"
                disabled={fundWallet < (sum?.total_grand || 0) || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Placing Order...
                  </>
                ) : fundWallet < (sum?.total_grand || 0)
                  ? "Insufficient Balance" 
                  : `Pay ${formatCurrency(sum?.total_grand || 0)}`}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}