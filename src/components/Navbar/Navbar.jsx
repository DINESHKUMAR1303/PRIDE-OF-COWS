import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./Navbar.css";

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

// === Dropdown Preview Images ===
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

// === Custom Hamburger Icon ===
const CustomMenuIcon = ({
  size = 28,
  color = "#193B61",
  topThickness = 1.5,
  middleThickness = 2,
  bottomThickness = 1.5,
}) => {
  const gap = size * 0.2;
  const topY = 4;
  const middleY = topY + gap;
  const bottomY = topY + gap * 2;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="6" y={topY} width="12" height={topThickness} rx={topThickness / 2} fill={color} />
      <rect x="6" y={middleY} width="20" height={middleThickness} rx={middleThickness / 2} fill={color} />
      <rect x="6" y={bottomY} width="12" height={bottomThickness} rx={bottomThickness / 2} fill={color} />
    </svg>
  );
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [location, setLocation] = useState("ENTER A PINCODE");
  const [pincode, setPincode] = useState("");
  const [place, setPlace] = useState("");

  const [hoveredProduct, setHoveredProduct] = useState("All");
  const [hoveredLearn, setHoveredLearn] = useState("About Us");
  const [hoveredBlog, setHoveredBlog] = useState("Recipes");
  const [openDropdown, setOpenDropdown] = useState(null);

  // Dropdown items
  const shopItems = [
    { name: "All", img: allImg },
    { name: "Milk", img: milkImg },
    { name: "Ghee", img: gheeImg },
    { name: "Curd", img: curdImg },
    { name: "Paneer", img: paneerImg },
    { name: "Whole Milk Powder", img: powderImg },
    { name: "Yogurt", img: yogurtImg },
    { name: "Protein Bar", img: proteinImg },
  ];

  const learnItems = [
    { name: "About Us", img: aboutImg },
    { name: "Our Process", img: processImg },
    { name: "Sustainability", img: sustainImg },
  ];

  const blogItems = [
    { name: "Recipes", img: recipesImg },
    { name: "Lifestyle", img: lifestyleImg },
  ];

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) setLocation(savedLocation);
  }, []);

  const handleSaveLocation = () => {
    const selected = place || pincode;
    if (selected) {
      setLocation(selected);
      localStorage.setItem("userLocation", selected);
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
      {/* === Top Navbar === */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Pride of Cows" className="logo" />
          <button className="pincode-btn" onClick={() => setModalOpen(true)}>
            <img src={locationIcon} alt="Location" className="location-icon" />
            {location}
          </button>
        </div>

        <div className="navbar-center">
          <ul className="menu">
            {/* Shop Dropdown */}
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
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="shop-preview square">
                    <img src={shopItems.find((p) => p.name === hoveredProduct)?.img} alt={hoveredProduct} />
                  </div>
                </div>
              </div>
            </li>

            {/* Learn Dropdown */}
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
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="shop-preview square">
                    <img src={learnItems.find((p) => p.name === hoveredLearn)?.img} alt={hoveredLearn} />
                  </div>
                </div>
              </div>
            </li>

            {/* Blog Dropdown */}
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
                        <span>{item.name}</span>
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

          {/* Right Side */}
          <div className="navbar-right">
            <div className="login">
              <img src={loginIcon} alt="login" className="right-icon" />
              <span className="login-text">LOGIN</span>
            </div>

            <div className="cart">
              <div className="cart-wrapper">
                <img src={cartIcon} alt="cart" className="right-icon" />
                <span className="cart-count">0</span>
              </div>
              <span className="cart-text">CART</span>
            </div>

            <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Toggle menu">
              <CustomMenuIcon size={28} color="#001F3F" />
            </button>
          </div>
        </div>
      </nav>

      {/* === Location Modal === */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={() => setModalOpen(false)}>
              ✕
            </button>
            <input type="text" placeholder="PINCODE" value={pincode} onChange={(e) => setPincode(e.target.value)} />
            <input
              type="text"
              placeholder="Search for a place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
            <button className="continue-btn" onClick={handleSaveLocation}>
              CONTINUE
            </button>
          </div>
        </div>
      )}

      {/* === Mobile Side Menu (Offcanvas) === */}
      <div className={`side-menu-overlay ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(false)}></div>

      <div className={`side-menu ${menuOpen ? "active" : ""}`}>
        <div className="side-menu-content">
          <div className="side-login">
            <div className="side-login-left">
              <img src={loginIcon} alt="login" className="right-icon" />
              <span className="login-text">Login</span>
            </div>
            <button className="close-btn" onClick={() => setMenuOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="accordion">
            <button
              className="accordion-header"
              onClick={() => setOpenDropdown(openDropdown === "shop" ? null : "shop")}
              aria-expanded={openDropdown === "shop"}
            >
              <span>Shop</span>
              <ChevronIcon isOpen={openDropdown === "shop"} />
            </button>
            {openDropdown === "shop" && (
              <ul className="accordion-list">
                {shopItems.map((item) => (
                  <li key={item.name} onClick={() => setMenuOpen(false)}>
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="side-section support">
            <h4>Support</h4>
            <ul>
              <li><img src={enquiryIcon} alt="" /> Enquiry</li>
              <li><img src={helpIcon} alt="" /> Help</li>
              <li><img src={contactIcon} alt="" /> Contact</li>
              <li><img src={faqIcon} alt="" /> FAQ</li>
            </ul>
          </div>

          <div className="side-section learn-more">
            <h4>Learn More</h4>
            <ul>
              <li><img src={aboutIcon} alt="" /> About Us</li>
              <li><img src={lifestyleIcon} alt="" /> Lifestyle</li>
              <li><img src={recipesIcon} alt="" /> Recipes</li>
            </ul>
          </div>

          <div className="side-footer">
            <div className="app-links">
              <span>Get The App</span>
              <img src={appstoreIcon} alt="App Store" />
              <img src={playstoreIcon} alt="Play Store" />
            </div>
            <div className="social-links">
              <span>Follow Us</span>
              <img src={instagramIcon} alt="Instagram" />
              <img src={facebookIcon} alt="Facebook" />
              <img src={twitterIcon} alt="Twitter" />
              <img src={youtubeIcon} alt="YouTube" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
