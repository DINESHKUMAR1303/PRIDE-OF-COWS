import React from "react";
import "./Benefits.css";

// Importing your images correctly
import m1 from "./images/m1.png";
import m2 from "./images/m2.png";
import m3 from "./images/m3.png";
import m4 from "./images/m4.png";
import m5 from "./images/m5.png";
import m6 from "./images/m6.png";
import m7 from "./images/m7.png";
import m8 from "./images/m8.png";

const Benefits = () => {
  const items = [
    { img: m1, text: "Farm-to-home fresh cow milk" },
    { img: m2, text: "Fully computerised milking process" },
    { img: m3, text: "Homogenised & Pasteurised milk" },
    { img: m4, text: "Low bacterial count" },
    { img: m5, text: "Maintained at below 4-degree C, till the last leg of delivery" },
    { img: m6, text: "No additives or preservatives" },
    { img: m7, text: "Tamperproof bottles(PET) technology" },
    { img: m8, text: "Untouched by human hand" },
  ];

  return (
    <div className="benefits-wrapper">
      <h2 className="benefits-title">OUR BENEFITS</h2>

      <div className="benefits-grid">
        {items.map((item, index) => (
          <div key={index} className="benefits-item">
            <img src={item.img} alt={item.text} className="benefits-icon" />
            <p className="benefits-text">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
