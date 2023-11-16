import React, { useContext, useRef, useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../services/authentication/AuthenticationContext";

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

    // Send a fetch request to your backend for login
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else {
          throw new Error("La respuesta tuvo algunos errores");
        }
      })
      .then((data) => {
        // Assuming your backend returns a token or user info on successful login
        // You need to handle the login logic on the frontend based on the response
        handleLogin(data);
        setError(null);
        navigate("/home");
      })
      .catch((error) => console.log(error));
  };

  const handleRegister = () => {
    navigate("/register");
  };

  useEffect(() => {
    fetch("http://localhost:8080/usr", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        else {
          throw new Error("La respuesta tuvo algunos errores");
        }
      })
      .then((data) => {
        // Assuming you want to do something with the fetched data
        // Set the fetched data to state or perform any necessary actions
      })
      .catch((error) => console.log(error));
  }, []);

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