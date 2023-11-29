import React, { useRef, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import "./ProductForm.css";
import Headers from "../header/Headers";
import productImage from "./productAdd.png"; // Reemplaza con la ruta correcta de tu imagen
import { ThemeContext } from "../services/theme/ThemeContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";

const ProductForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState(location.state?.productSelected?.name ?? "");
  const [price, setPrice] = useState(
    location.state?.productSelected?.price ?? ""
  );
  const id = location.state?.productSelected?.id;
  const [brand, setBrand] = useState(
    location.state?.productSelected?.brand ?? ""
  );
  const [category, setCategory] = useState(
    location.state?.productSelected?.category ?? ""
  );
  const [description, setDescription] = useState(
    location.state?.productSelected?.description ?? ""
  );
  const [imageUrl, setImage] = useState(
    location.state?.productSelected?.imageUrl ?? ""
  );
  const [error, setError] = useState(null);

  const nameRef = useRef(null);
  const priceRef = useRef(0);
  const brandRef = useRef(null);
  const categoryRef = useRef(null);
  const descRef = useRef(null);
  const imageInputRef = useRef(null);

  // Manejadores de eventos
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleDescChange = (event) => {
    setDescription(event.target.value);
  };
  const handleURLChange = (event) => {
    setImage(event.target.value);
  };
  const handleCancelClick = () => {
    navigate("/products");
  };

  // Alerta de campos vacíos
  const handleAddClick = () => {
    let isError = false;
    if (name.length === 0) {
      nameRef.current.focus();
      setError({ nameError: "Por favor complete el nombre" });
      isError = true;
    }
    if (price.length === 0) {
      priceRef.current.focus();
      setError({ priceError: "Por favor complete el precio" });
      isError = true;
    }
    if (brand.length === 0) {
      brandRef.current.focus();
      setError({ brandError: "Por favor complete la marca" });
      isError = true;
    }
    if (category.length === 0) {
      categoryRef.current.focus();
      setError({ categoryError: "Por favor complete la categoría" });
      isError = true;
    }
    if (description.length === 0) {
      descRef.current.focus();
      setError({ descError: "Por favor complete la descripción" });
      isError = true;
    } else if (description.length >= 150) {
      descRef.current.focus();
      setError({
        descError: "La descripción debe tener como máximo 150 caracteres",
      });
      isError = true;
    }
    const id = location.state?.productSelected?.id;
    if (isError) return;
    setError(null);

    const producto = { id, name, price, brand, category, description, imageUrl };
    const url = id
      ? `https://localhost:7108/api/Producto/${id}`
      : "https://localhost:7108/api/Producto";
    const method = id ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    })
      .then((response) => {
        if (response.ok) {
          const successMessage = location.state?.productSelected
            ? "¡Producto editado!"
            : "¡Producto agregado!";

          toast.success(successMessage, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });

          if (!location.state?.productSelected) {
            setName("");
            setPrice("");
            setBrand("");
            setCategory("");
            setDescription("");
            setImage("");
          } else {
            navigate(`/products`);
          }
        } else {
          // Manejar error
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
          throw new Error(
            `La respuesta tuvo algunos errores: ${response.statusText}`
          );
        }
      })
      .catch((error) => {
        // Manejar error de red
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
        console.error("Error:", error.message);
      });
  };

  const { theme } = useContext(ThemeContext);
  const isLightTheme = theme === "light";
  const textProduct = isLightTheme ? "light-form" : "dark-form";

  return (
    <>
      <Headers />
      <div className="page">
        <div className="name">
          <div className={`${textProduct}`}>
            <div className="container-imag">
              <img
                className="img"
                src={productImage}
                alt="Descripción de la imagen"
              />
            </div>
            <div className="container">
              <h2 className="add">
                {location.state ? "Editar" : "Agregar"} producto
              </h2>
              <label className="label-input">Nombre</label>
              <input
                className="input"
                onChange={handleNameChange}
                value={name}
                type="text"
                ref={nameRef}
              />
              {error?.nameError && (
                <p className="input-vacio">{error.nameError}</p>
              )}
              <label className="label-input">Precio</label>
              <input
                className="input"
                onChange={handlePriceChange}
                type="number"
                value={price}
                ref={priceRef}
              />
              {error?.priceError && (
                <p className="input-vacio">{error.priceError}</p>
              )}
              <label className="label-input">Marca</label>
              <input
                className="input"
                onChange={handleBrandChange}
                type="text"
                value={brand}
                ref={brandRef}
              />
              {error?.brandError && (
                <p className="input-vacio">{error.brandError}</p>
              )}
              <label className="label-input">Categoría</label>
              <select
                className="input"
                onChange={handleCategoryChange}
                value={category}
                ref={categoryRef}
              >
                <option value="">Categoría</option>
                <option value="Tablet">Tablet</option>
                <option value="Celulares">Celulares</option>
                <option value="Auriculares">Auriculares</option>
                <option value="Laptops">Computadoras</option>
                <option value="Camaras">Camaras</option>
                <option value="Parlantes">Parlantes</option>
                <option value="Consolas">Consolas</option>
              </select>
              {error?.categoryError && (
                <p className="input-vacio">{error.categoryError}</p>
              )}

              <label className="label-input">Descripción</label>
              <input
                className="input"
                onChange={handleDescChange}
                type="description"
                value={description}
                ref={descRef}
              />
              {error?.descError && (
                <p className="input-vacio">{error.descError}</p>
              )}
              <label className="label-input">URL de la imagen</label>
              <input
                className="input"
                onChange={handleURLChange}
                type="url"
                value={imageUrl}
              />
              <div className="add-button">
                <button
                  className="button-cancelar"
                  onClick={handleCancelClick}
                  type="button"
                >
                  Cancelar
                </button>
                <button
                  className="button-accept"
                  onClick={handleAddClick}
                  type="button"
                >
                  {location.state ? "Editar" : "Agregar"} producto
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductForm;