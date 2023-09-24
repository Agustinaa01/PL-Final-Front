import React from "react";

import Products from "../products/Products";

import "./Dashboard.css"; // Importa tu archivo CSS donde definirás los estilos


const Dashboard = () => {
  return (
    <div>

      <h4>este es el dashboard</h4>
      <Products />

      <div className="container">
        <div className="header">
          <div className="left">
            <h2>TI</h2>
          </div>
          <div className="right">
            <h2>HOME</h2>
            <h2>ABOUT US</h2>
            <h2>ARTICULOS</h2>
            <button className="boton">CERRAR SESION</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;