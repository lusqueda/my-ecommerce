import React, { useState,useEffect } from "react";
import axios from "axios";
import "./ItemCategoryContainer.css";
import { Link } from "react-router-dom";

import ItemCard from "../ItemCard/ItemCard";

const ItemCategoryContainer = (props) => {

  const [data, setData] = useState({});
  let category = props.category;

  useEffect(() => {
    axios(`https://fakestoreapi.com/products/category/${category}`).then((res) =>
    setData(res.data));
  }, [category]);
  

  return (
    <div className="ItemCategoryContainer">
      {Object.entries(data).map(([key,value]) =>
        <div key={key}>
          <Link to={`/item-detail/${value.id}`}>
            <ItemCard
              title={value.title}
              img={value.image}
              backgroundColor="rgb(179, 179, 177)"
              price={value.price}
            />
          </Link>  
        </div>  
      )}
    </div>
  );
};

export default ItemCategoryContainer;