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
                <h2>Cargador Wireless Negro</h2><br />
                <h5>Precio: $20.840</h5><br />
                <p>Categoria: Cargador</p>
                <p>Marca: Samsung</p>
                <button className="button-details">Agregar al carrito</button><br/>
                <button className="button-details">Editar producto</button><br/>
                <button className="button-details-delete">Eliminar producto</button> 
            </div>
            </div>
            <div className="description">
            <h2>Descripcion</h2>
            <p>
                Este cargador inalámbrico negro de Samsung es la solución perfecta para mantener tus dispositivos cargados de manera conveniente y elegante. Con un diseño elegante y una compatibilidad amplia, este cargador es ideal para tu estilo de vida en constante movimiento. Carga tus dispositivos de forma rápida y segura con la tecnología de carga inalámbrica líder en la industria.
            </p>
            </div>
        </div>
    );
}

export default ProductDetailsForm;