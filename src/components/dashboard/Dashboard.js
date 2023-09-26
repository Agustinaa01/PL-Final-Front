import React from "react";

import Products from "../products/Products";
import Headers from "../header/Headers";

import "./Dashboard.css"; // Importa tu archivo CSS donde definirás los estilos


const Dashboard = () => {
  return (
    <div>
      <Headers />
      <Products />
    </div>
  );
};

export default Dashboard;