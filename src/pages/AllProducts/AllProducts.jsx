import React from "react";
import { useCart } from "../../context/CartContext"; // ⭐ GLOBAL CART CONTEXT

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
  },
  {
    id: 2,
    name: "Fat Free Milk",
    mrp: "₹130",
    size: "1L",
    image: fatfree,
  },
  {
    id: 3,
    name: "Ghee",
    mrp: "₹1890",
    size: "1L",
    image: ghee,
  },
  {
    id: 4,
    name: "Curd",
    mrp: "₹80",
    size: "500g",
    image: curd,
  },
  {
    id: 5,
    name: "Paneer",
    mrp: "₹160",
    size: "200g",
    image: paneer,
  },
  {
    id: 6,
    name: "Milk Powder",
    mrp: "₹350",
    size: "500g",
    image: milkpowder,
  },
  {
    id: 7,
    name: "LowFat Paneer",
    mrp: "₹235",
    size: "200gm",
    image: highproteinpaneer,
  },
  {
    id: 8,
    name: "Wafer Bar",
    mrp: "₹80",
    size: "40gm",
    image: waferbar,
  },
];

const AllProducts = () => {
  const { cartItems, increaseItem, decreaseItem } = useCart(); // ⭐ GLOBAL CART

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
          {products.map((item) => {
            const qty = cartItems[item.id] || 0;

            return (
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

                  {/* PRICE */}
                  <p className="product-price">MRP: {item.mrp}</p>

                  {/* Tax Info */}
                  <p className="tax-text">(Price inclusive of all taxes)</p>

                  {/* ⭐ GLOBAL CART BUTTON / COUNTER ⭐ */}
                  {qty === 0 ? (
                    <button className="buy-btn" onClick={() => increaseItem(item.id)}>
                      Add to Cart
                    </button>
                  ) : (
                    <div className="counter-box">
                      <button className="minus" onClick={() => decreaseItem(item.id)}>-</button>
                      <span className="count">{qty}</span>
                      <button className="plus" onClick={() => increaseItem(item.id)}>+</button>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default AllProducts;
