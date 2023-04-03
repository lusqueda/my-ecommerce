import React from "react";
import "./Header.css";
import img from "./logo.jpg";

const Header = (props) => {
  // console.log(props);
  return (
    <div className="Header">
      <img className="HeaderImg" src={img} alt="logo" />
      <div style={{ margin: "15px"}}>
        <h1>{props.title}</h1>
        <h2>{props.subTitle}</h2>
      </div>
    </div>
  );
};

export default Header;