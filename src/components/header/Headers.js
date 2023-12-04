import React, { useContext, useState } from "react";
import "./Headers.css";
import { useNavigate } from "react-router";
import ToggleTheme from "../toggleTheme/ToggleTheme";
import carritoImage from "./carrito.png";
import { ThemeContext } from "../services/theme/ThemeContext";
import { AuthenticationContext } from "../services/authentication/AuthenticationContext";
import ProfileSidebar from "../ProfileSideBar/ProfileSideBar";
import profile from "./profile.png";
import { Modal, ModalHeader } from "react-bootstrap";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { CartContext } from "../carrito/CartContext";
import { toast } from "react-toastify";
const Headers = () => {
  const navigate = useNavigate();
  const { carrito, setCarrito, showCart, setShowCart } =
    useContext(CartContext);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthenticationContext);

  const handleCloseCart = () => setShowCart(false);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = carrito.filter(
      (producto) => producto.id !== productId
    );
    setCarrito(updatedCart);
    setShowCart(false);
  };

  const handleClosePaymentMethodsModal = () => {
    setShowPaymentModal(false);
  };

  const handleSeguirComprando = () => {
    setShowCart(false);
    navigate("/products");
  };

  const verificarCantidadesInvalidas = () => {
    return carrito.some(
      (producto) =>
        producto.quantity === undefined ||
        producto.quantity === 0 ||
        producto.quantity === ""
    );
  };

  const handleShowPaymentModal = () => {
    if (verificarCantidadesInvalidas()) {
      toast.warn(
        "Por favor, ingrese una cantidad válida mayor a 0 para todos los productos en el carrito!",
        {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      return;
    }

    setShowCart(false);
    setShowPaymentModal(true);
  };

  const abrirCarrito = () => {
    setShowCart(true);
  };

  const handlePay = () => {
    const tieneCantidadInvalida = carrito.some(
      (producto) =>
        producto.quantity === undefined ||
        producto.quantity === 0 ||
        producto.quantity === ""
    );
  
    if (tieneCantidadInvalida) {
      toast.warn('Por favor, ingrese una cantidad válida mayor a 0 para todos los productos en el carrito!', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
  
    // Verifica si se ha seleccionado un método de pago
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (!paymentMethod) {
      toast.error('Por favor, seleccione un método de pago.', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }  
  
    setShowPaymentModal(false);
    const productIds = carrito.map((producto) => producto.id);
    const cantidades = carrito.map((producto) => producto.quantity);
    fetch(`https://localhost:7108/api/Pedido`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: new Date().toISOString(),
        state: "Created",
        userId: decodedToken.sub,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        fetch(`https://localhost:7108/api/Pedido/AddProducto`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            PedidoId: data.id,
            ProductoId: productIds,
            Cantidad: cantidades,
          }),
        })
          .then((response) => response.json())
          .then(() => {
            console.log({
              PedidoId: data.id,
              ProductoId: productIds,
              Cantidad: cantidades,
            });
            toast.success("¡Pedido realizado con éxito!", {
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
            toast.error(
              "Ocurrió un error al realizar el pedido. Por favor, inténtelo de nuevo.",
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
              }
            );
          });
      })
      .catch((error) => {
        console.error("Error:", error);
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
    setCarrito([]);
  };
  let decodedToken;
  const token = localStorage.getItem("authToken");
  if (typeof token === "string") {
    decodedToken = jwt_decode(token);
  }

  const handlerProducts = () => {
    navigate("/products");
  };

  const handlerHome = () => {
    navigate("/home");
  };

  const handlerAboutUs = () => {
    navigate("/nosotros");
  };

  const handlerPedidos = () => {
    navigate("/pedidos");
  };

  const handlerUsers = () => {
    navigate("/users");
  };

  const handleQuantityChange = (productId, quantity) => {
    setCarrito((oldCart) => {
      // Check if product is already in the cart
      const existingProduct = oldCart.find((item) => item.id === productId);

      if (existingProduct) {
        // If the product is already in the cart, update the quantity
        return oldCart.map((item) =>
          item.id === productId ? { ...item, quantity: quantity } : item
        );
      } else {
        // If the product is not in the cart, add it with the specified quantity
        return [...oldCart, { id: productId, quantity: quantity }];
      }
    });
  };

  const { theme } = useContext(ThemeContext);
  const isLightTheme = theme === "light";
  const textClass = isLightTheme ? "light-text" : "dark-text";

  return (
    <div className="header">
      <div className="container">
        <div className="header">
          <div className="left">
            <h2 className={`home ${textClass}`} onClick={handlerHome}>
              EvoTech
            </h2>
          </div>
          <div className="right">
            <ToggleTheme />
            <h2 className={`title ${textClass}`} onClick={handlerProducts}>
              PRODUCTOS
            </h2>
            {decodedToken &&
              (decodedToken.role === "SuperAdmin" ||
                decodedToken.role === "User") &&
              user && (
                <h2 className={`title ${textClass}`} onClick={handlerPedidos}>
                  PEDIDOS
                </h2>
              )}
            {decodedToken && decodedToken.role === "SuperAdmin" && user && (
              <h2 className={`title ${textClass}`} onClick={handlerUsers}>
                PANEL
              </h2>
            )}
            <h2 className={`title ${textClass}`} onClick={handlerAboutUs}>
              NOSOTROS
            </h2>
            {isModalOpen && <ProfileSidebar setIsModalOpen={setIsModalOpen} />}
            <img
              onClick={abrirCarrito}
              className="carrito"
              src={carritoImage}
              alt="Carrito de compras"
            />
            <img
              className="carrito"
              src={profile}
              alt="perfil"
              onClick={() => setIsModalOpen(true)}
            />
            <Modal show={showCart} onHide={handleCloseCart}>
              <Modal.Header>
                <Modal.Title>Carrito de compra</Modal.Title>
                <button className="button-modal" onClick={handleCloseCart}>
                  X
                </button>
              </Modal.Header>
              <Modal.Body>
                {carrito.length === 0 ? (
                  <p>No hay productos en el carrito.</p>
                ) : (
                  <>
                    {carrito.map((producto, index) => (
                      <div className="carrito-container" key={index}>
                        <button
                          className="button-remove-from-cart"
                          onClick={() => handleRemoveFromCart(producto.id)}
                        >
                          X
                        </button>
                        <img
                          className="imagen-details-carrito"
                          src={producto.imageUrl}
                          alt="Producto en el carrito"
                        />

                        <div className="carrito-item-details">
                          <h3 className="name-carrito">{producto.name}</h3>
                          <p>Precio: ${producto.price}</p>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <label for={`quantity${index}`}>Cantidad:</label>
                            <input
                              className="quantity"
                              type="number"
                              id={`quantity${index}`}
                              name={`quantity${index}`}
                              min="1"
                              max="100"
                              value={producto.quantity} // Use value instead of defaultValue
                              onChange={(e) =>
                               handleQuantityChange(
                                  producto.id,
                                  Number(e.target.value)
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <h6 className="total">
                      Total: $
                      {carrito.reduce(
                        (total, producto) =>
                          total +
                          producto.price *
                            (isNaN(producto.quantity) ? 0 : producto.quantity),
                        0
                      )}
                    </h6>
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
                  </>
                )}
              </Modal.Body>
            </Modal>

            <Modal
              show={showPaymentModal}
              onHide={handleClosePaymentMethodsModal}
            >
              <Modal.Header>
                <Modal.Title>Selecciona un método de pago</Modal.Title>
                <button
                  className="button-modal"
                  onClick={handleClosePaymentMethodsModal}
                >
                  X
                </button>
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
                <button className="button-confirm" onClick={handlePay}>
                  Continuar
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headers;
