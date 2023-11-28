import React, { useContext, useState } from 'react';
import Headers from '../header/Headers';
import { ThemeContext } from '../services/theme/ThemeContext';

// Hook personalizado para manejar la lógica del contexto y temas
const useThemeContext = () => {
  const { theme } = useContext(ThemeContext);
  const isLightTheme = theme === "light";
  const textProduct = isLightTheme ? "light-form" : "dark-form";

  return { isLightTheme, textProduct };
};

const EditProfileForm = () => {
  // Estado para el nombre del usuario
  const [name, setName] = useState('');
  // Estado para el correo electrónico del usuario
  const [email, setEmail] = useState('');
  // Estado para la contraseña del usuario
  const [password, setPassword] = useState('');
  // Agregar más estados para otros campos del perfil

  // Estado para manejar mensajes de error
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
    // Manejar la acción de cancelar
  };

  // Manejador para el botón de editar perfil
  const handleEditClick = () => {
    // Validar los campos de entrada antes de actualizar el perfil
    if (!name.trim()) {
      setError({ ...error, nameError: 'El nombre es obligatorio' });
      return;
    }

    if (!email.trim()) {
      setError({ ...error, emailError: 'El correo electrónico es obligatorio' });
      return;
    }

    // Agregar más validaciones para otros campos del perfil

    // Realizar la acción de actualización
    // Llamar a una función para actualizar el perfil con los datos actualizados
  };

  return (
    <> 
     <Headers />
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
        {error.emailError && <p className="input-vacio">{error.emailError}</p>}

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

        {/* Agregar campos de entrada similares para otros campos del perfil */}

        <div className="add-button">
          <button
            className="button-cancelar"
            onClick={handleCancelClick}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="button-accept"
            onClick={handleEditClick}
            type="button"
          >
            Editar Perfil
          </button>
        </div>
      </div>
      </>
  );
};

export default EditProfileForm;
