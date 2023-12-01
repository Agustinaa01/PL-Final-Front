import React, { useContext, useEffect, useState } from "react";
import "./ProfileSidebar.css";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { AuthenticationContext } from "../services/authentication/AuthenticationContext";
import { useLocation, useNavigate } from "react-router";
import imageProfile from "./profileInfo.png";
import { ThemeContext } from "../services/theme/ThemeContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileSidebar = ({ setIsModalOpen }) => {
  const location = useLocation();
  const [isuser, setUser] = useState(null);

  let decodedToken;
  const token = localStorage.getItem("authToken");
  if (typeof token === "string") {
    decodedToken = jwt_decode(token);
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (decodedToken) {
      fetch(`https://localhost:7108/api/Users/${decodedToken.sub}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  const onLogOutHandler = () => {
    localStorage.removeItem("authToken");
    handleLogOut();
    navigate("/login");
  };

  const handleEliminateProfile = (userId) => {
    fetch(`https://localhost:7108/api/Users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        handleLogOut();
        toast.success("¡User eliminado!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const goBackHandler = () => {
    navigate("/login");
  };

  const handleEditClick = () => {
    if (isuser && isuser.id) {
      navigate(`/editarPerfil/${isuser.id}`, {
        state: { UserSelected: isuser },
      });
    } else {
      // Manejar el caso en que isuser.id no exista
      console.error("ID del usuario no encontrado en isuser.");
    }
  };
  

  const { user, handleLogOut } = useContext(AuthenticationContext);
  const { theme } =useContext(ThemeContext);
  const isLightTheme = theme === "light";
  const profileBackground = isLightTheme ? "light-profile" : "dark-profile";
  const profileButton = isLightTheme ? "light-profile-button" : "dark-profile-button";

  return (
    <div className={`${profileBackground}`}>
      <button
        className={`${profileButton}`}
        onClick={() => setIsModalOpen(false)}
      >
        X
      </button>
      {user && isuser &&(
        <div className="slidebar-info">
          <h1 className="profile">Perfil</h1>
          <img
            className="product-images"
            src={imageProfile}
            alt="imagen perfil"
          />
          <h2 className="name-profile">Nombre: {isuser.name}</h2>
          <p className="email-profile">Email: {isuser.email}</p>
        </div>
      )}
      <div className="botones-perfil">
        {user && (
          <>
            <button className="button-editar" onClick={ () => handleEditClick(isuser.id)}>Editar</button>
            <button className="button-eliminar" onClick={() => handleEliminateProfile(isuser.id)}>Eliminar</button>
          </>
        )}
      </div>
      {user ? (
        <button className="boton" onClick={onLogOutHandler}>
          CERRAR SESIÓN
        </button>
      ) : (
        <button className="boton" onClick={goBackHandler}>
          INICIAR SESIÓN
        </button>
      )}
    </div>
  );
};

export default ProfileSidebar;