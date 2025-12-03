import React, { useState, useEffect } from "react";
import axios from "axios";

import "./AdminPage.css";

function AdminPage() {
  const [activeSection, setActiveSection] = useState("event");
  const [showSubmenu, setShowSubmenu] = useState(true);
  const [showTabs, setShowTabs] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [savedEventId, setSavedEventId] = useState(null);

  // Fetch events when component mounts and when events section is active
  useEffect(() => {
    if (activeSection === "event") {
      fetchEvents();
    }
  }, [activeSection]);

  // Function to fetch all events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/event");
      
      if (response.data.success) {
        setEvents(response.data.events);
        console.log("✅ Events fetched:", response.data.events);
      } else {
        console.error("❌ Failed to fetch events:", response.data.message);
      }
    } catch (error) {
      console.error("❌ Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshEvents = () => {
    fetchEvents();
  };

  // Handle checkbox selection
  const handleSelectEvent = (eventId) => {
    setSelectedEvents((prev) => {
      if (prev.includes(eventId)) {
        return prev.filter((id) => id !== eventId);
      } else {
        return [...prev, eventId];
      }
    });
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedEvents.length === events.length) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents(events.map((event) => event._id));
    }
  };

  // Handle delete selected events
  const handleDeleteSelected = async () => {
    if (selectedEvents.length === 0) {
      alert("Please select at least one event to delete");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedEvents.length} event(s)? This action cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete("http://localhost:8000/api/event", {
        data: { eventIds: selectedEvents }
      });

      if (response.data.success) {
        alert(`Successfully deleted ${response.data.deletedCount} event(s)`);
        setSelectedEvents([]);
        fetchEvents();
      }
    } catch (error) {
      console.error("❌ Error deleting events:", error);
      alert("Failed to delete events. Please try again.");
    }
  };

  // Handle delete single event
  const handleDeleteSingle = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete("http://localhost:8000/api/event", {
        data: { eventIds: [eventId] }
      });

      if (response.data.success) {
        alert("Event deleted successfully!");
        fetchEvents();
      }
    } catch (error) {
      console.error("❌ Error deleting event:", error);
      alert("Failed to delete event. Please try again.");
    }
  };

  // Handle edit event
  const handleEditEvent = async (event) => {
    setIsEditMode(true);
    setEditingEventId(event._id);
    setSavedEventId(event._id);
    setEventData({
      title: event.title,
      startDate: event.startDate.split('T')[0],
      endDate: event.endDate.split('T')[0],
      location: event.location,
      description: event.description,
      image: null,
      bookingStartDate: event.bookingStartDate.split('T')[0],
      bookingEndDate: event.bookingEndDate.split('T')[0],
    });
    
    // Fetch tickets for this event
    try {
      const response = await axios.get(`http://localhost:8000/api/ticketype/event/${event._id}`);
      if (response.data.success && response.data.tickets.length > 0) {
        const existingTickets = response.data.tickets.map(ticket => ({
          _id: ticket._id,
          ticketType: ticket.ticketType,
          ticketPrice: ticket.ticketPrice,
          bookingEndDate: ticket.bookingEndDate.split('T')[0],
          availability: ticket.availability,
          maxTicketsPerOrder: ticket.maxTicketsPerOrder,
          seatsCount: ticket.seatsCount || "",
          remainingSeats: ticket.remainingSeats || "",
        }));
        setTickets(existingTickets);
      } else {
        setTickets([{
          ticketType: "",
          ticketPrice: "",
          bookingEndDate: "",
          availability: "unlimited",
          maxTicketsPerOrder: "",
          seatsCount: "",
          remainingSeats: "",
        }]);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setTickets([{
        ticketType: "",
        ticketPrice: "",
        bookingEndDate: "",
        availability: "unlimited",
        maxTicketsPerOrder: "",
        seatsCount: "",
        remainingSeats: "",
      }]);
    }
    
    setShowTabs(true);
    setActiveTab("details");
  };

  const handleAddClick = () => {
    setIsEditMode(false);
    setEditingEventId(null);
    setShowTabs(true);
    setEventData(initialEventData);
    setTickets([{
      ticketType: "",
      ticketPrice: "",
      bookingEndDate: "",
      availability: "unlimited",
      maxTicketsPerOrder: "",
      seatsCount: "",
      remainingSeats: "",
    }]);
    setActiveTab("details");
  };

  const initialEventData = {
    title: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
    image: null,
    bookingStartDate: "",
    bookingEndDate: "",
  };
// Nilesh code
 // 🔽 Add this at the top of your component
 

 const [tickets, setTickets] = useState([
  {
    ticketType: "",
    ticketPrice: "",
    bookingEndDate: "",
    availability: "unlimited",
    maxTicketsPerOrder: "",
    seatsCount: "",
    remainingSeats: "",
  },
]);

const handleChange = (index, e) => {
  const { name, value } = e.target;
  const updatedTickets = [...tickets];
  updatedTickets[index][name] = value;
  setTickets(updatedTickets);
};

const handleAddTicket = () => {
  setTickets([
    ...tickets,
    {
      ticketType: "",
      ticketPrice: "",
      bookingEndDate: "",
      availability: "unlimited",
      maxTicketsPerOrder: "",
      seatsCount: "",
      remainingSeats: "",
    },
  ]);
};

const handleDeleteTicket = (index) => {
  if (tickets.length === 1) {
    alert("At least one ticket type is required!");
    return;
  }
  const updatedTickets = tickets.filter((_, i) => i !== index);
  setTickets(updatedTickets);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!savedEventId) {
    alert("Event ID not found. Please submit event details first.");
    return;
  }

  const ticketsWithEventId = tickets.map((ticket) => ({
    ticketType: ticket.ticketType,
    ticketPrice: ticket.ticketPrice,
    bookingEndDate: ticket.bookingEndDate,
    availability: ticket.availability,
    maxTicketsPerOrder: ticket.maxTicketsPerOrder,
    seatsCount: ticket.seatsCount || null,
    remainingSeats: ticket.remainingSeats || null,
    eventId: savedEventId,
  }));

  try {
    let response;
    if (isEditMode) {
      response = await axios.put("http://localhost:8000/api/ticketype/update", {
        tickets: ticketsWithEventId,
      });
    } else {
      response = await axios.post("http://localhost:8000/api/ticketype", {
        tickets: ticketsWithEventId,
      });
    }

    console.log("✅ Tickets saved:", response.data);
    alert("Tickets saved successfully!");
    
    setShowTabs(false);
    setIsEditMode(false);
    setEditingEventId(null);
    setSavedEventId(null);
    
    setTickets([{
      ticketType: "",
      ticketPrice: "",
      bookingEndDate: "",
      availability: "unlimited",
      maxTicketsPerOrder: "",
      seatsCount: "",
      remainingSeats: "",
    }]);
    
    fetchEvents();
  } catch (err) {
    console.error("❌ Error saving tickets:", err);
    alert("Failed to save tickets.");
  }
};

