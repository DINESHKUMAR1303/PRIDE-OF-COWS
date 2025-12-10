import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// ---------------- Main Pages ----------------
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts/AllProducts";
import Cart from "./pages/Cart/Cart";
import Milk from "./pages/Milk/Milk";

// ---------------- Policy Pages ----------------
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions/TermsConditions";

// ❌ REMOVED LoginModal import — file does NOT exist
// import LoginModal from "./components/LoginModal/LoginModal";

// ---------------- My Account (Nested Routes) ----------------
import MyAccountLayout from "./pages/MyAccount/MyAccountLayout";
import ProfilePage from "./pages/MyAccount/ProfilePage";
import OrdersPage from "./pages/MyAccount/OrdersPage";
import AddressesPage from "./pages/MyAccount/AddressesPage";

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
// Blocks access to /my-account/... if user is not logged in
// =====================================================================
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // redirect to home or open login modal later
    return <Navigate to="/" replace />;
  }

  return children;
};


const App = () => {
  return (
    <>
      <ScrollToTop />

      <NotificationBar />
      <Navbar />

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
              -------------------------------------------------------------------
              /my-account             → MyAccountLayout (Protected)
              /my-account/profile     → ProfilePage
              /my-account/orders      → OrdersPage
              /my-account/addresses   → AddressesPage
              =================================================================== */}
          <Route
            path="/my-account"
            element={
              <ProtectedRoute>
                <MyAccountLayout />
              </ProtectedRoute>
            }
          >
            {/* Default redirect to profile */}
            <Route index element={<Navigate to="profile" replace />} />

            {/* Nested Pages */}
            <Route path="profile" element={<ProfilePage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="addresses" element={<AddressesPage />} />
          </Route>

          {/* ---------------- POLICY PAGES ---------------- */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />

          {/* ---------------- CATCH ALL ---------------- */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
