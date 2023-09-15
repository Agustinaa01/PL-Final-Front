import React, { useRef, useState } from "react";
import "./Login.css";


const LoginForm = () => {
  // estados para el correo electrónico y la contraseña
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const emailRef= useRef(null);
  const passwordRef = useRef(null);

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

  // Manejador de evento para mostrar la alerta con los valores ingresados
    const handleLoginClick = () => {
      if (emailRef.current.value.length === 0) {
        emailRef.current.focus();
        emailRef.current.style.borderColor = 'red';
        emailRef.current.style.outline = 'none';
        return;
      }
      if (passwordRef.current.value.length === 0) {
        passwordRef.current.focus();
        passwordRef.current.style.borderColor = 'red';
        passwordRef.current.style.outline = 'none';
        return;
      }   
      alert( `El email ingresado es: ${email} y el password es: ${password}`);
    };

  

  return (
    <div className="login-container">
      <div className="login-box">
        <h4>Iniciar Sesión</h4>
        <div className="input-container">
          <input
            className="input-control"
            onChange={handleEmailChange}
            placeholder="Email"
            type="email"
            ref={emailRef}
          />
          <input
            className="input-control"
            onChange={handlePasswordChange}
            placeholder="Password"
            type="password"
            ref={passwordRef}
          />
        </div>
        <button
          onClick={handleLoginClick}
          className="signin-button"
          type="button">
          Iniciar sesión
        </button>
      </div>
      <div className="image-background">
      {/* Coloca aquí tu imagen de fondo */}
    </div>
    </div>
  );
}

export default LoginForm;
