import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts/AllProducts";
import Cart from "./pages/Cart/Cart";

// ⭐ NEW IMPORTS (PAGES)
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions/TermsConditions";

// ⭐ COMPONENT IMPORTS
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import NotificationBar from "./components/NotificationBar/NotificationBar";

// ⭐ CONTEXT
import { CartProvider } from "./context/CartContext";

// ⭐ SCROLL TO TOP FIX
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>

        {/* ⭐ FIX: Always scroll to top on navigation */}
        <ScrollToTop />

        <NotificationBar />
        <Navbar />

        <Routes>

          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* SHOP */}
          <Route path="/shop/all" element={<AllProducts />} />

          {/* CART */}
          <Route path="/cart" element={<Cart />} />

          {/* ⭐ PRIVACY POLICY PAGE */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* ⭐ TERMS & CONDITIONS PAGE */}
          <Route path="/terms-and-conditions" element={<TermsConditions />} />

          {/* ⭐ ADD FUTURE ROUTES HERE */}
          {/* 
              Example:
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
          */}

        </Routes>

        <Footer />

      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
