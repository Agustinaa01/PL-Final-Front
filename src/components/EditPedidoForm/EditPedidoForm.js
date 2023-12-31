import Headers from "../header/Headers";
import { ThemeContext } from "../services/theme/ThemeContext";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import fotoEditar from "./fotoEditar.jpg";
import "./EditPedidoForm.css";
import React, { useContext, useState } from "react";

const EditPedidoForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [id, setid] = useState(location.state?.UserSelected.id ?? "");
  const [state, setState] = useState(location.state?.UserSelected?.state ?? "");
  const [date, setDate] = useState(location.state?.UserSelected.date ?? "");

  const [pedidoProductos, setPedidoProductos] = useState(
    location.state?.UserSelected.pedidoProductos ?? []
  );

  const [error, setError] = useState({
    stateError: "",
    dateError: "",
  });

  const handleCancelClick = () => {
    navigate(-1);
  };
  const handleQuantityChange = (event, productIndex) => {
    // Get the new quantity from event.target.value
    let newQuantity = event.target.value;

    // Make sure to convert it to a number (it's a string by default)
    newQuantity = Number(newQuantity);

    // Now, create a new array with the updated quantity
    const newPedidoProductos = pedidoProductos.map((pedidoProducto, index) => {
      if (index === productIndex) {
        // This is the product that needs to be updated, return a new object
        return { ...pedidoProducto, cantidad: newQuantity };
      } else {
        // This product doesn't need to be updated, return it as is
        return pedidoProducto;
      }
    });

    // Finally, set the new array in the state
    setPedidoProductos(newPedidoProductos);
  };

  const handleDeleteProduct = (productIndex) => {
    // Crea una copia del estado actual de pedidoProductos
    const newPedidoProductos = [...pedidoProductos];

    // Elimina el producto en el índice especificado
    newPedidoProductos.splice(productIndex, 1);

    // Actualiza el estado de pedidoProductos
    setPedidoProductos(newPedidoProductos);
  };

  // Manejador para cambios en el nombre
  const handleStateChange = (e) => {
    setState(e.target.value);
    setError({ ...error, stateError: "" });
  };
  const handleEditClick = (id) => {
    if (!state.trim()) {
      setError({ ...error, stateError: "El Estado es obligatorio" });
      return;
    }

    if (!date.trim()) {
      setError({ ...error, dateError: "La fecha es obligatoria" });
      return;
    }

    fetch(`https://localhost:7108/api/Pedido/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        state,
        date,
        PedidoProductos: pedidoProductos.map((pedidoProducto) => ({
          ProductoId: pedidoProducto.producto.id,
          Cantidad: pedidoProducto.cantidad,
        })),
      }),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("¡Pedido actualizado!", {
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
            navigate("/pedidos");
          }, 2000);
        } else {
          toast.error("Ocurrió un error. Por favor, inténtelo de nuevo.", {
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
        toast.error("Ocurrió un error de red. Por favor, inténtelo de nuevo.", {
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
  const backgroundPedido = isLightTheme
    ? "light-editar-pedido"
    : "dark-editar-pedido";
  const textPedido = isLightTheme ? "light-pedido-text" : "dark-pedido-text";
  const backgroundPedidoText = isLightTheme
    ? "light-text-pedido"
    : "dark-text-pedido";

  return (
    <>
      <Headers />
      <div className="editar-pedido">
        <div className={`${backgroundPedido}`}>
          <label className={`${textPedido}`}>Date</label>
          <h5 className={`${textPedido}`}>
            {new Date(date).toLocaleDateString()}
          </h5>
          {error.dateError && <p className="input-vacio">{error.dateError}</p>}
          <label className={`${textPedido}`}>State</label>
          <select
            className="input-states"
            onChange={handleStateChange}
            value={state}
          >
            <option value="Created">Created</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          {error.stateError && (
            <p className="input-vacio">{error.stateError}</p>
          )}
          <h4 className={`${textPedido}`}>Productos</h4>
          {pedidoProductos &&
            pedidoProductos.map((pedidoProducto, productIndex) => (
              <div className={`${backgroundPedidoText}`} key={productIndex}>
                <button
                  className="button-eliminar-producto"
                  onClick={() => handleDeleteProduct(productIndex)}
                  type="button"
                >
                  X
                </button>
                <img
                  className="order-image"
                  src={pedidoProducto.producto.imageUrl}
                  alt={pedidoProducto.producto.name}
                />
                <div className="info">
                  <p>{pedidoProducto.producto.name}</p>
                  <p>${pedidoProducto.producto.price}</p>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p>Cantidad</p>
                    <input
                      className="cantidad"
                      type="number"
                      min="1"
                      value={pedidoProducto.cantidad}
                      onChange={(e) => handleQuantityChange(e, productIndex)}
                    />
                  </div>
                </div>
              </div>
            ))}

          <div className="add-button-editar">
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
              Editar Pedido
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPedidoForm;
