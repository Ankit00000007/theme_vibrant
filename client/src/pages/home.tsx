import { useQuery } from "@tanstack/react-query";
import { Search, ShoppingBag, Gift, Truck, User } from "lucide-react";
import { ProductGrid } from "@/components/product-grid";
import { SearchFilter } from "@/components/search-filter";
import { Cart } from "@/components/cart";
import { ProductSlider } from "@/components/product-slider";
import { Product } from "@shared/schema";
import { getAllProducts } from "@/lib/api";
import { useState } from "react";
import { useAuth } from "@/store/auth-store";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const { user, token } = useAuth();

  const { data: products = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => getAllProducts(token),
    refetchOnWindowFocus: false,
    staleTime: 30000
  });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#7fffd4] to-[#98fb98]">
        <p className="text-red-500">Failed to load products</p>
      </div>
    );
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7fffd4] to-[#98fb98]">
      {/* Hero Slider Section */}
      <ProductSlider />

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Featured Products
            </h2>
            <Cart />
          </div>

          <SearchFilter 
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
            categories={uniqueCategories}
          />

          <ProductGrid 
            products={filteredProducts} 
            isLoading={isLoading} 
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-700">
              Real experiences from people who have transformed their health with Essentia Of Life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                text: "The antioxidant supplements have made a remarkable difference in my energy levels. I feel more vibrant and healthier than ever before!"
              },
              {
                name: "Michael Chen",
                text: "As an athlete, I need products that really work. The liposomal technology makes a noticeable difference in absorption. Highly recommended!"
              },
              {
                name: "Emma Davis",
                text: "I've tried many antioxidant products, but none compare to this. The quality is exceptional, and the results speak for themselves!"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-[#98fb98]/20 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-emerald-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <div className="flex text-emerald-500">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Why Choose Clever Mind?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="p-6 bg-[#98fb98]/20 backdrop-blur-lg rounded-xl shadow-lg border border-emerald-200">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Premium Quality</h3>
                <p className="text-gray-700">We ensure the highest quality standards for all our products</p>
              </div>

              <div className="p-6 bg-[#98fb98]/20 backdrop-blur-lg rounded-xl shadow-lg border border-emerald-200">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">24/7 Support</h3>
                <p className="text-gray-700">Dedicated support team available to assist you anytime</p>
              </div>

              <div className="p-6 bg-[#98fb98]/20 backdrop-blur-lg rounded-xl shadow-lg border border-emerald-200">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Fast Delivery</h3>
                <p className="text-gray-700">Quick and reliable shipping to your doorstep</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}