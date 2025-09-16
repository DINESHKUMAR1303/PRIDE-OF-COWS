import React from "react";

const NotificationBar = () => {
  const text =
    "New to Pride of Cows? Special Welcome Offer for you! Get 10 liters of Single Origin Milk for just ₹999 (MRP ₹1200) — Subscribe Now!";

  return (
    <div className="notification-bar" role="region" aria-label="site announcement">
      
      <div className="ticker" aria-hidden="false">
        <span className="ticker__text">{text}</span>
        <span className="ticker__text">{text}</span>
      </div>
    </div>
  );
};

export default NotificationBar;
