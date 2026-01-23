import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// ---------------- Main Pages ----------------
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts/AllProducts";
import Cart from "./pages/Cart/Cart";
import Milk from "./pages/Milk/Milk";
import Ghee from "./pages/Ghee/Ghee";
import Curd from "./pages/Curd/Curd";
import Panner from "./pages/Paneer/Panner";
import MilkPowder from "./pages/Milk Powder/Milk Powder";
import ProteinBar from "./pages/Protein Bar/ProteinBar";
import Yogurt from "./pages/Yogurt/Yogurt";

// ---------------- Policy Pages ----------------
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions/TermsConditions";
import AboutUs from "./pages/AboutUs/AboutUs";

// ---------------- My Account (Nested Routes) ----------------
import MyAccountLayout from "./pages/MyAccount/MyAccountLayout";
import ProfilePage from "./pages/MyAccount/ProfilePage";
import OrdersPage from "./pages/MyAccount/OrdersPage";
import AddressesPage from "./pages/MyAccount/AddressesPage";

// ---------------- Admin ----------------
import Admin from "./AdminPanel/Admin";

// ---------------- Layout Components ----------------
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import NotificationBar from "./components/NotificationBar/NotificationBar";

// ---------------- Utils ----------------
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { useAuth } from "./context/AuthContext";

import "./App.css";

// =====================================================================
// ⭐ Protected Route Wrapper (USER)
// =====================================================================
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  const location = useLocation();

  // ✅ Detect admin routes
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* ✅ MUST stay here — handles route change scroll */}
      <ScrollToTop />

      {/* ❌ Hide on admin routes */}
      {!isAdminRoute && <NotificationBar />}
      {!isAdminRoute && <Navbar />}

      {/* 🔥 MAIN SCROLL CONTAINER */}
      <div className="page-wrapper">
        <Routes>
          {/* ---------------- HOME ---------------- */}
          <Route path="/" element={<Home />} />

          {/* ---------------- SHOP ---------------- */}
          <Route path="/shop/all" element={<AllProducts />} />
          <Route path="/shop/milk" element={<Milk />} />
          <Route path="/shop/ghee" element={<Ghee />} />
          <Route path="/shop/curd" element={<Curd />} />
          <Route path="/shop/paneer" element={<Panner />} />
          <Route path="/shop/whole-milk-powder" element={<MilkPowder />} />
          <Route path="/shop/protein-bar" element={<ProteinBar />} />
          <Route path="/shop/yogurt" element={<Yogurt />} />

          {/* ---------------- CART ---------------- */}
          <Route path="/cart" element={<Cart />} />

          {/* ===================================================================
              ⭐ MY ACCOUNT (PROTECTED AREA)
          =================================================================== */}
          <Route
            path="/my-account"
            element={
              <ProtectedRoute>
                <MyAccountLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="addresses" element={<AddressesPage />} />
          </Route>

          {/* ---------------- POLICY PAGES ---------------- */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />

          {/* ================= ADMIN ================= */}
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/admin/*" element={<Admin />} />

          {/* ---------------- CATCH ALL ---------------- */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* ❌ Hide on admin routes */}
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
