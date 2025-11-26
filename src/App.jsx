import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* All Products page */}
        <Route path="/shop/all" element={<AllProducts />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
