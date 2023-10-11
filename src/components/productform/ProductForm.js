import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductForm.css";
import Headers from "../header/Headers";
import productImage from "./productAdd.png"; // Reemplaza con la ruta correcta de tu imagen

const ProductForm = () => {
  // estados para nombre,precio,marca,stock y descripcion
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const nameRef = useRef(null);
  const priceRef = useRef(0);
  const brandRef = useRef(null);
  const stockRef = useRef(0);
  const descRef = useRef(null);
  const imageInputRef = useRef(null);
  //manejadores de eventos
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleNameChange = (event) => {
    nameRef.current.style.bordercolor = "";
    nameRef.current.style.outline = "";
    setName(event.target.value);
  };
  const handlePriceChange = (event) => {
    priceRef.current.style.bordercolor = "";
    priceRef.current.style.outline = "";
    setPrice(event.target.value);
  };
  const handleBrandChange = (event) => {
    brandRef.current.style.bordercolor = "";
    brandRef.current.style.outline = "";
    setBrand(event.target.value);
  };
  const handleStockChange = (event) => {
    stockRef.current.style.bordercolor = "";
    stockRef.current.style.outline = "";
    setStock(event.target.value);
  };
  const handleDescChange = (event) => {
    descRef.current.style.bordercolor = "";
    descRef.current.style.outline = "";
    setDesc(event.target.value);
  };
  const handleURLChange = (event) => {
    setStock(event.target.value);
  };
  // Alerta de campos vacios
  const handleAddClick = () => {
    let isError = false;
    if (name.length === 0) {
      nameRef.current.focus();
      setError({ ...error, nameError: "Por favor complete el nombre" })
      isError = true;
    }
    if (price.length === 0) {
      priceRef.current.focus();
      setError({ ...error, priceError: "Por favor complete el precio" })
      isError = true;
    }
    if (brand.length === 0) {
      brandRef.current.focus();
      setError({ ...error, brandError: "Por favor complete la marca" })
      isError = true;
    }
    if (stock.length === 0) {
      stockRef.current.focus();
      setError({ ...error, stockError: "Por favor complete el stock" })
      isError = true;
    }
    if (desc.length === 0) {
      descRef.current.focus();
      setError({ ...error, descError: "Por favor complete la descripcion" })
      isError = true;
    }

    if (isError)
      return;

    alert("Todo bien!");
    setError(null)
  };

  return (
    <div className="page">
      <Headers />
      <div className="name">
        <div className="name-box">
          <img
            className="img"
            src={productImage}
            alt="Descripción de la imagen"
          />
          <div className="container">
          <h2 className="add">Agregar producto</h2>
            <label className="label-input">Nombre</label>
            <input
              className="input"
              onChange={handleNameChange}
              type="text"
              ref={nameRef}
            />
            {error?.nameError && <p className="input-vacio">{error.nameError}</p>}
            <label className="label-input">Precio</label>
            <input
              className="input"
              onChange={handlePriceChange}
              type="number"
              ref={priceRef}
            />
            {error?.stockError && <p className="input-vacio">{error.stockError}</p>}
            <label className="label-input">Marca</label>
            <input
              className="input"
              onChange={handleBrandChange}
              type="text"
              ref={brandRef}
            />
            {error?.brandError && <p className="input-vacio">{error.brandError}</p>}
            <label className="label-input">Descripcion</label>
            <input
              className="input"
              onChange={handleDescChange}
              type="description"
              ref={descRef}
            />{error?.descError && <p className="input-vacio">{error.descError}</p>}
            <label className="label-input">URL de la imagen</label>
            <input
            className="input"
              onChange={handleURLChange}
              type="text"
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
                Añadir producto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
