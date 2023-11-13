import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthenticationContextProvider } from "./components/services/authentication/AuthenticationContext";
import ThemeContextProvider from "./components/services/theme/ThemeContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
<AuthenticationContextProvider>
    <ThemeContextProvider>
    <App />
    <ToastContainer />
    </ThemeContextProvider>
    </AuthenticationContextProvider>
  </React.StrictMode>
);
