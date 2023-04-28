import React, { useState, useEffect } from "react";
import "./Orders.css";
import {
    collection,
    query,
    getDocs,
  } from "firebase/firestore";
  import { db } from "../../firebase/firebaseConfig";


const Orders = () => {

    const [data, setData] = useState({});

    const items = (data) => {
        let total = 0;
        data.forEach(function(elemento, indice, array) {
            total += elemento.total;
        })
        return (total);
    }

    const amount = (data) => {
        let total = 0;
        data.forEach(function(elemento, indice, array) {
            total += elemento.price*elemento.total;
        })
        return (total);
    }

    useEffect(() => {
    
        const getOrders = async () => {
          let q = [];
          q = query(collection(db, "orders"));
          const docs = [];
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          setData(docs);
        };
        getOrders();
    
    }, []);
    
  return (
    <div className="Orders">
      <h1>ORDERS</h1>
      {Object.entries(data).map(([key,value]) =>
        <div key={key}>
          <code>
              ID: {value.id} -
              Nombre: {value.order[0].name} -
              Apellido: {value.order[0].lastname} -
              E-mail: {value.order[0].email}  - 
              Items: {items(value.order[0].cart)} - 
              Amount: {amount(value.order[0].cart)} 
          </code>  
        </div>  
      )}
    </div>
  );
};

export default Orders;