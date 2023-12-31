import React, { useContext } from "react";
import "./footer.css";
import facebookImage from "./facebook.png"; 
import twitterImage from "./x.png"; 
import whatsappImage from "./whatsapp.png"; 
import instagramImage from "./instagram.png"; 
import telegramImage from "./telegram.png"; 
import { ThemeContext } from "../services/theme/ThemeContext";

const Footer = () => {
  const { theme } =useContext(ThemeContext);
  const isLightTheme = theme === "light";
  const footer = isLightTheme ? "light-footer" : "dark-footer";
  return (
    <div className={`${footer}`}>
      <a href="https://www.facebook.com"><img src={facebookImage} alt="Facebook" /></a>
      <a href="https://www.twitter.com"><img src={twitterImage} alt="Twitter" /></a>
      <a href="https://www.whatsapp.com"><img src={whatsappImage} alt="WhatsApp" /></a>
      <a href="https://www.instagram.com"><img src={instagramImage} alt="Instagram" /></a>
      <a href="https://www.telegram.com"><img src={telegramImage} alt="Telegram" /></a>
      <p className="copy-text">Copyright © 2023 EvoTech. Todos los derechos reservados.</p>
    </div>
  );
};

export default Footer;