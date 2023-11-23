import { useEffect, useState } from "react";
import { jwtDecode as jwt_decode } from "jwt-decode";
import "./EditProductForm.css";
import Headers from "../header/Headers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";

const Pedido = ({}) => {
  const [pedido, setPedido] = useState(null);
  let decodedToken;
  const token = localStorage.getItem("authToken");
  if (typeof token === "string") {
    decodedToken = jwt_decode(token);
  }

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
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  return (
    <div>
      <Headers />
      <h1 className="titulo-pedido">PEDIDOS</h1>
      <div className="page">
        {pedido &&
          pedido.map((item, index) => (
            <div key={index}>
              <div className="order">
                <h4 className="order-date">
                  Date:{" "}
                  {new Date(item.date).toLocaleDateString("es-AR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h4>
                <p class="order-state">State: {item.state}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Pedido;
