import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../api/product";

import bannerImg from "./images/allwebbanner.png";
import "./AllProducts.css";

// Product Images Not Required if dynamic only
const AllProducts = () => {
  const { cartItems, increaseItem, decreaseItem } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetchProducts(true); // Fetch only active products

        if (res.data && res.data.length > 0) {
          setProducts(res.data);
        } else {
          // Fallback to empty array if no active products found
          console.log("No active products.");
          setProducts([]);
        }
      } catch (err) {
        console.error("Failed to load products", err);
        // Fallback on error too
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Helper for navigation (Synced with ProductCarousel)
  const handleProductClick = (name, productId) => {
    if (!name) return;
    const lower = name.toLowerCase();

    // Pass ID to ensure exact sync
    if (lower.includes("milk") && lower.includes("powder")) navigate(`/shop/whole-milk-powder?id=${productId}`); // Fixed route
    else if (lower.includes("milk")) navigate(`/shop/milk?id=${productId}`);
    else if (lower.includes("ghee")) navigate(`/shop/ghee?id=${productId}`);
    else if (lower.includes("curd")) navigate(`/shop/curd?id=${productId}`);
    else if (lower.includes("paneer") || lower.includes("panner")) navigate(`/shop/paneer?id=${productId}`); // Added panner variant
    else if (lower.includes("yogurt")) navigate(`/shop/yogurt?id=${productId}`);
    else if (lower.includes("bar")) navigate(`/shop/protein-bar?id=${productId}`);
    else navigate("/shop/all");
  };

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
          <Loader text="Loading fresh products..." />
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
                  onClick={() => handleProductClick(item.productName, item._id)}
                  style={{ cursor: "pointer" }}
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

                    <div className="price-block">
                      <span className="selling-price">₹{item.price}</span>
                      {item.mrp && <span className="mrp-strike">MRP: ₹{item.mrp}</span>}
                    </div>
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
