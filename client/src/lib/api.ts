import { Product } from "@shared/schema";
import { config } from "@/config";

const API_BASE_URL = config.api.baseUrl;

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
    username: string;
    uid: number;
  };
}

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
}

export async function getAllProducts(
  token?: string | null,
): Promise<Product[]> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = token;
  }

  const response = await fetch(`${API_BASE_URL}/get-all-products`, { headers });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to fetch products");
  }

  const data = await response.json();
  const rawProducts = Array.isArray(data)
    ? data
    : Array.isArray(data.data)
      ? data.data
      : [];

  return rawProducts.map((item: any) => ({
    id: Number(item.productId),
    _id: item._id,
    title: item.name,
    description: item.description || "",
    price: Number(item.price),
    image:
      Array.isArray(item.images) && item.images.length > 0
        ? item.images[0]
        : "https://placehold.co/400x400",
    category: item.categoryname || "uncategorized",
    productId: Number(item.productId),
  }));
}

interface UserProfile {
  name: string;
  email: string;
  mobile: string;
  district: string;
  pincode: string;
  city: string;
  state: string;
  village: string;
  country: string;
  house_name: string;
}

interface Wallet {
  wallet_status: number;
  value: number;
  slug: string;
  name: string;
}

export async function getProfile(token: string): Promise<UserProfile> {
  if (!token) throw new Error("Authentication required");

  const response = await fetch(`${API_BASE_URL}/get_profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    if (response.status === 419) {
      throw new Error("Session expired. Please login again.");
    }
    throw new Error(
      `Failed to fetch profile: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  return {
    name: data.name,
    email: data.email,
    mobile: data.mobile,
    district: data.district,
    pincode: data.pincode,
    city: data.city,
    state: data.state,
    village: data.village,
    country: data.country,
    house_name: data.house_name,
  };
}

export async function getWallets(token: string): Promise<Wallet[]> {
  if (!token) throw new Error("Authentication required");

  const response = await fetch(`${API_BASE_URL}/get_wallets`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    if (response.status === 419) {
      throw new Error("Session expired. Please login again.");
    }
    throw new Error(
      `Failed to fetch wallets: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  return data.wallets || [];
}

export async function getProduct(
  id: string,
  token?: string | null,
): Promise<Product> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = token;
  }

  const response = await fetch(`${API_BASE_URL}/get-product/?productId=${id}`, {
    headers,
  });
  console.log("Product API response:", response.status);

  if (!response.ok) {
    const text = await response.text();
    console.error("Product API error:", text);
    if (response.status === 404) {
      throw new Error("Product not found");
    }
    throw new Error(text || "Failed to fetch product");
  }

  const data = await response.json();
  console.log("Product API data:", data);
  const item = data?.data || data;

  if (!item) {
    throw new Error("Product not found");
  }

  return {
    id: Number(item.productId),
    _id: item._id,
    title: item.name,
    description: item.description || "",
    price: Number(item.price),
    image:
      Array.isArray(item.images) && item.images.length > 0
        ? item.images[0]
        : "https://placehold.co/400x400",
    category: item.categoryname || "uncategorized",
    productId: Number(item.productId),
  };
}

interface PlaceOrderPayload {
  name: string;
  email: string;
  mobile: string;
  address_1: string;
  address_2: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  courier_option: string;
}

export async function placeOrder(
  token: string,
  payload: PlaceOrderPayload,
): Promise<any> {
  if (!token) throw new Error("Authentication required");

  const response = await fetch(`${API_BASE_URL}/place_order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    if (response.status === 419) {
      throw new Error("Session expired. Please login again.");
    }
    const errorText = await response.text();
    throw new Error(errorText || "Failed to place order");
  }

  return response.json();
}
