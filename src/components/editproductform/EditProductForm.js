import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProductForm.css";
import Headers from "../header/Headers";
//import productImage from "./productform/productAdd.png";

const EditProductForm = ({ productData }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);

  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const brandRef = useRef(null);
  const stockRef = useRef(null);
  const descRef = useRef(null);
  const imageUrlRef = useRef(null);

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

  const handleStockChange = (event) => {
    setStock(event.target.value);
  };

  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };

  const handleURLChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleEditClick = () => {
    if (name.trim() === "") {
      setError({ ...error, nameError: "Introduzca un nombre" });
      nameRef.current.focus();
      return;
    }
    navigate(`/product/${productData.id}`);
  };

  return (
    <div className="page">
      <Headers />
      <div className="name">
        <div className="name-box">
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
            <label className="label-input">Stock</label>
            <input
              className="input"
              onChange={handleStockChange}
              type="number"
              ref={stockRef}
            />
            <label className="label-input">Marca</label>
            <input
              className="input"
              onChange={handleBrandChange}
              type="text"
              ref={brandRef}
            />
            <label className="label-input">Descripcion</label>
            <input
              className="input"
              onChange={handleDescChange}
              type="text"
              ref={descRef}
            />
            <label className="label-input">Imagen</label>
            <input
              className="input"
              onChange={handleURLChange}
              type="url"
              ref={imageUrlRef}
            />
            <div className="add-button">
              <button
                className="button-accept"
                onClick={() => navigate(`/product/${productData.id}`)}
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
