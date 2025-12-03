import React, { useState } from "react";
import Navbar from "../components/Navbar";
import DestinationCard from "../components/DestinationCard";
import Footer from "../components/Footer";
import destiDataEvent from "../data/destiDataEvent";
import { useNavigate } from "react-router-dom";
import bannerImg from "../assets/nature1.jpg";
import backImg from "../assets/n1.jpeg";
import TestimonialSection from "../components/TestimonialSection";

function Home() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = (id) => {
    navigate(`/destination/${id}`);
  };

  return (
    <>
      <Navbar />

      <section
        className="hero-section"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <p className="video-label">LATEST EVENTS</p>
            <h1 className="bannertitle">
              We Organize Conference For <br />
              <span className="highlight">Creative</span> Thinking.
            </h1>
            {/* <button className="learn-more-btn">Learn More →</button> */}
          </div>
          <div className="video-play-icon">
            <div className="play-button">▶</div>
          </div>
        </div>
      </section>

      <div className="container" id="events">
        <div className="event-header">
          <h2>
            <span className="bold-blue">
              LATEST <span className="bold-pink">EVENTS</span>
            </span>{" "}
          </h2>
        </div>
        <div className="cards-container destination-card">
          {destiDataEvent.map((dest) => (
            <div className="cards-col col-md-4 mb-4" key={dest.id}>
              <div
                onClick={() => handleCardClick(dest.id)}
                style={{ cursor: "pointer" }}
              >
                <DestinationCard img={dest.img} name={dest.name} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Banner Section */}
      <section
        className="hero-section1"
        style={{ backgroundImage: `url(${backImg})` }}
      >
        <div className="hero-overlay1">
          <div className="hero-content">
            <h6 className="bannertitle1">
              We Organize Conference For{" "}
              <span className="highlight"> Creative</span> Thinking.
            </h6>
            <p className="video-label1">LATEST VIDEO</p>
            {/* <button className="learn-more-btn">Learn More →</button> */}
          </div>
          {/* Play button placed directly below LATEST VIDEO */}
          <div className="video-play-icon1" onClick={() => setModalOpen(true)}>
            <div className="play-button1">▶</div>
          </div>
        </div>

        {/* Modal for YouTube video */}
        {modalOpen && (
          <div className="modal-overlay1" onClick={() => setModalOpen(false)}>
            <div
              className="modal-content1"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button
                className="modal-close-btn1"
                onClick={() => setModalOpen(false)}
              >
                ✖
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="features-section container">
        <div className="features-card row justify-content-center ">
          <div className="col-md-3 feature-card text-center">
            {/* <img src={bannerImg} alt="Speakers" className="feature-icon" /> */}
            <h3>Great Speakers</h3>
            <p className="learncards">
              It is a long established fact that a reader will be distracted.
            </p>
            <button className="learn-more-btn1">
              Learn More <i className="fa-solid fa-arrow-right ms-2"></i>
            </button>
          </div>
          <div className="col-md-3 feature-card text-center">
            {/* <img src={bannerImg} alt="New Things" className="feature-icon" /> */}
            <h3>Learn New Things</h3>
            <p className="learncards">
              It is a long established fact that a reader will be distracted.
            </p>
            <button className="learn-more-btn1">
              Learn More <i className="fa-solid fa-arrow-right ms-2"></i>
            </button>
          </div>
          <div className="col-md-3 feature-card text-center">
            {/* <img src={bannerImg} alt="Meet People" className="feature-icon" /> */}
            <h3>Meet New People</h3>
            <p className="learncards">
              It is a long established fact that a reader will be distracted.
            </p>
            <button className="learn-more-btn1">
              Learn More <i className="fa-solid fa-arrow-right ms-2"></i>
            </button>
          </div>
          <div className="col-md-3 feature-card text-center">
            {/* <img src={bannerImg} alt="Ask Questions" className="feature-icon" /> */}
            <h3>Ask Questions</h3>
            <p className="learncards">
              It is a long established fact that a reader will be distracted.
            </p>
            <button
              className="learn-more-btn1"
              onClick={() => navigate("/ask-question")}
            >
              Learn More <i className="fa-solid fa-arrow-right ms-2"></i>
            </button>
          </div>
        </div>
      </section>

      <TestimonialSection />
      <Footer />
    </>
  );
}

export default Home;
