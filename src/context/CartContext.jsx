import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1️⃣ Initialize from LocalStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("poc_cart");
      return saved ? JSON.parse(saved) : {};
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
        clearCart,  // ⭐ NEW — used after placing order
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
