import React from "react";
import bannerImg from "./images/allwebbanner.png";

import milk from "./images/milk.png";
import fatfree from "./images/fatfree.png";
import ghee from "./images/ghee.png";
import curd from "./images/curd.png";
import paneer from "./images/panner.png";
import milkpowder from "./images/milkpowder.png";
import highproteinpaneer from "./images/paneerfatfree.png";
import waferbar from "./images/protein_bar.png";

import "./AllProducts.css";

const products = [
  {
    id: 1,
    name: "Milk",
    mrp: "₹120",
    size: "1L",
    image: milk,
    oldPrice: null,
    discount: null,
  },
  {
    id: 2,
    name: "Fat Free Milk",
    mrp: "₹130",
    size: "1L",
    image: fatfree,
    oldPrice: null,
    discount: null,
  },
  {
    id: 3,
    name: "Ghee",
    mrp: "₹1890",
    size: "1L",
    image: ghee,
    // oldPrice: "₹2200",
    // discount: "14.09% off",
  },
  {
    id: 4,
    name: "Curd",
    mrp: "₹80",
    size: "500g",
    image: curd,
    oldPrice: null,
    discount: null,
  },
  {
    id: 5,
    name: "Paneer",
    mrp: "₹160",
    size: "200g",
    image: paneer,
    oldPrice: null,
    discount: null,
  },
  {
    id: 6,
    name: "Milk Powder",
    mrp: "₹350",
    size: "500g",
    image: milkpowder,
    oldPrice: null,
    discount: null,
  },
  {
    id: 7,
    name: "LowFat Paneer",
    mrp: "₹235",
    size: "200gm",
    image: highproteinpaneer,
    oldPrice: null,
    discount: null,
  },
  {
    id: 8,
    name: "Wafer Bar",
    mrp: "₹80",
    size: "40gm",
    image: waferbar,
    oldPrice: null,
    discount: null,
  },
];

const AllProducts = () => {
  return (
    <>
      {/* Banner */}
      <div className="ap-image-wrapper">
        <img src={bannerImg} alt="All Products Banner" className="ap-image" />
      </div>

      {/* Product Section */}
      <section className="products-section">
        <h2 className="products-title">Pick Your Perfect Pack</h2>

        <div className="products-grid">
          {products.map((item) => (
            <div className="product-card" key={item.id}>

              {/* Image Box */}
              <div className="product-img-box">
                <img src={item.image} alt={item.name} className="product-img" />
              </div>

              {/* Details */}
              <div className="product-details">

                {/* NAME + SIZE ROW */}
                <div className="row-line">
                  <h3 className="product-name">{item.name}</h3>
                  <span className="product-size">{item.size}</span>
                </div>

                {/* PRICE — REGULAR */}
                {!item.oldPrice && (
                  <p className="product-price">MRP: {item.mrp}</p>
                )}

                {/* PRICE — DISCOUNTED */}
                {item.oldPrice && (
                  <>
                    <p className="main-mrp">MRP: {item.mrp}</p>

                    <p className="old-price-row">
                      <span className="strike">{item.oldPrice}</span>
                      <span className="discount">{item.discount}</span>
                    </p>
                  </>
                )}

                {/* Tax Info */}
                <p className="tax-text">(Price inclusive of all taxes)</p>

                {/* Button */}
                <button className="buy-btn">Buy now</button>

              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AllProducts;
