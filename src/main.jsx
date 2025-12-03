import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ✅ Import CartProvider
import { CartProvider } from "./context/CartContext";

// ✅ Import LoginProvider (NEW)
import { LoginProvider } from "./context/LoginContext/LoginContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap ENTIRE APP inside BOTH providers */}
    <LoginProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </LoginProvider>
  </React.StrictMode>
);
