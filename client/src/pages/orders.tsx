// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import PaginationComponent from "../../Components/PaginationControls/PaginationControls";
// import moment from "moment";
// import axios from "axios";
// import { config } from "@/config";

// const API_BASE_URL = config.api.baseUrl;

// const Orders = () => {
//     const authStorage = JSON.parse(localStorage.getItem("auth-storage") || "{}");
//     const token = authStorage?.state?.token || "";
  
//     const axiosInstance = axios.create({
//       baseURL: API_BASE_URL,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//     });
//   const [companyData, setCompanyData] = useState([]);
//   const [orders, setOrders] = useState();
//   const navigate = useNavigate();
//   const [expandedRows, setExpandedRows] = useState([]);

//   async function fetchOrders() {
//     try {
//       const res = await AxiosGet(ApiPaths.getOrders);
//       setOrders(res?.data);
//       //  setSum(res?.sum);
//       console.log("Cart Data ==>", res);
//       //  setTotalPages(res?.totalPages);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     CompanyInfo();
//     fetchOrders();
//   }, []);
//   async function CompanyInfo() {
//     try {
//       const data = localStorage.getItem("companyData");
//       // console.log(JSON.parse(data));
//       setCompanyData(JSON.parse(data));
//     } catch (error) {
//       BasicInfo.isDebug && console.log(error);
//     }
//   }

//   const toggleRow = (index) => {
//     setExpandedRows((prev) =>
//       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
//     );
//   };

//   const parsedOrders = orders?.map((order) => {
//     let cartItems = [];

//     try {
//       console.log("Raw Cart Items:", order?.cart_itms);

//       cartItems =
//         typeof order?.cart_itms === "string"
//           ? JSON.parse(order.cart_itms)
//           : order?.cart_itms || [];

//       console.log("Parsed Cart Items:", cartItems);
//     } catch (error) {
//       console.error("Error parsing cart_items:", error);
//     }

//     return { ...order, cartItems };
//   });

//   return (
//     <>
//       <div className="profile-body">
//         <div class="currency-head">
//           <h2>ORDERS</h2>
//         </div>
//         <div className="converter-container">
//           <div className="table-container">
//             <table className="data-table">
//               <thead>
//                 <tr>
//                   <th>Sr No</th>
//                   <th>Package Type</th>
//                   <th>Amount</th>
//                   <th>Type</th>
//                   <th>Date</th>
//                   <th>Cart Items</th>
//                   <th>Invoice</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {parsedOrders?.map((x, index) => {
//                   return (
//                     <React.Fragment key={index}>
//                       {/* Main Row */}
//                       <tr
//                         style={{
//                           borderBottom: "1px solid #c5c5c5",
//                           cursor: "pointer",
//                         }}
//                       >
//                         <td>{index + 1}</td>
//                         <td>{x?.package_type}</td>
//                         <td>{parseFloat(x?.amount).toFixed(2)}</td>
//                         <td>{x?.type}</td>
//                         <td>{moment(x?.createdAt).format("DD MMM YYYY")}</td>
//                         <td>
//                           <button
//                             onClick={() => toggleRow(index)}
//                             style={{
//                               background: "none",
//                               border: "none",
//                               color: "white",
//                               cursor: "pointer",
//                             }}
//                           >
//                             {expandedRows.includes(index) ? "Hide" : "Show"}{" "}
//                             Cart Items
//                           </button>
//                         </td>
//                         <td>
//                           <button
//                             className="glow-on-hover my-glow"
//                             onClick={() =>
//                               navigate("/invoice", {
//                                 state: { orderId: x?.order_Id },
//                               })
//                             }
//                           >
//                             View
//                           </button>
//                         </td>
//                       </tr>

//                       {/* Collapsible Row */}
//                       {expandedRows.includes(index) && (
//                         <tr>
//                           <td colSpan={7}>
//                             <table
//                               style={{
//                                 width: "100%",
//                                 background: "#6e6293ba",
//                                 border: "1px solid #c5c5c5",
//                                 marginTop: "10px",
//                               }}
//                             >
//                               <thead>
//                                 <tr>
//                                   <th style={{ backgroundColor: "#473a6eba" }}>
//                                     Item Name
//                                   </th>
//                                   <th style={{ backgroundColor: "#473a6eba" }}>
//                                     Quantity
//                                   </th>
//                                   <th style={{ backgroundColor: "#473a6eba" }}>
//                                     Price
//                                   </th>
//                                   <th style={{ backgroundColor: "#473a6eba" }}>
//                                     Total
//                                   </th>
//                                   <th style={{ backgroundColor: "#473a6eba" }}>
//                                     Order BV
//                                   </th>
//                                   <th style={{ backgroundColor: "#473a6eba" }}>
//                                     Images
//                                   </th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {x?.cartItems.map((item, i) => (
//                                   <tr key={i}>
//                                     <td>{item.name}</td>
//                                     <td>{item.quantity}</td>
//                                     <td>{parseFloat(item.price).toFixed(2)}</td>
//                                     <td>
//                                       {parseFloat(item.grand_total).toFixed(2)}
//                                     </td>
//                                     <td>{item.order_bv}</td>
//                                     <td>
//                                       <img
//                                         src={item.images[0]}
//                                         alt={item.name}
//                                         style={{
//                                           width: "50px",
//                                           height: "50px",
//                                           marginRight: "5px",
//                                         }}
//                                       />
//                                     </td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </td>
//                         </tr>
//                       )}
//                     </React.Fragment>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Orders;
