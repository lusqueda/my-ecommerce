import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import img from "./logo.jpg";

import CartWidget from "../CartWidget/CartWidget";

const NavBar = (props) => {

  return (
    <nav className="Navigation">
      <ul>
        <Link className="Link" to="/home">
          <img className="NavImg" src={img} alt="logo" />
        </Link>
        <Link className="Link" to="/home">
            Home
        </Link>
        <Link className="Link" to={`/home/${'electronics'}`}>
            Electronics
        </Link>
        <Link className="Link" to={`/home/${'jewelery'}`}>
            Jewelery
        </Link>
        <Link className="Link" to={`/home/${"men's clothing"}`}>
            Men's clothing
        </Link>
        <Link className="Link" to={`/home/${"women's clothing"}`}>
            Women's clothing
        </Link>
        <Link className="Link" to="/contact">
            Contact
        </Link>
        <Link className="Link" to="/about">
            About
        </Link>
        <Link className="Link" to="/cart">
          <CartWidget count = {props.count}/>
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
