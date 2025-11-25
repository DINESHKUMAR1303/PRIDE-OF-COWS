import React from "react";
import "./Footer.css";

// Single Origin Logo (replace with your actual path)
import singleOrigin from "./images/singleoriginlogo.png";

const Footer = () => {
  return (
    <>
      {/* ======================= NEWSLETTER SECTION ======================= */}
      <section className="newsletter-section">
        <h2 className="newsletter-title">Subscribe to our Newsletter</h2>

        <div className="newsletter-input-wrapper">
          <input
            type="email"
            placeholder="Enter your Email ID"
            className="newsletter-input"
          />
          <span className="newsletter-arrow">→</span>
        </div>
      </section>

      {/* ======================= MAIN FOOTER ======================= */}
      <footer className="footer-section">
        <div className="footer-container">

          {/* SHOP */}
          <div className="footer-column">
            <h3 className="footer-heading">Shop</h3>
            <p>All</p>
            <p>Milk</p>
            <p>Ghee</p>
            <p>Curd</p>
            <p>Paneer</p>
            <p>Whole Milk Powder</p>
            <p>Yogurt</p>
            <p>Protein Bar</p>
            <p className="footer-link-highlight">Refer & Earn</p>
          </div>

          {/* LEARN */}
          <div className="footer-column">
            <h3 className="footer-heading">Learn</h3>
            <p>About Us</p>
            <p>Compliance</p>
            <p>Our Process</p>
            <p>Sustainability</p>
            <p>Tour the farm</p>
            <p>FAQs</p>
          </div>

          {/* BLOG */}
          <div className="footer-column">
            <h3 className="footer-heading">Blog</h3>
            <p>Recipes</p>
            <p>Lifestyle</p>
            <p>Newsroom</p>
          </div>

          {/* CONTACT */}
          <div className="footer-column">
            <h3 className="footer-heading">Contact Us</h3>

            <p>Pride of Cows, 10th Floor, Nirmal Building,</p>
            <p>Nariman Point, Mumbai,</p>
            <p>Maharashtra-400021</p>

            <p className="footer-contact">+91-22-68156815</p>

            <p className="footer-contact">
              📧 bookings@prideofcows.com
            </p>

            <div className="footer-social">
              <span>Follow Us</span>
              <span>📸</span>
              <span>📘</span>
              <span>✖️</span>
              <span>▶️</span>
            </div>

            <div className="footer-apps">
              <span>Get the Pride of Cows App</span>
              <span>🍎</span>
              <span>▶️</span>
            </div>
          </div>

          {/* LOGO */}
          <div className="footer-logo">
            <img src={singleOrigin} alt="Single Origin Logo" />
          </div>

        </div>
      </footer>

      {/* ======================= BOTTOM BAR ======================= */}
      <div className="footer-bottom">
        <p>Privacy Policy</p>
        <p>Terms & Conditions</p>
        <p>Made with Love by pride of cows</p>
      </div>
    </>
  );
};

export default Footer;
