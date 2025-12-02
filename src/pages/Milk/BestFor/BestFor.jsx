import React, { useState } from "react";
import "./BestFor.css";

// Import your Best images
import best1 from "./images/child.png";
import best2 from "./images/childwithmom.jpg";
import best3 from "./images/cow.jpg";
import best4 from "./images/field.jpg";
import best5 from "./images/meninstructing.jpg";
import best6 from "./images/tractor.jpg";

const Best = () => {
  const [activeTab, setActiveTab] = useState("health");

  const content = {
    health: {
      title: "Health",
      points: [
        {
          heading: "Rich in Nutrition",
          text: "Packed with protein, calcium, and essential vitamins for strong bones.",
        },
        {
          heading: "Daily Well-Being",
          text: "Supports overall health and immunity naturally.",
        },
        {
          heading: "Pure & Fresh",
          text: "Enjoy milk that is untouched, clean, and hygienically produced.",
        },
      ],
      images: [best1, best2],
    },

    fitness: {
      title: "Fitness",
      points: [
        {
          heading: "Great for Muscle Recovery",
          text: "High-quality protein makes it perfect post-workout nutrition.",
        },
        {
          heading: "Natural Energy",
          text: "Gives you the right energy to stay active throughout the day.",
        },
        {
          heading: "Boosts Strength",
          text: "Helps build and maintain lean muscle mass.",
        },
      ],
      images: [best3, best4],
    },

    cooking: {
      title: "Cooking",
      points: [
        {
          heading: "Enhances Taste",
          text: "Milk that makes your tea, coffee, and recipes taste richer.",
        },
        {
          heading: "Perfect Texture",
          text: "Ideal for sweets, desserts, and day-to-day cooking.",
        },
        {
          heading: "Consistent Quality",
          text: "Same flavor and richness in every drop.",
        },
      ],
      images: [best5, best6],
    },
  };

  const active = content[activeTab];

  return (
    <section className="best-outer">
      <div className="best-inner">
        <p className="best-subtitle">A PLACE FULL OF LOVE</p>
        <h2 className="best-title"> Milk Is Best For</h2>

        {/* Tabs */}
        <div className="best-tabs">
          {Object.keys(content).map((key) => (
            <button
              key={key}
              className={`best-tab ${activeTab === key ? "active" : ""}`}
              onClick={() => setActiveTab(key)}
            >
              {content[key].title}
            </button>
          ))}

          {/* Underline with dots */}
          <div className="tab-underline">
            <span className={`dot ${activeTab === "health" ? "active" : ""}`} />
            <span className={`dot ${activeTab === "fitness" ? "active" : ""}`} />
            <span className={`dot ${activeTab === "cooking" ? "active" : ""}`} />
          </div>
        </div>

        {/* Content */}
        <div className="best-content" key={activeTab}>
          <div className="best-text">
            {active.points.map((item, i) => (
              <div key={i} className="best-point">
                <h4>{item.heading}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <div className="best-images">
            <img
              src={active.images[0]}
              alt={`${active.title} top image`}
              className="best-img top"
              loading="lazy"
            />
            <img
              src={active.images[1]}
              alt={`${active.title} bottom image`}
              className="best-img bottom"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Best;
