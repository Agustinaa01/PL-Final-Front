import React from "react";
import "./Headers.css";
import { useNavigate } from "react-router";
import ToggleTheme from "../toggleTheme/ToggleTheme";
import carritoImage from "./carrito.png"; // Reemplaza con la ruta correcta de tu imagen

const Headers = () => {
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate("/login");
  };
  const handlerProducts= () => {
    navigate("/products");
  };
  const handlerHome= () => {
    navigate("/home");
  };
  const handlerAboutUs = () => {
    navigate("/nosotros");
  };
  return (
    <div className="header">
      <div className="container">
        <div className="header">
          <div className="left">
            <h2 className="home" onClick={handlerHome}>EvoTech</h2>
          </div>
          <div className="right">
          <ToggleTheme/>

            <h2 className="title" onClick={handlerProducts}>PRODUCTOS</h2>
            <h2 className="title" onClick={handlerAboutUs}>NOSOTROS</h2>
            <img className="carrito" src={carritoImage} alt="Carrito de compras" />
            <button className="boton"  onClick={goBackHandler}>CERRAR SESIÓN</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headers;
