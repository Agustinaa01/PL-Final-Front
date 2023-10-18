import "./productDetails.css";
import Headers from "../header/Headers";
import foroDetailsImage from "./fotoDetails.png"; // Import the image
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const ProductDetailsForm = () => {
    const location = useLocation();   

    const [name, setName] = useState(location.state?.productSelected?.name);
    const [price, setPrice] = useState(location.state?.productSelected?.price);
    const [brand, setBrand] = useState(location.state?.productSelected?.brand);
    const [category, setCategory] = useState(location.state?.productSelected?.category);
    const [description, setDescription] = useState(location.state?.productSelected?.description);
    const [image, setImage] = useState(location.state?.productSelected?.image ?? "");

    const navigate = useNavigate();

    const handleEditClick = () => {
        const productId = location.state?.productSelected?.id;
        navigate(`/productForm/${productId}`, { state: { productSelected: location.state.productSelected } });
    };

    return (
        <div>
            <div className="header-product-details">
                <Headers />
            </div>
            <div className="product-details-container">
                <img className="imagen-details" src={foroDetailsImage} alt="Product Details" />
            <div className="producto-info">
                <h1>{name}</h1><br />
                <h2>${price}</h2><br />
                <p>Categoria: {category}</p>
                <p>Marca: {brand}</p>
                <button className="button-details">Agregar al carrito</button><br/>
                <button className="button-details" onClick={handleEditClick}>Editar producto</button><br/>
                <button className="button-details-delete">Eliminar producto</button> 
            </div>
            </div>
            <div className="description">
            <h2>Descripcion</h2>
            <p>
                {description}
            </p>
            </div>
        </div>
    );
}

export default ProductDetailsForm;