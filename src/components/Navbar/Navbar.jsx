// ================= FULL NAVBAR WITH ROUTING (NO STYLE CHANGES) ==================

import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";      // ✅ Routing added
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

// ---------------- Custom Menu Icon ----------------
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
  const [loginOpen, setLoginOpen] = useState(false);

  const [location, setLocation] = useState("ENTER A PINCODE");
  const [pincode, setPincode] = useState("");
  const [place, setPlace] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const [hoveredProduct, setHoveredProduct] = useState("All");
  const [hoveredLearn, setHoveredLearn] = useState("About Us");
  const [hoveredBlog, setHoveredBlog] = useState("Recipes");

  const [openDropdown, setOpenDropdown] = useState(null);

  const navRef = useRef(null);
  const navOffsetTop = useRef(0);
  const [isSticky, setIsSticky] = useState(false);
  const [navHeight, setNavHeight] = useState(0);

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

  // Sticky Navbar Logic
  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) setLocation(savedLocation);

    const setMeasurements = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        navOffsetTop.current = rect.top + window.pageYOffset;
        setNavHeight(Math.round(rect.height));
      }
    };

    setMeasurements();

    const handleScroll = () => {
      if (window.pageYOffset > navOffsetTop.current) setIsSticky(true);
      else setIsSticky(false);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", setMeasurements);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
      width="20" height="20"
      viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );

  const fixedStyle = isSticky
    ? { position: "fixed", top: 0, left: 0, right: 0, zIndex: 2000 }
    : undefined;

  return (
    <>
      {isSticky && <div style={{ height: navHeight }} />}

      <nav ref={navRef} className={`navbar ${isSticky ? "sticky" : ""}`} style={fixedStyle}>
        
        {/* LEFT */}
        <div className="navbar-left">
          <img src={logo} alt="Pride of Cows" className="logo" />
          <button className="pincode-btn" onClick={() => setModalOpen(true)}>
            <img src={locationIcon} className="location-icon" alt="Location" />
            {location}
          </button>
        </div>

        {/* CENTER */}
        <div className="navbar-center">
          <ul className="menu">

            {/* ================= SHOP ================= */}
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
                        <Link
                          to={item.link}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}

                  </ul>

                  <div className="shop-preview square">
                    <img
                      src={shopItems.find((p) => p.name === hoveredProduct)?.img}
                      alt={hoveredProduct}
                    />
                  </div>
                </div>
              </div>
            </li>

            {/* ================= LEARN ================= */}
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
                        <Link
                          to={item.link}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}

                  </ul>

                  <div className="shop-preview square">
                    <img
                      src={learnItems.find((p) => p.name === hoveredLearn)?.img}
                      alt={hoveredLearn}
                    />
                  </div>

                </div>
              </div>
            </li>

            {/* ================= BLOG ================= */}
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
                        <Link
                          to={item.link}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}

                  </ul>

                  <div className="shop-preview square">
                    <img
                      src={blogItems.find((p) => p.name === hoveredBlog)?.img}
                      alt={hoveredBlog}
                    />
                  </div>

                </div>
              </div>
            </li>

            <li>Gift card</li>
          </ul>

          {/* ================= RIGHT SIDE ================= */}
          <div className="navbar-right">
            <div className="login" onClick={() => setLoginOpen(true)}>
              <img src={loginIcon} className="right-icon" alt="login" />
              <span className="login-text">LOGIN</span>
            </div>

            <div className="cart">
              <div className="cart-wrapper">
                <img src={cartIcon} className="right-icon" alt="cart" />
                {cartCount > 0 && (
                  <span className="cart-count">{cartCount}</span>
                )}
              </div>
              <span className="cart-text">CART</span>
            </div>

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
            <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>

            <input
              type="text"
              placeholder="PINCODE"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />

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

      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}

      {/* ----------- MOBILE SIDE MENU ----------- */}
      <div
        className={`side-menu-overlay ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      <div className={`side-menu ${menuOpen ? "active" : ""}`}>
        <div className="side-menu-content">

          <div className="side-login">
            <div className="side-login-left" onClick={() => setLoginOpen(true)}>
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
              onClick={() =>
                setOpenDropdown(openDropdown === "shop" ? null : "shop")
              }
            >
              <span>Shop</span>
              <ChevronIcon isOpen={openDropdown === "shop"} />
            </button>

            {openDropdown === "shop" && (
              <ul className="accordion-list">
                {shopItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.link}
                      onClick={() => setMenuOpen(false)}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {item.name}
                    </Link>
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
