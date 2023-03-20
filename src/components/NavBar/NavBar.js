import React from "react";
import "./NavBar.css";

import CartWidget from "../CartWidget/CartWidget";

const NavBar = () => {
  return (
    <nav className="Navigation">
      <ul className="List-ul">
        <li>
          <h1 style={{ color: "black" }}>e-Shop</h1>
        </li>
        <li>
          <a>Home</a>
        </li>
        <li>
          <a>Contact</a>
        </li>
        <li>
          <a>About</a>
        </li>
        <li>
          <CartWidget />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
