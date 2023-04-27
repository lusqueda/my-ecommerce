import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import {
  collection,
  query,
  getDocs,
  where,
  documentId,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const CartItem = ({id, total}) => {

  const { cart } = useContext(CartContext);
  const [item, setItem] = useState([]);

  const deleteItem = (cart, id) => {
		cart = cart.filter(item => item.id !== id);

    const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
    guardarLocal("cart", JSON.stringify(cart));

    window.location.reload(false);
	}

  useEffect(() => {  

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

  }, [id]);

  return (
    item.map(item => 
      <div>
        <Paper
          sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 500,
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase sx={{ width: 128, height: 128 }}>
                <Img alt="complex" src={item.image} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    CANTIDAD {total}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID: {id}
                  </Typography>
                </Grid>
                <Grid item>
                    <ButtonGroup variant="contained">
                      <Button color="error" onClick={()=> deleteItem(cart,id)}>
                        Eliminar
                      </Button>
                    </ButtonGroup> 
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" component="div">
                  ${item.price}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )  
  )
};

export default CartItem;