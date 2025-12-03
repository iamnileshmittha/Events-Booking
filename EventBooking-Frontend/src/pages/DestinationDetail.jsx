import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import galleryImg from "../assets/nature.jpg";
import "./DestinationDetail.css";
import { useNavigate } from "react-router-dom";
import destiDataEvent from "../data/destiDataEvent";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const destination = destiDataEvent.find((d) => d.id === id);

  const today = new Date();
const todayDate = today.getDate();
const todayMonth = today.getMonth();
const todayYear = today.getFullYear();

// Get first day of current month (0=Sunday)
const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

// Fill calendar grid with previous, current, next month days
const calendarDays = [];

// Add trailing days from previous month
for (let i = firstDayOfMonth - 1; i >= 0; i--) {
  calendarDays.push({
    day: daysInPrevMonth - i,
    isCurrentMonth: false,
    month: currentMonth === 0 ? 11 : currentMonth - 1,
    year: currentMonth === 0 ? currentYear - 1 : currentYear,
  });
}

// Add current month days
for (let i = 1; i <= daysInCurrentMonth; i++) {
  calendarDays.push({
    day: i,
    isCurrentMonth: true,
    month: currentMonth,
    year: currentYear,
  });
}

// Fill remaining cells with next month
while (calendarDays.length % 7 !== 0) {
  const day = calendarDays.length - (firstDayOfMonth + daysInCurrentMonth) + 1;
  calendarDays.push({
    day: day,
    isCurrentMonth: false,
    month: currentMonth === 11 ? 0 : currentMonth + 1,
    year: currentMonth === 11 ? currentYear + 1 : currentYear,
  });
}


  if (!destination) return <div>Destination not found</div>;

  const availableDates = [26, 28, 29, 30, 31];
  const slots = [
    {
      label: "Slot1 (06:00AM to 10:00AM)",
      available: 100,
      price: 10,
    },
    {
      label: "Slot2 (10:00 AM to 02:00 PM)",
      available: 100,
      price: 10,
    },
    {
      label: "Slot3 (02:00 PM to 06:00 PM)",
      available: 50,
      price: 20,
    },
  ];

  const handleCloseSlots = () => setSelectedDate(null);

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="detail-grid">
          <div className="left-section">
            <img
              src={destination.img}
              alt="Sinhagad Fort"
              className="main-image"
            />
            <h2 className="title">{destination.name}</h2>
            <p className="description">{destination.description}</p>
            <div class="info-box">
              <div class="info-item">
                <div class="label">
                  <i class="fas fa-location-dot"></i>
                  Location
                </div>
                <div class="value">{destination.location}</div>
              </div>
              <div class="info-item">
                <div class="label">
                  <i class="fas fa-clock"></i>
                  Operating Hours
                </div>
                <div class="value">{destination.hours}</div>
              </div>
            </div>

            <div class="amenities-box">
              <h4>Available Amenities</h4>
              <ul class="amenities-list">
                <li>
                  <span class="icon">✔</span> Parking area
                </li>
                <li>
                  <span class="icon">✔</span> Viewpoints
                </li>
                <li>
                  <span class="icon">✔</span> Food Stalls
                </li>
                <li>
                  <span class="icon">✔</span> Historical Museum
                </li>
                <li>
                  <span class="icon">✔</span> Restrooms
                </li>
              </ul>
            </div>

            <div class="visitor-card">
              <h4 class="card-title">Visitor Guidelines</h4>
              <ul class="guidelines-list">
                <li>
                  <span class="icon">⚠</span>Wear comfortable trekking shoes
                </li>
                <li>
                  <span class="icon">⚠</span>Carry sufficient water and snacks
                </li>
                <li>
                  <span class="icon">⚠</span>Respect historical monuments
                </li>
                <li>
                  <span class="icon">⚠</span>Photography allowed in designated
                  areas
                </li>
                <li>
                  <span class="icon">⚠</span>Follow designated walking paths
                </li>
              </ul>
            </div>
          </div>

          <div className="right-section">
            <div className="booking-box">
              <h3>Book Your Visit</h3>
              <p className="slots">
                Vehicle Slots: <strong>3 / 25</strong>
              </p>
              <label className="select-label">Select Date:</label>

              <div className="calendar-box">
                <div className="calendar-header">
                  <button className="month-arrow" onClick={handlePrevMonth}>
                  <i className="fas fa-chevron-left"></i>
                  </button>
                  <span className="calendar-month">
                    {months[currentMonth]} {currentYear}
                  </span>
                  <button className="month-arrow" onClick={handleNextMonth}>
                  <i className="fas fa-chevron-right"></i>
                  </button>
                </div>

                <div className="calendar-weekdays">
                  {"SMTWTFS".split("").map((day, i) => (
                    <span key={i} className="weekday">
                      {day}
                    </span>
                  ))}
                </div>

                <div className="calendar-dates">
  {calendarDays.map((dateObj, index) => {
    const { day, isCurrentMonth, month, year } = dateObj;

    const isToday =
      day === todayDate && month === todayMonth && year === todayYear;

    const isAvailable =
      isCurrentMonth && availableDates.includes(day);

    const isSelected =
      isCurrentMonth && selectedDate === day;

    return (
      <span
        key={index}
        className={`date
          ${isCurrentMonth ? "" : "dimmed"}
          ${isAvailable ? "available" : ""}
          ${isSelected ? "selected" : ""}
          ${isToday ? "today" : ""}
        `}
        onClick={() =>
          isCurrentMonth && isAvailable && setSelectedDate(day)
        }
      >
        {day}
        {isAvailable && <span className="badge">1</span>}
      </span>
    );
  })}
</div>

              </div>

              <div className="legend">
                <span className="legend-item green">Available</span>
                <span className="legend-item orange">Filling Fast</span>
                <span className="legend-item gray">Fully Booked</span>
              </div>

              {selectedDate && (
                <div className="slots-box">
                  <div className="slots-header">
                    <h4>Sinhagad Fort, Pune</h4>
                    <button className="close-btn" onClick={handleCloseSlots}>
                      ×
                    </button>
                  </div>
                  {slots.map((slot, index) => (
                    <div className="slot-card" key={index}>
                      <div>
                        <p>
                          <strong>{slot.label}</strong>
                        </p>
                        <p>
                          Available: {slot.available} | Price: {slot.price}
                        </p>
                      </div>
                      <div>
                        {/* <button className="book-btn">Book Now</button> */}
                        <button
                          className="book-btn"
                          onClick={() => navigate("/booking")}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="important-notice">
                <strong>Important Notice:</strong> Vehicle permits are mandatory
                for 4-wheelers. Carry valid driving license and vehicle
                registration.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DestinationDetail;
