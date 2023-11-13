import React, { useContext } from "react";
import "./Headers.css";
import { useNavigate } from "react-router";
import ToggleTheme from "../toggleTheme/ToggleTheme";
import carritoImage from "./carrito.png";
import { ThemeContext } from "../services/theme/ThemeContext"; 
import { AuthenticationContext } from "../services/authentication/AuthenticationContext";

const Headers = () => {
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate("/login");
  };
  const handlerProducts = () => {
    navigate("/products");
  };
  const handlerHome = () => {
    navigate("/home");
  };
  const handlerAboutUs = () => {
    navigate("/nosotros");
  };

  // Accede al contexto de tema
  const { theme } = useContext(ThemeContext);

  // Determina si el tema es "light"
  const isLightTheme = theme === "light";

  // Define la clase CSS para el texto en función del tema
  const textClass = isLightTheme ? "light-text" : "dark-text";
  const {user, handleLogOut}= useContext(AuthenticationContext);
  // const username = user.email.split("@")[0];

  const onLogOutHandler = () => {
    handleLogOut();
    navigate("/login");
  }
  return (
    <div className="header">
      <div className="container">
        <div className="header">
          <div className="left">
            <h2 className={`home ${textClass}`} onClick={handlerHome}>
              EvoTech
            </h2>
          </div>
          <div className="right">
            <ToggleTheme />

            <h2 className={`title ${textClass}`} onClick={handlerProducts}>
              PRODUCTOS
            </h2>
            <h2 className={`title ${textClass}`} onClick={handlerAboutUs}>
              NOSOTROS
            </h2>
            <img className="carrito" src={carritoImage} alt="Carrito de compras" />
            {user ? (
              <button className="boton" onClick={onLogOutHandler}>
                CERRAR SESIÓN
              </button>
            ) : (
              <button className="boton" onClick={goBackHandler}>
                INICIAR SESIÓN
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headers;
