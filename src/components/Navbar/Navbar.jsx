import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // ✅ ADDED useNavigate
import "./Navbar.css";

// === IMPORT GLOBAL CART CONTEXT ===
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

// ✅ IMPORT GLOBAL LOGIN CONTEXT
import { useLogin } from "../../context/LoginContext/LoginContext";

// === Icons & Images ===
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

import LoginModal from "./LoginModal";


// === Custom Hamburger Icon ===
const CustomMenuIcon = ({
  size = 28,
  color = "#193B61",
  topThickness = 1.5,
  middleThickness = 2,
  bottomThickness = 1.5
}) => {
  const gap = size * 0.2;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="6" y="4" width="12" height={topThickness} rx={1} fill={color} />
      <rect x="6" y={4 + gap} width="20" height={middleThickness} rx={1} fill={color} />
      <rect x="6" y={4 + gap * 2} width="12" height={bottomThickness} rx={1} fill={color} />
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

  // ⭐ FIX → Show CITY from logged-in user
  useEffect(() => {
    if (user && user.city && user.pincode) {
      setLocation(`${user.city.toUpperCase()} (${user.pincode})`);
    } else {
      const savedLocation = localStorage.getItem("userLocation");
      if (savedLocation) setLocation(savedLocation);
    }

    const handleScroll = () => setIsSticky(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [user]);


  const handleSaveLocation = () => {
    const selected = place || pincode;
    if (selected) {
      setLocation(selected.toUpperCase());
      localStorage.setItem("userLocation", selected.toUpperCase());
      setModalOpen(false);
      setPincode("");
      setPlace("");
    }
  };

  const ChevronIcon = ({ isOpen }) => (
    <svg
      className={`arrow-icon ${isOpen ? "open" : ""}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );


  return (
    <>
      <nav ref={navRef} className={`navbar ${isSticky ? "sticky" : ""}`}>

        {/* LEFT SIDE */}
        <div className="navbar-left">
          <Link to="/">
            <img src={logo} alt="Pride of Cows" className="logo" />
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
                        onMouseEnter={() => setHoveredProduct(item.name)}
                        className={hoveredProduct === item.name ? "active" : ""}
                      >
                        <Link to={item.link} style={{ textDecoration: "none", color: "inherit" }}>
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="shop-preview square">
                    <img src={shopItems.find((p) => p.name === hoveredProduct)?.img} alt={hoveredProduct} />
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
                        onMouseEnter={() => setHoveredLearn(item.name)}
                        className={hoveredLearn === item.name ? "active" : ""}
                      >
                        <Link to={item.link} style={{ textDecoration: "none", color: "inherit" }}>
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="shop-preview square">
                    <img src={learnItems.find((p) => p.name === hoveredLearn)?.img} alt={hoveredLearn} />
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
                        onMouseEnter={() => setHoveredBlog(item.name)}
                        className={hoveredBlog === item.name ? "active" : ""}
                      >
                        <Link to={item.link} style={{ textDecoration: "none", color: "inherit" }}>
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="shop-preview square">
                    <img src={blogItems.find((p) => p.name === hoveredBlog)?.img} alt={hoveredBlog} />
                  </div>
                </div>
              </div>
            </li>

            <li>Gift card</li>
          </ul>

          {/* RIGHT SIDE */}
          <div className="navbar-right">

            {/* LOGIN / USER SECTION */}
            {user ? (
              <div className="navbar-user">
                <img src={loginIcon} className="right-icon" />

                {/* ⭐ USERNAME → GO TO ACCOUNT PAGE */}
                <span
                  className="user-text"
                  onClick={() => navigate("/my-account")}
                  style={{ cursor: "pointer" }}
                >
                  {user.firstName ? user.firstName.toUpperCase() : "USER"}
                </span>

                {/* ❌ LOGOUT REMOVED FROM NAVBAR */}
              </div>
            ) : (
              <div className="login" onClick={() => setLoginOpen(true)}>
                <img src={loginIcon} className="right-icon" />
                <span className="login-text">LOGIN</span>
              </div>
            )}

            {/* CART */}
            <Link to="/cart" className="cart" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="cart-wrapper">
                <img src={cartIcon} className="right-icon" />
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </div>
              <span className="cart-text">CART</span>
            </Link>

            {/* HAMBURGER */}
            <button className="menu-toggle" onClick={() => setMenuOpen(true)}>
              <CustomMenuIcon size={28} color="#001F3F" />
            </button>
          </div>
        </div>
      </nav>

{/* LOCATION MODAL */}
{modalOpen && (
  <div className="modal-overlay">
    <div className="modal">

      {/* CLOSE BUTTON */}
      <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>

      {/* PREMIUM HEADER */}
      <h2 className="modal-title">Enter Delivery Pincode</h2>
      <p className="modal-subtext">Check availability and delivery options for your location</p>

      {/* INPUT GROUP */}
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

      {/* ACTION BUTTON */}
      <button className="continue-btn" onClick={handleSaveLocation}>
        CONTINUE
      </button>

    </div>
  </div>
)}


      {/* LOGIN MODAL */}
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}

      {/* SIDE MENU OVERLAY */}
      <div className={`side-menu-overlay ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(false)} />

      {/* SIDE MENU */}
      <div className={`side-menu ${menuOpen ? "active" : ""}`}>
        <div className="side-menu-content">

          <div className="side-login">
            <div className="side-login-left" onClick={() => setLoginOpen(true)}>
              <img src={loginIcon} className="right-icon" />
              <span className="login-text">Login</span>
            </div>

            <button className="close-btn" onClick={() => setMenuOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {/* SHOP ACCORDION */}
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
                    <Link to={item.link} style={{ textDecoration: "none", color: "inherit" }}>
                      {item.name}
                    </Link>
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

          {/* FOOTER */}
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
