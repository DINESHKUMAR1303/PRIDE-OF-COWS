import React, { useState } from "react";
import "./Care.css";

import you1 from "./images/child.png";
import you2 from "./images/childwithmom.jpg";
import cow1 from "./images/tractor.jpg";
import cow2 from "./images/cow.jpg";
import nature1 from "./images/field.jpg";
import nature2 from "./images/meninstructing.jpg";

const Care = () => {
  const [activeTab, setActiveTab] = useState("you");

  const content = {
    you: {
      title: "You",
      points: [
        {
          heading: "Create Happy Milk Moments",
          text: "Unwind with Precious Moments of Absolute Milk Delight in Every Meal",
        },
        {
          heading: "Wholesome & Nutritious",
          text: "Relish Every Drop of High Calcium & Protein Intake in Your Milk",
        },
        {
          heading: "The Goodness of Pride of Cows Milk",
          text: "Treat Yourself to a Generous Glass of Pride of Cows Milk",
        },
      ],
      images: [you1, you2],
    },
    cows: {
      title: "Cows",
      points: [
        {
          heading: "Continuous Gentle Care & High Nutritional Diet",
          text: "Premium Cow Comfort Care and Nutritionist Led Wholesome Meal",
        },
        {
          heading: "Consistent Milk Quality",
          text: "Our commitment to Wholesome, Hygienic, Top-Notch Quality in Every Drop of Milk",
        },
        {
          heading: "Pampered with Love",
          text: "Trained Teams at the Farms Oversee International Quality Control",
        },
      ],
      images: [cow1, cow2],
    },
    nature: {
      title: "Nature",
      points: [
        {
          heading: "Reduce",
          text: "Reduce Carbon Footprint by using Organic Fertilizers",
        },
        {
          heading: "Reuse",
          text: "Biogas from our Biogas Digester is our Primary Source of Electricity",
        },
        {
          heading: "Recycle",
          text: "Sleek and stylish PET bottles that are Easy to Carry, Store, and Recycle",
        },
      ],
      images: [nature1, nature2],
    },
  };

  const active = content[activeTab];

  return (
    <section className="care-outer">
      <div className="care-inner">
        <p className="care-subtitle">A PLACE FULL OF LOVE</p>
        <h2 className="care-title">Our Care Manifesto For</h2>

        <div className="care-tabs">
          {Object.keys(content).map((key) => (
            <button
              key={key}
              className={`care-tab ${activeTab === key ? "active" : ""}`}
              onClick={() => setActiveTab(key)}
            >
              {content[key].title}
            </button>
          ))}
        </div>

        <div className="care-content">
          <div className="care-text">
            {active.points.map((item, index) => (
              <div key={index} className="care-point">
                <h4>{item.heading}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <div className="care-images">
            <img src={active.images[0]} alt="" className="care-img top" />
            <img src={active.images[1]} alt="" className="care-img bottom" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Care;
