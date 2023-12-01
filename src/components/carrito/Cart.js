import React, { useContext } from 'react';
import { CartContext } from '../carrito/CartContext';

const Cart = () => {
  const [carrito] = useContext(CartContext);

  return (
    <>
      <h2>Carrito de Compras</h2>
      <ul>
        {carrito.map((producto, index) => (
          <li key={index}>{producto.name} - ${producto.price}</li>
        ))}
      </ul>
    </>
  );
};

export default Cart;
