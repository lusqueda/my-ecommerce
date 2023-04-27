import { createContext, useState, useEffect} from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);
 
  const itemsCart = (cart) => {
		return cart.reduce((prev, next) => prev + next.total, 0)
	}
    
  const amountCart = (cart) => {
		return cart.reduce((prev, next) => (prev + (next.price * next.total)), 0)
	}

  return  <CartContext.Provider value={{ cart , setCart, itemsCart , amountCart }} >{children}</CartContext.Provider > ;
    
};

