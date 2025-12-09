// ======================================================
// AUTH CONTEXT — GLOBAL USER + LOGIN MODAL + LOGOUT
// ======================================================

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  // ⭐ Stores logged-in user data
  const [user, setUser] = useState(null);

  // ⭐ Controls login modal visibility globally (NO LoginContext needed)
  const [loginOpen, setLoginOpen] = useState(false);

  // ⭐ Simple boolean — easily check login state
  const isLoggedIn = !!user;

  // ======================================================
  // LOAD USER FROM LOCAL STORAGE (Auto Login)
  // ======================================================
  useEffect(() => {
    const token = localStorage.getItem("poc_token");
    const storedUser = localStorage.getItem("poc_user");

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        // ⭐ Restore complete user data safely
        setUser({
          name: parsedUser.name || "",
          phone: parsedUser.phone || "",
          email: parsedUser.email || "",
          city: parsedUser.city || "",
          pincode: parsedUser.pincode || "",
          firstName: parsedUser.firstName || "",
          lastName: parsedUser.lastName || "",
          address: parsedUser.address || "",
          state: parsedUser.state || "",
          country: parsedUser.country || "",
        });
      } catch (err) {
        console.error("❌ Error parsing stored user:", err);
        localStorage.removeItem("poc_user");
      }
    }
  }, []);

  // ======================================================
  // GLOBAL LOGOUT FUNCTION
  // ======================================================
  const logout = () => {
    localStorage.removeItem("poc_token");
    localStorage.removeItem("poc_user");

    setUser(null); // removes user globally
  };

  // ======================================================
  // PROVIDE CONTEXT VALUES
  // ======================================================
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,

        isLoggedIn,

        loginOpen,
        setLoginOpen,

        logout, // global logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ======================================================
// HOOK FOR EASY ACCESS OUTSIDE
// ======================================================
export const useAuth = () => useContext(AuthContext);
