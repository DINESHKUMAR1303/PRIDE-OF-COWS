import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts/AllProducts";
import Cart from "./pages/Cart/Cart";   // Cart Page Import

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import NotificationBar from "./components/NotificationBar/NotificationBar";

// ⭐ IMPORTANT: CartProvider import
import { CartProvider } from "./context/CartContext";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      {/* ⭐ Wrap EVERYTHING with CartProvider */}
      <CartProvider>
        <NotificationBar />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop/all" element={<AllProducts />} />

          {/* 🛒 Cart Route */}
          <Route path="/cart" element={<Cart />} />
        </Routes>

        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
