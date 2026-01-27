import React, { useState, useEffect } from "react";
import "./Yogurt.css";
import { useCart } from "../../context/CartContext";
import { fetchProducts } from "../../api/product";

// Shared Components
import DatePicker from "../../components/DatePicker/DatePicker";
import Products from "../Milk/Products/Products";

// Icons
import deliveryIcon from "../Milk/ProductDetail/images/delivery_vehicle.png";
import calendarIcon from "../Milk/ProductDetail/images/calender.png";
import addedCartIcon from "../Milk/ProductDetail/images/delivery_vehicle.png";

// Yogurt Images
// Blue
import blueFront from "./images/blueberry.png";
import blueBack from "./images/blueberry_back.png";
import blueInfo from "./images/blue info.jpg";

// Mixed Berry
import mixedFront from "./images/mixedberry-front.png";
import mixedBack from "./images/mixberry_back.png";
import mixedInfo from "./images/mixedberry info.jpg";

// Pineapple
import pineappleFront from "./images/pineapple-front.png";
import pineappleBack from "./images/pineapple2-back.png";
import pineappleInfo from "./images/pineapple info.jpg";

const YogurtSection = ({ defaultData, imagesArray, searchKeyword }) => {
    const { cartItems, increaseItem, decreaseItem } = useCart();
    const [selectedImage, setSelectedImage] = useState(imagesArray[0]);
    const [quantity, setQuantity] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const [animateCart, setAnimateCart] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Start as null to avoid showing default data if product is disabled
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getTomorrow = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const day = tomorrow.getDate();
        const monthName = tomorrow.toLocaleString("en-US", { month: "long" });
        const year = tomorrow.getFullYear();
        return `${day} ${monthName} ${year}`;
    };
    const [deliveryDate, setDeliveryDate] = useState(getTomorrow());

    // Fetch product details for this specific yogurt flavor
    useEffect(() => {
        let isMounted = true;
        const loadProduct = async () => {
            try {
                const res = await fetchProducts(true);
                const allProducts = res.data || [];

                const matches = allProducts.filter(p =>
                    p.productName && p.productName.toLowerCase().includes(searchKeyword.toLowerCase())
                );
                // Prefer exact match logic or sort by length
                matches.sort((a, b) => a.productName.length - b.productName.length);
                const targetProduct = matches[0];

                if (isMounted) {
                    if (targetProduct) {
                        const discountVal = targetProduct.mrp > targetProduct.price
                            ? (Math.round((targetProduct.mrp - targetProduct.price) / targetProduct.mrp * 100) + "% off")
                            : "";

                        setProductData({
                            id: targetProduct._id,
                            title: targetProduct.productName,
                            variant: targetProduct.weight || defaultData.variant,
                            price: targetProduct.price,
                            mrp: targetProduct.mrp,
                            desc: defaultData.desc,
                            discount: discountVal
                        });
                    } else {
                        // Product not found (disabled or deleted)
                        setProductData(null);
                    }
                }
            } catch (err) {
                console.error(`Failed to load ${defaultData.title} details`, err);
                if (isMounted) setProductData(null);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        loadProduct();
        return () => { isMounted = false; };
    }, [searchKeyword, defaultData]); // Added defaultData to dependencies

    // Safe derived state
    const productId = productData ? productData.id : null;
    const inCartQty = (productId && cartItems[productId]) ? cartItems[productId] : 0;
    const isInCart = inCartQty > 0;

    // Sync quantity hook (must be before return)
    useEffect(() => {
        setQuantity(inCartQty > 0 ? inCartQty : 1);
    }, [inCartQty]);

    if (loading) return null;
    if (!productData) return null;

    // We can't use hooks conditionally, so we moved the early return AFTER hooks.
    // However, hooks like useState/useEffect MUST be at top level.
    // The previous implementation had hooks before render check, which is correct.
    // BUT we need to handle specific hooks that depend on productData?? 
    // No, local state like 'quantity', 'showPopup' is fine.

    // Helper to sync quantity
    // ERROR: Logic below depends on render.
    // We extracted logic into variables. Now continue with render logic.

    const handleIncrease = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrease = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const handleUpdateCart = () => {
        const diff = quantity - inCartQty;
        if (diff > 0) {
            for (let i = 0; i < diff; i++) increaseItem(productId);
        } else if (diff < 0) {
            for (let i = 0; i < Math.abs(diff); i++) decreaseItem(productId);
        }
        setShowPopup(true);
        setAnimateCart(true);
        setTimeout(() => setAnimateCart(false), 800);
        setTimeout(() => setShowPopup(false), 1500);
    };

    const getButtonLabel = () => {
        if (!isInCart) return "Add to Cart";
        // Simple logic: if qty matches cart, show 'Added', else 'Update'
        // Logic simplification:
        return quantity !== inCartQty && isInCart ? "Update Cart" : (isInCart ? "Added to Cart" : "Add to Cart");
    };

    const handleDateSelect = (newDate) => {
        setDeliveryDate(newDate);
        setShowDatePicker(false);
    };

    return (
        <div className="yg-main-box">
            {showPopup && (
                <div className="added-popup" style={{ top: '120px' }}>
                    <div className="popup-arrow"></div>
                    <div className="popup-content">
                        <img src={addedCartIcon} className={`popup-cart-img ${animateCart ? "run-slide" : ""}`} alt="cart" />
                        <span>{quantity !== inCartQty && isInCart ? "UPDATED CART" : "ADDED TO BAG"}</span>
                    </div>
                </div>
            )}

            {showDatePicker && (
                <DatePicker onSelect={handleDateSelect} onClose={() => setShowDatePicker(false)} />
            )}

            {/* LEFT */}
            <div className="yg-left">
                <div className="yg-thumbnails">
                    {imagesArray.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt="thumb"
                            onClick={() => setSelectedImage(img)}
                            className={`yg-thumbnail ${selectedImage === img ? "active-thumb" : ""}`}
                        />
                    ))}
                </div>
                <div className="yg-main-image-box">
                    <img src={selectedImage} alt="Main" className="yg-main-img" />
                </div>
            </div>

            {/* RIGHT */}
            <div className="yg-right">
                <h1 className="yg-title">{productData.title} ({productData.variant})</h1>

                <h3 className="yg-subtitle">Product Description</h3>
                <p className="yg-desc">{productData.desc}</p>

                <div className="yg-pricing">
                    <span className="yg-price">₹{productData.price}</span>
                    {productData.mrp > 0 && productData.mrp > productData.price && (
                        <span className="yg-mrp">MRP: ₹{productData.mrp}</span>
                    )}
                    {productData.discount && (
                        <span className="yg-discount">{productData.discount}</span>
                    )}
                </div>
                <p className="yg-price-note">(Price inclusive of all taxes)</p>

                {/* QUANTITY */}
                <div className="yg-qty-container user-select-none">
                    <span className="qty-left-text">Quantity</span>
                    <div className="qty-controls">
                        <button onClick={handleDecrease}>-</button>
                        <span>{quantity}</span>
                        <button onClick={handleIncrease}>+</button>
                    </div>
                </div>

                {/* BUTTONS */}
                <div className="yg-buttons">
                    <button className="yg-buy-now" onClick={handleUpdateCart}>
                        {getButtonLabel()}
                    </button>
                    <button className="yg-subscribe">Subscribe</button>
                </div>

                {/* DELIVERY BOX */}
                <div className="yg-delivery-box">
                    <div className="yg-delivery-left">
                        <p className="yg-delivery-title">
                            <img src={deliveryIcon} alt="delivery" className="yg-icon" />
                            Get Delivered in 1 Day!
                        </p>
                        <p className="yg-delivery-date">
                            Expected Delivery : <strong>{deliveryDate}</strong>
                        </p>
                    </div>
                    <button className="yg-change-date-btn" onClick={() => setShowDatePicker(true)}>
                        <img src={calendarIcon} alt="calendar" className="yg-icon" />
                        Change Delivery Date?
                    </button>
                </div>
            </div>
        </div>
    );
};

