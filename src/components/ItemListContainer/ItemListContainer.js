import React from "react";
import "./ItemListContainer.css";

const ItemListContainer = (props) => {
  return (
    <div className="ItemListContainer">
      <h1>{props.greeting}</h1>
    </div>
  );
};

export default ItemListContainer;
