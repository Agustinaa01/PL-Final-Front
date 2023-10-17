import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
//import "./EditProductForm.css";
import Headers from "../header/Headers";

const EditProductForm = ({ productData }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [stock, setStock] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);

  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const colorRef = useRef(null);
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

  const handleColorChange = (event) => {
    setColor(event.target.value);
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
      setError({ ...error, nameError: "Please enter the name" });
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
            <h2 className="add">Edit Product</h2>
            {/* Agregar error de nombre */}
            {error?.nameError && (
              <p className="input-vacio">{error.nameError}</p>
            )}
              <input
              onChange={handleNameChange}
              type="text"
              ref={nameRef}
            />
            <input
              onChange={handlePriceChange}
              placeholder="Price"
              type="number"
              value={price}
              ref={priceRef}
            />
            <input
              onChange={handleURLChange}
              placeholder="Image URL"
              type="text"
              value={imageUrl}
              ref={imageUrlRef}
            />
            <div className="add-button">
              <button
                className="button-accept"
                onClick={() => navigate(`/product/${productData.id}`)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="button-accept"
                onClick={handleEditClick}
                type="button"
              >
                Edit Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductForm;
