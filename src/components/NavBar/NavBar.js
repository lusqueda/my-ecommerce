import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import img from "./logo.jpg";


import CartWidget from "../CartWidget/CartWidget";

const NavBar = () => {
  return (
    <nav className="Navigation">
      <ul>
        <Link className="Link" to="/">
          <img className="NavImg" src={img} alt="logo" />
        </Link>
        <Link className="Link" to="/home">
            Home
        </Link>
        <Link className="Link" to={`/category/${'electronics'}`}>
            Electronics
        </Link>
        <Link className="Link" to={`/category/${'jewelery'}`}>
            Jewelery
        </Link>
        <Link className="Link" to={`/category/${"men's clothing"}`}>
            Men's clothing
        </Link>
        <Link className="Link" to={`/category/${"women's clothing"}`}>
            Women's clothing
        </Link>
        <Link className="Link" to="/contact">
            Contact
        </Link>
        <Link className="Link" to="/about">
            About
        </Link>
        <li>
          <CartWidget />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
