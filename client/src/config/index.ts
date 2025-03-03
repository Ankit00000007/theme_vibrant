export const config = {
  currency: {
    symbol: "₹",
    code: "INR",
  },
  api: {
    // baseUrl: "https://apis.vibrant-science.com/user",
    baseUrl: "https://testingapis.vibrant-science.com/user",
    endpoints: {
      products: "/get-all-products",
      product: (id: string) => `/get-product/${id}`,
      productDetails: (id: string) => `/product-details/${id}`,
    },
  },
} as const;

// Utility function to format currency
export const formatCurrency = (amount: number) => {
  return `${config.currency.symbol} ${amount.toLocaleString("en-IN")}`;
};
