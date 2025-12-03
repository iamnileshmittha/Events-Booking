import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPage.css";

function Dashboard() {
  const [showSubmenu, setShowSubmenu] = useState(true);
  const [eventStats, setEventStats] = useState({
    total: 0,
    upcoming: 0,
    current: 0,
    completed: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventStats();
  }, []);

  const fetchEventStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/event/stats/dashboard");
      if (response.data.success) {
        setEventStats(response.data.stats);
        console.log("✅ Event stats fetched:", response.data.stats);
      }
    } catch (error) {
      console.error("❌ Error fetching event stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-right">
        <div className="sidebar">
          <ul>
            <li onClick={() => window.location.href = "/administrator/dashboard"} style={{ backgroundColor: "#d96002" }}>
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
                <li onClick={() => window.location.href = "/administrator/events"}>
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
        <h1>Administrator Dashboard</h1>
        <hr />

        {loading ? (
          <div className="loading-spinner">
            <i className="fa fa-spinner fa-spin"></i>
            <p>Loading dashboard...</p>
          </div>
        ) : (
          <div className="dashboard-section">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
              <div className="stat-card total">
                <div className="stat-icon">
                  <i className="fa fa-calendar"></i>
                </div>
                <div className="stat-content">
                  <h3>{eventStats.total}</h3>
                  <p>Total Events</p>
                </div>
              </div>

              <div className="stat-card upcoming">
                <div className="stat-icon">
                  <i className="fa fa-clock-o"></i>
                </div>
                <div className="stat-content">
                  <h3>{eventStats.upcoming}</h3>
                  <p>Upcoming Events</p>
                </div>
              </div>

              <div className="stat-card current">
                <div className="stat-icon">
                  <i className="fa fa-play-circle"></i>
                </div>
                <div className="stat-content">
                  <h3>{eventStats.current}</h3>
                  <p>Current Events</p>
                </div>
              </div>

              <div className="stat-card completed">
                <div className="stat-icon">
                  <i className="fa fa-check-circle"></i>
                </div>
                <div className="stat-content">
                  <h3>{eventStats.completed}</h3>
                  <p>Completed Events</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
