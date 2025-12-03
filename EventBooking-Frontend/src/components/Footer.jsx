import React from "react";
import sinhagad from "../assets/bg.jpg";
import mulshi from "../assets/kzp.jpg";
import vetal from "../assets/ml.jpg";
import katraj from "../assets/sf.jpg";
import bund from "../assets/vh.jpg";

function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-card">
        <div className="footer-columns">
          {/* Column 1 */}
          <div>
            <h4>ABOUT TOURISM</h4>
            <ul>
              <li>About Us</li>
              <li>We Are Hiring</li>
              <li>Tourism Reviews</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policies</li>
              <li>Copyright Policies</li>
              <li>Support</li>
              <li><strong>BEWARE OF FRAUDS ⚠️</strong></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4>FOR SUPPLIERS</h4>
            <ul>
              <li>List Your Activities</li>
            </ul>
            <h4>FOR BRANDS</h4>
            <ul>
              <li>Partner With Us</li>
              <li>Destination Marketing</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4>FOR TRAVELLERS</h4>
            <ul>
              <li>Gift An Experience</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4>TRAVEL DESTINATIONS</h4>
            <div className="footer-mini-cards">
              <div><img src={sinhagad} alt="fort" /><span>Fort</span></div>
              <div><img src={mulshi} alt="dam" /><span>Dam</span></div>
              <div><img src={vetal} alt="lake" /><span>Lake</span></div>
              <div><img src={vetal} alt="hill" /><span>Hill</span></div>
              <div><img src={katraj} alt="zoo" /><span>ZooPark</span></div>
              <div><img src={sinhagad} alt="india" /><span>INDIA</span></div>
              <div><img src={katraj} alt="park" /><span>Park</span></div>
              <div><img src={bund} alt="lake2" /><span>Lake</span></div>
              <div><img src={mulshi} alt="dam2" /><span>Dam</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 tourism.com All rights reserved.</p>
        <p>The content and images used on this site are copyright protected...</p>
      </div>
    </footer>
  );
}

export default Footer;
