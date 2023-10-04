import React from "react";
import Headers from "../header/Headers";
import homeImage from "./homeA.png";
import "./Dashboard.css";
import Footer from "../Footer/footer";

const Dashboard = () => {
  return (
      <div className="content">
      <Headers />
        <div className="dashboard">
          <img className="img-prom" src={homeImage} alt="Imagen Home" />
          <button className="button-on-image">Ver producto</button>
        </div>
        <Footer />
      </div>
  );
};

export default Dashboard;
