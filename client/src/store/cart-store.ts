import { create } from "zustand";
import { Product, CartSum } from "@shared/schema";
import { useAuth } from "@/store/auth-store";
import { config } from "@/config";

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  cart: CartItem[];
  total: number;
  cartTotal: number;
  sum: CartSum | null;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
  isLoading: boolean;
}

const API_BASE_URL = config.api.baseUrl;

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  cart: [],
  total: 0,
  cartTotal: 0,
  sum: null,
  isLoading: false,

  fetchCart: async () => {
    try {
      set({ isLoading: true });
      const token = useAuth.getState().token;
      if (!token) {
        set({ items: [], cart: [], total: 0, cartTotal: 0, sum: null });
        return;
      }

      const res = await fetch(`${API_BASE_URL}/get_cart`, {
        headers: {
          Authorization: token,
        },
      });

      if (!res.ok) {
        if (res.status === 419) {
          set({ items: [], cart: [], total: 0, cartTotal: 0, sum: null });
          useAuth.getState().logout();
          throw new Error("Session expired. Please login again.");
        }
        throw new Error("Failed to fetch cart");
      }

      const responseText = await res.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse cart data:", e);
        throw new Error("Invalid cart data received");
      }

      const cartItems = data?.cart_data || [];
      // Don't throw error for empty cart, just reset the state
      if (!cartItems.length) {
        set({ items: [], cart: [], total: 0, cartTotal: 0, sum: null });
        return;
      }

      const mappedItems = cartItems.map((item: any) => ({
        id: Number(item.productId),
        _id: item._id || String(item.productId),
        title: item.name,
        description: item.description || "",
        price: Number(item.price),
        image:
          Array.isArray(item.images) && item.images.length > 0
            ? item.images[0]
            : "https://placehold.co/400x400",
        category: item.categoryname || "uncategorized",
        productId: Number(item.productId),
        quantity: Number(item.qty || item.quantity || 1),
      }));

      set({
        items: mappedItems,
        cart: mappedItems,
        total: data.sum?.total_grand || 0,
        cartTotal: data.sum?.total_grand || 0,
        sum: data.sum || null,
      });
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      if (
        error instanceof Error &&
        error.message.includes("Session expired")
      ) {
        throw error;
      }
      // Only throw session expired errors, handle other errors gracefully
      set({ items: [], cart: [], total: 0, cartTotal: 0, sum: null });
    } finally {
      set({ isLoading: false });
    }
  },

  updateQuantity: async (productId: number, quantity: number) => {
    try {
      set({ isLoading: true });
      const token = useAuth.getState().token;
      if (!token) {
        throw new Error("Please login to update cart");
      }

      const res = await fetch(`${API_BASE_URL}/add_to_cart`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qty: quantity,
          productId: productId,
        }),
      });

      if (!res.ok) {
        if (res.status === 419) {
          set({ items: [], cart: [], total: 0, cartTotal: 0, sum: null });
          useAuth.getState().logout();
          throw new Error("Session expired. Please login again.");
        }
        const text = await res.text();
        throw new Error(text || "Failed to update cart");
      }

      await get().fetchCart();
    } catch (error) {
      console.error("Failed to update quantity:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  addToCart: async (product: Product, quantity: number = 1) => {
    try {
      set({ isLoading: true });
      const token = useAuth.getState().token;
      if (!token) {
        throw new Error("Please login to add items to cart");
      }

      const res = await fetch(`${API_BASE_URL}/add_to_cart`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qty: quantity,
          productId: product.productId,
        }),
      });

      if (!res.ok) {
        if (res.status === 419) {
          set({ items: [], cart: [], total: 0, cartTotal: 0, sum: null });
          useAuth.getState().logout();
          throw new Error("Session expired. Please login again.");
        }
        const text = await res.text();
        throw new Error(text || "Failed to add item to cart");
      }

      await get().fetchCart();
    } catch (error) {
      console.error("Failed to add to cart:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  removeFromCart: async (productId: number) => {
    try {
      set({ isLoading: true });
      const token = useAuth.getState().token;
      if (!token) {
        throw new Error("Please login to remove items from cart");
      }

      const res = await fetch(`${API_BASE_URL}/delete_cart_item`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
        }),
      });

      if (!res.ok) {
        if (res.status === 419) {
          set({ items: [], cart: [], total: 0, cartTotal: 0, sum: null });
          useAuth.getState().logout();
          throw new Error("Session expired. Please login again.");
        }
        const text = await res.text();
        throw new Error(text || "Failed to remove item from cart");
      }

      await get().fetchCart();
    } catch (error) {
      console.error("Failed to remove from cart:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  clearCart: async () => {
    try {
      set({ isLoading: true });
      const token = useAuth.getState().token;
      if (!token) {
        throw new Error("Please login to clear cart");
      }

      const res = await fetch(`${API_BASE_URL}/clear_cart`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
      });

      if (!res.ok) {
        if (res.status === 419) {
          set({ items: [], cart: [], total: 0, cartTotal: 0, sum: null });
          useAuth.getState().logout();
          throw new Error("Session expired. Please login again.");
        }
        const text = await res.text();
        throw new Error(text || "Failed to clear cart");
      }

      set({ items: [], cart: [], total: 0, cartTotal: 0, sum: null });
    } catch (error) {
      console.error("Failed to clear cart:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));