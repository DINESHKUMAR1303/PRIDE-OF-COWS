import React, { useState, useEffect } from "react";
import "./NotificationBar.css";

const NotificationBar = () => {
  const [visible, setVisible] = useState(true);

  const text =
    "New to Pride of Cows? Special Welcome Offer for you! Get 10 liters of Single Origin Milk for just ₹999 (MRP ₹1200) — Subscribe Now!";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setVisible(false); // hide when scrolling down
      } else {
        setVisible(true); // show again when back to top
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null; // hide completely

  return (
    <div className="notification-bar">
      <span className="ticker-text">{text}</span>
    </div>
  );
};

export default NotificationBar;
