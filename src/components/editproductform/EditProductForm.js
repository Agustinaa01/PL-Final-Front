import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Headers from "../header/Headers";
import EditProduct from "./EditProduct.png";

const EditProductForm = ({ productData }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);

  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const brandRef = useRef(null);
  const categoryRef = useRef(null);
  const descRef = useRef(null);
  // const imageUrlRef = useRef(null);

  const navigate = useNavigate();

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
    setDesc(event.target.value);
  };

  const handleURLChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleEditClick = () => {
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
    if (desc.length === 0) {
      descRef.current.focus();
      setError({ descError: "Por favor complete la descripcion" });
      isError = true;
    }
    if (category.length === 0) {
      categoryRef.current.focus();
      setError({ categoryError: "Por favor complete la categoria" });
      isError = true;
    }

    if (isError) return;

    setError(null);

      fetch(`http://localhost:8080/productos/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(),
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
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

  return (
    <div className="page">
      <Headers />
      <div className="name">
        <div className="name-box">
          <div className="container-image">
            <img
              className="img"
              src={EditProduct}
              alt="Descripción de la imagen"
            />
          </div>
          <div className="container">
            <h2 className="add">Editar producto</h2>
            <label className="label-input">Nombre</label>
            <input
              className="input"
              onChange={handleNameChange}
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
              ref={priceRef}
            />
            {error?.priceError && (
              <p className="input-vacio">{error.priceError}</p>
            )}
            <label className="label-input">Categoria</label>
            <input
              className="input"
              onChange={handleCategoryChange}
              type="text"
              ref={categoryRef}
            />
            {error?.categoryError && (
              <p className="input-vacio">{error.categoryError}</p>
            )}
            <label className="label-input">Marca</label>
            <input
              className="input"
              onChange={handleBrandChange}
              type="text"
              ref={brandRef}
            />
            {error?.brandError && (
              <p className="input-vacio">{error.brandError}</p>
            )}
            <label className="label-input">Descripcion</label>
            <input
              className="input"
              onChange={handleDescChange}
              type="text"
              ref={descRef}
            />
            {error?.descError && (
              <p className="input-vacio">{error.descError}</p>
            )}
            <label className="label-input">Imagen</label>
            <input
              className="input"
              onChange={handleURLChange}
              type="url"
              // ref={imageUrlRef}
            />
            <div className="add-button">
              <button
                className="button-accept"
                // onClick={() => navigate(`/product/${productData.id}`)}
                type="button"
              >
                Cancelar
              </button>
              <button
                className="button-accept"
                onClick={handleEditClick}
                type="button"
              >
                Editar producto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductForm;