const Yogurt = () => {
    // 1. Blueberry
    const blueberryData = {
        title: "Blueberry Yogurt",
        variant: "120g",
        desc: "Made from fresh milk and real blueberries. Rich in antioxidants and probiotics, this yogurt is a perfect blend of health and taste."
    };
    const blueberryImages = [blueFront, blueBack, blueInfo];

    // 2. Mixed Berry
    const mixedBerryData = {
        title: "Mixed Berry Yogurt",
        variant: "120g",
        desc: "A delightful mix of strawberries, raspberries, and blueberries. Creamy texture with the natural goodness of berries."
    };
    const mixedBerryImages = [mixedFront, mixedBack, mixedInfo];

    // 3. Pineapple
    const pineappleData = {
        title: "Pineapple Yogurt",
        variant: "120g",
        desc: "Tropical bliss in every spoon. Real pineapple chunks blended with creamy yogurt for a refreshing treat."
    };
    const pineappleImages = [pineappleFront, pineappleBack, pineappleInfo];

    return (
        <section className="yg-wrapper">
            <YogurtSection
                defaultData={blueberryData}
                imagesArray={blueberryImages}
                searchKeyword="Blueberry" // Matches 'Blueberry Yogurt' in DB
            />
            <YogurtSection
                defaultData={mixedBerryData}
                imagesArray={mixedBerryImages}
                searchKeyword="Mixed Berry" // Matches 'Mixed Berry Yogurt' in DB
            />
            <YogurtSection
                defaultData={pineappleData}
                imagesArray={pineappleImages}
                searchKeyword="Pineapple" // Matches 'Pineapple Yogurt' in DB
            />

            {/* Cross-Sell Carousel */}
            <div style={{ marginTop: "50px", width: "100%", maxWidth: "1400px" }}>
                <Products />
            </div>
        </section>
    );
};

export default Yogurt;
