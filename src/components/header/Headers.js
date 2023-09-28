import React from "react";
import "./Headers.css";
import carritoImage from "./carrito.png"; // Reemplaza con la ruta correcta de tu imagen

const Headers = () => {
  return (
    <div>
      <div className="container">
        <div className="header">
          <div className="left">
            <h2>TI</h2>
          </div>
          <div className="right">
            <h2 className="title">HOME</h2>
            <h2 className="title">PRODUCTOS</h2>
            <img className="carrito" src={carritoImage} alt="Carrito de compras" />
            <button className="boton">CERRAR SESIÓN</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headers;
