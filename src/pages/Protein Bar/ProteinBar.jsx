import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AddedToBagPopup from "../../components/AddedToBagPopup/AddedToBagPopup";
import "./ProteinBar.css";
import { useCart } from "../../context/CartContext";
import { fetchProducts } from "../../api/product";
import Loader from "../../components/Loader/Loader";
import { MOCK_PRODUCTS } from "../../api/mockData";

// Shared Components
import DatePicker from "../../components/DatePicker/DatePicker";
import Products from "../Milk/Products/Products";

// Icons
import deliveryIcon from "../Milk/ProductDetail/images/delivery_vehicle.png";
import calendarIcon from "../Milk/ProductDetail/images/calender.png";
import addedCartIcon from "../Milk/ProductDetail/images/delivery_vehicle.png";

// Protein Bar Images
import img1 from "./images/protein bar.png";
import img2 from "./images/image2.jpg";
import img3 from "./images/image3.jpg";

const ProteinBar = () => {
    // Images array
    const images = [img1, img3, img2]; // Adjusted based on folder list (image1 not present, but image2/3 and protein bar.png are)

    const { cartItems, increaseItem, decreaseItem } = useCart();
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [quantity, setQuantity] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const [animateCart, setAnimateCart] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const location = useLocation();

    // --- OPTIMIZATION: Instant Load ---
    const getInitialData = () => {
        const params = new URLSearchParams(window.location.search);
        const urlId = params.get("id");
        let target = null;
        if (urlId) target = MOCK_PRODUCTS.find(p => p._id === urlId);
        if (!target) {
            const matches = MOCK_PRODUCTS.filter(p => p.productName && p.productName.toLowerCase().includes("protein bar"));
            matches.sort((a, b) => a.productName.length - b.productName.length);
            target = matches[0];
        }
        if (target) {
            const discountVal = target.mrp > target.price
                ? (Math.round((target.mrp - target.price) / target.mrp * 100) + "% off")
                : "";
            return {
                id: target._id,
                title: target.productName,
                variant: target.weight || "50g",
                price: target.price,
                mrp: target.mrp,
                discount: discountVal,
                desc: target.description
            };
        }
        return null;
    };
    const initialData = getInitialData();
    const [loading, setLoading] = useState(!initialData); // False if data exists

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
    const [productData, setProductData] = useState(initialData);

    useEffect(() => {
        let isMounted = true;
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
                            p.productName.toLowerCase().includes("protein") ||
                            p.productName.toLowerCase().includes("bar")
                        )
                    );
                    matches.sort((a, b) => a.productName.length - b.productName.length);
                    targetProduct = matches[0];
                }

                if (isMounted) {
                    if (targetProduct) {
                        const discountVal = targetProduct.mrp > targetProduct.price
                            ? (Math.round((targetProduct.mrp - targetProduct.price) / targetProduct.mrp * 100) + "% off")
                            : "";

                        setProductData({
                            id: targetProduct._id,
                            title: targetProduct.productName,
                            variant: targetProduct.weight || "50g",
                            price: targetProduct.price,
                            mrp: targetProduct.mrp,
                            discount: discountVal,
                            desc: "High-protein nutrition bar perfect for your post-workout recovery or a healthy snack on the go. Packed with essential nutrients and great taste."
                        });
                    } else {
                        setProductData(null);
                    }
                }
            } catch (err) {
                console.error("Failed to load Protein Bar details", err);
                if (isMounted) setProductData(null);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        loadProduct();
        return () => { isMounted = false; };
    }, [location.search]);

    const productId = productData ? productData.id : null;
    const inCartQty = (productId && cartItems[productId]) ? cartItems[productId] : 0;
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
        if (loading || !productId) return;

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
        return <Loader text="Loading Protein Bar Details..." />;
    }

    if (!productData) {
        return <div className="pb-wrapper" style={{ textAlign: 'center', marginTop: '100px' }}><h2>Product Currently Unavailable</h2></div>;
    }

    return (
        <>




            <AddedToBagPopup isVisible={showPopup} />

            {showDatePicker && (
                <DatePicker onSelect={handleDateSelect} onClose={() => setShowDatePicker(false)} />
            )}

            <section className="pb-wrapper">
                <div className="pb-main-box">
                    {/* LEFT */}
                    <div className="pb-left">
                        <div className="pb-thumbnails">
                            {images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt="thumb"
                                    onClick={() => setSelectedImage(img)}
                                    className={`pb-thumbnail ${selectedImage === img ? "active-thumb" : ""}`}
                                />
                            ))}
                        </div>
                        <div className="pb-main-image-box">
                            <img src={selectedImage} alt="Main" className="pb-main-img" />
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="pb-right">
                        <h1 className="pb-title">{productData.title} ({productData.variant})</h1>

                        <h3 className="pb-subtitle">Product Description</h3>
                        <p className="pb-desc">
                            {productData.desc}
                        </p>

                        <div className="pb-pricing">
                            <span className="pb-price">₹{productData.price}</span>
                            {productData.mrp > productData.price && (
                                <span className="pb-mrp">MRP: ₹{productData.mrp}</span>
                            )}
                            {productData.discount && (
                                <span className="pb-discount">{productData.discount}</span>
                            )}
                        </div>
                        <p className="pb-price-note">(Price inclusive of all taxes)</p>

                        {/* QUANTITY */}
                        <div className="pb-qty-container user-select-none">
                            <span className="qty-left-text">Quantity</span>
                            <div className="qty-controls">
                                <button onClick={handleDecrease}>-</button>
                                <span>{quantity}</span>
                                <button onClick={handleIncrease}>+</button>
                            </div>
                        </div>

                        {/* BUTTONS */}
                        <div className="pb-buttons">
                            <button className="pb-buy-now" onClick={handleUpdateCart}>
                                {getButtonLabel()}
                            </button>
                            <button className="pb-subscribe">Subscribe</button>
                        </div>

                        {/* DELIVERY BOX */}
                        <div className="pb-delivery-box">
                            <div className="pb-delivery-left">
                                <p className="pb-delivery-title">
                                    <img src={deliveryIcon} alt="delivery" className="pb-icon" />
                                    Get Delivered in 1 Day!
                                </p>
                                <p className="pb-delivery-date">
                                    Expected Delivery : <strong>{deliveryDate}</strong>
                                </p>
                            </div>
                            <button className="pb-change-date-btn" onClick={() => setShowDatePicker(true)}>
                                <img src={calendarIcon} alt="calendar" className="pb-icon" />
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

export default ProteinBar;
