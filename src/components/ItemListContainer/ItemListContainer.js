import React, { useState, useEffect } from "react";
import "./ItemListContainer.css";
import { Link } from "react-router-dom";
import {
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import ItemCard from "../ItemCard/ItemCard";

const ItemListContainer = (props) => {

  const [data, setData] = useState({});

  let category = props.category;

  useEffect(() => {
    
    const getProducts = async () => {
     let q = [];
     if(category){
         q = query(collection(db, "products"), where("category", "==", category));
      }else{
         q = query(collection(db, "products"));
      }
      const docs = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setData(docs);
    };
    getProducts();

  }, [category]);

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
