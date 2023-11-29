import React, { useContext, useRef, useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../services/authentication/AuthenticationContext";
import { ToastContainer, toast } from 'react-toastify';

const LoginForm = () => {
  const { handleLogin } = useContext(AuthenticationContext);

  // estados para el correo electrónico y la contraseña
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  // Manejadores de eventos para actualizar los estados
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginClick = () => {
    let isError = false;
    if (email.length === 0) {
      emailRef.current.focus();
      setError({ emailError: "Por favor complete el email" });
      isError = true;
    }
    if (password.length === 0) {
      passwordRef.current.focus();
      setError({ passwordError: "Por favor complete la contraseña" });
      isError = true;
    }

    if (isError) return;

    fetch("https://localhost:7108/api/authentication/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
     .then((response) => {
    if (!response.ok) {
      toast.error('Error al iniciar sesión. Verifica tu correo electrónico y contraseña.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      throw new Error(`La respuesta tuvo algunos errores: ${response.statusText}`);
    }
    return response.text();
  })
    .then((data) => {
        const token = data;
        handleToken(token);
        setError(null);
        navigate("/home");      
  })
  .catch((error) => console.log(error.message));
  };

const handleToken = (token) => {
  localStorage.setItem("authToken", token);
  handleLogin(token);
};

  const handleRegister = () => {
    navigate("/register");
  };
  

  return (
    <div className="login">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <div className="input-container">
          <input
            onChange={handleEmailChange}
            placeholder="Email"
            type="email"
            ref={emailRef}
          />
          {error?.emailError && (
            <p className="input-vacio">{error.emailError}</p>
          )}
          <br />
          <input
            onChange={handlePasswordChange}
            placeholder="Password"
            type="password"
            ref={passwordRef}
          />
        </div>
        {error?.passwordError && (
          <p className="input-vacio">{error.passwordError}</p>
        )}
        <br />
        <div className="input-button">
          <button
            onClick={handleLoginClick}
            className="signin-button-login"
            type="button"
          >
            Iniciar sesión
          </button>
        </div>
        <h4 className="signup-button-login" onClick={handleRegister}>
          ¿No tienes cuenta? Registrarse
        </h4>
      </div>
    </div>
  );
};

export default LoginForm;