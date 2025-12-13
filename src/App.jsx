import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// ---------------- Main Pages ----------------
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts/AllProducts";
import Cart from "./pages/Cart/Cart";
import Milk from "./pages/Milk/Milk";

// ---------------- Policy Pages ----------------
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions/TermsConditions";

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
// ⭐ Protected Route Wrapper
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

  // ✅ Detect admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />

      {/* ❌ Hide on admin */}
      {!isAdminRoute && <NotificationBar />}
      {!isAdminRoute && <Navbar />}

      <div className="page-wrapper">
        <Routes>

          {/* ---------------- HOME ---------------- */}
          <Route path="/" element={<Home />} />

          {/* ---------------- SHOP ---------------- */}
          <Route path="/shop/all" element={<AllProducts />} />
          <Route path="/shop/milk" element={<Milk />} />

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
          <Route path="/admin" element={<Admin />} />

          {/* ---------------- CATCH ALL ---------------- */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </div>

      {/* ❌ Hide on admin */}
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
