import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./DestinationDetail.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availableDates, setAvailableDates] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [ticketsLoading, setTicketsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/event/${id}`);
        if (response.data.success) {
          setEvent(response.data.event);
        } else {
          console.error("Failed to fetch event:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // tickets for event
  useEffect(() => {
    const fetchTickets = async () => {
      if (!id) return;
      try {
        setTicketsLoading(true);
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/ticketype/event/${id}`);
        if (res.data.success) {
          setTickets(res.data.tickets || []);
        } else {
          setTickets([]);
        }
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setTickets([]);
      } finally {
        setTicketsLoading(false);
      }
    };

    fetchTickets();
  }, [id]);

  // Recompute available dates whenever event or visible month changes
  // Using BOOKING dates to show green dots
  useEffect(() => {
    if (!event) return;

    const start = new Date(event.bookingStartDate);
    const end = new Date(event.bookingEndDate);

    // Normalize to start of day
    start.setHours(0,0,0,0);
    end.setHours(0,0,0,0);

    const firstOfMonth = new Date(currentYear, currentMonth, 1);
    const lastOfMonth = new Date(currentYear, currentMonth + 1, 0);

    const rangeStart = start > firstOfMonth ? start : firstOfMonth;
    const rangeEnd = end < lastOfMonth ? end : lastOfMonth;

    const days = [];

    if (rangeStart <= rangeEnd) {
      const cursor = new Date(rangeStart);
      while (cursor <= rangeEnd) {
        days.push(cursor.getDate());
        cursor.setDate(cursor.getDate() + 1);
      }
    }

    console.log("Booking dates:", {
      bookingStart: event.bookingStartDate,
      bookingEnd: event.bookingEndDate,
      availableDays: days,
      currentMonth: currentMonth,
      currentYear: currentYear
    });

    setAvailableDates(days);
  }, [event, currentMonth, currentYear]);

  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const calendarDays = [];

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      month: currentMonth === 0 ? 11 : currentMonth - 1,
      year: currentYear === 0 && currentMonth === 0 ? currentYear - 1 : currentYear,
    });
  }

  for (let i = 1; i <= daysInCurrentMonth; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: true,
      month: currentMonth,
      year: currentYear,
    });
  }

  while (calendarDays.length % 7 !== 0) {
    const day = calendarDays.length - (firstDayOfMonth + daysInCurrentMonth) + 1;
    calendarDays.push({
      day: day,
      isCurrentMonth: false,
      month: currentMonth === 11 ? 0 : currentMonth + 1,
      year: currentMonth === 11 ? currentYear + 1 : currentYear,
    });
  }

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h3>Loading event details...</h3>
    </div>
  );
  
  if (!event) return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h3>Event not found</h3>
    </div>
  );

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCloseSlots = () => setSelectedDate(null);

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

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="detail-grid">
          <div className="left-section">
            <img
              src={`${process.env.REACT_APP_API_URL}/uploads/${event.image}`}
              alt={event.title}
              className="main-image"
            />
            <h2 className="title">{event.title}</h2>
            <p className="description">{event.description || "No description available"}</p>
            
            <div className="info-box">
              <div className="info-item">
                <div className="label">
                  <i className="fas fa-location-dot"></i>
                  Location
                </div>
                <div className="value">{event.location}</div>
              </div>
              <div className="info-item">
                <div className="label">
                  <i className="fas fa-clock"></i>
                  Opration Hours
                </div>
                <div className="value">
                  {formatDate(event.bookingStartDate)} - {formatDate(event.bookingEndDate)}
                </div>
              </div>
            </div>

            <div className="amenities-box">
              <h4>Available Amenities</h4>
              <ul className="amenities-list">
                <li>
                  <span className="icon">✔</span> Parking area
                </li>
                <li>
                  <span className="icon">✔</span> Viewpoints
                </li>
                <li>
                  <span className="icon">✔</span> Food Stalls
                </li>
                <li>
                  <span className="icon">✔</span> Historical Museum
                </li>
                <li>
                  <span className="icon">✔</span> Restrooms
                </li>
              </ul>
            </div>

            <div className="visitor-card">
              <h4 className="card-title">Visitor Guidelines</h4>
              <ul className="guidelines-list">
                <li>
                  <span className="icon">⚠</span>Wear comfortable trekking shoes
                </li>
                <li>
                  <span className="icon">⚠</span>Carry sufficient water and snacks
                </li>
                <li>
                  <span className="icon">⚠</span>Respect historical monuments
                </li>
                <li>
                  <span className="icon">⚠</span>Photography allowed in designated
                  areas
                </li>
                <li>
                  <span className="icon">⚠</span>Follow designated walking paths
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
                    <h4>{event.title}</h4>
                    <button className="close-btn" onClick={handleCloseSlots}>
                      ×
                    </button>
                  </div>

                  {ticketsLoading ? (
                    <p>Loading tickets...</p>
                  ) : tickets.length === 0 ? (
                    <p>No tickets available.</p>
                  ) : (
                    tickets.map((t) => (
                      <div className="slot-card" key={t._id}>
                        <div>
                          <p>
                            <strong>{t.ticketType}</strong>
                          </p>
                          <p>
                            Price: {t.ticketPrice} | Max/Order: {t.maxTicketsPerOrder}
                          </p>
                          {t.availability === 'limited' && (
                            <p>
                              Seats: {t.remainingSeats ?? t.seatsCount}
                            </p>
                          )}
                        </div>
                        <div>
                          <button
                            className="book-btn"
                            onClick={() => navigate("/booking", { state: { event, ticket: t, date: selectedDate } })}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    ))
                  )}
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

export default EventDetail;
