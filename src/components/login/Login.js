import React, { useRef, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  // estados para el correo electrónico y la contraseña
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef= useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
 
  // Manejadores de eventos para actualizar los estados
  const handleEmailChange = (event) => {
    emailRef.current.style.borderColor = '';
    emailRef.current.style.outline = '';
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    passwordRef.current.style.borderColor = '';
    passwordRef.current.style.outline = '';
    setPassword(event.target.value);
  };

  
    const handleLoginClick = () => {
      if (emailRef.current.value.length === 0 || passwordRef.current.value.length === 0) {
        emailRef.current.focus();
        emailRef.current.style.borderColor = 'red';
        emailRef.current.style.outline = '';
        alert("Completa todos los campos")
        return;
      }   
    };

    const handleRegister = () => {
      navigate("/register")
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
          /><br></br>
          <input
            onChange={handlePasswordChange}
            placeholder="Password"
            type="password"
            ref={passwordRef}
          />
        </div><br></br>
        <div className="input-button">
        <button
          onClick={handleLoginClick}
          className="signin-button"
          type="button">
          Iniciar sesión
        </button>
        <h4 className="signup-button" onClick={handleRegister} >¿No tenes cuenta? Registrarse</h4>
        </div>
      </div>
      </div>
  );
}

export default LoginForm;
