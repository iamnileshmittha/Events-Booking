import React, { useEffect, useRef, useState } from "react";
import testimonials from "../data/testimonials";
import "./TestimonialSection.css";

function TestimonialSection() {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % testimonials.length;
      setCurrentIndex(nextIndex);

      const scrollWidth = scrollRef.current.scrollWidth / testimonials.length;
      scrollRef.current.scrollTo({
        left: nextIndex * scrollWidth,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section className="container testimonial-wrapper">
      <div className="testimonial-header">
        {/* <h6>TESTIMONIALS</h6> */}
        <h2>
          <span className="bold-blue">What Our</span>{" "}
          <span className="bold-pink">Guest Say's</span> <br />
        </h2>
      </div>

      <div className="testimonial-scroll-container" ref={scrollRef}>
        {testimonials.map((t) => (
          <div className="testimonial-card" key={t.id}>
            <p className="testimonial-text">
              <i className="fas fa-quote-left"></i> {t.text}
            </p>
            <div className="testimonial-user">
              <img src={t.image} alt={t.name} className="avatar" />
              <div className="testinamerole">
                <h4 className="name">{t.name}</h4>
                <p className="role">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="testimonial-dots">
        {[...Array(visibleCards)].map((_, index) => (
          <span
            key={index}
            className={`dot ${
              index === currentIndex % visibleCards ? "active" : ""
            }`}
          ></span>
        ))}
      </div>
    </section>
  );
}

export default TestimonialSection;
