import "./productDetails.css";
import Headers from "../header/Headers";
import foroDetailsImage from "./fotoDetails.png"; // Import the image

const ProductDetailsForm = () => {
    return (
        <div>
            <div className="header-product-details">
                <Headers />
            </div>
            <div className="product-details-container">
                <img className="imagen-details" src={foroDetailsImage} alt="Product Details" />
            <div className="product-info">
                <h2>Parlante</h2><br />
                <h5>Price: $99.99</h5><br />
                <p>Category: Electronics</p>
                <button>Agregar producto</button><br/><br/>
                <button>Editar producto</button><br/><br/>
                <button>Eliminar producto</button> 
            </div>
            <div className="description">
                <p></p>
            </div>
            </div>
        </div>
    );
}

export default ProductDetailsForm;