import React, { useRef, useState } from "react";
import "./Register.css";


const RegisterForm = () => {
  // estados para el correo electrónico y la contraseña
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const emailRef= useRef(null);
  const passwordRef = useRef(null);

  const handleEmailChange = (event) => {
    emailRef.current.style.borderColor = '';
    emailRef.current.style.outline = '';
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    emailRef.current.style.borderColor = '';
    emailRef.current.style.outline = '';
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    passwordRef.current.style.borderColor = '';
    passwordRef.current.style.outline = '';
    setPassword(event.target.value);
  };

  
    const handleRegisterClick = () => {
      if (emailRef.current.value.length === 0 || passwordRef.current.value.length === 0) {
        emailRef.current.focus();
        emailRef.current.style.borderColor = 'red';
        emailRef.current.style.outline = '';
        alert("Completa todos los campos")
        return;
      }   
    };

  

  return (
    <div className="register">
      <div className="register-box">
        <h2>Registrarse</h2>
        <div className="input-container">
        <input
            onChange={handleNameChange}
            placeholder="Nombre"
            type="name"
          /><br></br>
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
            value="password"
            ref={passwordRef}
          />
        </div><br></br>
        <div className="input-button">
        <button
          onClick={handleRegisterClick}
          className="signin-button"
          type="button">
          Registrarse
        </button>
        </div>
      </div>
      </div>
  );
}

export default RegisterForm;
