import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import "./DeleteProduct.css";

const DeleteProduct = () => {

  const navigate = useNavigate();

  const handleConfirmClick = () => {
    toast.success('Producto eliminado correctamente!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    setTimeout(() => {
      navigate("/products");
    }, 2500);
  };

    const handleCancelClick = () => {
      navigate("/products");
    };

  return (
    <div className="Warning">
      <h1 className="title">ADVERTENCIA</h1>
      <h2 className="text">¿Está seguro que quiere eliminar el producto?</h2>
      <button className="Confirm" onClick={handleConfirmClick}>
        Confirmar
      </button>
      <button className="Cancel" onClick={handleCancelClick}>
        Cancelar
      </button>
      <ToastContainer />
    </div>
  );
};

export default DeleteProduct;