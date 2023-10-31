import React from "react";
import "./Products.css";
import { useNavigate } from "react-router";
import fotoDetailsImage from "./fotoDetails.png";
import fotoDetailsImage2 from "./productAdd.png";
import Headers from "../header/Headers";
import ProductFilter from "../productfilter/ProductFilter";
import { useState } from "react";
import SearchBar from "../searchbar/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PRODUCTS = [
  {
    id: 1,
    name: "Laptop",
    price: 899.99,
    brand: "HP",
    category: "Laptops",
    description:
      "Una potente laptop con excelentes capacidades de procesamiento, ideal para trabajos intensivos y entretenimiento multimedia.",
    image: fotoDetailsImage,
  },
  {
    id: 2,
    name: "Smartphone",
    price: 599.99,
    brand: "Apple",
    category: "Celulares",
    description:
      "Un teléfono inteligente de última generación con una cámara avanzada y una interfaz de usuario fluida y elegante.",
    image: fotoDetailsImage2,
  },
  {
    id: 3,
    name: "Tableta",
    price: 299.99,
    brand: "Samsung",
    category: "Tablet",
    description:
      "Una tableta compacta y versátil con una pantalla de alta resolución y capacidades de procesamiento eficientes para la productividad en movimiento.",
    image: fotoDetailsImage,
  },
  {
    id: 4,
    name: "Auriculares inalámbricos",
    price: 79.99,
    brand: "Sony",
    category: "Auriculares",
    description:
      "Auriculares inalámbricos de alta calidad con una reproducción de sonido nítida y una comodidad excepcional para largas sesiones de escucha.",
    image: fotoDetailsImage2,
  },
  {
    id: 5,
    name: "Cámara digital",
    price: 499.99,
    brand: "Sony",
    category: "Camaras",
    description:
      "Una cámara digital avanzada con capacidades de captura de alta resolución y una amplia gama de características para fotógrafos aficionados y profesionales.",
    image: fotoDetailsImage,
  },
  {
    id: 6,
    name: "Parlantes",
    price: 99.99,
    brand: "JBL",
    category: "Parlantes",
    description: "",
    image: fotoDetailsImage2,
  },
  {
    id: 7,
    name: "XBOX",
    price: 999.99,
    brand: "XBOX",
    category: "Consolas",
    description:
      "Una consola de juegos de última generación con gráficos de alta fidelidad y una amplia colección de juegos emocionantes para todos los jugadores.",
    image: fotoDetailsImage,
  },
  {
    id: 8,
    name: "Auriculares",
    price: 4099.99,
    brand: "Apple",
    category: "Auriculares",
    description:
      "Auriculares premium con cancelación activa de ruido y una calidad de audio excepcional, perfectos para disfrutar de música y contenido multimedia de alta fidelidad.",
    image: fotoDetailsImage2,
  },
];

const Products = () => {
  const [products, setProducts] = useState(PRODUCTS);
  const [productsFiltered, setProductsFiltered] = useState(PRODUCTS);
  const [filterCategory, setFilterCategory] = useState(""); //estado almacena la categoria de productos seleccinada actualmente
  const [searchTerm, setSearchTerm] = useState(""); //estado que se utiluza para lamacenar el termino de busqueda actual

  const navigate = useNavigate();

  const handleProductForm = () => {
    navigate("/productForm");
  };

  const handleFilterCategoryChange = (category) => {
    if (category === "") {
      // Si se selecciona "CATEGORIAS", establece filterCategory en una cadena vacía
      // para mostrar todos los productos.
      setFilterCategory("");

      // Restaura la lista completa de productos (PRODUCTS)
      setProductsFiltered(PRODUCTS);
    } else {
      // Si se selecciona una categoría distinta a "CATEGORIAS",
      // actualiza filterCategory con la categoría seleccionada.
      setFilterCategory(category);

      // Filtra los productos según la categoría seleccionada
      // y actualiza productsFiltered con los productos filtrados.
      setProductsFiltered((prevProducts) =>
        products.filter((product) => product.category === category)
      );
    }
  };

  const handleSearch = (term) => {
    if (term === "") {
      setSearchTerm(term);
      setProductsFiltered(PRODUCTS);
    } else {
      setSearchTerm(term);
      // Filtra los productos por término de búsqueda.
      setProductsFiltered(
        products.filter((product) => {
          const productNameWithoutAccents = product.name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
          const termWithoutAccents = term
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
          return productNameWithoutAccents
            .toLowerCase()
            .includes(termWithoutAccents.toLowerCase());
        })
      );
    }
  };
  const handleViewProduct = (productId) => {
    const productSelected = products.filter(
      (product) => product.id === productId
    )[0];
    navigate(`/productDetails/${productId}`, { state: { productSelected } });
  };

  return (
    <div className="products">
      <Headers />
      <h1 className="titulo">NUESTROS PRODUCTOS</h1>
      <button className="boton-agregar-producto" onClick={handleProductForm}>
        Agregar producto
      </button>
      <div className="custom-filter">
        <ProductFilter
          filterCategory={filterCategory}
          onCategoryChange={handleFilterCategoryChange}
        />
        <SearchBar
          className="search"
          searchTerm={searchTerm}
          onSearch={handleSearch}
        />
      </div>
      <div className="producto-container">
        {productsFiltered.map((product) => (
          <div className="producto" key={product.id}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <p>{product.brand}</p>
              <h3>{product.name}</h3>
              {/* <p>Categoría: {product.category}</p> */}
              <h5>
                <strong>${product.price.toFixed(2)}</strong>
              </h5>
              <button
                className="boton-agregar-carrito"
                onClick={() => handleViewProduct(product.id)}
              >
                Ver producto
              </button>
              <p>Categoría: {product.category}</p>
              <p>Precio: ${product.price.toFixed(2)}</p>
              <button className="boton-agregar-carrito">Ver producto</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
