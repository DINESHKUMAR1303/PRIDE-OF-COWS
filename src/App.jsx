import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts/AllProducts";
import Cart from "./pages/Cart/Cart";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions/TermsConditions";

// Category Pages
import Milk from "./pages/Milk/Milk";

// Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import NotificationBar from "./components/NotificationBar/NotificationBar";

// Scroll Reset
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import "./App.css";

const App = () => {
  return (
    <>
      {/* Fix scroll to top on route change */}
      <ScrollToTop />

      {/* --- ALWAYS AT TOP --- */}
      <NotificationBar />
      <Navbar />

      {/* --- PAGE WRAPPER --- */}
      <div className="page-wrapper">
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* All Products */}
          <Route path="/shop/all" element={<AllProducts />} />

          {/* Milk */}
          <Route path="/shop/milk" element={<Milk />} />

          {/* Cart */}
          <Route path="/cart" element={<Cart />} />

          {/* Policy Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
        </Routes>
      </div>

      {/* Footer ALWAYS at bottom */}
      <Footer />
    </>
  );
};

export default App;
