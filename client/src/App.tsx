import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import ProductDetails from "@/pages/product-details";
import Grievance from "@/pages/grievancecell";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import CheckoutPage from "@/pages/checkout";
import DocumentViewer from "@/pages/document-viewer";
import CartPage from "@/pages/cart";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useEffect } from "react";
import { useAuth } from "@/store/auth-store";
import { useCart } from "@/store/cart-store";
import Science from "@/pages/science";
import Invoice from "@/pages/Invoice/Invoice"

function Router() {
  const { user } = useAuth();
  const { fetchCart } = useCart();

  useEffect(() => {
    if (user) {
      fetchCart().catch(console.error);
    }
  }, [user, fetchCart]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/grievance" component={Grievance} />
          <Route path="/contact" component={Contact} />
          <Route path="/science" component={Science} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/invoice" component={Invoice} />
          <Route path="/document-viewer" component={DocumentViewer} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;