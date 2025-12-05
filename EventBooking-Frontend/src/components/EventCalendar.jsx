import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EventCalendar.css";

const EventCalendar = ({ onBookTicket }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/event`);
      if (response.data.success) {
        setEvents(response.data.events);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsForDate = (date) => {
    return events.filter((event) => {
      const bookingStart = new Date(event.bookingStartDate);
      const bookingEnd = new Date(event.bookingEndDate);
      const checkDate = new Date(date);
      
      bookingStart.setHours(0, 0, 0, 0);
      bookingEnd.setHours(23, 59, 59, 999);
      checkDate.setHours(0, 0, 0, 0);

      return checkDate >= bookingStart && checkDate <= bookingEnd;
    });
  };

  const handleDateClick = async (day) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    
    const eventsOnDate = getEventsForDate(clickedDate);
    
    if (eventsOnDate.length > 0) {
      setSelectedDate(clickedDate);
      setSelectedEvent(eventsOnDate[0]);
      setLoading(true);
      setShowPopup(true);

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/ticketype/event/${eventsOnDate[0]._id}`
        );
        if (response.data.success) {
          setTickets(response.data.tickets);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBookTicket = (ticket) => {
    onBookTicket(selectedEvent, ticket);
    setShowPopup(false);
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const eventsOnDate = getEventsForDate(date);
      const hasEvents = eventsOnDate.length > 0;

      days.push(
        <div
          key={day}
          className={`calendar-day ${hasEvents ? "has-event" : ""}`}
          onClick={() => handleDateClick(day)}
        >
          <span className="day-number">{day}</span>
          {hasEvents && <div className="event-dot"></div>}
        </div>
      );
    }

    return days;
  };

  const changeMonth = (direction) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1)
    );
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="event-calendar-container">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)} className="nav-btn">
          <i className="fa fa-chevron-left"></i>
        </button>
        <h2>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button onClick={() => changeMonth(1)} className="nav-btn">
          <i className="fa fa-chevron-right"></i>
        </button>
      </div>

      <div className="calendar-weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      <div className="calendar-grid">{renderCalendar()}</div>

      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowPopup(false)}>
              ×
            </button>
            
            <h3>{selectedEvent?.title}</h3>
            <p className="event-location">
              <i className="fa fa-map-marker"></i> {selectedEvent?.location}
            </p>
            
            <div className="event-dates">
              <p>
                <strong>Event:</strong>{" "}
                {new Date(selectedEvent?.startDate).toLocaleDateString()} -{" "}
                {new Date(selectedEvent?.endDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Booking:</strong>{" "}
                {new Date(selectedEvent?.bookingStartDate).toLocaleDateString()} -{" "}
                {new Date(selectedEvent?.bookingEndDate).toLocaleDateString()}
              </p>
            </div>

            <h4>Available Tickets</h4>
            
            {loading ? (
              <div className="loading">Loading tickets...</div>
            ) : tickets.length === 0 ? (
              <p>No tickets available</p>
            ) : (
              <div className="tickets-list">
                {tickets.map((ticket) => (
                  <div key={ticket._id} className="ticket-card">
                    <div className="ticket-info">
                      <h5>{ticket.ticketType}</h5>
                      <p className="ticket-price">₹{ticket.ticketPrice}</p>
                      <p className="ticket-availability">
                        {ticket.availability === "unlimited"
                          ? "Unlimited seats"
                          : `${ticket.remainingSeats} / ${ticket.seatsCount} seats`}
                      </p>
                      <p className="ticket-max">
                        Max {ticket.maxTicketsPerOrder} per order
                      </p>
                    </div>
                    <button
                      className="book-btn"
                      onClick={() => handleBookTicket(ticket)}
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;
