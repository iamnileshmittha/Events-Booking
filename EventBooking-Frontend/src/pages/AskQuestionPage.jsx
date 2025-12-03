import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AskQuestionForm from "../components/AskQuestionForm";
import bannerImg from "../assets/nature1.jpg";
import { Link } from "react-router-dom";

function AskQuestionPage() {
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
            <h1 className="bannertitle">Contact Us</h1>
            <p className="video-label">
              <span style={{ color: "#fff" }}>
                <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
                  Home
                </Link>{" "}
                &lt;&lt; <span style={{ color: "#ffffffb3" }}>Contact Us</span>
              </span>
            </p>
          </div>
        </div>
      </section>

      <div className="container py-4">
        <AskQuestionForm />
      </div>

      <Footer />
    </>
  );
}

export default AskQuestionPage;
