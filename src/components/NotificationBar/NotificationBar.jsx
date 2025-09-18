import React from "react";
import "./NotificationBar.css";   // <-- Correct relative path

const NotificationBar = () => {
  const text =
    "New to Pride of Cows? Special Welcome Offer for you! Get 10 liters of Single Origin Milk for just ₹999 (MRP ₹1200) — Subscribe Now!";

  return (
    <div className="notification-bar">
      <span className="ticker-text">{text}</span>
    </div>
  );
};

export default NotificationBar;
