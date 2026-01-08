import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useLogin } from "../../context/LoginContext/LoginContext";

// === Icons ===
import logo from "../../images/icons/logo.png";
import loginIcon from "../../images/icons/user.svg";
import cartIcon from "../../images/icons/cart.svg";
import locationIcon from "../../images/icons/location.svg";

import enquiryIcon from "../../images/icons/enquiry.svg";
import helpIcon from "../../images/icons/help.svg";
import contactIcon from "../../images/icons/contact.svg";
import faqIcon from "../../images/icons/faq.svg";
import aboutIcon from "../../images/icons/about.svg";
import lifestyleIcon from "../../images/icons/lifestyle.svg";
import recipesIcon from "../../images/icons/recipies.svg";

import appstoreIcon from "../../images/icons/appstore.svg";
import playstoreIcon from "../../images/icons/playstore.svg";
import instagramIcon from "../../images/icons/instagram.svg";
import facebookIcon from "../../images/icons/facebook.svg";
import twitterIcon from "../../images/icons/twitter.svg";
import youtubeIcon from "../../images/icons/youtube.svg";

import allImg from "./images/allproducts.jpg";
import milkImg from "./images/milk.webp";
import gheeImg from "./images/ghee.webp";
import curdImg from "./images/curd.webp";
import paneerImg from "./images/panner.webp";
import powderImg from "./images/milkpowder.webp";
import yogurtImg from "./images/yogurt.png";
import proteinImg from "./images/proteinbar.jpg";

import aboutImg from "./images/aboutus.jpg";
import processImg from "./images/ourprocess.jpg";
import sustainImg from "./images/sustainability.jpg";

import recipesImg from "./images/recipe.jpg";
import lifestyleImg from "./images/lifestyle.jpg";

import logoutIcon from "./images/logout.svg";
import LoginModal from "./LoginModal";

// === Custom Hamburger ===
const CustomMenuIcon = ({
  size = 28,
  color = "#193B61",
  topThickness = 1.5,
  middleThickness = 2,
  bottomThickness = 1.5,
}) => {
  const gap = size * 0.2;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect x="6" y="4" width="12" height={topThickness} fill={color} rx={1} />
      <rect x="6" y={4 + gap} width="20" height={middleThickness} fill={color} rx={1} />
      <rect x="6" y={4 + gap * 2} width="12" height={bottomThickness} fill={color} rx={1} />
    </svg>
  );
};

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, setUser } = useAuth();
  const { loginOpen, setLoginOpen } = useLogin();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [location, setLocation] = useState("ENTER A PINCODE");
  const [pincode, setPincode] = useState("");
  const [place, setPlace] = useState("");

  const [hoveredProduct, setHoveredProduct] = useState("All");
  const [hoveredLearn, setHoveredLearn] = useState("About Us");
  const [hoveredBlog, setHoveredBlog] = useState("Recipes");
  const [openDropdown, setOpenDropdown] = useState(null);

  const navRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  // =======================
  // DROPDOWN ITEMS
  // =======================
  const shopItems = [
    { name: "All", img: allImg, link: "/shop/all" },
    { name: "Milk", img: milkImg, link: "/shop/milk" },
    { name: "Ghee", img: gheeImg, link: "/shop/ghee" },
    { name: "Curd", img: curdImg, link: "/shop/curd" },
    { name: "Paneer", img: paneerImg, link: "/shop/paneer" },
    { name: "Whole Milk Powder", img: powderImg, link: "/shop/whole-milk-powder" },
    { name: "Yogurt", img: yogurtImg, link: "/shop/yogurt" },
    { name: "Protein Bar", img: proteinImg, link: "/shop/protein-bar" },
  ];

  const learnItems = [
    { name: "About Us", img: aboutImg, link: "/learn/about-us" },
    { name: "Our Process", img: processImg, link: "/learn/our-process" },
    { name: "Sustainability", img: sustainImg, link: "/learn/sustainability" },
  ];

  const blogItems = [
    { name: "Recipes", img: recipesImg, link: "/blog/recipes" },
    { name: "Lifestyle", img: lifestyleImg, link: "/blog/lifestyle" },
  ];

  // =======================
  // LOCATION & STICKY
  // =======================
