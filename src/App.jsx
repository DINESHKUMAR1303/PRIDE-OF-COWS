import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ⭐ PAGES
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts/AllProducts";
import Cart from "./pages/Cart/Cart";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions/TermsConditions";

// ⭐ CATEGORY PAGES (YOU WILL ADD COMPONENTS LATER)
import Milk from "./pages/Milk/Milk";      // <-- NEW
// import Ghee from "./pages/Ghee/Ghee";   // (optional future)
// import Curd from "./pages/Curd/Curd";   // (optional future)

// ⭐ COMPONENTS
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import NotificationBar from "./components/NotificationBar/NotificationBar";

// ⭐ CONTEXT
import { CartProvider } from "./context/CartContext";

// ⭐ SCROLL TOP FIX
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>

        {/* Always scroll to top */}
        <ScrollToTop />

        {/* Top layout elements */}
        <NotificationBar />
        <Navbar />

        <Routes>

          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* SHOP - ALL PRODUCTS */}
          <Route path="/shop/all" element={<AllProducts />} />

          {/* ⭐ CATEGORY ROUTES (CUSTOM PAGES) */}
          <Route path="/shop/milk" element={<Milk />} />     {/* NEW */}
          {/* <Route path="/shop/ghee" element={<Ghee />} /> */}
          {/* <Route path="/shop/curd" element={<Curd />} /> */}
          {/* Add more when needed */}

          {/* CART */}
          <Route path="/cart" element={<Cart />} />

          {/* PRIVACY POLICY */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* TERMS & CONDITIONS */}
          <Route path="/terms-and-conditions" element={<TermsConditions />} />

        </Routes>

        {/* Footer should always be at bottom */}
        <Footer />

      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
