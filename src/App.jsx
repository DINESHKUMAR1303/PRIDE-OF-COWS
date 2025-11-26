import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts/AllProducts";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import NotificationBar from "./components/NotificationBar/NotificationBar";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>

      {/* 🔔 Notification bar shows on all pages */}
      <NotificationBar />

      {/* 🟦 Global Navbar */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop/all" element={<AllProducts />} />
      </Routes>

      {/* 🟩 Global Footer */}
      <Footer />

    </BrowserRouter>
  );
};

export default App;
