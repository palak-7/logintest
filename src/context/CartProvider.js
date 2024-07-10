// CartContext.js
"use client";
import React, { useEffect, useState } from "react";
import CartContext from "./CartContext";
import { currentUser } from "../services/user";
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    async function load() {
      try {
        const authToken = localStorage.getItem("authToken");
        const logUser = await currentUser(authToken);
        const cartArray = JSON.parse(logUser.cart);
        setCart(cartArray.length);
      } catch (error) {
        setCart(0);
      }
    }
    load();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
