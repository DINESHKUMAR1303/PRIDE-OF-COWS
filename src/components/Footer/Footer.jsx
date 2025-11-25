import React from "react";
import "./Footer.css";

/* ========== ICON + LOGO IMPORTS ========== */
import singleOrigin from "../Footer/images/singleoriginlogo.png";
import mailIcon from "../Footer/images/mail.svg";
import instaIcon from "../Footer/images/instagram.svg";
import fbIcon from "../Footer/images/facebook.svg";
import twitterIcon from "../Footer/images/twitter.svg";
import ytIcon from "../Footer/images/youtube.svg";
import appStoreIcon from "../Footer/images/appstore.svg";
import playStoreIcon from "../Footer/images/playstore.svg";

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

        {/* Floating logo between sections */}
        <div className="footer-floating-logo">
          <img src={singleOrigin} alt="Single Origin Logo" />
        </div>
      </section>

      {/* ======================= MAIN FOOTER SECTION ======================= */}
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
          <div className="footer-column footer-contact-column">
            <h3 className="footer-heading">Contact Us</h3>

            <p>Pride of Cows, 10th Floor, Nirmal Building,</p>
            <p>Nariman Point, Mumbai,</p>
            <p>Maharashtra-400021</p>

            <p className="footer-contact">+91-22-68156815</p>

            <p className="footer-contact email-row">
              <img src={mailIcon} alt="mail" className="footer-icon" />
              bookings@prideofcows.com
            </p>

            {/* SOCIAL ICONS */}
            <div className="footer-social">
              <span>Follow Us</span>
              <img src={instaIcon} alt="Instagram" className="footer-social-icon" />
              <img src={fbIcon} alt="Facebook" className="footer-social-icon" />
              <img src={twitterIcon} alt="Twitter" className="footer-social-icon" />
              <img src={ytIcon} alt="YouTube" className="footer-social-icon" />
            </div>

            {/* APP DOWNLOAD */}
            <div className="footer-apps">
              <span>Get the Pride of Cows App</span>
              <img src={appStoreIcon} alt="App Store" className="footer-app-icon" />
              <img src={playStoreIcon} alt="Play Store" className="footer-app-icon" />
            </div>
          </div>

        </div>
      </footer>

      {/* ======================= FOOTER BOTTOM ======================= */}
      <div className="footer-bottom">
        <p>Privacy Policy</p>
        <p>Terms & Conditions</p>
        <p>Made with Love by pride of cows</p>
      </div>
    </>
  );
};

export default Footer;
