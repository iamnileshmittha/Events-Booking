import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./BookingForm.css";

function InvoicePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const billingData = location.state || {};

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Navbar />

      <div className="invoice-container">
        <div className="invoice-box">
          <div className="top-buttons">
            <button className="back-btn" onClick={() => navigate(-1)}>
              Back
            </button>
           <div className="print-div">
           <button className="ticket-print-btn" >
              Ticket Print
            </button>
            <button className="print-btn" onClick={handlePrint}>
              Print Invoice
            </button>
           </div>
          </div>

          <div className="header">
            <h2>Invoice</h2>
            <p className="order-id">
              <strong>Order ID:</strong> JT-00081
            </p>
          </div>

          <p className="ticket-note">
            E-Ticket will be emailed to you once payment is successful to email
            id <b>{billingData.email || "yourmail@example.com"}</b>
            <br />
            Carry Print of this E-ticket at the time of Event. Thank you!
          </p>

          <h3 className="event-title">Sinhagad Fort, Pune</h3>

          <div className="details-section">
            <div className="billing-info">
              <p>
                <strong>Billed To:</strong>
              </p>
              <p className="billingTo">
                {billingData.firstName} {billingData.lastName}
                <br />
                {billingData.phone}
                <br />
                {billingData.email}
                <br />
                {billingData.address}
                <br />
                {billingData.city}-{billingData.zip}, {billingData.state},{" "}
                {billingData.country}
              </p>

              <div>
                <div className="status-row">
                  <div className="payment-status">
                    <p className="status-label">
                      <strong>Payment Status</strong>
                    </p>
                    <p className="status pending">Pending</p>
                  </div>

                  <div className="order-date">
                    <p>
                      <strong>Order Date</strong>
                    </p>
                    <p>{new Date().toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="payment-info">
            <p className="section-title">Payment Information:</p>

            <div className="table-box">
              <div className="table-heading">Ticket Information:</div>
              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Slot1 (08:00am to 12:00pm)</td>
                    <td>1</td>
                    <td>10 ₹</td>
                    <td>10 ₹</td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="align-right bold">
                      Sub Total
                    </td>
                    <td>10 ₹</td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="align-right bold">
                      Order Total
                    </td>
                    <td>10 ₹</td>
                  </tr>
                  <tr>
                    <td colSpan="5">
                      <div className="alert-box">
                        <p>
                          We have received your payment request via the offline
                          payment gateway. Please wait until the admin confirms
                          your request.
                        </p>
                        <p>
                          If you still want to make a payment through another
                          payment gateway, please retry the payment.
                        </p>
                        <button className="retry-btn">Retry payment</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default InvoicePage;
