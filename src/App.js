import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container'

// COMPONENTS
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// PAGES
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";
import ItemDetail from "./components/ItemDetail/ItemDetail";

//CONTEXT
import { CartContext } from "./contexts/CartContext";

const  App = () => {

   const { cart, itemsCart } = useContext(CartContext);
   const [total, setTotal] = useState(0);   

   useEffect(() => {
    setTotal(itemsCart(cart));
    }, [itemsCart,cart]);  
  
   return (  
    <div className="App">
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth='xl'sx={{pt:3, pb:3, borderRadius: '25px'}} fixed disableGutters >
          <Router>  
            <NavBar count = {total}/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/home/:category" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/item-detail/:id" element={<ItemDetail />} />
            </Routes>
            <Footer />
        </Router>
        </Container>
      </React.Fragment>
    </div>
 
   );
}

export default App;
