import React, { useState } from "react";
import "./ContactSection.css";

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
    // Handle form submission logic here (e.g., API call)
    console.log("Form submitted:", formData);
  };

  return (
    <section className="contact-section">
      <div className="form-card">
        <h2 className="contact-title">Delighted To Serve You</h2>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Your Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Your Mobile No.*</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Your Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Your Location*</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="enquiry">Enquiry*</label>
            <textarea
              id="enquiry"
              name="enquiry"
              value={formData.enquiry}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            SEND ENQUIRY
          </button>
        </form>
      </div>

      <div className="connect-section">
        <h3 className="connect-title">Connect with Us</h3>
        <div className="connect-info">
          <a href="tel:+9126815615" className="contact-item">
            <span className="icon phone-icon">📞</span>
            +91-26815615
          </a>
          <a href="tel:+9126815615" className="contact-item">
            <span className="icon phone-icon">📞</span>
            +91-26815615
          </a>
          <a href="mailto:bookings@prideofcows.com" className="contact-item">
            <span className="icon email-icon">✉️</span>
            bookings@prideofcows.com
          </a>
          <div className="social-icons">
            <a href="#" className="social-link fb">📘</a>
            <a href="#" className="social-link x">🕊️</a>
            <a href="#" className="social-link ig">📷</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;