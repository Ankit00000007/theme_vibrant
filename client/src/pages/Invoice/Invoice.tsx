import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import { Row, Col } from "@/components/ui/grid";
import { Form } from "@/components/ui/form";
import { Table } from "@/components/ui/table";
import moment from "moment";
import "./Invoice.css";
import { MdOutlineFileDownload } from "react-icons/md";
// import useAxiosHelper from "./../../Common/AxiosHelper";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "wouter";
// import { BasicInfo, toastFailed } from "../../Config/BasicInfo";
// import { ApiPaths } from "./../../Config/ApiPath";
import { toWords } from "number-to-words";
import { Header } from "@/components/header";
import { config } from "@/config";
import axios from "axios";

const API_BASE_URL = config.api.baseUrl;

const Invoice = () => {
  const searchParams = new URLSearchParams(window.location.search);
const orderId = searchParams.get("orderId");
type Address = {
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
};
type CompanyData = {
  companyName?: string;
  address?: Address;
  mobile?: string;
  contactInfo?: { website?: string };
  gst_number?: string;
};
type Order = {
  order_Id?: string;
  added_on?: string;
  amount?: number;
};
type Address1 = {
  name?: string;
  mobile?: string;
  email?: string;
};
type Address2 = {
  address_1?: string;
  address_2?: string;
  city?: string;
  district?: string;
  state?: string;
  pincode?: string;
};
type CartItem = {
  productId?: string;
  name?: string;
  price?: number;
  quantity?: number;
  sub_total?: number;
  cgst?: number;
  igst?: number;
  sgst?: number;
  grand_total?: number;
};
type ProfileData = {
  name?: string;
  username?: string;
  email?: string;
  mobile?: string;
};
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [orders, setOrders] = useState<Order | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [address, setAddress] = useState<Address1 | null>(null);
  const [address2, setAddress2] = useState<Address2 | null>(null);

  const authStorage = JSON.parse(localStorage.getItem("auth-storage") || "{}");
  const token = authStorage?.state?.token || "";

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  async function fetchProfile() {
    try {
      const res = await axiosInstance.get("/get_profile");
      setProfileData(res.data);
      console.log("Profile Data yyyyyyyyyyy==>", res.data);
    } catch (error) {
      console.log(error);
    }
  }

  var x = 0;

  useEffect(() => {
    if (x == 0) {
      fetchProfile();
      fetchOrders();
      CompanyInfo();
      x++;
    }
  }, []);

  async function CompanyInfo() {
    try {

      const response = await axiosInstance.get("/get-company-info");
console.log("response of companyData",response)
      const companyData = response?.data?.company_info; 
      setCompanyData(companyData); // Use parsedData instead of parsedData.data

      console.log("Company Data:", companyData);
    } catch (error) {
      console.error("Error fetching company info:", error);
    }
  }

  async function fetchOrders() {
    try {
      console.log("orderId", orderId);
      const res = await axiosInstance.get(`/view_orders`, {
        params: { order_Id: orderId },
      });
      console.log("1111111",res)
      setOrders(res?.data?.data);
      setAddress(JSON.parse(res?.data?.data?.address));
      setAddress2(JSON.parse(res?.data?.data?.address2));
      setCartItems(JSON.parse(res?.data?.data?.cart_itms));
      //  setSum(res?.sum);
      console.log("Cart Data ==>", res?.data);
      console.log("address ==>", JSON.parse(res?.data?.data?.address));
      console.log("address 2 ==>", JSON.parse(res?.data?.data?.address2));
      console.log("Cart Items ==>", JSON.parse(res?.data?.data?.cart_itms));
      //  setTotalPages(res?.totalPages);
    } catch (error) {
      console.log("error",String(error));
    }
  }

  const amountInWords = (amount: number | undefined | null): string => {
    if (typeof amount !== "number" || !Number.isFinite(amount)) {
      return "Invalid Amount";
    }

    const rupees = Math.floor(amount); // Integer part (rupees)
    const paisa = Math.round((amount - rupees) * 100); // Fractional part (paisa)

    let result = "";

    // Convert rupees to words
    if (rupees > 0) {
      result += `${toWords(rupees)} Rupees`;
    }

    // Convert paisa to words if there is a fractional part
    if (paisa > 0) {
      result += result
        ? ` and ${toWords(paisa)} Paisa`
        : `${toWords(paisa)} Paisa`;
    }

    return result || "Zero Rupees"; // If the amount is zero
  };
  
  const downloadPDF = async () => {
    // Capture the content of the page
    const element = document.getElementById("pdf-content"); // Replace with your content ID

    if (!element) {
      console.error("Element not found!");
      return;
    }

    // Use html2canvas to convert HTML to canvas
    const canvas = await html2canvas(element, { scale: 3 });
    const imgData = canvas.toDataURL("image/png");

    // Create a new jsPDF instance
    const pdf = new jsPDF("portrait", "mm", "a4");

    let bottomMargin;
    let leftMargin;
    let rightMargin;
    let topMargin;
    if (window.length >= 1024) {
      leftMargin = 5;
      rightMargin = 5;
      topMargin = 5;
      bottomMargin = 5;
    } else if (window.length >= 800) {
      leftMargin = 5;
      rightMargin = 5;
      topMargin = 5;
      bottomMargin = 5;
    } else if (window.length >= 600) {
      leftMargin = 5;
      rightMargin = 5;
      topMargin = 5;
      bottomMargin = 5;
    } else if (window.length >= 400) {
      leftMargin = 4;
      rightMargin = 4;
      topMargin = 3;
      bottomMargin = 3;
    } else {
      leftMargin = 5;
      rightMargin = 5;
      topMargin = 3;
      bottomMargin = 3;
    }

    // Calculate available width and height for content
    const contentWidth = 210 - leftMargin - rightMargin; // 210 mm width of A4 - margins
    const contentHeight = 297 - topMargin - bottomMargin; // 297 mm height of A4 - margins

    // Add image to PDF with specified margins
    pdf.addImage(
      imgData,
      "PNG",
      leftMargin,
      topMargin,
      contentWidth,
      contentHeight
    ); // Top and left margins applied
    pdf.save(`Invoice.pdf`);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#7fffd4] to-[#98fb98] py-6 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">INVOICE</h2>
          </div>

          <div
            className="grid grid-cols-12 gap-4 rowInvoice"
            style={{ margin: "0px" }}
          >
            <div className="col-span-1"></div>
            <div className="col-span-10">
              <div className="bondClose">
                <button className="downloadButton" onClick={downloadPDF}>
                  <MdOutlineFileDownload />
                </button>
              </div>
              <div id="pdf-content">
                <div className="invoice">
                  <div className="invoice-container">
                    <div className="headingDiv">
                      <img
                        src="/vibrantlogo.png"
                        alt="Vibrant Health Science Logo"
                        className="logoImg"
                      />
                    </div>

                    <div className="InfoDiv d-flex">
                      <div className="branchDiv">
                        <p>
                          <span>Issued From: </span>
                          {companyData?.companyName}
                        </p>
                        <p>
                          <span>Address: </span>
                          {companyData?.address?.address_1},{" "}
                          {companyData?.address?.address_2},{" "}
                          {companyData?.address?.city}
                        </p>

                        <p>
                          {companyData?.address?.state},{" "}
                          {companyData?.address?.country}(
                          {companyData?.address?.pincode})
                        </p>
                        <p>
                          <span>Phone: </span>
                          {companyData?.mobile}
                        </p>
                        <p>
                          <span>Website: </span>{" "}
                          {companyData?.contactInfo?.website}
                        </p>
                        <p>
                          <span>GST No.: </span>
                          {companyData?.gst_number}
                        </p>
                      </div>
                      <div className="invoiceDiv">
                        <p>
                          <span>Invoice No. :</span>{" "}
                        </p>
                        <p>{orders?.order_Id}</p>
                        <p>
                          <span>Invoice Date & Time:</span>{" "}
                        </p>
                        <p>
                          {moment(orders?.added_on).format(
                            "DD-MM-YYYY   &   HH:mm"
                          )}
                        </p>
                      </div>
                    </div>

                    <h3 className="text-center investmentHead">INVOICE</h3>
                    <div className="ReceiptDataDiv">
                      <div className="userDataDiv">
                        <h5>Billing Address:</h5>
                        <p>{address?.name}</p>
                        <p>{address?.mobile}</p>
                        <p>{address?.email}</p>
                        <p>
                          {address2?.address_1},{address2?.address_2}
                        </p>
                        <p>
                          {address2?.city} ({address2?.district})
                        </p>
                        <p>
                          {address2?.state} ({address2?.pincode})
                        </p>
                      </div>
                      <div className="userDataDiv shippingData">
                        <h5>Shipping Address:</h5>
                        <p>{address?.name}</p>
                        <p>{address?.mobile}</p>
                        <p>{address?.email}</p>
                        <p>
                          {address2?.address_1},{address2?.address_2}
                        </p>
                        <p>
                          {address2?.city} ({address2?.district})
                        </p>
                        <p>
                          {address2?.state} ({address2?.pincode})
                        </p>
                      </div>
                    </div>
                    {/* <div className="InstDiv d-flex">
                  <div className="userDiv">
                    <p>
                      with thanks Rs. <span>{orders?.amount}</span> through
                      Payment from:
                    </p>
                    <p>
                      {" "}
                      Mr./Ms. <span>{profileData?.name}</span>
                    </p>

                    <p>Towards the following</p>
                  </div>
                  <div className="userDiv">
                    <p>Applicant Code:</p>
                    <p>
                      <span>{profileData?.username}</span>
                    </p>
                  </div>
                </div> */}

                    <table className="invoice-table">
                      <thead>
                        <tr>
                          <th>S.No.</th>
                          <th>Product Id</th>
                          <th>Product</th>
                          <th>
                            Unit
                            <br /> Price(₹)
                          </th>{" "}
                          {/* <th>
                            DP
                            <br /> Price(₹)
                          </th> */}
                          <th>Qty.</th>
                          <th>
                            Net <br />
                            Amount(₹)
                          </th>
                          <th>
                            <div className="tableHeadDiv">
                              <p>CGST(₹)</p>
                              <p>IGST(₹)</p>
                              <p>SGST(₹)</p>
                            </div>
                          </th>
                          <th>
                            Total
                            <br />
                            Amount(₹)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems?.map((x, i) => {
                          return (
                            <tr className="firstRow" key={i}>
                              <td>{i + 1}</td>
                              <td>{x?.productId}</td>
                              <td>{x?.name}</td>
                              <td>{x?.price}</td>
                              {/* <td>{x?.dp_price}</td> */}
                              <td>{x?.quantity}</td>
                              <td>{x?.sub_total}</td>
                              <td>
                                <div className="tableDataDiv">
                                  <p>{x?.cgst}</p>
                                  <p>{x?.igst}</p>
                                  <p>{x?.sgst}</p>
                                </div>
                              </td>
                              <td>{x?.grand_total}</td>
                            </tr>
                          );
                        })}

                        <tr className="secondRow">
                          <td colSpan={2}>Grand Total (Rs.)</td>
                          <td>{orders?.amount}</td>
                          <td colSpan={2}> Amount in Words</td>
                          <td colSpan={4}>
                            {amountInWords(orders?.amount)
                              .charAt(0)
                              .toUpperCase() +
                              amountInWords(orders?.amount).slice(1)}
                          </td>
                          {/* <td></td> */}
                        </tr>
                      </tbody>
                    </table>

                    <div className="ReceiptDataDiv">
                      <div className="userDataDiv">
                        <h5>User Information:</h5>
                        <p>{profileData?.name}</p>
                        <p>{profileData?.username}</p>
                        <p>{profileData?.email}</p>
                        <p>{profileData?.mobile}</p>
                      </div>
                      <div className="DuplicateDataDiv">
                        {/* <h5>Installments Maturity Date:</h5>
                <p>
                  {moment(transaction?.maturity_date).format(
                    "DD-MM-YYYY  &  HH:mm"
                  )}
                </p> */}
                        <div className="DuplicateDate">
                          <p>Duplicate receipt is generated online on</p>
                          <p>
                            {moment(orders?.added_on).format(
                              "DD-MM-YYYY   &   HH:mm"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="SignedDiv">
                      <p>
                        This receipt has been electronically generated and
                        securely digitally signed.
                      </p>
                    </div>

                    {/* <div className="invoiceFooter">
                <div className="SignatureDiv">
                  <p>Signatures</p>
                </div>
                <div className="MetaFDiv">
                  <p>For Amaira</p>
                </div>
              </div> */}
                    <footer className="thankDiv">
                      <p>
                        Please let us know if you have any questions. We are
                        here to help!
                      </p>
                      <h4>Thank You for your business!</h4>
                    </footer>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
