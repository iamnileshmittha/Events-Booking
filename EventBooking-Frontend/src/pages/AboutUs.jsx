import React from "react";
import "./AboutUs.css";
import mainImg from "../assets/nature1.jpg";
import smallImgTop from "../assets/nature.jpg";
import smallImgBottom from "../assets/n1.jpeg";
import bannerImg from "../assets/nature1.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TestimonialSection from "../components/TestimonialSection";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <>
      <Navbar />
      {/* Top Banner */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="hero-overlay">
          <div className="hero-content text-center">
            <h1 className="bannertitle">About Us</h1>
            <p className="video-label">
              <span style={{ color: "#fff" }}>
                <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
                  Home
                </Link>{" "}
                &lt;&lt; <span style={{ color: "#ffffffb3" }}>About Us</span>
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="aboutus-section container py-5">
        <div className="about2boxes">
          {/* LEFT IMAGE BLOCK */}
          <div className="col-md-6 d-flex justify-content-center mb-4 mb-md-0">
            <div className="about-img-group position-relative">
              <img src={mainImg} alt="Main" className="main-circle-img" />
              <img
                src={smallImgTop}
                alt="Speaker"
                className="mini-circle-img top-circle-img"
              />
              <img
                src={smallImgBottom}
                alt="Trainer"
                className="mini-circle-img bottom-circle-img"
              />
            </div>
          </div>

          {/* RIGHT TEXT BLOCK */}
          <div className="aboutus-content col-md-6">
            <p className="about-section-label">ABOUT US</p>
            <h2 className="about-section-title">
              Learn And Connect <br />
              <span className="highlight">With New People</span>
            </h2>
            <p className="about-section-text">
              There are many variations of passages the majority have suffered
              alteration in some form slightly believable. If you are going to
              use a passage of need to be sure. All the generators on the
              Internet tend to repeat predefined chunks.
            </p>
            <ul className="about-section-list">
              <li>
                <strong>01.</strong> Best Event Experience.
              </li>
              <li>
                <strong>02.</strong> Big Conference and Workshop.
              </li>
              <li>
                <strong>03.</strong> Our Experienced Team.
              </li>
            </ul>
            <button className="about-btn">
              Discover More <i className="fa-solid fa-arrow-right ms-2"></i>
            </button>
          </div>
        </div>
      </section>

      <TestimonialSection />
      <Footer />
    </>
  );
}

export default AboutUs;
