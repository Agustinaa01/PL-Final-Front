import "./productDetails.css";
import "./Modal.css";
import Headers from "../header/Headers";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Modal, ModalHeader } from "react-bootstrap";
import { AuthenticationContext } from "../services/authentication/AuthenticationContext";
import { ThemeContext } from "../services/theme/ThemeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode as jwt_decode } from "jwt-decode";

const ProductDetailsForm = () => {
  const location = useLocation();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [cart, setCart] = useState();
  const [name, setName] = useState(location.state?.productSelected?.name);
  const [price, setPrice] = useState(location.state?.productSelected?.price);
  const [brand, setBrand] = useState(location.state?.productSelected?.brand);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [category, setCategory] = useState(
    location.state?.productSelected?.category
  );
  const [description, setDescription] = useState(
    location.state?.productSelected?.description
  );
  const [imageUrl, setImage] = useState(
    location.state?.productSelected?.imageUrl ?? ""
  );
  const [show, setShow] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const productId = location.state?.productSelected?.id;

  const handleEditClick = () => {
    const productId = location.state?.productSelected?.id;
    navigate(`/productForm/${productId}`, {
      state: { productSelected: location.state.productSelected },
    });
  };

  const handleConfirm = () => {
    //const token = localStorage.getItem("authToken");
    fetch(`https://localhost:7108/api/Producto/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    })
      .then(() => {
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
        setTimeout(() => {
          navigate("/products");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useContext(AuthenticationContext);
  const handleSeguirComprando = () => {
    setShowCart(false);
  };

  const handleShowCart = () => {
    if (!user) {
      openConfirmationModal();
    } else {
      setShowCart(true);
    }
  };
  const openConfirmationModal = () => {
    setShowConfirmationModal(true);
  };
  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };
  const handleShowPaymentModal = () => {
    setShowCart(false); // Cierra el modal existente
    setShowPaymentModal(true); // Abre el modal de pago
  };
  const handleClosePaymentMethodsModal = () => {
    setShowPaymentModal(false);
  };
  const handleCloseCart = () => setShowCart(false);

  const { theme } = useContext(ThemeContext);

  const isLightTheme = theme === "light";
  const textClass = isLightTheme ? "light-details" : "dark-details";
  const ClassDetails = isLightTheme ? "light-details-img" : "dark-details-img";
  let decodedToken;
  const token = localStorage.getItem("authToken");
  if (typeof token === "string") {
    decodedToken = jwt_decode(token);
  }

  return (
    <div>
      <div className="header-product-details">
        <Headers />
      </div>
      <div className="product-details-container">
        <img
          className={`${ClassDetails}`}
          src={imageUrl}
          alt="Product Details"
        />
        <div className="producto-info">
          <h1>{name}</h1>
          <br />
          <h2>${price}</h2>
          <br />
          <p>Categoria: {category}</p>
          <p> Marca: {brand}</p>
          <p> Marca: {brand}</p>
{(decodedToken.role === "User" || decodedToken.role === "SuperAdmin" || !user) && (
  <button className="button-details" onClick={handleShowCart}>
    Agregar al carrito
  </button>
)}
          <br />

          {user && (decodedToken.role === "Admin" || decodedToken.role === "SuperAdmin") && (
              <button className="button-details" onClick={handleEditClick}>
                Editar producto
              </button>
            )}

          <br />
          {user && (decodedToken.role === "Admin" || decodedToken.role === "SuperAdmin") && (
            <button className="button-details" onClick={handleShow}>
              Eliminar producto
            </button>
          )}
          <Modal show={showConfirmationModal} onHide={closeConfirmationModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              ¿Desea agregar este producto al carrito?
              <p>
                <strong>Debe iniciar sesión para continuar.</strong>
              </p>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="button-cancelar"
                onClick={closeConfirmationModal}
              >
                Cancelar
              </button>
              <button
                className="button-confirm"
                onClick={() => navigate("/login")}
              >
                Iniciar sesión
              </button>
            </Modal.Footer>
          </Modal>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>ADVERTENCIA</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              ¿Está seguro que quiere eliminar el producto?
            </Modal.Body>
            <Modal.Footer>
              <button className="button-cancelar" onClick={handleClose}>
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
                <img
                  className="imagen-details-carrito"
                  src={imageUrl}
                  alt="Producto en el carrito"
                />
                <div className="carrito-item-details">
                  <h3 className="name-carrito">{name}</h3>
                  <p>Precio: ${price}</p>
                </div>
              </div>
              <p className="total">Total: ${price}</p>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="button-cancelar"
                onClick={handleShowPaymentModal}
              >
                Pagar
              </button>
              <button
                className="button-confirm"
                onClick={handleSeguirComprando}
              >
                Seguir Comprando
              </button>
            </Modal.Footer>
          </Modal>
          <Modal show={showPaymentModal}>
            <Modal.Header closeButton>
              <Modal.Title>Seleccionar Método de Pago</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Seleccione su método de pago preferido:</p>
              <label>
                <input type="radio" name="paymentMethod" value="paypal" />
                <img
                  className="img-pay"
                  src="https://cdn-icons-png.flaticon.com/512/147/147258.png"
                ></img>
                Tarjeta de Credito
              </label>
              <br />
              <label>
                <input type="radio" name="paymentMethod" value="paypal" />
                <img
                  className="img-pay"
                  src="https://cdn-icons-png.flaticon.com/512/301/301657.png"
                ></img>
                Tarjeta de Debito
              </label>
              <br />
              <label>
                <input type="radio" name="paymentMethod" value="paypal" />
                <img
                  className="img-pay"
                  src="https://logospng.org/download/mercado-pago/logo-mercado-pago-icone-1024.png"
                ></img>
                Mercado Pago
              </label>
              <br />
              <label>
                <input type="radio" name="paymentMethod" value="paypal" />
                <img
                  className="img-pay"
                  src="https://png.pngtree.com/png-vector/20220821/ourmid/pngtree-bank-transfer-icon-house-selected-transfer-vector-png-image_19626578.png"
                ></img>
                Transferencia bancaria
              </label>
              <br />
              <label>
                <input type="radio" name="paymentMethod" value="paypal" />
                <img
                  className="img-pay"
                  src="https://cdn-icons-png.flaticon.com/512/174/174861.png"
                ></img>
                PayPal
              </label>
              <br />
              <label>
                <input type="radio" name="paymentMethod" value="paypal" />
                <img
                  className="img-pay"
                  src="https://cdn-icons-png.flaticon.com/512/5968/5968279.png"
                ></img>
                Apple Pay
              </label>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="button-cancelar"
                onClick={handleClosePaymentMethodsModal}
              >
                Cancelar
              </button>
              <button className="button-confirm">Continuar</button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <div className={`${textClass}`}>
        <h2>Descripcion</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ProductDetailsForm;
