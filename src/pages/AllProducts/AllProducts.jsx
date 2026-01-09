import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../api/product";

import bannerImg from "./images/allwebbanner.png";
import "./AllProducts.css";

// Import Default Images
import milk from "./images/milk.png";
import fatfree from "./images/fatfree.png";
import ghee from "./images/ghee.png";
import curd from "./images/curd.png";
import paneer from "./images/panner.png";
import milkpowder from "./images/milkpowder.png";
import highproteinpaneer from "./images/paneerfatfree.png";
import waferbar from "./images/protein_bar.png";

// Default Products (Fallback)
const DEFAULT_PRODUCTS = [
  { _id: "1", productName: "Milk", mrp: 120, price: 120, weight: "1L", image: milk },
  { _id: "2", productName: "Fat Free Milk", mrp: 130, price: 130, weight: "1L", image: fatfree },
  { _id: "3", productName: "Ghee", mrp: 1890, price: 1890, weight: "1L", image: ghee },
  { _id: "4", productName: "Curd", mrp: 80, price: 80, weight: "500g", image: curd },
  { _id: "5", productName: "Paneer", mrp: 160, price: 160, weight: "200g", image: paneer },
  { _id: "6", productName: "Milk Powder", mrp: 350, price: 350, weight: "500g", image: milkpowder },
  { _id: "7", productName: "LowFat Paneer", mrp: 235, price: 235, weight: "200gm", image: highproteinpaneer },
  { _id: "8", productName: "Wafer Bar", mrp: 80, price: 80, weight: "40gm", image: waferbar },
];

const AllProducts = () => {
  const { cartItems, increaseItem, decreaseItem } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetchProducts();

        if (res.data && res.data.length > 0) {
          setProducts(res.data);
        } else {
          setProducts(DEFAULT_PRODUCTS);
        }
      } catch (err) {
        console.error("Failed to load products, using default", err);
        setProducts(DEFAULT_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <>
      {/* Banner */}
      <div className="ap-image-wrapper">
        <img src={bannerImg} alt="All Products Banner" className="ap-image" />
      </div>

      {/* Product Section */}
      <section className="products-section">
        <h2 className="products-title">Pick Your Perfect Pack</h2>

        {loading ? (
          <div style={{ textAlign: "center", padding: "50px" }}>Loading fresh products...</div>
        ) : (
          <div className="products-grid">
            {products.map((item) => {
              const qty = cartItems[item._id] || 0;

              // Handle image source: API (starts with /uploads) vs Local Import
              const isLocalImage = !item.image.startsWith("/uploads");
              const imgSrc = isLocalImage ? item.image : `http://localhost:5000${item.image}`;

              return (
                <div
                  className="product-card"
                  key={item._id}
                  onClick={() => {
                    // Optional: Navigate to detail page
                  }}
                >
                  {/* Image Box */}
                  <div className="product-img-box">
                    <img
                      src={imgSrc}
                      alt={item.productName}
                      className="product-img"
                      onError={(e) => e.target.src = "https://via.placeholder.com/150?text=No+Image"}
                    />
                  </div>

                  {/* Details */}
                  <div className="product-details">

                    <div className="row-line">
                      <h3 className="product-name">{item.productName}</h3>
                      <span className="product-size">{item.weight}</span>
                    </div>

                    <p className="product-price">MRP: ₹{item.mrp}</p>
                    <p className="tax-text">(Price inclusive of all taxes)</p>

                    {/* ⭐ Prevent card click when pressing cart buttons ⭐ */}
                    {qty === 0 ? (
                      <button
                        className="buy-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          increaseItem(item._id);
                        }}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="counter-box" onClick={(e) => e.stopPropagation()}>
                        <button className="minus" onClick={() => decreaseItem(item._id)}>-</button>
                        <span className="count">{qty}</span>
                        <button className="plus" onClick={() => increaseItem(item._id)}>+</button>
                      </div>
                    )}

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};

export default AllProducts;
