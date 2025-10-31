import React, { useState } from "react";
import "./ContactSection.css";

import whatsapp from "./images/whatsApp.svg";
import phone from "./images/phone.svg";
import mail from "./images/mail.svg";
import instagram from "./images/instagram.svg";
import facebook from "./images/facebook.svg";
import twitter from "./images/twitter.svg";
import youtube from "./images/youtube.svg";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    location: "",
    enquiry: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section className="contact-outer">
      <div className="contact-section">
        <h2 className="contact-title">Delighted To Serve You</h2>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="name">Your Name*</label>
            </div>
            <div className="form-group">
              <input
                id="mobile"
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
              <label htmlFor="mobile">Your Mobile No.*</label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Your Email ID*</label>
            </div>
            <div className="form-group">
              <input
                id="location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
              <label htmlFor="location">Your Location*</label>
            </div>
          </div>

          <div className="form-group full-width">
            <textarea
              id="enquiry"
              name="enquiry"
              value={formData.enquiry}
              onChange={handleChange}
              rows="4"
              required
            />
            <label htmlFor="enquiry">Enquiry*</label>
          </div>

          <div className="submit-wrapper">
            <div className="line full-line"></div>
            <button type="submit" className="submit-btn">
              SEND ENQUIRY
            </button>
            <div className="line full-line"></div>
          </div>
        </form>

        <div className="connect-section">
          <h3>Connect with Us</h3>
          <div className="contact-links">
            <a href="https://wa.me/912268156815">
              <img src={whatsapp} alt="WhatsApp" />
              +91-22-68156815
            </a>
            <a href="tel:+912268156815">
              <img src={phone} alt="Phone" />
              +91-22-68156815
            </a>
            <a href="mailto:bookings@prideofcows.com">
              <img src={mail} alt="Mail" />
              bookings@prideofcows.com
            </a>
            <a href="#" className="social-icon">
              <img src={instagram} alt="Instagram" />
            </a>
            <a href="#" className="social-icon">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="#" className="social-icon">
              <img src={twitter} alt="Twitter" />
            </a>
            <a href="#" className="social-icon">
              <img src={youtube} alt="YouTube" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;