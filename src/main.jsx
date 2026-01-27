import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

// ⭐ AuthProvider — manages login & global user
import { AuthProvider } from "./context/AuthContext";

// Existing Providers
import { CartProvider } from "./context/CartContext";
import { LoginProvider } from "./context/LoginContext/LoginContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <LoginProvider>
        <CartProvider>
          {/* ⭐ THE ONLY BrowserRouter IN YOUR ENTIRE PROJECT */}
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <App />
          </BrowserRouter>
        </CartProvider>
      </LoginProvider>
    </AuthProvider>
  </React.StrictMode>
);
