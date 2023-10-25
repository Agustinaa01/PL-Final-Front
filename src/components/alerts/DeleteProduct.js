import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import "./DeleteProduct.css";

const DeleteProduct = () => {
  const navigate = useNavigate();

  const handleConfirmClick = () => {
    toast.success("Producto eliminado", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      navigate("/products");
    }, 2500);
  };

  const handleCancelClick = () => {
    // toast.error("Eliminación cancelada", {
    //   position: "top-right",
    //   delay: 1000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    // });
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
