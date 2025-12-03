import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./BookingForm.css";
import galleryImg from "../assets/nature.jpg";
import { useLocation, useNavigate } from "react-router-dom";

function BookingForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = location.state || {};
  const selectedEvent = navState.event || null;
  const selectedTicket = navState.ticket || null;
  const selectedDate = navState.date || null;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "India",
    state: "",
    city: "",
    zip: "",
    address: "",
    note: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};

    if (!/^[A-Za-z ]{2,}$/.test(form.firstName))
      err.firstName = "Enter valid first name";

    if (!/^[A-Za-z ]{2,}$/.test(form.lastName))
      err.lastName = "Enter valid last name";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = "Enter valid email";

    if (!/^\d{10}$/.test(form.phone)) err.phone = "Enter 10-digit phone";

    if (!form.state) err.state = "Select a state";

    if (!/^[A-Za-z ]{2,}$/.test(form.city)) err.city = "Enter valid city";

    if (!/^\d{4,6}$/.test(form.zip)) err.zip = "Enter valid ZIP code";

    if (!form.address.trim()) err.address = "Address is required";

    return err;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // attach event/ticket to invoice
      navigate("/invoice", { state: { ...form, event: selectedEvent, ticket: selectedTicket, date: selectedDate } });
    }
  };

  const formatDate = (dateStringOrDay) => {
    if (!dateStringOrDay) return "";
    if (typeof dateStringOrDay === 'number') {
      const base = new Date();
      base.setDate(dateStringOrDay);
      return base.toLocaleDateString();
    }
    const d = new Date(dateStringOrDay);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <>
      <Navbar />
      <div className="booking-container container">
        <div className="left-section">
          <div className="bookingimgdata">
            <img
              src={selectedEvent ? `http://localhost:8000/uploads/${selectedEvent.image}` : galleryImg}
              alt={selectedEvent ? selectedEvent.title : "Event"}
              className="bookingmain-image"
            />
            <div className="bookingdata">
              <h2>{selectedEvent ? selectedEvent.title : "Your Event"}</h2>
              <p>📅 {selectedDate ? selectedDate : formatDate(selectedEvent?.startDate)}</p>
              <p>📍 {selectedEvent ? selectedEvent.location : ""}</p>
            </div>
          </div>

          <h3>Billing Details:</h3>
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-pair">
              <div className="form-row">
                <label>First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <span className="error">{errors.firstName}</span>
                )}
              </div>
              <div className="form-row">
                <label>Last Name*</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <span className="error">{errors.lastName}</span>
                )}
              </div>
            </div>

            <div className="form-pair">
              <div className="form-row">
                <label>Email*</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="form-row">
                <label>Mobile Number*</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>
            </div>

            

            <div className="form-pair">
              <div className="form-row">
                <label>Country</label>
                <input type="text" value="India" disabled />
              </div>
              <div className="form-row">
                <label>State*</label>
                <select name="state" value={form.state} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Goa">Goa</option>
                  <option value="Karnataka">Karnataka</option>
                </select>
                {errors.state && <span className="error">{errors.state}</span>}
              </div>
            </div>

            <div className="form-pair">
              <div className="form-row">
                <label>City*</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                />
                {errors.city && <span className="error">{errors.city}</span>}
              </div>
              <div className="form-row">
                <label>Zip Code*</label>
                <input
                  type="text"
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                />
                {errors.zip && <span className="error">{errors.zip}</span>}
              </div>
            </div>

            <div className="form-pair">
              

              <div className="form-row">
              <label>Address*</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
              />
              {errors.address && (
                <span className="error">{errors.address}</span>
              )}
            </div>
            <div className="form-row">
                <label>How many tickets you want</label>
                <select name="note" value={form.note} onChange={handleChange}>
                  <option value="">Select</option>
                  {[...Array(selectedTicket?.maxTicketsPerOrder || 10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" className="submit-btn">
              Proceed to Pay
            </button>
          </form>
        </div>

        <div className="right-section">
          <div className="ticket-summary">
            <h4>Your Tickets</h4>
            <p>
              <strong>Manage Attendees</strong>
            </p>
            <p>
              {selectedEvent ? selectedEvent.title : "Event"}
              {selectedTicket ? ` - ${selectedTicket.ticketType}` : ""}
              {form.note ? ` x ${form.note}` : " x 1"}
            </p>
            <hr />
            <p>
              <strong>Total:</strong> ₹{selectedTicket ? (selectedTicket.ticketPrice * (parseInt(form.note || 1))) : 0}
            </p>
            <p>
              <strong>Payable:</strong> ₹{selectedTicket ? (selectedTicket.ticketPrice * (parseInt(form.note || 1))) : 0}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BookingForm;
