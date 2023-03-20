import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./CartWidget.css";

const CartWidget = () => {
  return (
    <div className="CartWidget">
      <AddShoppingCartIcon sx={{ color: "black" }} />
      <span>1</span>
    </div>
  );
};

export default CartWidget;
