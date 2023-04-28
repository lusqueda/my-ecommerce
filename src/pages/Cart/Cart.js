import React, { useContext, useState } from "react";
import Paper from '@mui/material/Paper';
import { CartContext } from "../../contexts/CartContext";
import CartItem from "../../components/CartItem/CartItem";
import CartTotals from "../../components/CartTotals/CartTotals";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

//DIALOG
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Draggable from 'react-draggable';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

//FORMIK
import { Formik } from "formik";
import * as yup from 'yup';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const formSchema = yup.object({
  name: yup.string().min(3,'La cantidad minima de caracteres es 3').max(70).required('El Campo Nombres no puede ser vacio'),
  lastname: yup.string().min(3,'La cantidad minima de caracteres es 3').max(70).required('El Campo Apellidos no puede ser vacio'),
  street: yup.string().min(3,'La cantidad minima de caracteres es 3').max(100).required('El Campo Direccion no puede ser vacio'),
  email: yup.string().email('El Email debe ser valido').required('El Campo E-mail no puede ser vacio'),
  emailconfirm: yup.string().oneOf([yup.ref("email"), null], "Los Emails no coinciden").required('El Campo E-mail no puede ser vacio')
})

const initialValues = {
  name:"",
  lastname:"",
  street:"",
  email:"",
  emailconfirm:"",
}

const Cart = () => {

    const [purchaseID, setPurchaseID] = useState("");
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const { cart, itemsCart, amountCart } = useContext(CartContext);
    const [ order ] = useState([]);

    const submitHandler = (values, resetForm) => {
      const setOrder = async () => {
        order.push({name:values.name, lastname: values.lastname, street: values.street, email: values.email, cart: cart }); 
        const docRef = await addDoc(collection(db, "orders"), {
          order,
        });
        setPurchaseID(docRef.id);
        resetForm()
        localStorage.removeItem('cart');
        
      };
      setOrder();
      setTimeout(() => {
        window.location.reload(false);
      }, 5000);
    };
    

    return (
    <div style={{border: '10px solid rgb(179, 179, 177)', width: '99%', borderRadius: '25px', padding: 20 }}>
      <h1>CART</h1>
      <Paper
      sx={{
        p: 4,
        margin: 'auto',
        maxWidth: 500,
        flexDirection: 'column',
        flexGrow: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
      >
      {Object.entries(cart).map(([key,value]) =>
        <div key={key}>
          <Link to={`/item-detail/${value.id}`}>
            <CartItem id = {value.id} total = {value.total} />
          </Link>  
        </div>  
      )}

      {cart.length ? 
        <CartTotals items = {itemsCart(cart)} amount = {amountCart(cart)}  />
      : null}

      {purchaseID.length ? 
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="success">
            Se realizo la compra con exito — Pedido ID: {purchaseID}
          </Alert>
        </Stack>
      : null}
        
      {cart.length ? 
        <ButtonGroup variant="contained" sx={{mt: '4vh'}} onClick={handleClickOpen}>
          <Button  sx={{backgroundColor:"rgb(240, 109, 6)"}} >Comprar</Button>
        </ButtonGroup> 
      : null}
      </Paper>
      <div>
        <Formik 
        initialValues={{initialValues}}
        onSubmit={(values, {resetForm}) => submitHandler(values, resetForm)}
        validationSchema={formSchema}
        >
          {({ 
            values, 
            errors, 
            touched, 
            handleChange, 
            handleSubmit, 
            isValid, 
            dirty
          }) => (         
            <Dialog
              open={open}
              onClose={handleClose}
              PaperComponent={PaperComponent}
              aria-labelledby="draggable-dialog-title"
              component="span"
            >
              <DialogTitle component="span" style={{ cursor: 'move' }} id="draggable-dialog-title">
                Formulario de Pago
              </DialogTitle>
              <DialogContent component="span">
                <DialogContentText component="span">
                  <Box
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '55ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <form onSubmit={handleSubmit} >  
                      <TextField 
                        name="name" 
                        label="Nombres" 
                        value={values.name}
                        onChange={handleChange}
                      />
                      {errors.name && <div style={{ color: 'red', marginLeft: '8px' }}>{errors.name}</div>}
                      <TextField 
                        required 
                        name="lastname" 
                        label="Apellidos" 
                        value={values.lastname}
                        onChange={handleChange}
                      />
                      {errors.lastname && <div style={{ color: 'red', marginLeft: '8px' }}>{errors.lastname}</div>}                      
                      <TextField 
                        required 
                        name="street" 
                        label="Direccion" 
                        value={values.street}
                        onChange={handleChange}
                        />
                      {errors.street && <div style={{ color: 'red', marginLeft: '8px' }}>{errors.street}</div>}
                      <TextField 
                        required 
                        name="email" 
                        label="E-mail" 
                        value={values.email}
                        onChange={handleChange}
                      />
                      {errors.email && <div style={{ color: 'red', marginLeft: '8px' }}>{errors.email}</div>}
                      <TextField 
                        required 
                        name="emailconfirm" 
                        label="Confirmar E-mail" 
                        value={values.emailconfirm}
                        onChange={handleChange}
                      />
                      {errors.emailconfirm && <div style={{ color: 'red', marginLeft: '8px' }}>{errors.emailconfirm}</div>}
                      <DialogActions >
                        <ButtonGroup variant="contained">
                          <Button 
                            onClick={handleClose}>
                            Cancelar
                          </Button>
                          <Button 
                            type="submit" 
                            autoFocus 
                            onClick={handleClose} 
                            disabled={!(isValid && dirty)}
                          >
                            Pagar
                          </Button>
                        </ButtonGroup> 
                      </DialogActions>
                    </form>
                  </Box>
                </DialogContentText>
              </DialogContent>
            </Dialog>
          )}
        </Formik>    
      </div>
    </div>
  );
};

export default Cart;