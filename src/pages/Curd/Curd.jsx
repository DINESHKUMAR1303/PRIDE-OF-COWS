import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Curd.css";
import { useCart } from "../../context/CartContext";
import { fetchProducts } from "../../api/product";

// Shared Components
import DatePicker from "../../components/DatePicker/DatePicker";
import Products from "../Milk/Products/Products";

// Icons
import deliveryIcon from "../Milk/ProductDetail/images/delivery_vehicle.png";
import calendarIcon from "../Milk/ProductDetail/images/calender.png";
import addedCartIcon from "../Milk/ProductDetail/images/delivery_vehicle.png";

// Curd Images
import img1 from "./images/curd.png";
import img2 from "./images/image2.jpg";
import img3 from "./images/image3.png";

const Curd = () => {
    // Images array matches the structure of other pages
    const images = [img1, img2, img3];

    const { cartItems, increaseItem, decreaseItem } = useCart();
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [quantity, setQuantity] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const [animateCart, setAnimateCart] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(true);

    const location = useLocation();

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

    // Product Data State
    const [productData, setProductData] = useState({
        id: "loading-curd",
        title: "Curd",
        variant: "400g",
        price: 80,
        mrp: 90,
        discount: "",
        desc: "Our curd is made from fresh, high-quality milk, rich in probiotics to aid digestion and boost immunity. Thick, creamy, and delicious."
    });

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const res = await fetchProducts(true);
                const allProducts = res.data || [];

                const params = new URLSearchParams(location.search);
                const urlId = params.get("id");

                let targetProduct = null;
                if (urlId) {
                    targetProduct = allProducts.find(p => p._id === urlId);
                }

                if (!targetProduct) {
                    const matches = allProducts.filter(p =>
                        p.productName && p.productName.toLowerCase().includes("curd")
                    );
                    matches.sort((a, b) => a.productName.length - b.productName.length);
                    targetProduct = matches[0];
                }

                if (targetProduct) {
                    const discountVal = targetProduct.mrp > targetProduct.price
                        ? (Math.round((targetProduct.mrp - targetProduct.price) / targetProduct.mrp * 100) + "% off")
                        : "";

                    setProductData(prev => ({
                        ...prev,
                        id: targetProduct._id,
                        title: targetProduct.productName,
                        variant: targetProduct.weight || prev.variant,
                        price: targetProduct.price,
                        mrp: targetProduct.mrp,
                        discount: discountVal
                    }));
                }
            } catch (err) {
                console.error("Failed to load Curd details", err);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [location.search]);

    const productId = productData.id;
    const inCartQty = cartItems[productId] || 0;
    const isInCart = inCartQty > 0;
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
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
        if (loading || productId === "loading-curd") return;

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
        return <div className="cd-wrapper" style={{ textAlign: 'center', marginTop: '100px' }}>Loading Curd Details...</div>;
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

            <section className="cd-wrapper">
                <div className="cd-main-box">
                    {/* LEFT */}
                    <div className="cd-left">
                        <div className="cd-thumbnails">
                            {images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt="thumb"
                                    onClick={() => setSelectedImage(img)}
                                    className={`cd-thumbnail ${selectedImage === img ? "active-thumb" : ""}`}
                                />
                            ))}
                        </div>
                        <div className="cd-main-image-box">
                            <img src={selectedImage} alt="Main" className="cd-main-img" />
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="cd-right">
                        <h1 className="cd-title">{productData.title} ({productData.variant})</h1>

                        <h3 className="cd-subtitle">Product Description</h3>
                        <p className="cd-desc">
                            {productData.desc}
                        </p>

                        <div className="cd-pricing">
                            <span className="cd-price">₹{productData.price}</span>
                            {productData.mrp > productData.price && (
                                <span className="cd-mrp">MRP: ₹{productData.mrp}</span>
                            )}
                            {productData.discount && (
                                <span className="cd-discount">{productData.discount}</span>
                            )}
                        </div>
                        <p className="cd-price-note">(Price inclusive of all taxes)</p>

                        {/* QUANTITY */}
                        <div className="cd-qty-container user-select-none">
                            <span className="qty-left-text">Quantity</span>
                            <div className="qty-controls">
                                <button onClick={handleDecrease}>-</button>
                                <span>{quantity}</span>
                                <button onClick={handleIncrease}>+</button>
                            </div>
                        </div>

                        {/* BUTTONS */}
                        <div className="cd-buttons">
                            <button className="cd-buy-now" onClick={handleUpdateCart}>
                                {getButtonLabel()}
                            </button>
                            <button className="cd-subscribe">Subscribe</button>
                        </div>

                        {/* DELIVERY BOX */}
                        <div className="cd-delivery-box">
                            <div className="cd-delivery-left">
                                <p className="cd-delivery-title">
                                    <img src={deliveryIcon} alt="delivery" className="cd-icon" />
                                    Get Delivered in 1 Day!
                                </p>
                                <p className="cd-delivery-date">
                                    Expected Delivery : <strong>{deliveryDate}</strong>
                                </p>
                            </div>
                            <button className="cd-change-date-btn" onClick={() => setShowDatePicker(true)}>
                                <img src={calendarIcon} alt="calendar" className="cd-icon" />
                                Change Delivery Date?
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cross-Sell Carousel */}
            <div style={{ marginTop: "50px" }}>
                <Products />
            </div>
        </>
    );
};

export default Curd;
