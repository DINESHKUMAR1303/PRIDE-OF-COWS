import { createContext, useContext, useState, useEffect } from "react";

// ======================================================
// AUTH CONTEXT
// Handles: saving logged-in user globally across the app
// ======================================================
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ⭐ NEW — controls login modal open/close
  const [loginOpen, setLoginOpen] = useState(false);

  // ⭐ NEW — Boolean state for easy login check
  const isLoggedIn = !!user;

  // ======================================================
  // LOAD USER FROM LOCAL STORAGE (Auto Login)
  // ======================================================
  useEffect(() => {
    const token = localStorage.getItem("poc_token");
    const userData = localStorage.getItem("poc_user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        console.error("Error parsing stored user:", err);
        localStorage.removeItem("poc_user");
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,

        // ⭐ ADDED — for Cart.jsx login checking
        isLoggedIn,

        // ⭐ ADDED — for global login modal control
        loginOpen,
        setLoginOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ======================================================
// HOOK FOR EASY ACCESS
// ======================================================
export const useAuth = () => useContext(AuthContext);
