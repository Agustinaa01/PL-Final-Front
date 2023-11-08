import React, { useContext } from "react";
import "./aboutUs.css";
import Headers from "../header/Headers";
import AUImage from "./homeAu.png";
import { ThemeContext } from "../services/theme/ThemeContext";

const AboutUs = () => {

  const { theme } = useContext(ThemeContext);
  const isLightTheme = theme === "light";
  const textaboutUs = isLightTheme? "light-text": "dark-text"

  return (
    <div>
      <Headers />
      <div className="about-us-container">
        <div className="text-container">
          <h1 className={`h1 ${textaboutUs}`}>SOBRE NOSOTROS</h1>
          <p className={`p ${textaboutUs}`}>
            En nuestra empresa, nos enorgullece ofrecer una amplia gama de productos de informática, desde equipos y
            accesorios hasta soluciones innovadoras. Nuestra misión es brindar productos de alta calidad y un servicio excepcional a nuestros clientes. Contamos con un equipo de expertos en tecnología que está dedicado a brindar las soluciones más adecuadas para satisfacer las necesidades de nuestros clientes, ya sea para uso personal o empresarial.
          </p>
          <p className={`p ${textaboutUs}`}>
            Estamos comprometidos a mantenernos a la vanguardia de las últimas tendencias y avances en el mundo de la tecnología, para que nuestros clientes siempre tengan acceso a productos de última generación. Además, nos enorgullece ofrecer un servicio de atención al cliente de primera clase para brindar asistencia y soporte técnico en todo momento.
          </p>
        </div>
        <div className="image-container">
          <img src={AUImage} alt="About Us" className="about-image" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
