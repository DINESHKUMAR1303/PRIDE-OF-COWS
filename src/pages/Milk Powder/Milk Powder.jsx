import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Milk Powder.css";
import { useCart } from "../../context/CartContext";
import { fetchProducts } from "../../api/product";

// Shared Components
import DatePicker from "../../components/DatePicker/DatePicker";
import Products from "../Milk/Products/Products";

// Icons
import deliveryIcon from "../Milk/ProductDetail/images/delivery_vehicle.png";
import calendarIcon from "../Milk/ProductDetail/images/calender.png";
import addedCartIcon from "../Milk/ProductDetail/images/delivery_vehicle.png";

// Milk Powder Images
import img1 from "./images/Milk Powder.png";
import img2 from "./images/image1.jpg";
import img3 from "./images/image2.jpg";

const MilkPowder = () => {
    // Images array
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
        id: "loading-milk-powder",
        title: "Milk Powder",
        variant: "500g",
        price: 0,
        mrp: 0,
        discount: "",
        desc: "Our Whole Milk Powder is made from fresh, high-quality milk, retaining all the creamy goodness and nutrition. Perfect for tea, coffee, and desserts."
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
                        p.productName && (
                            p.productName.toLowerCase().includes("powder") ||
                            p.productName.toLowerCase().includes("milk powder")
                        )
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
                } else {
                    console.warn("Milk Powder product not found in backend");
                }
            } catch (err) {
                console.error("Failed to load Milk Powder details", err);
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
        if (loading || productId === "loading-milk-powder") return;

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
        return <div className="mp-wrapper" style={{ textAlign: 'center', marginTop: '100px' }}>Loading Milk Powder Details...</div>;
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

            <section className="mp-wrapper">
                <div className="mp-main-box">
                    {/* LEFT */}
                    <div className="mp-left">
                        <div className="mp-thumbnails">
                            {images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt="thumb"
                                    onClick={() => setSelectedImage(img)}
                                    className={`mp-thumbnail ${selectedImage === img ? "active-thumb" : ""}`}
                                />
                            ))}
                        </div>
                        <div className="mp-main-image-box">
                            <img src={selectedImage} alt="Main" className="mp-main-img" />
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="mp-right">
                        <h1 className="mp-title">{productData.title} ({productData.variant})</h1>

                        <h3 className="mp-subtitle">Product Description</h3>
                        <p className="mp-desc">
                            {productData.desc}
                        </p>

                        <div className="mp-pricing">
                            <span className="mp-price">₹{productData.price}</span>
                            {productData.mrp > productData.price && (
                                <span className="mp-mrp">MRP: ₹{productData.mrp}</span>
                            )}
                            {productData.discount && (
                                <span className="mp-discount">{productData.discount}</span>
                            )}
                        </div>
                        <p className="mp-price-note">(Price inclusive of all taxes)</p>

                        {/* QUANTITY */}
                        <div className="mp-qty-container user-select-none">
                            <span className="qty-left-text">Quantity</span>
                            <div className="qty-controls">
                                <button onClick={handleDecrease}>-</button>
                                <span>{quantity}</span>
                                <button onClick={handleIncrease}>+</button>
                            </div>
                        </div>

                        {/* BUTTONS */}
                        <div className="mp-buttons">
                            <button className="mp-buy-now" onClick={handleUpdateCart}>
                                {getButtonLabel()}
                            </button>
                            <button className="mp-subscribe">Subscribe</button>
                        </div>

                        {/* DELIVERY BOX */}
                        <div className="mp-delivery-box">
                            <div className="mp-delivery-left">
                                <p className="mp-delivery-title">
                                    <img src={deliveryIcon} alt="delivery" className="mp-icon" />
                                    Get Delivered in 1 Day!
                                </p>
                                <p className="mp-delivery-date">
                                    Expected Delivery : <strong>{deliveryDate}</strong>
                                </p>
                            </div>
                            <button className="mp-change-date-btn" onClick={() => setShowDatePicker(true)}>
                                <img src={calendarIcon} alt="calendar" className="mp-icon" />
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

export default MilkPowder;
