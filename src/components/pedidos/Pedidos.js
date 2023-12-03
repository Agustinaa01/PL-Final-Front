import { useContext, useEffect, useState } from "react";
import { jwtDecode as jwt_decode } from "jwt-decode";
import "./Pedidos.css";
import Headers from "../header/Headers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import BeatLoader from "react-spinners/BeatLoader";
import { ThemeContext } from "../services/theme/ThemeContext";

const Pedido = ({ }) => {
  const [pedido, setPedido] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();
  let decodedToken;
  const token = localStorage.getItem("authToken");
  if (typeof token === "string") {
    decodedToken = jwt_decode(token);
  }

  const handleEliminate = (itemId) => {
    fetch(`https://localhost:7108/api/Pedido/${itemId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          setPedido(pedido.filter(item => item.id !== itemId));
          toast.success("¡Pedido eliminado!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
        } else {
          // Handle error
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
      })
      .catch((error) => {
        // Handle network error
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
        console.error("Error:", error);
      });
  };

  const handleEditar = (pedido) => {
    if (pedido && pedido.id) {
      navigate(`/editarPedido/${pedido.id}`, {
        state: { UserSelected: pedido },
      });
    } else {
      console.error("Pedido no encontrado.");
    }
  };
  
  useEffect(() => {
    if (decodedToken) {
      fetch(`https://localhost:7108/api/Pedido/${decodedToken.sub}`, {
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
        })
        .then((data) => {
          console.log(data);
          setPedido(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsLoading(false);
        });
    }
  }, []);

  const { theme } = useContext(ThemeContext);
  const isLightTheme = theme === "light";
  const backgroundPedido = isLightTheme ? "light-pedido" : "dark-pedido";
  const title = isLightTheme ? "light-letra" : "dark-letra";
  const product = isLightTheme ? "light-producto" : "dark-producto";

  return (
    <div>
      <Headers />
      <h1 className="titulo-pedido">PEDIDOS</h1>
      <div className="page">
        {isLoading ? (
          <BeatLoader color={"#ffff"} loading={isLoading} size={13} />
        ) : !pedido || pedido.length === 0 ? (
          <p>No hay pedidos disponibles.</p>
        ) : (
          pedido &&
          pedido.map((item, index) => (
            <div key={index}>
              <div className={`${backgroundPedido}`}>
                <h4 className={`${title}`}>
                  Fecha:{" "}
                  {new Date(item.date).toLocaleDateString("es-AR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h4>
                <h6 className={`${title}`}>{item.state}</h6>
                {/* <h4 className="order-state">Productos:</h4> */}
                {item.pedidoProductos && item.pedidoProductos.map((pedidoProducto, productIndex) => (
                  <div key={productIndex} className={`${product}`}>
                    <img className="order-image" src={pedidoProducto.producto.imageUrl} alt={pedidoProducto.producto.name} />
                    <div>
                      <h6 className={`${title}`}>{pedidoProducto.producto.name}</h6>
                      <h6 className={`${title}`}>${pedidoProducto.producto.price}</h6>
                      <h6 className={`${title}`}>Cantidad: {pedidoProducto.cantidad}</h6>
                    </div>
                  </div>
                ))}
                {(decodedToken.role === "Admin" ||
                  decodedToken.role === "SuperAdmin") && (
                    <div className="buttons-order">
                      <button className="button-editar" onClick={() => handleEditar(item)}>Editar</button>
                      <button className="button-eliminar-order" onClick={() => handleEliminate(item.id)}>Eliminar</button>
                    </div>
                  )}
              </div>
            </div>
          ))

        )}

      </div>
    </div>
  );
};

export default Pedido;  
