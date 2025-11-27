import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState({});

  const increaseItem = (id) => {
    setCartItems((prev) => {
      const updated = { ...prev, [id]: (prev[id] || 0) + 1 };
      setCartCount(Object.values(updated).reduce((a, b) => a + b, 0));
      return updated;
    });
  };

  const decreaseItem = (id) => {
    setCartItems((prev) => {
      const newQty = (prev[id] || 0) - 1;
      let updated;

      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        updated = rest;
      } else {
        updated = { ...prev, [id]: newQty };
      }

      setCartCount(Object.values(updated).reduce((a, b) => a + b, 0));
      return updated;
    });
  };

  return (
    <CartContext.Provider value={{ cartCount, cartItems, increaseItem, decreaseItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
