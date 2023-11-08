import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductForm.css";
import Headers from "../header/Headers";
import productImage from "./productAdd.png"; // Reemplaza con la ruta correcta de tu imagen

const ProductForm = () => {
  // estados para nombre,precio,marca,stock y descripcion

  const location = useLocation();   

  const [name, setName] = useState(location.state?.productSelected?.name ?? "");
  const [price, setPrice] = useState(location.state?.productSelected?.price ?? "");
  const [brand, setBrand] = useState(location.state?.productSelected?.brand ?? "");
  const [category, setCategory] = useState(location.state?.productSelected?.category ?? "");
  const [description, setDescription] = useState(location.state?.productSelected?.description ?? "");
  const [image, setImage] = useState(location.state?.productSelected?.image ?? "");
  const [error, setError] = useState(null);

  const nameRef = useRef(null);
  const priceRef = useRef(0);
  const brandRef = useRef(null);
  const categoryRef = useRef(null);
  const descRef = useRef(null);
  const imageInputRef = useRef(null);
  //manejadores de eventos
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
  // Alerta de campos vacios
  const handleAddClick = () => {
    let isError = false;
    if (name.length === 0) {
      nameRef.current.focus();
      setError({nameError: "Por favor complete el nombre" })
      isError = true;
    }
    if (price.length === 0) {
      priceRef.current.focus();
      setError({priceError: "Por favor complete el precio" })
      isError = true;
    }
    if (brand.length === 0) {
      brandRef.current.focus();
      setError({brandError: "Por favor complete la marca" })
      isError = true;
    }
    if (category.length === 0) {
      categoryRef.current.focus();
      setError({categoryError: "Por favor complete la categoria" })
      isError = true;
    }
    if (description.length === 0) {
      descRef.current.focus();
      setError({descError: "Por favor complete la descripcion" })
      isError = true;
    }

    if (isError)
      return;
    setError(null)
  };

  return (
    <div className="page">
      <Headers />
      <div className="name">
        <div className="name-box">
          <div className="container-imag">
          <img
            className="img"
            src={productImage}
            alt="Descripción de la imagen"
          />
          </div>
          <div className="container">
          <h2 className="add">{location.state ? "Editar" : "Agregar"} producto</h2>
            <label className="label-input">Nombre</label>
            <input
              className="input"
              onChange={handleNameChange}
              value={name}
              type="text"
              ref={nameRef}
            />
            {error?.nameError && <p className="input-vacio">{error.nameError}</p>}
            <label className="label-input">Precio</label>
            <input
              className="input"
              onChange={handlePriceChange}
              type="number"
              value={price}
              ref={priceRef}
            />
            {error?.priceError && <p className="input-vacio">{error.priceError}</p>}
            <label className="label-input">Marca</label>
            <input
              className="input"
              onChange={handleBrandChange}
              type="text"
              value={brand}
              ref={brandRef}
            />
            {error?.brandError && <p className="input-vacio">{error.brandError}</p>}
            <label className="label-input">Categoria</label>
            <input
              className="input"
              onChange={handleCategoryChange}
              type="text"
              value={category}
              ref={categoryRef}
            />
            {error?.categoryError && <p className="input-vacio">{error.categoryError}</p>}
            <label className="label-input">Descripcion</label>
            <input
              className="input"
              onChange={handleDescChange}
              type="description"
              value={description}
              ref={descRef}
            />{error?.descError && <p className="input-vacio">{error.descError}</p>}
            <label className="label-input">URL de la imagen</label>
            <input
            className="input"
              onChange={handleURLChange}
              type="url"
              value={image}
            />
            <div className="add-button">
              <button
                className="button-accept"
                onClick={handleAddClick}
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
  );
};

export default ProductForm;
