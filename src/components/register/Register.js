import React, { useRef, useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  // Estados para el correo electrónico, contraseña, celular y nombre
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  // Referencias a elementos de entrada
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const navigate = useNavigate();

  // Expresiones regulares para validar el correo electrónico, el número de celular y la contraseña
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegisterClick = () => {
    let isError = false;
    if (name.length === 0) {
      nameRef.current.focus();
      setError({nameError: "Por favor complete el nombre" });
      isError = true;
      return;
    }
    
    if (email.length === 0 || !emailRegex.test(email)) {
      emailRef.current.focus();
      setError({emailError: "Por favor, ingrese un correo electrónico válido" });
      isError = true;
      return;
    }

    if (password.length === 0 || !passwordRegex.test(password)) {
      passwordRef.current.focus();
      setError({passwordError: "La contraseña debe tener al menos 8 caracteres, incluyendo letras y números" });
      isError = true;
      return;
    }

    if (isError) {
      return;
    }

    fetch("https://localhost:7108/api/Users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    })
     .then((response) => {  
    if (!response.ok) {
      throw new Error(`La respuesta tuvo algunos errores: ${response.statusText}`);
    }
    return response.json();
  })
    .then((data) => {
        console.log(data); 
        navigate("/login");      
  })
  .catch((error) => console.log(error.message));
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="register">
      <div className="register-box">
        <h2>Registrarse</h2>
        <div className="input-container-register" noValidate>
          <input
            onChange={handleNameChange}
            placeholder="Nombre"
            type="name"
            ref={nameRef}
          />
          {error?.nameError && <p className="input-vacio">{error.nameError}</p>}
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
        {error?.passwordError && <p className="input-vacio">{error.passwordError}</p>}
        </div>
        <br />
        <div className="input-button">
          <button
            onClick={handleRegisterClick}
            className="signin-button-register"
            type="button"
          >
            Registrarse
          </button>
          </div>
          <h4 className="signup-button-register" onClick={handleLogin}>
            ¿Ya tienes cuenta? Inicia Sesión
          </h4>
      </div>
    </div>
  );
};

export default RegisterForm;
