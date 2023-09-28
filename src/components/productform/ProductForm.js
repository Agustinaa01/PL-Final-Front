import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductForm.css";
import Headers from "../header/Headers";

const ProductForm = () => {
  // estados para nombre,precio,color,stock y descripcion
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [stock, setStock] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const[error,setError] = useState(null);

  const nameRef = useRef(null);
  const priceRef = useRef(0);
  const colorRef = useRef(null);
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
    let isError = false;
    if (name.length === 0) {
      nameRef.current.focus();
      setError({...error, nameError: "Por favor complete el nombre"})
      isError = true;
    }  
    if(price.length === 0){
      priceRef.current.focus();
      setError({...error, priceError: "Por favor complete el precio"})
      isError = true;
    } 
    if (color.length === 0) {
      colorRef.current.focus();
      setError({...error, colorError: "Por favor complete el color"})
      isError = true;
    }  
    if(stock.length === 0){
      stockRef.current.focus();
      setError({...error, stockError: "Por favor complete el stock"})
      isError = true;
    }
    if (desc.length === 0) {
      descRef.current.focus();
      setError({...error, descError: "Por favor complete la descripcion"})
      isError = true;
    }  

    if(isError)
      return;

    alert("Todo bien!");
    setError(null)
  };

  return (
    <div className= "page">
      <Headers />
    <div className="name">
      <div className="name-box">
        <h2 className="title">Agregar producto</h2>
        <div className="container">
          <input
            onChange={handleNameChange}
            placeholder="Nombre"
            type="text"
            ref={nameRef}
          />
          {error?.nameError && <p className="input-vacio">{error.nameError}</p>}
          <input
            onChange={handlePriceChange}
            placeholder="Precio"
            type="number"
            ref={priceRef}
          />
          {error?.priceError && <p className="input-vacio">{error.priceError}</p>}
          <input
            onChange={handleStockChange}
            placeholder="Stock"
            type="number"
            ref={stockRef}
          />
          {error?.stockError && <p className="input-vacio">{error.stockError}</p>}
          <input
            onChange={handleColorChange}
            placeholder="Color"
            type="text"
            ref={colorRef}
          />
          {error?.colorError && <p className="input-vacio">{error.colorError}</p>}
          <input
            onChange={handleDescChange}
            placeholder="Descripcion"
            type="text"
            ref={descRef}
          />{error?.descError && <p className="input-vacio">{error.descError}</p>}
        </div>
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
      <div className="image-upload">
        <h2 className="imagen">Foto de producto</h2>
        <div className="file-input-container">
          <input
            className="input"
            type="file"
            accept="image/*"
            ref={imageInputRef}
            onChange={handleImageChange}
          />
          {image && (
            <div className="preview-image">
              <img
                className="img-product"
                src={image}
                style={{ width: "500px", height: "500px" }}
                alt="Imagen cargada"
              />
            </div>
          )}
        </div>
      </div>
      </div>
      </div>
  );
};

export default ProductForm;
