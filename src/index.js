import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthenticationContextProvider } from "./components/services/authentication/AuthenticationContext";
import ThemeContextProvider from "./components/services/theme/ThemeContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from "./components/carrito/CartContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
      <AuthenticationContextProvider>
        <ThemeContextProvider>
          <App />
          <ToastContainer />
        </ThemeContextProvider>
      </AuthenticationContextProvider>
    </CartProvider>
  </React.StrictMode>
);
