import React, { useRef, useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  // Estados para el correo electrónico, contraseña, celular y nombre
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [celular, setCelular] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  // Referencias a elementos de entrada
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const celularRef = useRef(null);

  // Expresiones regulares para validar el correo electrónico, el número de celular y la contraseña
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const celularRegex = /^[0-9]{10}$/; // Supongo que el número de celular tiene 10 dígitos.
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCelularChange = (event) => {
    setCelular(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegisterClick = () => {
    let isError = false;
    
    if (email.length === 0 || !emailRegex.test(email)) {
      emailRef.current.focus();
      setError({ ...error, emailError: "Por favor, ingrese un correo electrónico válido" });
      isError = true;
    }

    if (password.length === 0 || !passwordRegex.test(password)) {
      passwordRef.current.focus();
      setError({ ...error, passwordError: "La contraseña debe tener al menos 8 caracteres, incluyendo letras y números" });
      isError = true;
    }

    if (name.length === 0) {
      nameRef.current.focus();
      setError({ ...error, nameError: "Por favor complete el nombre" });
      isError = true;
    }

    if (celular.length === 0 || !celularRegex.test(celular)) {
      celularRef.current.focus();
      setError({ ...error, celularError: "Por favor, ingrese un número de celular válido" });
      isError = true;
    }

    if (isError) {
      return;
    }

    alert("Todo bien!");
    setError(null);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="register">
      <div className="register-box">
        <h2>Registrarse</h2>
        <div className="input-container">
          <input
            onChange={handleNameChange}
            placeholder="Nombre"
            type="text"
            ref={nameRef}
          />
          {error?.nameError && <p className="input-vacio">{error.nameError}</p>}
          <br />
          <input
            onChange={handleCelularChange}
            placeholder="Celular"
            type="text"
            ref={celularRef}
          />
          {error?.celularError && <p className="input-vacio">{error.celularError}</p>}
          <br />
          <input
            onChange={handleEmailChange}
            placeholder="Email"
            type="email"
            ref={emailRef}
          />
          {error?.emailError && <p className="input-vacio">{error.emailError}</p>}
          <br />
          <input
            onChange={handlePasswordChange}
            placeholder="Password"
            type="password"
            ref={passwordRef}
          />
        </div>
        {error?.passwordError && <p className="password-vacio">{error.passwordError}</p>}
        <br />
        <div className="input-button">
          <button
            onClick={handleRegisterClick}
            className="signin-button"
            type="button"
          >
            Registrarse
          </button>
          <h4 className="signup-button" onClick={handleLogin}>
            ¿Ya tienes cuenta? Inicia Sesión
          </h4>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
