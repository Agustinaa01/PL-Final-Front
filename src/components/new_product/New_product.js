import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./New_product.css";

const ProductForm = () => {
  // estados para nombre,precio,color,stock y descripcion
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [stock, setStock] = useState("");
  const [desc, setDesc] = useState("");

  const nameRef = useRef(null);
  const priceRef = useRef(0);
  const colorRef = useRef(null);
  const stockRef = useRef(0);
  const descRef = useRef(null);
  const navigate = useNavigate();

  //manejadores de eventos
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
  const handleColorChange = (event) => {
    colorRef.current.style.bordercolor = "";
    colorRef.current.style.outline = "";
    setColor(event.target.value);
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
  // Alerta de campos vacios
  const handleAddClick = () => {
    if (
      nameRef.current.value.length === 0 ||
      priceRef.current.value.length === 0 ||
      colorRef.current.value.length ||
      stockRef.current.length === 0 ||
      descRef.current.length === 0
    ) {
      alert("Completa todos los campos");
      return;
    }
  };

  return (
    <div className="name">
      <div className="name-box">
        <h2>Nombre</h2>
        <div className="container">
          <input
            onChange={handleNameChange}
            placeholder="Nombre"
            type="nombre"
            ref={nameRef}
          />
          <input
            onChange={handlePriceChange}
            placeholder="Precio"
            type="number"
            ref={priceRef}
          />
          <input
            onChange={handleStockChange}
            placeholder="Stock"
            type="number"
            ref={stockRef}
          />
          <input
            onChange={handleColorChange}
            placeholder="Color"
            type="name"
            ref={colorRef}
          />
          <input
            onChange={handleDescChange}
            placeholder="Descripcion"
            type="descripcion"
            ref={descRef}
          />
        </div>
        <div className="add-button">
          <button>
            onClick={handleAddClick}
            type="button" Añadir producto
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