useEffect(() => {
  // ⭐ If user logged out → reset to default
  if (!user) {
    setLocation("ENTER A PINCODE");
    return;
  }

  // ⭐ PRIORITY 1: User address from backend
  if (user?.city && user?.pincode) {
    setLocation(`${user.city.toUpperCase()} (${user.pincode})`);
  } 
  else {
    // ⭐ PRIORITY 2: Saved automatically from AddAddressForm
    const savedCity = localStorage.getItem("user_city");
    const savedPin = localStorage.getItem("user_pincode");

    if (savedCity && savedPin) {
      setLocation(`${savedCity.toUpperCase()} (${savedPin})`);
    } 
    else {
      // ⭐ PRIORITY 3: Old manual pincode modal
      const saved = localStorage.getItem("userLocation");
      if (saved) setLocation(saved);
    }
  }

  const scrollHandler = () => setIsSticky(window.scrollY > 150);
  window.addEventListener("scroll", scrollHandler);
  return () => window.removeEventListener("scroll", scrollHandler);
}, [user]);


  const handleSaveLocation = () => {
    const selected = place || pincode;
    if (!selected) return;

    setLocation(selected.toUpperCase());
    localStorage.setItem("userLocation", selected.toUpperCase());
    setModalOpen(false);
    setPincode("");
    setPlace("");
  };

  const ChevronIcon = ({ isOpen }) => (
    <svg
      className={`arrow-icon ${isOpen ? "open" : ""}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );

  // =======================
  // JSX RETURN
  // =======================
  return (
    <>
      {/* NAVBAR */}
      <nav ref={navRef} className={`navbar ${isSticky ? "sticky" : ""}`}>

        {/* LEFT SECTION */}
        <div className="navbar-left">
          <Link to="/">
            <img src={logo} className="logo" alt="Pride of Cows" />
          </Link>

          <button className="pincode-btn" onClick={() => setModalOpen(true)}>
            <img src={locationIcon} className="location-icon" alt="loc" />
            {location}
          </button>
        </div>

        {/* CENTER MENU */}
        <div className="navbar-center">

          <ul className="menu">
            {/* SHOP */}
            <li
              className={`dropdown ${openDropdown === "shop" ? "open" : ""}`}
              onMouseEnter={() => setOpenDropdown("shop")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              Shop <ChevronIcon isOpen={openDropdown === "shop"} />

              <div className="dropdown-menu">
                <div className="dropdown-content">

                  <ul className="shop-list no-border">
                    {shopItems.map((item) => (
                      <li
                        key={item.name}
                        className={hoveredProduct === item.name ? "active" : ""}
                        onMouseEnter={() => setHoveredProduct(item.name)}
                      >
                        <Link to={item.link}>{item.name}</Link>
                      </li>
                    ))}
                  </ul>

                  <div className="shop-preview square">
                    <img src={shopItems.find((p) => p.name === hoveredProduct)?.img} />
                  </div>
                </div>
              </div>
            </li>

            {/* LEARN */}
            <li
              className={`dropdown ${openDropdown === "learn" ? "open" : ""}`}
              onMouseEnter={() => setOpenDropdown("learn")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              Learn <ChevronIcon isOpen={openDropdown === "learn"} />

              <div className="dropdown-menu">
                <div className="dropdown-content">

                  <ul className="shop-list no-border">
                    {learnItems.map((item) => (
                      <li
                        key={item.name}
                        className={hoveredLearn === item.name ? "active" : ""}
                        onMouseEnter={() => setHoveredLearn(item.name)}
                      >
                        <Link to={item.link}>{item.name}</Link>
                      </li>
                    ))}
                  </ul>

                  <div className="shop-preview square">
                    <img src={learnItems.find((p) => p.name === hoveredLearn)?.img} />
                  </div>
                </div>
              </div>
            </li>

            {/* BLOG */}
            <li
              className={`dropdown ${openDropdown === "blog" ? "open" : ""}`}
              onMouseEnter={() => setOpenDropdown("blog")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              Blog <ChevronIcon isOpen={openDropdown === "blog"} />

              <div className="dropdown-menu">
                <div className="dropdown-content">

                  <ul className="shop-list no-border">
                    {blogItems.map((item) => (
                      <li
                        key={item.name}
                        className={hoveredBlog === item.name ? "active" : ""}
                        onMouseEnter={() => setHoveredBlog(item.name)}
                      >
                        <Link to={item.link}>{item.name}</Link>
                      </li>
                    ))}
                  </ul>

                  <div className="shop-preview square">
                    <img src={blogItems.find((p) => p.name === hoveredBlog)?.img} />
                  </div>
                </div>
              </div>
            </li>

            <li>Gift card</li>
          </ul>

          {/* RIGHT SIDE */}
          <div className="navbar-right">

            {/* LOGIN STATUS */}
            {user ? (
             <div
  className="navbar-user"
  onClick={() => navigate("/my-account")}   // ⭐ CLICK ANYWHERE
  style={{ cursor: "pointer" }}
>
  <img src={loginIcon} className="right-icon" />
  <span className="user-text">
    {user.firstName?.toUpperCase()}
  </span>
</div>

            ) : (
              <div className="login" onClick={() => setLoginOpen(true)}>
                <img src={loginIcon} className="right-icon" />
                <span className="login-text">LOGIN</span>
              </div>
            )}

            {/* CART */}
            <Link to="/cart" className="cart">
              <div className="cart-wrapper">
                <img src={cartIcon} className="right-icon" />
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </div>
              <span className="cart-text">CART</span>
            </Link>

            {/* HAMBURGER */}
            <button className="menu-toggle" onClick={() => setMenuOpen(true)}>
              <CustomMenuIcon />
            </button>
          </div>
        </div>
      </nav>

      {/* ================================= */}
      {/*    LOCATION MODAL                */}
      {/* ================================= */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">

            <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>

            <h2 className="modal-title">Enter Delivery Pincode</h2>
            <p className="modal-subtext">Check availability and delivery options</p>

            <div className="modal-input-group">

              <input
                type="text"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="modal-input"
              />

              <input
                type="text"
                placeholder="Search for a Place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                className="modal-input"
              />

            </div>

            <button className="continue-btn" onClick={handleSaveLocation}>CONTINUE</button>

          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}

      {/* ================================= */}
      {/* SIDE MENU OVERLAY */}
      {/* ================================= */}
      <div className={`side-menu-overlay ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(false)} />

      {/* ================================= */}
      {/*          SIDE MENU PANEL         */}
      {/* ================================= */}
      <div className={`side-menu ${menuOpen ? "active" : ""}`}>
        <div className="side-menu-content">

          {/* ========================= */}
          {/*   TOP USER / LOGIN ROW    */}
          {/* ========================= */}
          <div className="side-login">

           {user ? (
  <div className="side-user-box" onClick={() => navigate("/my-account")}>
    
    {/* LEFT ICON */}
    <img src={loginIcon} className="side-user-icon" />

    {/* CENTER TEXT */}
    <div className="side-user-details">
      <h3>{user.firstName?.toUpperCase()} {user.lastName?.toUpperCase()}</h3>
      <p>{user.phone}</p>
     
    </div>

    
  </div>
) : (
  <div className="side-login-left" onClick={() => setLoginOpen(true)}>
    <img src={loginIcon} className="right-icon" />
    <span className="login-text">Login</span>
  </div>
)}


            <button className="close-btn" onClick={() => setMenuOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {/* SHOP */}
          <div className="accordion">
            <button
              className="accordion-header"
              onClick={() => setOpenDropdown(openDropdown === "shop" ? null : "shop")}
            >
              <span>Shop</span>
              <ChevronIcon isOpen={openDropdown === "shop"} />
            </button>

            {openDropdown === "shop" && (
              <ul className="accordion-list">
                {shopItems.map((item) => (
                  <li key={item.name} onClick={() => setMenuOpen(false)}>
                    <Link to={item.link}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* SUPPORT */}
          <div className="side-section support">
            <h4>Support</h4>
            <ul>
              <li><img src={enquiryIcon} /> Enquiry</li>
              <li><img src={helpIcon} /> Help</li>
              <li><img src={contactIcon} /> Contact</li>
              <li><img src={faqIcon} /> FAQ</li>
            </ul>
          </div>

          {/* LEARN MORE */}
          <div className="side-section learn-more">
            <h4>Learn More</h4>
            <ul>
              <li><img src={aboutIcon} /> About Us</li>
              <li><img src={lifestyleIcon} /> Lifestyle</li>
              <li><img src={recipesIcon} /> Recipes</li>
            </ul>
          </div>

          {/* =============================== */}
          {/* LOGOUT SECTION (ONLY WHEN LOGGED IN) */}
          {/* =============================== */}
          {user && (
            <div className="side-section other">
              <h4>Other</h4>
              <ul>
                <li
                 onClick={() => {
  setUser(null);

  // REMOVE ALL SAVED USER + LOCATION DATA
  localStorage.removeItem("poc_user");
  localStorage.removeItem("poc_token");

  // ⭐ These 3 store the location — REMOVE THEM
  localStorage.removeItem("user_city");
  localStorage.removeItem("user_pincode");
  localStorage.removeItem("userLocation");

  navigate("/", { replace: true });

  // Force location reset visually
  window.location.reload();
}}

                  style={{ color: "#d9534f", fontWeight: "bold", cursor: "pointer" }}
                >
                  <img src={logoutIcon} className="logout-icon" />
                  Log Out
                </li>
              </ul>
            </div>
          )}

          {/* =============================== */}
          {/*          FOOTER              */}
          {/* =============================== */}
          <div className="side-footer">

            <div className="app-links">
              <span>Get The App</span>
              <img src={appstoreIcon} />
              <img src={playstoreIcon} />
            </div>

            <div className="social-links">
              <span>Follow Us</span>
              <img src={instagramIcon} />
              <img src={facebookIcon} />
              <img src={twitterIcon} />
              <img src={youtubeIcon} />
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;
