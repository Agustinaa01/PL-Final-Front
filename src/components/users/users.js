import { useEffect, useState } from "react";
import { jwtDecode as jwt_decode } from "jwt-decode";
import "./users.css";
import Headers from "../header/Headers";
import { ToastContainer, toast } from 'react-toastify';

const Users = ({}) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(`https://localhost:7108/api/Users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else if (
          response.headers.get("content-type").includes("application/json")
        ) {
          return response.json();
        } else {
          throw new Error(
            `Unexpected content-type! Expected "application/json", got ${response.headers.get(
              "content-type"
            )}`
          );
        }
      }) // This closing parenthesis was moved up
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  
  const handleEliminate = (userId) => {
    setUser(user.filter(item => item.id !== userId));
    //const token = localStorage.getItem("authToken");
    fetch(`https://localhost:7108/api/Users/${userId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
          toast.success("¡Producto eliminado!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <Headers />
      <h1 className="titulo-pedido">USUARIOS</h1>
      <div className="page">
        {user &&
          user.map((item, index) => (
            <div key={index}>
              <div className="order">
                <h3 className="order-name">
                  {item.name}</h3>
                <p className="order-state">
                  {item.email} 
                </p>
                <p className="order-state">
                  {item.rol === 1 ? 'User' : item.rol === 2 ? 'SuperAdmin' : 'Admin'}
                </p>
                <div className="buttons">
                <button className="button-editar">Editar</button>
                <button className="button-eliminar" onClick={() => handleEliminate(item.id)}>Eliminar</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Users;
