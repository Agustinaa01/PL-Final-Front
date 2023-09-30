import React from "react";
import Headers from "../header/Headers";
import homeImage from "./pad.png"; 
import AboutImage from "./auri.png"; 

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
          <h4 className="about-us">About us</h4>
          <p className="texto-about">
            Somos apasionados de la tecnología. Ofrecemos una amplia gama de
            productos de informática, desde equipos y accesorios hasta soluciones
            innovadoras. Nuestra misión es brindar productos de alta calidad y un
            servicio al cliente excepcional. ¡Únete a nosotros y descubre la mejor
            experiencia en artículos de informática!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
