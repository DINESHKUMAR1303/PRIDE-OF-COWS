import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1️⃣ Initialize from LocalStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("poc_cart");
      const parsed = saved ? JSON.parse(saved) : {};

      // Strict Cleanup: Keep only valid MongoDB ObjectIds (24 hex chars)
      // Removes legacy "1" and placeholders like "active-ghee-id"
      const cleaned = {};
      Object.keys(parsed).forEach(key => {
        if (/^[0-9a-fA-F]{24}$/.test(key)) {
          cleaned[key] = parsed[key];
        }
      });
      return cleaned;
    } catch (error) {
      return {};
    }
  });

  // 2️⃣ Save to LocalStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("poc_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ➤ INCREASE ITEM
  const increaseItem = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // ➤ DECREASE ITEM
  const decreaseItem = (id) => {
    setCartItems((prev) => {
      if (!prev[id]) return prev;

      const newQty = prev[id] - 1;

      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }

      return {
        ...prev,
        [id]: newQty,
      };
    });
  };


  // ➤ REMOVE ITEM COMPLETELY
  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  // ⭐ ➤ CLEAR CART COMPLETELY (NEW STEP 4)
  const clearCart = () => {
    setCartItems({});
  };

  // ➤ AUTO CALCULATED CART COUNT
  const cartCount = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        increaseItem,
        decreaseItem,
        cartCount,  // Navbar uses this
        removeFromCart, // ⭐ NEW 
        clearCart,  // ⭐ NEW — used after placing order
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
