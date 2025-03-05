import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { config } from "@/config";
import "./order.css";
import PaginationComponent from "@/components/pagination";

// Constants
const API_BASE_URL = config.api.baseUrl;

// Comprehensive Type Definitions
interface AuthStorage {
  state?: {
    token?: string;
  };
}

interface CartItem {
  name: string;
  quantity: number;
  price: number;
  grand_total: number;
  order_bv: string;
  images: string[];
}

interface Order {
  package_type: string;
  amount: number;
  type: string;
  createdAt: string;
  order_Id: string;
  cart_itms: string | CartItem[];
  cartItems?: CartItem[];
}

interface OrderResponse {
  Sum: number;
  currentPage: number;
  data: Order[];
  success: boolean;
  totalPages: number;
  totalRecords: number;
}

const Orders: React.FC = () => {
  // Authentication and API Setup
  const authStorage: AuthStorage = JSON.parse(
    localStorage.getItem("auth-storage") || "{}"
  );
  const token = authStorage?.state?.token || "";

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  // State Management
  const [companyData, setCompanyData] = useState<any[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Fetch Orders Function
  async function fetchOrders(page: number = 1) {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get<OrderResponse>("/get_orders", {
        params: { page }
      });
      
      // Ensure orders is always an array and parse cart items
      const processedOrders = (res.data?.data || []).map(processOrderCartItems);
      
      setOrders(processedOrders);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
      setError(null);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders. Please try again later.");
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }

  // Process Cart Items Safely
  const processOrderCartItems = (order: Order): Order => {
    let cartItems: CartItem[] = [];

    try {
      cartItems =
        typeof order?.cart_itms === "string"
          ? JSON.parse(order.cart_itms)
          : order?.cart_itms || [];
    } catch (error) {
      console.error(`Error parsing cart items for order ${order.order_Id}:`, error);
    }

    return { ...order, cartItems };
  };

  // Fetch Company Info
  async function fetchCompanyInfo() {
    try {
      const data = localStorage.getItem("companyData");
      setCompanyData(data ? JSON.parse(data) : []);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  }

  // Initial Data Fetch
  useEffect(() => {
    fetchCompanyInfo();
    fetchOrders(currentPage);
  }, []);

  // Toggle Row Expansion
  const toggleRow = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Navigate to Invoice
  const handleNavigateToInvoice = (orderId?: string) => {
    if (orderId) {
      window.location.href = `/invoice?orderId=${orderId}`;
    }
  };

  // Page Change Handler
  const handlePageChange = (page: number) => {
    fetchOrders(page);
  };

  // Render Loading State
  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Loading orders...</p>
      </div>
    );
  }

  // Render Error State
  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => fetchOrders(currentPage)}>Retry</button>
      </div>
    );
  }

  // No Orders State
  if (orders.length === 0) {
    return (
      <div className="no-orders-container">
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7fffd4] to-[#98fb98] py-6 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Orders</h2>
        </div>
        <div className="converter-container">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Package Type</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Cart Items</th>
                  <th>Invoice</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <React.Fragment key={order.order_Id}>
                    {/* Main Order Row */}
                    <tr
                      style={{
                        borderBottom: "1px solid #c5c5c5",
                        cursor: "pointer",
                      }}
                    >
                      <td>{(currentPage - 1) * 10 + index + 1}</td>
                      <td>{order?.package_type}</td>
                      <td>{parseFloat(order?.amount.toString()).toFixed(2)}</td>
                      <td>{order?.type}</td>
                      <td>{moment(order?.createdAt).format("DD MMM YYYY")}</td>
                      <td>
                        {order?.cartItems && order.cartItems.length > 0 && (
                          <button
                            onClick={() => toggleRow(index)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "black",
                              cursor: "pointer",
                            }}
                          >
                            {expandedRows.includes(index) ? "Hide" : "Show"}{" "}
                            Cart Items
                          </button>
                        )}
                      </td>
                      <td>
                        <button
                          className="glow-on-hover my-glow"
                          onClick={() => handleNavigateToInvoice(order?.order_Id)}
                        >
                          View
                        </button>
                      </td>
                    </tr>

                    {/* Expandable Cart Items Row */}
                    {expandedRows.includes(index) && order?.cartItems && (
                      <tr>
                        <td colSpan={7}>
                          <table
                            style={{
                              width: "100%",
                              background: "transparent",
                              border: "none",
                              marginTop: "10px",
                            }}
                          >
                            <thead>
                              <tr>
                                {[
                                  "Item Name",
                                  "Quantity",
                                  "Price",
                                  "Total",
                                  "Order BV",
                                  "Images",
                                ].map((header) => (
                                  <th
                                    key={header}
                                    style={{ backgroundColor: " rgb(1 209 144 / 66%)" }}
                                  >
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {order.cartItems.map((item, itemIndex) => (
                                <tr key={itemIndex}>
                                  <td>{item.name}</td>
                                  <td>{item.quantity}</td>
                                  <td>
                                    {parseFloat(item.price.toString()).toFixed(2)}
                                  </td>
                                  <td>
                                    {parseFloat(item.grand_total.toString()).toFixed(2)}
                                  </td>
                                  <td>{item.order_bv}</td>
                                  <td>
                                    {item.images && item.images.length > 0 && (
                                      <img
                                        src={item.images[0]}
                                        alt={item.name}
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                          marginRight: "5px",
                                          objectFit: "cover",
                                        }}
                                      />
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Pagination Component */}
        <PaginationComponent 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Orders;