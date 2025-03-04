import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/auth-store";
import { Link, useLocation } from "wouter";
import { Package, LogOut, User, LayoutDashboard, ShoppingCart, Menu, X } from "lucide-react";
import { LoginDialog } from "./login-dialog";
import { useCart } from "@/store/cart-store";
import "./header.css";

export function Header() {
  const { user, logout, token } = useAuth();
  const { cart } = useCart();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [_, setLocation] = useLocation();

  const handleDashboardClick = () => {
    if (token) {
      window.location.href = `https://d.vibrant-science.com/?token=${token}`;
      // window.location.href = `https://test.vibrant-science.com/?token=${token}`;
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-[#7fffd4] to-[#98fb98] border-b border-emerald-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <div className="w-32 h-16 relative bg-white/90 rounded-lg p-2 shadow-sm">
              <img
                src="/vibrantlogo.png"
                alt="Vibrant Health Science Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          

          {/* Navigation Links */}
          <div className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'} absolute lg:relative top-full left-0 right-0 bg-gradient-to-r from-[#7fffd4] to-[#98fb98] lg:bg-none p-4 lg:p-0 my-height`}>
            <ul className="navlinks flex-col lg:flex-row space-y-4 lg:space-y-0">
              <Link href="/">
                <li onClick={() => setIsMenuOpen(false)}>Home</li>
              </Link>
              <Link href="/contact">
                <li onClick={() => setIsMenuOpen(false)}>Contact</li>
              </Link>
              <Link href="/science">
                <li onClick={() => setIsMenuOpen(false)}>Science</li>
              </Link>
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLocation("/cart")}
              className="bg-[#98fb98]/20 border-emerald-300 text-gray-800 hover:bg-[#98fb98]/30 relative"
            >
              <ShoppingCart className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Cart</span>
              {cart && cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>

            {user ? (
              <>
              {/* <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLocation("/orders")}
                  className="bg-[#98fb98]/20 border-emerald-300 text-gray-800 hover:bg-[#98fb98]/30"
                >
                  <Package className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Orders</span>
                </Button> */}
                <div className="flex items-center gap-2 text-gray-800">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium hidden sm:block">
                    {user.name}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDashboardClick}
                  className="bg-[#98fb98]/20 border-emerald-300 text-gray-800 hover:bg-[#98fb98]/30"
                >
                  <LayoutDashboard className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="bg-[#98fb98]/20 border-emerald-300 text-gray-800 hover:bg-[#98fb98]/30"
                >
                  <LogOut className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setShowLoginDialog(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Login
              </Button>
            )}
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-800 hover:text-gray-600"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
    </>
  );
}