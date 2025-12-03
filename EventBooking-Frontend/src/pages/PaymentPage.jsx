// src/pages/PaymentPage.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./BookingForm.css";
import galleryImg from "../assets/nature.jpg";

import { useNavigate } from "react-router-dom"; 

function PaymentPage() {
const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentSelect = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePayNow = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    alert(`Proceeding with payment method: ${paymentMethod}`);
    // Integrate your payment API or logic here
  };

  return (
    <>
      <Navbar />
      <div className="booking-container container">
        <div className="left-section">
          <div className="bookingimgdata">
            <img
              src={galleryImg}
              alt="Sinhagad Fort"
              className="bookingmain-image"
            />
            <div className="bookingdata">
              <h2>Sinhagad Fort, Pune</h2>
              <p>📅 July 29, 2025, 6:00 am</p>
              <p>📍 Sinhagad Ghat Road, Thoptewadi, Maharashtra</p>
            </div>
          </div>

          <div className="payment-page">
  <h2>Choose Payment Method</h2>
  <div className="payment-options">
    <label className="custom-radio">
      <input
        type="radio"
        name="payment"
        value="paybycheck"
        onChange={handlePaymentSelect}
      />
      Pay By Check
    </label>
    <label className="custom-radio">
      <input
        type="radio"
        name="payment"
        value="Credit/Debit Card"
        onChange={handlePaymentSelect}
      />
      Credit / Debit Card
    </label>
    <label className="custom-radio">
      <input
        type="radio"
        name="payment"
        value="UPI"
        onChange={handlePaymentSelect}
      />
      UPI
    </label>
    <label className="custom-radio">
      <input
        type="radio"
        name="payment"
        value="Net Banking"
        onChange={handlePaymentSelect}
      />
      Net Banking
    </label>
    <label className="custom-radio">
      <input
        type="radio"
        name="payment"
        value="Razorpay"
        onChange={handlePaymentSelect}
      />
      Razorpay
    </label>
  </div>

  {/* Conditionally show this block only when "Pay By Check" is selected */}
  {paymentMethod === "paybycheck" && (
    <div className="confirm-order-section">
      <p><b>Order Information:</b>
          Thank you for your order. Your order is in our records, but will not be processed until we have received payment from you via PayBy Check.
          Please see below for additional information on submitting payment.</p>
      <p className="mt-3">Please confirm your order. You will receive instructions on how to mail your check.</p>
      {/* <button className="confirm-order-btn" onClick={() => alert("Order Confirmed via Check!")}>
        Confirm Order
      </button> */}


<button className="confirm-order-btn" onClick={() => navigate("/invoice")}>
  Confirm Order
</button>

    </div>
  )}
</div>

        </div>

        <div className="right-section">
          <div className="ticket-summary">
            <h4>Your Tickets</h4>
            <p>
              <strong>Manage Attendees</strong>
            </p>
            <p>Sinhagad Fort Slot (6:00 am - 9:00 am) x 1</p>
            <hr />
            <p>
              <strong>Total:</strong> ₹20
            </p>
            <p>
              <strong>Payable:</strong> ₹20
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default PaymentPage;