// nilesh code end

const [eventData, setEventData] = useState(initialEventData);

const handleEventSubmit = async (e) => {
  e.preventDefault();

  // Basic validation - image is optional
  const requiredFields = [
    "title",
    "location",
    "description",
    "startDate",
    "endDate",
    "bookingStartDate",
    "bookingEndDate",
  ];

  const isMissing = requiredFields.some((field) => !eventData[field]);
  if (isMissing) {
    alert("Please fill all required fields.");
    return;
  }

  try {
    console.log("Submitting event data:", eventData);

    const formData = new FormData();

    Object.keys(eventData).forEach((key) => {
      if (key === "image" && eventData.image) {
        formData.append("image", eventData.image); // actual File object
      } else if (key !== "image") {
        formData.append(key, eventData[key]);
      }
    });

    console.log("FormData entries:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    let response;
    if (isEditMode && editingEventId) {
      response = await axios.put(`http://localhost:8000/api/event/${editingEventId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("✅ Event updated successfully:", response.data);
      alert("Event updated successfully! You can now edit tickets.");
      setActiveTab("ticket");
    } else {
      response = await axios.post("http://localhost:8000/api/event", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("✅ Event saved successfully:", response.data);
      const eventId = response.data.eventId;
      setSavedEventId(eventId);
      setActiveTab("ticket");
      alert("Event saved successfully!");
    }
    
    setShowTabs(true);
    refreshEvents();
  } catch (error) {
    console.error("❌ Error saving event:", error);
    
    if (error.response) {
      // Server responded with error
      const errorMessage = error.response.data?.message || "Failed to save event";
      const errorDetails = error.response.data?.errors || error.response.data?.error || "";
      alert(`Error: ${errorMessage}\n${errorDetails}`);
    } else if (error.request) {
      // Request was made but no response received
      alert("No response from server. Please check if the backend is running.");
    } else {
      // Something else happened
      alert(`Failed to save event: ${error.message}`);
    }
  }
};


  // const handleAddClick = () => {
  //   setShowTabs(true);
  // };

  return (
    <div className="admin-wrapper">
      <div className="admin-right">
        <div className="sidebar">
          <ul>
            <li onClick={() => window.location.href = "/administrator/dashboard"}>
              <i className="fa fa-home" style={{ marginRight: "8px" }}></i>
              Home Dashboard
            </li>

            <li
              className="menu-heading"
              onClick={() => setShowSubmenu(!showSubmenu)}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>
                <i className="fa fa-ticket" style={{ marginRight: "8px" }}></i>
                JTicketing
              </span>
              <i
                className={`fa ${
                  showSubmenu ? "fa-angle-down" : "fa-angle-right"
                }`}
                style={{ marginLeft: "10px" }}
              ></i>
            </li>

            {showSubmenu && (
              <ul className="submenu">
                <li onClick={() => window.location.href = "/administrator/events"} style={{ backgroundColor: "#d96002" }}>
                  <i className="fa fa-calendar" style={{ marginRight: "6px" }}></i>
                  Event
                </li>
                <li onClick={() => window.location.href = "/administrator/users"}>
                  <i className="fa fa-users" style={{ marginRight: "6px" }}></i>
                  Users
                </li>
                <li onClick={() => window.location.href = "/administrator/orders"}>
                  <i className="fa fa-shopping-cart" style={{ marginRight: "6px" }}></i>
                  Order
                </li>
                <li onClick={() => window.location.href = "/administrator/reports"}>
                  <i className="fa fa-bar-chart" style={{ marginRight: "6px" }}></i>
                  Report
                </li>
              </ul>
            )}

            <li 
              onClick={() => {
                localStorage.removeItem("adminLoggedIn");
                localStorage.removeItem("adminLoginTime");
                window.location.href = "/administrator";
              }}
              style={{ marginTop: "20px", borderTop: "1px solid #ffffff33", paddingTop: "20px" }}
            >
              <i className="fa fa-sign-out" style={{ marginRight: "8px" }}></i>
              Logout
            </li>
          </ul>
        </div>
      </div>

      <div className="admin-left">
        <h1>Administrator Panel</h1>
        <hr />
        {activeSection === "event" && !showTabs && (
          <div className="event-actions">
            <button className="addbtn" onClick={handleAddClick}>
              <i className="fa fa-plus" style={{ marginRight: "5px" }}></i>
              Add Event
            </button>
            {selectedEvents.length > 0 && (
              <button className="deletebtn" onClick={handleDeleteSelected}>
                <i className="fa fa-trash" style={{ marginRight: "5px" }}></i>
                Delete Selected ({selectedEvents.length})
              </button>
            )}
          </div>
        )}

        {activeSection === "event" && showTabs && (
          <button
            className="addbtn"
            onClick={() => {
              setShowTabs(false);
              setIsEditMode(false);
              setEditingEventId(null);
              setEventData(initialEventData);
              setActiveTab("details");
            }}
          >
            <i className="fa fa-times" style={{ marginRight: "5px" }}></i>
            Close
          </button>
        )}

        {activeSection === "event" && !showTabs && (
          <>
            {/* Events Table */}
            <div className="events-section">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3>All Events</h3>
                <button 
                  onClick={fetchEvents} 
                  className="refresh-btn"
                >
                  <i className="fa fa-refresh" style={{ marginRight: "5px" }}></i>
                  Refresh
                </button>
              </div>
              
              {loading ? (
                <div className="loading-spinner">
                  <i className="fa fa-spinner fa-spin"></i>
                  <p>Loading events...</p>
                </div>
              ) : events.length === 0 ? (
                <div className="empty-state">
                  <p>No events found. Click "Add Event" to create your first event.</p>
                </div>
              ) : (
                <div className="event-table">
                  <table className="event-data-table">
                    <thead>
                      <tr>
                        <th className="checkbox-cell">
                          <input
                            type="checkbox"
                            checked={selectedEvents.length === events.length}
                            onChange={handleSelectAll}
                            title="Select All"
                          />
                        </th>
                        <th>Event Title</th>
                        <th>Location</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Booking Start</th>
                        <th>Booking End</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event) => {
                        const now = new Date();
                        const startDate = new Date(event.startDate);
                        const endDate = new Date(event.endDate);
                        let status = "";
                        let statusClass = "";
                        
                        if (startDate > now) {
                          status = "Upcoming";
                          statusClass = "status-upcoming";
                        } else if (startDate <= now && endDate >= now) {
                          status = "Current";
                          statusClass = "status-current";
                        } else {
                          status = "Completed";
                          statusClass = "status-completed";
                        }

                        return (
                          <tr key={event._id} className={selectedEvents.includes(event._id) ? "selected-row" : ""}>
                            <td className="checkbox-cell">
                              <input
                                type="checkbox"
                                checked={selectedEvents.includes(event._id)}
                                onChange={() => handleSelectEvent(event._id)}
                              />
                            </td>
                            <td>{event.title}</td>
                            <td>{event.location}</td>
                            <td>{startDate.toLocaleDateString()}</td>
                            <td>{endDate.toLocaleDateString()}</td>
                            <td>{new Date(event.bookingStartDate).toLocaleDateString()}</td>
                            <td>{new Date(event.bookingEndDate).toLocaleDateString()}</td>
                            <td>
                              <span className={`status-badge ${statusClass}`}>
                                {status}
                              </span>
                            </td>
                            <td>{new Date(event.createdAt).toLocaleDateString()}</td>
                            <td className="action-buttons-cell">
                              <button
                                className="edit-btn-small"
                                onClick={() => handleEditEvent(event)}
                                title="Edit Event"
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                className="delete-btn-small"
                                onClick={() => handleDeleteSingle(event._id)}
                                title="Delete Event"
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* Tabs */}
        {showTabs && (
          <div className="tabs-section">
            <div className="tab-headers">
              {/* <button
                className={activeTab === "details" ? "active-tab" : ""}
                onClick={() => setActiveTab("details")}
              >
                Event Details
              </button>
              <button
                className={activeTab === "ticket" ? "" : ""}
                onClick={() => setActiveTab("ticket")}
              >
                Ticket Types
              </button> */}
              <button
                className={activeTab === "details" ? "active-tab" : ""}
                onClick={() => setActiveTab("details")}
              >
                Event Details
              </button>

              <button
                className={activeTab === "ticket" ? "active-tab" : ""}
                onClick={() => setActiveTab("ticket")}
              >
                Ticket Types
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "details" && (
                <div>
                  {/* <p>Event Details Form</p> */}
                  <div className="event-form-admin">
                    <form
                      onSubmit={handleEventSubmit}>
        
                      <div className="form-row">
                        <div className="form-field">
                          <label>Event Title*</label>
                          <input
                            type="text"
                            value={eventData.title}
                            onChange={(e) =>
                              setEventData({
                                ...eventData,
                                title: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="form-field">
                          <label>Location</label>
                          <input
                            type="text"
                            value={eventData.location}
                            onChange={(e) =>
                              setEventData({
                                ...eventData,
                                location: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="form-field">
                          <label>Description</label>
                          <textarea
                            rows="2"
                            value={eventData.description}
                            onChange={(e) =>
                              setEventData({
                                ...eventData,
                                description: e.target.value,
                              })
                            }
                          ></textarea>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-field">
                          <label>Start Date*</label>
                          <input
                            type="date"
                            value={eventData.startDate}
                            onChange={(e) =>
                              setEventData({
                                ...eventData,
                                startDate: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="form-field">
                          <label>End Date*</label>
                          <input
                            type="date"
                            value={eventData.endDate}
                            onChange={(e) =>
                              setEventData({
                                ...eventData,
                                endDate: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-field">
                          <label>Upload Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              setEventData({
                                ...eventData,
                                image: e.target.files[0],
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-field">
                          <label>Booking Start Date</label>
                          <input
                            type="date"
                            value={eventData.bookingStartDate}
                            onChange={(e) =>
                              setEventData({
                                ...eventData,
                                bookingStartDate: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="form-field">
                          <label>Booking End Date</label>
                          <input
                            type="date"
                            value={eventData.bookingEndDate}
                            onChange={(e) =>
                              setEventData({
                                ...eventData,
                                bookingEndDate: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="form-actions">
                        <button type="submit" className="save-btn">
                          Save
                        </button>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => setEventData(initialEventData)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {activeTab === "ticket" && (
                <div>
                  {/* Ticket Types Content */}
                  {/* <p>Event Tickets Type</p> */}

                  {/* <form className="ticket-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-field">
                        <label>Ticket Type</label>
                        <select
                          name="ticketType"
                          value={ticketType}
                          onChange={(e) => setTicketType(e.target.value)}
                          required
                        >
                          <option value="">-- Select Type --</option>
                          <option value="free">Free</option>
                          <option value="silver">Silver</option>
                          <option value="gold">Gold</option>
                        </select>
                      </div>

                      <div className="form-field">
                        <label>Ticket Price</label>
                        <input
                          type="number"
                          name="ticketPrice"
                          value={formData.ticketPrice}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-field">
                        <label>Booking End Date</label>
                        <input
                          type="date"
                          name="bookingEndDate"
                          value={formData.bookingEndDate}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-field">
                        <label>Seat Availability</label>
                        <select
                          name="availability"
                          value={availability}
                          onChange={(e) => setAvailability(e.target.value)}
                        >
                          <option value="unlimited">Unlimited</option>
                          <option value="limited">Limited</option>
                        </select>
                      </div>

                      {(availability === "unlimited" ||
                        availability === "limited") && (
                        <div className="form-field">
                          <label>Maximum Tickets Per Order</label>
                          <input
                            type="number"
                            name="maxTicketsPerOrder"
                            value={formData.maxTicketsPerOrder}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      )}

                      {availability === "limited" && (
                        <>
                          <div className="form-field">
                            <label>Seats Count</label>
                            <input
                              type="number"
                              name="seatsCount"
                              value={formData.seatsCount}
                              onChange={handleChange}
                              required
                            />
                          </div>

                          <div className="form-field">
                            <label>Remaining Seats</label>
                            <input
                              type="number"
                              name="remainingSeats"
                              value={formData.remainingSeats}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </>
                      )}
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="save-btn">
                        Save Ticket
                      </button>
                    </div>
                  </form> */}


<form className="ticket-form" onSubmit={handleSubmit}>
      {tickets.map((ticket, index) => (
        <div key={index} className="ticket-block">
          <div className="ticket-block-header">
            <h4>Ticket #{index + 1}</h4>
            {tickets.length > 1 && (
              <button
                type="button"
                className="delete-ticket-btn"
                onClick={() => handleDeleteTicket(index)}
                title="Delete this ticket"
              >
                <i className="fa fa-trash"></i> Delete
              </button>
            )}
          </div>
          <div className="form-row">
            <div className="form-field">
              <label>Ticket Type</label>
              <select
                name="ticketType"
                value={ticket.ticketType}
                onChange={(e) => handleChange(index, e)}
                required
              >
                <option value="">-- Select Type --</option>
                <option value="free">Free</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
              </select>
            </div>

            <div className="form-field">
              <label>Ticket Price</label>
              <input
                type="number"
                name="ticketPrice"
                value={ticket.ticketPrice}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>

            <div className="form-field">
              <label>Booking End Date</label>
              <input
                type="date"
                name="bookingEndDate"
                value={ticket.bookingEndDate}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Seat Availability</label>
              <select
                name="availability"
                value={ticket.availability}
                onChange={(e) => handleChange(index, e)}
              >
                <option value="unlimited">Unlimited</option>
                <option value="limited">Limited</option>
              </select>
            </div>

            {(ticket.availability === "unlimited" ||
              ticket.availability === "limited") && (
              <div className="form-field">
                <label>Maximum Tickets Per Order</label>
                <input
                  type="number"
                  name="maxTicketsPerOrder"
                  value={ticket.maxTicketsPerOrder}
                  onChange={(e) => handleChange(index, e)}
                  required
                />
              </div>
            )}

            {ticket.availability === "limited" && (
              <>
                <div className="form-field">
                  <label>Seats Count</label>
                  <input
                    type="number"
                    name="seatsCount"
                    value={ticket.seatsCount}
                    onChange={(e) => handleChange(index, e)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Remaining Seats</label>
                  <input
                    type="number"
                    name="remainingSeats"
                    value={ticket.remainingSeats}
                    onChange={(e) => handleChange(index, e)}
                    required
                  />
                </div>
              </>
            )}
          </div>
          <hr />
        </div>
      ))}

      <div className="form-actions">
        <button type="button" className="add-ticket-btn" onClick={handleAddTicket}>
          <i className="fa fa-plus"></i> Add Ticket
        </button>
        <button type="submit" className="save-btn">
          <i className="fa fa-save"></i> Save All Tickets
        </button>
      </div>
    </form>


      
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
