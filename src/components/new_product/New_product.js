import { useRef, useState } from "react";
import { useNavigate } from "react-router";

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
    setName(event.target.value);
  };
  const handleColorChange = (event) => {
    colorRef.current.style.bordercolor = "";
    colorRef.current.style.outline = "";
    setName(event.target.value);
  };
  const handleStockChange = (event) => {
    stockRef.current.style.bordercolor = "";
    stockRef.current.style.outline = "";
    setName(event.target.value);
  };
  const handleDescChange = (event) => {
    descRef.current.style.bordercolor = "";
    descRef.current.style.outline = "";
    setName(event.target.value);
  };
};

export default ProductForm;