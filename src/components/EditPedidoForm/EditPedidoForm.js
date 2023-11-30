
import Headers from '../header/Headers';
import { ThemeContext } from '../services/theme/ThemeContext';
import { useLocation, useNavigate } from 'react-router';
import { toast } from "react-toastify";
import fotoEditar from "./fotoEditar.jpg";
import "./EditPedidoForm.css"
import React, { useContext, useState } from 'react';

const EditPedidoForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [id, setid] = useState(
    location.state?.UserSelected.id ?? ""
  );
  const [state, setState] = useState(
    location.state?.UserSelected?.state ?? ""
  );
  const [date, setDate] = useState(
    location.state?.UserSelected.date ?? ""
  );

  const [pedidoProductos, setPedidoProductos] = useState(
    location.state?.UserSelected.pedidoProductos ?? []
  );

  const [error, setError] = useState({
    stateError: '',
    dateError: '',
  });

  const handleCancelClick = () => {
    // Manejar la acción de cancelar
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
    setError({ ...error, stateError: '' });
  };
  const handleEditClick = (id) => {
    if (!state.trim()) {
      setError({ ...error, stateError: 'El Estado es obligatorio' });
      return;
    }

    if (!date.trim()) {
      setError({ ...error, dateError: 'La fecha es obligatoria' });
      return;
    }

    fetch(`https://localhost:7108/api/Pedido/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        state,
        date, 
        productoId: pedidoProductos.map(pedidoProducto => pedidoProducto.producto.id)
      })
    }).then(response => {
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
      <div className="editar-pedido">
        <div className="editar">
          <label className="label-inputs">Date</label>
          <h5 className="label-inputs">{new Date(date).toLocaleDateString()}</h5>
          {error.dateError && <p className="input-vacio">{error.dateError}</p>}
          <label className="label-inputs">State</label>
          <input
            className="input-states"
            onChange={handleStateChange}
            value={state}
            type="text"
          />
          {error.stateError && (
            <p className="input-vacio">{error.stateError}</p>
          )}
          <h4 className="order-states">Productos</h4>
          {pedidoProductos && pedidoProductos.map((pedidoProducto, productIndex) => (
            <div className='product-editar' key={productIndex}>
              <button
              className="button-eliminar-producto"
              onClick={() => handleDeleteProduct(productIndex)}
              type="button"
            >
              X
            </button>
              <img className="order-image" src={pedidoProducto.producto.imageUrl} alt={pedidoProducto.producto.name} />
              <div className='info'>
                <p>{pedidoProducto.producto.name}</p>
                <p>${pedidoProducto.producto.price}</p>
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
