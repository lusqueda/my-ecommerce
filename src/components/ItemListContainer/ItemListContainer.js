import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ItemListContainer.css";
import { Link } from "react-router-dom";

import ItemCard from "../ItemCard/ItemCard";

const ItemListContainer = () => {

  const [data, setData] = useState({});

  useEffect(() => {
      axios(`https://fakestoreapi.com/products`).then((res) =>
      setData(res.data));
  }, []);
 

  return (
    <div className="ItemListContainer">
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

export default ItemListContainer;
