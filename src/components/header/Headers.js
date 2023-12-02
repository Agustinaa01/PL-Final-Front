import React, { useContext, useState } from "react";
import "./Headers.css";
import { useNavigate } from "react-router";
import ToggleTheme from "../toggleTheme/ToggleTheme";
import carritoImage from "./carrito.png";
import { ThemeContext } from "../services/theme/ThemeContext";
import { AuthenticationContext } from "../services/authentication/AuthenticationContext";
import ProfileSidebar from "../ProfileSideBar/ProfileSideBar";
import profile from "./profile.png";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { CartContext } from "../carrito/CartContext";

const Headers = () => {
  const navigate = useNavigate();

  const { showModal, setShowModal, showCart, setShowCart, openModal } = useContext(CartContext);
  const abrirCarrito = () => {
    setShowCart(true);
  };
  const abrirModalDesdeHeaders = () => {
    openModal();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthenticationContext);

  let decodedToken;
  const token = localStorage.getItem("authToken");
  if (typeof token === "string") {
    decodedToken = jwt_decode(token);
  }

  const handlerProducts = () => {
    navigate("/products");
  };

  const handlerHome = () => {
    navigate("/home");
  };

  const handlerAboutUs = () => {
    navigate("/nosotros");
  };

  const handlerPedidos = () => {
    navigate("/pedidos");
  };

  const handlerUsers = () => {
    navigate("/users");
  };

  const handlerCart = () => {
    navigate("/carrito");
  };

  // Accede al contexto de tema
  const { theme } = useContext(ThemeContext);

  // Determina si el tema es "light"
  const isLightTheme = theme === "light";

  // Define la clase CSS para el texto en función del tema
  const textClass = isLightTheme ? "light-text" : "dark-text";

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
            {decodedToken && (decodedToken.role === "SuperAdmin" || decodedToken.role === "User") && user && (
              <h2 className={`title ${textClass}`} onClick={handlerPedidos}>
                PEDIDOS
              </h2>
            )}
            {decodedToken && (decodedToken.role === "SuperAdmin") && user && (
              <h2 className={`title ${textClass}`} onClick={handlerUsers}>
                PANEL
              </h2>
            )}
            <h2 className={`title ${textClass}`} onClick={handlerAboutUs}>
              NOSOTROS
            </h2>
            {isModalOpen && <ProfileSidebar setIsModalOpen={setIsModalOpen} />}
            <img
               onClick={abrirCarrito}
              className="carrito"
              src={carritoImage}
              alt="Carrito de compras"
              onClick={handlerCart} // Agrega el manejador de clic al icono de carrito
            />
            <img
              className="carrito"
              src={profile}
              alt="perfil"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headers;
