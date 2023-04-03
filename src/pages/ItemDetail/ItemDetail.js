import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ItemDetail.css";
import { useParams, Link } from "react-router-dom";


const ItemDetail = () => {
  const [item, setItem] = useState({});

  let { id } = useParams();

  useEffect(() => {
    axios(`https://fakestoreapi.com/products/${id}`).then((res) =>
      setItem(res.data)
    );
  }, [id]);

  return (
    <div className="ItemDetail">
      <h1>{item.title}</h1>
        <img className="DetailImg" src={item.image} alt="Item"/>
        <p className="DescDetail">Description: {item.description}</p>
        <Link to={`/category/${item.category}`}> 
          <p>Category: {item.category}</p>
        </Link>
      <p>Price: {item.price}$</p>
    </div>
  );
};

export default ItemDetail;