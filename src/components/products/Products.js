import React, { useContext, useEffect } from "react";
import "./Products.css";
import { useNavigate } from "react-router";
import Headers from "../header/Headers";
import ProductFilter from "../productfilter/ProductFilter";
import { useState } from "react";
import SearchBar from "../searchbar/SearchBar";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../services/theme/ThemeContext";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { AuthenticationContext } from "../services/authentication/AuthenticationContext";
import BeatLoader from "react-spinners/BeatLoader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState(products);
  const [filterCategory, setFilterCategory] = useState(""); //estado almacena la categoria de productos seleccinada actualmente
  const [searchTerm, setSearchTerm] = useState(""); //estado que se utiluza para lamacenar el termino de busqueda actual
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://localhost:7108/api/Producto")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setProductsFiltered(data);
        setIsLoading(false);
        console.log(data)
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  }, []);


  const handleProductForm = () => {
    navigate("/productForm");
  };

  const handleFilterCategoryChange = (category) => {
    if (category === "") {
      // Si se selecciona "CATEGORIAS", establece filterCategory en una cadena vacía
      // para mostrar todos los productos.
      setFilterCategory("");

      // Restaura la lista completa de productos (PRODUCTS)
      setProductsFiltered(products);
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
  let decodedToken;
  const token = localStorage.getItem("authToken");
  if (typeof token === "string") {
    decodedToken = jwt_decode(token);
  }

  const handleSearch = (term) => {
    if (term === "") {
      setSearchTerm(term);
      setProductsFiltered(products);
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

  const { theme } = useContext(ThemeContext);
  const isLightTheme = theme === "light";
  const textProduct = isLightTheme ? "light-text" : "dark-text";
  const productInfoText = isLightTheme
    ? "light-product-text"
    : "dark-product-text";
  const productBackgroundProduct = isLightTheme
    ? "light-product-background"
    : "dark-product-background";
  const productBackground = isLightTheme
    ? "light-background"
    : "dark-background";
  const { user } = useContext(AuthenticationContext);

  return (
    <div className={`${productBackground}`}>
      <Headers />
      <h1 className={`titulo ${textProduct}`}>NUESTROS PRODUCTOS</h1>
      {user &&
      decodedToken &&
        (decodedToken.role === "Admin" ||
          decodedToken.role === "SuperAdmin") && (
          <button
            className="boton-agregar-producto"
            onClick={handleProductForm}
          >
            Agregar producto
          </button>
        )}

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
      {isLoading ? (
      <BeatLoader color={"#ffff"} loading={isLoading} size={13} />
    ) : productsFiltered.length === 0 ? (
      <p>No hay productos disponibles.</p>
    ) : (
      <div className="producto-container">
        {productsFiltered.map((product) => (
          <div
            className={`${productBackgroundProduct}`}
            key={product.id}
            onClick={() => handleViewProduct(product.id)}
          >
            <div className="product-image">
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="product-info">
              <p className={`${productInfoText}`}>{product.brand}</p>
              <h3 className={`${productInfoText}`}>{product.name}</h3>
              <h5>
                <strong className={`${productInfoText}`}>
                  ${product.price.toFixed(2)}
                </strong>
              </h5>
            </div>
          </div>
        ))}
      </div>
          )}
    </div>
  );
};

export default Products;
