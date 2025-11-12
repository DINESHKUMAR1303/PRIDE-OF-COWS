import React from "react";
import "./HealthLifestyle.css";
import img1 from "./images/milk1.jpg";
import img2 from "./images/milk2.jpg";
import img3 from "./images/milk3.jpg";
import img4 from "./images/milk4.jpg";
import img5 from "./images/milk5.jpg";

const HealthLifestyle = () => {
  return (
    <section className="health-outer">
      <h2 className="health-title">Health Is A Lifestyle</h2>

      <div className="health-cards">
        <div className="health-card">
          <img src={img1} alt="Milk 1" />
          <p>
            The standard of milk
          </p>
        </div>

        <div className="health-card">
          <img src={img2} alt="Milk 2" />
          <p>
            Savour the essence : Pride of cows redefines luxury with pure,
            Single-origin milk
          </p>
        </div>

        <div className="health-card center-card">
          <img src={img3} alt="Milk 3" />

          <p>
            From farm to Glass: The story of single-origin milk and its benefits
          </p>
        </div>

        <div className="health-card">
          <img src={img4} alt="Milk 4" />
          <p>
            Discover the Pure Taste of Single-Origin Milk: A Journey to the Source
          </p>
        </div>

        <div className="health-card">
          <img src={img5} alt="Milk 5" />
          <p>
            FSSAI Debunks the A2 and A2 Milk Myths: Purity Wins Over Gimmicks!
          </p>
        </div>
      </div>

      <div className="health-nav">
        <button className="arrow-btn">←</button>
        <div className="divider"></div>
        <button className="arrow-btn">→</button>
      </div>

      <button className="view-all">VIEW ALL</button>
    </section>
  );
};

export default HealthLifestyle;
