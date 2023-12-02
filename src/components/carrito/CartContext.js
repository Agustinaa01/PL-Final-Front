// CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <CartContext.Provider value={{ carrito, setCarrito, showCart, setShowCart, showModal, openModal, closeModal }}>
      {children}
    </CartContext.Provider>
  );
};
