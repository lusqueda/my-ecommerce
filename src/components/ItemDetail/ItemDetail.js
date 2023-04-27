import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import "./ItemDetail.css";
import { useParams, Link } from "react-router-dom";
import {
  collection,
  query,
  getDocs,
  where,
  documentId,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ItemDetail = () => {

  const { cart } = useContext(CartContext);
  const [count, setCount] = useState(1);
  const [item, setItem] = useState([]);
  let { id } = useParams();

  const addCart = (items, cart, price, id) => {
    let flg = 0;
    if(cart.length === 0){
      cart.push({id, price, total: items});
    }else{
      cart.map((key) => {
        if(key.id === id){
          key.total = items;
          flg = 1;
        }
        return null
      })
      if(flg === 0) {
        cart.push({id, price, total: items}); 
      }
    }

    const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
    guardarLocal("cart", JSON.stringify(cart));

    window.location.reload(false);
  }

  useEffect(() => {

    if(cart.length > 0){
      cart.map((key) => {
        if(key.id === id){
          setCount(key.total);
        }
        return null
      })
    }

    const getProducts = async () => {
      const q = query(collection(db, "products"), where(documentId(), "==", id));
      const docs = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setItem(docs);
    };
    getProducts();

  }, [id, cart]);

  return ( 
    item.map(item => 
       <div className="ItemDetail">
          <h1>{item.title}</h1>
            <img className="DetailImg" src={item.image} alt="Item"/>
            <p className="DescDetail">Description: {item.description}</p>
            <Link to={`/category/${item.category}`}> 
              <p>Category: {item.category}</p>
            </Link>
          <p>Price: {item.price}$</p>
          <Box
            sx={{
              color: 'action.active',
              display: 'flex',
              flexDirection: 'column',
              '& > *': {
                marginBottom: 2,
              },
              '& .MuiBadge-root': {
                marginRight: 4,
              },
            }}
          >
            <div>
              <Badge color="secondary" badgeContent={count}>
                <ShoppingCartIcon />
              </Badge>
              <ButtonGroup variant="contained">
                <Button 
                  color="error"
                  aria-label="reduce"
                  onClick={() => {
                    setCount(Math.max(count - 1, 1));
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button
                  color="success"
                  aria-label="increase"
                  onClick={() => {
                    setCount(count + 1);
                  }}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>
            </div>
            <div>
              <ButtonGroup variant="contained">
                <Button 
                  sx={{backgroundColor:"rgb(240, 109, 6)"}}
                  onClick={() => addCart(count, cart, item.price ,id)}
                >
                Agregar
              </Button>
              </ButtonGroup>  
            </div>
          </Box> 
      </div>
      )
    
    )
   
};

export default ItemDetail;





