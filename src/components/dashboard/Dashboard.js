import React from "react";
import Headers from "../header/Headers";
import Footer from "../Footer/footer";
import homeImage from "./homeA.png";
import AboutImage from "./homeAu.png";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div>
      <Headers />
      <div className="dashboard">
        <div className="image-container">
          <img className="img-prom" src={homeImage} alt="Imagen Home" />
          <button className="button-on-image">Ver producto</button>
        </div>
        <div className="about-us-container">
          <img className="img-about" src={AboutImage} alt="About Us" />
          <p className="texto-about">
            ABOUT US<br></br> Ofrecemos una amplia gama de productos de informática, desde equipos y accesorios hasta soluciones innovadoras. Nuestra misión es brindar productos de alta calidad.
          </p>
        </div>
      </div>
      <Footer /> 
    </div>
  );
};

export default Dashboard;
