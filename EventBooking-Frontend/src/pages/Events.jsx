import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DestinationCard from "../components/DestinationCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bannerImg from "../assets/nature1.jpg";
import { Link } from "react-router-dom";

const EventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/event`);
        if (response.data.success) {
          setEvents(response.data.events);
          console.log(response.data.events);
        } else {
          console.error("Failed to fetch events:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/event/${id}`);
  };

  return (
    <>
      <Navbar />

      {/* Banner */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="hero-overlay">
          <div className="hero-content text-center">
            <h1 className="bannertitle">Events</h1>
          </div>
        </div>
      </section>

      {/* Events Section copied from Home */}
      <div className="container my-5" id="events">
        <div className="event-header text-center mb-4">
          <h2>
            <span className="bold-blue">
              LATEST <span className="bold-pink">EVENTS</span>
            </span>
          </h2>
        </div>
        <div className="cards-container destination-card row justify-content-center">
          {loading ? (
            <p>Loading events...</p>
          ) : (
            events.map((event) => (
              <div className="cards-col col-md-4 mb-4" key={event._id}>
                <div
                  onClick={() => handleCardClick(event._id)}
                  style={{ cursor: "pointer" }}
                >
                  <DestinationCard
                    img={`${process.env.REACT_APP_API_URL}/uploads/${event.image}`}
                    name={event.title}
                    id={event._id}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EventsPage;