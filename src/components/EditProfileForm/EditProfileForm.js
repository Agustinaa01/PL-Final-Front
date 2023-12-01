
import Headers from '../header/Headers';
import { ThemeContext } from '../services/theme/ThemeContext';
import { useLocation, useNavigate } from 'react-router';
import { toast } from "react-toastify";
import fotoEditar from "./fotoEditar.jpg";
import "./EditProfileForm.css"
import React, { useContext, useState } from 'react';

const EditProfileForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [id, setid] = useState(
    location.state?.UserSelected.id ?? ""
  );
  // Estado para el nombre del usuario
  const [name, setName] = useState(
    location.state?.UserSelected?.name ?? ""
  );
  // Estado para el correo electrónico del usuario
  const [email, setEmail] = useState(
    location.state?.UserSelected.email ?? ""
  );
  // Estado para la contraseña del usuario
  const [password, setPassword] = useState(
    location.state?.UserSelected.password ?? ""
  );

  const [error, setError] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
  });


  // Manejador para cambios en el nombre
  const handleNameChange = (e) => {
    setName(e.target.value);
    setError({ ...error, nameError: '' });
  };

  // Manejador para cambios en el correo electrónico
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError({ ...error, emailError: '' });
  };

  // Manejador para cambios en la contraseña
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError({ ...error, passwordError: '' });
  };

  // Agregar manejadores similares para otros campos del perfil

  // Manejador para el botón de cancelar
  const handleCancelClick = () => {
    navigate(-1);
  };

  const handleEditClick = (id) => {
    if (!name.trim()) {
      setError({ ...error, nameError: 'El nombre es obligatorio' });
      return;
    }

    if (!email.trim()) {
      setError({ ...error, emailError: 'El correo electrónico es obligatorio' });
      return;
    }

    fetch(`https://localhost:7108/api/Users/${id}`, {
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id,
    name,
    email,
    password
  })
}).then(response => {
  if (response.ok) {
    toast.success("¡Usuario actualizado!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
    setTimeout(() => {
      navigate("/products");
    }, 2000);
  } else {
    toast.error('Ocurrió un error. Por favor, inténtelo de nuevo.', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  }
}).catch(error => {
  toast.error('Ocurrió un error de red. Por favor, inténtelo de nuevo.', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
  });
});
};
const { theme } = useContext(ThemeContext);
const isLightTheme = theme === "light";
const textProfile = isLightTheme ? "light-form-profile" : "dark-form-profile";

     return (
      <>
        <Headers />
        <div className="page">
          <div className={`${textProfile}`}>
            <div className="container-imag">
              <img
                className="img"
                src={fotoEditar}
                alt="Descripción de la imagen"
              />
            </div>
            <div className="container">
              <h2 className="add">Editar Perfil</h2>
              <label className="label-input">Nombre</label>
              <input
                className="input"
                onChange={handleNameChange}
                value={name}
                type="text"
              />
              {error.nameError && <p className="input-vacio">{error.nameError}</p>}
    
              <label className="label-input">Email</label>
              <input
                className="input"
                onChange={handleEmailChange}
                value={email}
                type="email"
              />
              {error.emailError && (
                <p className="input-vacio">{error.emailError}</p>
              )}
    
              <label className="label-input">Contraseña</label>
              <input
                className="input"
                onChange={handlePasswordChange}
                value={password}
                type="password"
              />
              {error.passwordError && (
                <p className="input-vacio">{error.passwordError}</p>
              )}
  


          <div className="add-button-profile">
            <button
              className="button-cancelar"
              onClick={handleCancelClick}
              type="button"
            >
              Cancelar
            </button>
            <button
              className="button-accept"
              onClick={() => handleEditClick(id)}
              type="button"
            >
              Editar Perfil
            </button>
            </div>
          </div>
          </div>
        </div>
      </>
    );
    
};

export default EditProfileForm;
