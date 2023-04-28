import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import "./ItemDetail.css";
import { useParams } from "react-router-dom";
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


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const ItemDetail = () => {

  const { cart } = useContext(CartContext);
  const [count, setCount] = useState(1);
  const [item, setItem] = useState([]);
  const [ msg, setMsg] =  useState('');
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

    setMsg('add');

    setTimeout(() => {
      window.location.reload(false);
    }, 3000);
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
          <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                  {item.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Precio: ${item.price}
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                sx={{ width: 500 }}
                image={item.image}
                alt="Image"
              />
              <Typography  className="DescDetail" component="div" variant="h6">
                {item.description}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 5, pt: 4 }}>
                <IconButton aria-label="previous">
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
                  </ButtonGroup>   
                </IconButton>
                <IconButton aria-label="play/pause">
                    <Badge color="secondary" badgeContent={count}>
                      <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <IconButton aria-label="next">
                  <ButtonGroup variant="contained">
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
                </IconButton>
                <ButtonGroup variant="contained">
                    <Button 
                      sx={{backgroundColor:"rgb(240, 109, 6)"}}
                      onClick={() =>              
                        addCart(count, cart, item.price ,id)
                      }
                    >
                      Agregar
                    </Button>
                </ButtonGroup>  
               
              </Box>
            </Box>
          </Card>
          {msg === 'add' ? 
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert variant="filled" severity="success">
                Se agrego la cantidad indicada al carrito
              </Alert>
            </Stack>
          : null}
      </div>
      )
    
    )
   
};

export default ItemDetail;





