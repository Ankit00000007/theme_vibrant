import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { ReactReduxContext, useSelector, useDispatch } from "react-redux";
import moment from "moment";
import "./Invoice.css";
import Logo from "./../../Images/logo.png";
import { MdOutlineFileDownload } from "react-icons/md";
import useAxiosHelper from "./../../Common/AxiosHelper";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import { BasicInfo, toastFailed } from "../../Config/BasicInfo";
import { ApiPaths } from "./../../Config/ApiPath";
import { toWords } from "number-to-words";
import { Header } from "@/components/header";

const Invoice = () => {
  const { AxiosGet, AxiosPost } = useAxiosHelper();
  const location = useLocation();
  const { orderId, transaction, inst } = location.state || {};
  const [profileData, setProfileData] = useState();
  const dispatch = useDispatch();
  const [companyData, setCompanyData] = useState([]);
  const [orders, setOrders] = useState();
  const [cartItems, setCartItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  // console.log("Transaction:", transaction, inst);

  async function fetchProfile() {
    try {
      const res = await AxiosGet(ApiPaths.getProfile);
      setProfileData(res);
      console.log("Profile Data yyyyyyyyyyy==>", res);
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
      const data = localStorage.getItem("companyData");
      // console.log(JSON.parse(data));
      setCompanyData(JSON.parse(data));
    } catch (error) {
      BasicInfo.isDebug && console.log(error);
    }
  }

  async function fetchOrders() {
    try {
      console.log("orderId", orderId);
      const queryParams = {
        order_Id: orderId,
      };
      const res = await AxiosGet(
        `${ApiPaths.viewProducts}?${new URLSearchParams(
          queryParams
        ).toString()}`
      );
      setOrders(res?.data);
      setAddress(JSON.parse(res?.data?.address));
      setAddress2(JSON.parse(res?.data?.address2));
      setCartItems(JSON.parse(res?.data?.cart_itms));
      //  setSum(res?.sum);
      console.log("Cart Data ==>", res?.data);
      console.log("address ==>", JSON.parse(res?.data?.address));
      console.log("address 2 ==>", JSON.parse(res?.data?.address2));
      console.log("Cart Items ==>", JSON.parse(res?.data?.cart_itms));
      //  setTotalPages(res?.totalPages);
    } catch (error) {
      console.log(error);
    }
  }

  const amountInWords = (amount) => {
    if (!Number.isFinite(amount)) {
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

  function calculatePendingInstallments(data) {
    // console.log("pending installments", data);
    const installmentArray = data?.installment || [];
    const pendingInstallments = installmentArray.filter(
      (inst) => inst.status === 0
    ).length;
    return pendingInstallments || "Inst. completed";
  }

  function getUnpaidInstallmentAmount(data) {
    // console.log("unpaid data", data);
    const installmentArray = data?.installment || [];

    const UnpaidInstallment = installmentArray
      .filter(
        (inst) =>
          inst.status === 0 && new Date(inst.installment_Date) > new Date()
      )
      .sort(
        (a, b) => new Date(a.installment_Date) - new Date(b.installment_Date)
      )[0];

    return UnpaidInstallment?.installment_amount || "No next inst.";
  }

  function getUnpaidInstallmentDate(data) {
    // console.log("unpaid date data", data);
    const installmentArray = data?.installment || [];

    const UnpaidInstallment = installmentArray
      .filter(
        (inst) =>
          inst.status === 0 && new Date(inst.installment_Date) > new Date()
      )
      .sort(
        (a, b) => new Date(a.installment_Date) - new Date(b.installment_Date)
      )[0];

    return UnpaidInstallment?.installment_Date;
  }

  const downloadPDF = async () => {
    // Capture the content of the page
    const element = document.getElementById("pdf-content"); // Replace with your content ID

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
      <Header />

      <div className="currency-head">
        <h2>INVOICE</h2>
      </div>

      <Row md="12" className="rowInvoice" style={{ margin: "0px" }}>
        <Col lg="2" md="1"></Col>
        <Col lg="8" md="10">
          <div className="bondClose">
            <button className="downloadButton" onClick={downloadPDF}>
              <MdOutlineFileDownload />
            </button>
          </div>
          <div id="pdf-content">
            <div className="invoice">
              <div className="invoice-container">
                <div className="headingDiv">
                  <img src={Logo} alt="Amiara Logo" className="logoImg" />
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
                      <span>Website: </span> {companyData?.contactInfo?.website}
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
                      <th>
                        DP
                        <br /> Price(₹)
                      </th>
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
                          <td>{x?.dp_price}</td>
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
                        {amountInWords(orders?.amount).charAt(0).toUpperCase() +
                          amountInWords(orders?.amount).slice(1)}
                      </td>
                      {/* <td></td> */}
                    </tr>
                    {/* <tr className="thirdRow">
                      <td colSpan={3}>Amount in Words</td>
                      <td colSpan={3}>
                        {amountInWords(inst?.installment_amount + 0.0)
                          .charAt(0)
                          .toUpperCase() +
                          amountInWords(inst?.installment_amount + 0.0).slice(
                            1
                          )}{" "}
                        Only
                      </td>
                       <td></td> 
                    </tr> */}
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
                    This receipt has been electronically generated and securely
                    digitally signed.
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
                    Please let us know if you have any questions. We are here to
                    help!
                  </p>
                  <h4>Thank You for your business!</h4>
                </footer>
              </div>
            </div>
          </div>
        </Col>
        <Col lg="2" md="1"></Col>
      </Row>

      <Footer />
    </>
  );
};

export default Invoice;
