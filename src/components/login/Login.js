import React, { useRef, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  // estados para el correo electrónico y la contraseña
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[error,setError] = useState(null);

  const emailRef= useRef(null);
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
        setError({...error, emailError: "Por favor complete el email"})
        isError = true;
      }  
      if(password.length === 0){
        passwordRef.current.focus();
        setError({...error, passwordError: "Por favor complete la contraseña"})
        isError = true;
      } 

      if(isError)
        return;

      alert("Todo bien!");
      setError(null)
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
          />
          {error?.emailError && <p className="input-vacio">{error.emailError}</p>}
          <br/>
          <input
            onChange={handlePasswordChange}
            placeholder="Password"
            type="password"
            ref={passwordRef}
          />
        </div>
        {error?.passwordError && <p className="input-vacio">{error.passwordError}</p>}
        <br />
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
