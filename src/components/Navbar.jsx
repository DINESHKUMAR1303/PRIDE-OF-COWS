import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left">
        <img src="/logo.png" alt="logo" className="logo" />
        <button className="pincode">Enter a Pincode</button>
      </div>

      <ul className="menu">
        <li>Shop</li>
        <li>Learn</li>
        <li>Blog</li>
        <li>Gift card</li>
      </ul>

      <div className="right">
        <button>Login</button>
        <button>Cart (0)</button>
      </div>
    </nav>
  );
};

export default Navbar;
