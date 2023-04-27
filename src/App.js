import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// COMPONENTS
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

// PAGES
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";
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
      <Router>  
          <Header
            title="e-Commerce"
            subTitle="Multi Brand"
          />
          <NavBar count = {total}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/:category" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/item-detail/:id" element={<ItemDetail />} />
          </Routes>
          <Footer />
      </Router>
    </div>
 
   );
}


export default App;
