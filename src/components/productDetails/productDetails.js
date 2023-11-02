import "./productDetails.css";
import "./Modal.css";
import Headers from "../header/Headers";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Modal, ModalHeader } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetailsForm = () => {
  const location = useLocation();
  const [cart, setCart] = useState();
  const [name, setName] = useState(location.state?.productSelected?.name);
  const [price, setPrice] = useState(location.state?.productSelected?.price);
  const [brand, setBrand] = useState(location.state?.productSelected?.brand);
  const [category, setCategory] = useState(
    location.state?.productSelected?.category
  );
  const [description, setDescription] = useState(
    location.state?.productSelected?.description
  );
  const [image, setImage] = useState(
    location.state?.productSelected?.image ?? ""
  );
  const [show, setShow] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = () => {
    const productId = location.state?.productSelected?.id;
    navigate(`/productForm/${productId}`, {
      state: { productSelected: location.state.productSelected },
    });
  };

  const handleConfirm = () => {
    setShow(false);
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
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);
  return (
    <div>
      <div className="header-product-details">
        <Headers />
      </div>
      <div className="product-details-container">
        <img className="imagen-details" src={image} alt="Product Details" />
        <div className="producto-info">
          <h1>{name}</h1>
          <br />
          <h2>${price}</h2>
          <br />
          <p>Categoria: {category}</p>
          <p>Marca: {brand}</p>
          <button className="button-details" onClick={handleShowCart}>Agregar al carrito</button>
          <br />
          <button className="button-details" onClick={handleEditClick}>
            Editar producto
          </button>
          <br />
          <button className="button-details-delete" onClick={handleShow}>
            Eliminar producto
          </button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>ADVERTENCIA</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Está seguro que quiere eliminar el producto?
            </Modal.Body>
            <Modal.Footer>
              <button className="button-cancel" onClick={handleClose}>
                Cancelar
              </button>
              <button className="button-confirm" onClick={handleConfirm}>
                Confirmar
              </button>
            </Modal.Footer>
          </Modal>
          <Modal show={showCart} onHide={handleCloseCart}>
            <Modal.Header>
              <Modal.Title>Carrito de compra</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="carrito-container">
                <img className="imagen-details-carrito" src={image} alt="Producto en el carrito" />
                <div className="carrito-item-details">
                  <h3 className="name-carrito">{name}</h3>
                  <p>Precio: ${price}</p>
                </div>
              </div>
              <p className="total">Total: ${price}</p>
            </Modal.Body>
            <Modal.Footer>
              <button className="button-pagar">Pagar</button>
              <button className="button-seguir-comprando">Seguir Comprando</button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <div className="description">
        <h2>Descripcion</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ProductDetailsForm;
