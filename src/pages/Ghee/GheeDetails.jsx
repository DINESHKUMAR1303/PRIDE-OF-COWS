import React, { useState, useEffect } from "react";
import "./GheeDetails.css";
import { useCart } from "../../context/CartContext";
import { useLocation } from "react-router-dom"; // Added useLocation

// Import Shared Components
import DatePicker from "../../components/DatePicker/DatePicker";

import deliveryIcon from "../Milk/ProductDetail/images/delivery_vehicle.png";
import calendarIcon from "../Milk/ProductDetail/images/calender.png";
import crownIcon from "../Milk/ProductDetail/images/crow.svg";
import addedCartIcon from "../Milk/ProductDetail/images/delivery_vehicle.png";

// Ghee Images
import img1 from "./images/Ghee.png";
import img2 from "./images/freshghee.webp";
import img3 from "./images/ghee500.png";

// Import API fetch function
import { fetchProducts } from "../../api/product";

const GheeDetails = () => {
    const images = [img1, img2, img3];

    const { cartItems, increaseItem, decreaseItem } = useCart();
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [quantity, setQuantity] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const [animateCart, setAnimateCart] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Date Logic
    const getTomorrow = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const day = tomorrow.getDate();
        const monthName = tomorrow.toLocaleString("en-US", { month: "long" });
        const year = tomorrow.getFullYear();
        return `${day} ${monthName} ${year}`;
    };
    const [deliveryDate, setDeliveryDate] = useState(getTomorrow());

    // Product Data - null initially
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const loadProduct = async () => {
            try {
                const res = await fetchProducts(true);
                const allProducts = res.data || [];

                // 1. URL ID Priority
                const params = new URLSearchParams(location.search);
                const urlId = params.get("id");

                let targetProduct = null;
                if (urlId) {
                    targetProduct = allProducts.find(p => p._id === urlId);
                }

                if (!targetProduct) {
                    // 2. Fallback Name Match
                    const matches = allProducts.filter(p => p.productName && p.productName.toLowerCase().includes("ghee"));
                    // Sort by name length to find base 'Ghee'
                    matches.sort((a, b) => a.productName.length - b.productName.length);
                    targetProduct = matches[0];
                }

                if (isMounted) {
                    if (targetProduct) {
                        setProductData({
                            id: targetProduct._id,
                            title: targetProduct.productName,
                            variant: targetProduct.weight || "1 L",
                            price: targetProduct.price,
                            mrp: targetProduct.mrp,
                            // crowns: ... 
                            discount: targetProduct.mrp && targetProduct.price
                                ? `${Math.round(((targetProduct.mrp - targetProduct.price) / targetProduct.mrp) * 100)}% off`
                                : "12.4% off",
                            desc: "Pride of Cows Ghee is single-origin, made from fresh milk from our own farms. Untouched by human hands, it has an unmatched aroma and taste."
                        });
                    } else {
                        // 3. Fallback to default Ghee data if no product found
                        console.log("No Ghee product found in API, using fallback data");
                        setProductData({
                            id: "default_ghee",
                            title: "Pride of Cows Ghee",
                            variant: "1 L",
                            price: 2179,
                            mrp: 2500,
                            discount: "12.4% off",
                            desc: "Pride of Cows Ghee is single-origin, made from fresh milk from our own farms. Untouched by human hands, it has an unmatched aroma and taste."
                        });
                    }
                }
            } catch (err) {
                console.error("Failed to load Ghee details", err);
                if (isMounted) {
                    // Use fallback data on error
                    setProductData({
                        id: "default_ghee",
                        title: "Pride of Cows Ghee",
                        variant: "1 L",
                        price: 2179,
                        mrp: 2500,
                        discount: "12.4% off",
                        desc: "Pride of Cows Ghee is single-origin, made from fresh milk from our own farms. Untouched by human hands, it has an unmatched aroma and taste."
                    });
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        loadProduct();
        return () => { isMounted = false; };
    }, [location.search]);

    // Use Dynamic ID safely
    const productId = productData ? productData.id : null;

    const inCartQty = (productId && cartItems[productId]) ? cartItems[productId] : 0;
    const isInCart = inCartQty > 0;
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Sync quantity
        setQuantity(inCartQty > 0 ? inCartQty : 1);
    }, [inCartQty]);

    const handleIncrease = () => {
        setQuantity(prev => prev + 1);
        setIsEditing(true);
    };

    const handleDecrease = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
        setIsEditing(true);
    };

    const handleUpdateCart = () => {
        if (!productId) return;
        const diff = quantity - inCartQty;
        if (diff > 0) {
            for (let i = 0; i < diff; i++) increaseItem(productId);
        } else if (diff < 0) {
            for (let i = 0; i < Math.abs(diff); i++) decreaseItem(productId);
        }
        setIsEditing(false);
        setShowPopup(true);
        setAnimateCart(true);
        setTimeout(() => setAnimateCart(false), 800);
        setTimeout(() => setShowPopup(false), 1500);
    };

    const getButtonLabel = () => {
        if (!isInCart) return "Add to Cart";
        if (isInCart && !isEditing) return "Added to Cart";
        if (isEditing) return "Update Cart";
    };

    const handleDateSelect = (newDate) => {
        setDeliveryDate(newDate);
        setShowDatePicker(false);
    };

    if (loading) {
        return <div className="pd-wrapper" style={{ textAlign: 'center', marginTop: '100px' }}>Loading Ghee Details...</div>;
    }

    if (!productData) {
        return <div className="pd-wrapper" style={{ textAlign: 'center', marginTop: '100px' }}><h2>Product Currently Unavailable</h2></div>;
    }

    return (
        <>
            {showPopup && (
                <div className="added-popup">
                    <div className="popup-arrow"></div>
                    <div className="popup-content">
                        <img src={addedCartIcon} className={`popup-cart-img ${animateCart ? "run-slide" : ""}`} alt="cart" />
                        <span>{isEditing ? "UPDATED CART" : "ADDED TO BAG"}</span>
                    </div>
                </div>
            )}

            {showDatePicker && (
                <DatePicker onSelect={handleDateSelect} onClose={() => setShowDatePicker(false)} />
            )}

            <section className="pd-wrapper">
                <div className="pd-main-box">
                    {/* LEFT */}
                    <div className="pd-left">
                        <div className="pd-thumbnails">
                            {images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt="thumb"
                                    onClick={() => setSelectedImage(img)}
                                    className={`gd-thumbnail ${selectedImage === img ? "active-thumb" : ""}`}
                                />
                            ))}
                        </div>
                        <div className="gd-main-image-box">
                            <img src={selectedImage} alt="Main" className="gd-main-img" />
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="gd-right">
                        <h1 className="gd-title">{productData.title} ({productData.variant})</h1>

                        <h3 className="gd-subtitle">Product Description</h3>
                        <p className="gd-desc">
                            {productData.desc}
                        </p>

                        <div className="gd-pricing">
                            <span className="gd-price">₹{productData.price}</span>
                            <span className="gd-mrp">MRP: ₹{productData.mrp}</span>
                            <span className="gd-discount">{productData.discount}</span>
                        </div>
                        <p className="gd-price-note">(Price inclusive of all taxes)</p>



                        {/* QUANTITY */}
                        <div className="gd-qty-container user-select-none">
                            <span className="qty-left-text">Quantity</span>
                            <div className="qty-controls">
                                <button onClick={handleDecrease}>-</button>
                                <span>{quantity}</span>
                                <button onClick={handleIncrease}>+</button>
                            </div>
                        </div>

                        {/* BUTTONS */}
                        <div className="gd-buttons">
                            <button className="gd-buy-now" onClick={handleUpdateCart}>
                                {getButtonLabel()}
                            </button>
                            <button className="gd-subscribe">Subscribe</button>
                        </div>

                        {/* DELIVERY BOX */}
                        <div className="gd-delivery-box">
                            <div className="gd-delivery-left">
                                <p className="gd-delivery-title">
                                    <img src={deliveryIcon} alt="delivery" className="gd-icon" />
                                    Get Delivered in 1 Day!
                                </p>
                                <p className="gd-delivery-date">
                                    Expected Delivery : <strong>{deliveryDate}</strong>
                                </p>
                            </div>
                            <button className="gd-change-date-btn" onClick={() => setShowDatePicker(true)}>
                                <img src={calendarIcon} alt="calendar" className="gd-icon" />
                                Change Delivery Date?
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default GheeDetails;
