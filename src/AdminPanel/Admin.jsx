import React, { useState } from "react";
import AdminLogin from "./AdminLogin/AdminLogin";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("admin_token")
  );

  const handleLoginSuccess = (token) => {
    localStorage.setItem("admin_token", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsLoggedIn(false);
  };

  return (
    <>
      {!isLoggedIn ? (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div style={{ padding: 40 }}>
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </>
  );
};

export default Admin;
