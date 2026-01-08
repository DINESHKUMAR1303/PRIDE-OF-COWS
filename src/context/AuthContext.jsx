// ======================================================
// AUTH CONTEXT — GLOBAL USER STATE + LOGIN MODAL + LOGOUT
// ======================================================

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ⭐ Stores logged-in user's full profile
  const [user, setUser] = useState(null);

  // ⭐ Login modal controller
  const [loginOpen, setLoginOpen] = useState(false);

  const isLoggedIn = !!user;

  // ======================================================
  // LOAD USER FROM LOCAL STORAGE (RUNS ONLY ONCE)
  // ======================================================
  useEffect(() => {
    const token = localStorage.getItem("poc_token");
    const storedUser = localStorage.getItem("poc_user");

    if (!token || !storedUser) return;

    try {
      const parsed = JSON.parse(storedUser);

      // -------------------------------
      // ⭐ Normalize Address Structure
      // -------------------------------
      // Check if it's already nested or flat in localStorage
      const addressLayer = parsed.address || {};

      const address = {
        name:
          addressLayer.name ||
          parsed.name ||
          `${parsed.firstName || ""} ${parsed.lastName || ""}`.trim(),
        type: addressLayer.type || parsed.type || "Home",
        fullAddress:
          addressLayer.fullAddress ||
          parsed.fullAddress ||
          parsed.address ||
          "",
        city: addressLayer.city || parsed.city || "",
        state: addressLayer.state || parsed.state || "",
        country: addressLayer.country || parsed.country || "India",
        pincode: addressLayer.pincode || parsed.pincode || "",
      };

      // -------------------------------
      // ⭐ Construct Clean User Object
      // -------------------------------
      const cleanUser = {
        id: parsed.id || parsed._id || "",
        firstName: parsed.firstName || "",
        lastName: parsed.lastName || "",
        email: parsed.email || "",
        telephone: parsed.telephone || parsed.phone || "",
        gender: parsed.gender || "Male",
        dob: parsed.dob || "",
        address,
      };

      setUser(cleanUser);
    } catch (err) {
      console.error("❌ Error restoring user from storage:", err);
      localStorage.removeItem("poc_user");
    }
  }, []); // ✔ Runs only once (no double profile load)

  // ======================================================
  // LOGOUT
  // ======================================================
  const logout = () => {
    localStorage.removeItem("poc_token");
    localStorage.removeItem("poc_user");
    setUser(null);
  };

  // ======================================================
  // PROVIDER VALUES
  // ======================================================
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        loginOpen,
        setLoginOpen,
        logout,
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
