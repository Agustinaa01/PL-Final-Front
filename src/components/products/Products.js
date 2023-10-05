import "./Products.css";
import { useNavigate } from "react-router";
import Headers from "../header/Headers";
import ProductFilter from "../productfilter/ProductFilter";
import { useState } from "react";
import SearchBar from "../searchbar/SearchBar";


const PRODUCTS = [
  {
    id: 1,
    name: "Laptop",
    price: 899.99,
    category: "Laptops",
    image: "https://cdn.create.vista.com/api/media/medium/200319374/stock-photo-close-view-laptop-blank-screen-wooden-tabletop-black-wall-backdrop?token=",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 599.99,
    category: "Celulares",
    image: "https://cdn.create.vista.com/api/media/medium/200319374/stock-photo-close-view-laptop-blank-screen-wooden-tabletop-black-wall-backdrop?token=",
  },
  {
    id: 3,
    name: "Tableta",
    price: 299.99,
    category: "Tablet",
    image: "https://cdn.create.vista.com/api/media/medium/200319374/stock-photo-close-view-laptop-blank-screen-wooden-tabletop-black-wall-backdrop?token=",
  },
  {
    id: 4,
    name: "Auriculares inalámbricos",
    price: 79.99,
    category: "Auriculares",
    image: "https://cdn.create.vista.com/api/media/medium/200319374/stock-photo-close-view-laptop-blank-screen-wooden-tabletop-black-wall-backdrop?token=",
  },
  {
    id: 5,
    name: "Cámara digital",
    price: 499.99,
    category: "Camaras",
    image: "https://cdn.create.vista.com/api/media/medium/200319374/stock-photo-close-view-laptop-blank-screen-wooden-tabletop-black-wall-backdrop?token=",
  },
  {
    id: 6,
    name: "Parlantes",
    price: 99.99,
    category: "Parlantes",
    image: "https://cdn.create.vista.com/api/media/medium/200319374/stock-photo-close-view-laptop-blank-screen-wooden-tabletop-black-wall-backdrop?token=",
  },
  {
    id: 7,
    name: "XBOX",
    price: 999.99,
    category: "Consolas",
    image: "https://cdn.create.vista.com/api/media/medium/200319374/stock-photo-close-view-laptop-blank-screen-wooden-tabletop-black-wall-backdrop?token=",
  },
  {
    id: 8,
    name: "Auriculares",
    price: 4099.99,
    category: "Auriculares",
    image: "https://cdn.create.vista.com/api/media/medium/200319374/stock-photo-close-view-laptop-blank-screen-wooden-tabletop-black-wall-backdrop?token=",
  },
];

const Products = () => {
  const[products, setProducts] = useState(PRODUCTS);
  const[productsFiltered, setProductsFiltered] = useState(PRODUCTS);
  const[filterCategory,setFilterCategory] = useState(""); //estado almacena la categoria de productos seleccinada actualmente
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();


  const handleProductForm = () => {
    navigate("/productForm")
  };

  //const handleFilterCategoryChange = (category) => {
    //setFilterCategory(category); 
    //setProductsFiltered(prevProducts => products.filter(product => product.category === category)) /
  //} 


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
      setProductsFiltered(prevProducts =>
        products.filter(product => product.category === category)
      );
    }
  }
  
  const handleSearch = (term) => {
    setSearchTerm(term);

    // Filtra los productos por término de búsqueda.
    setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(term.toLowerCase())));

  }
  
  

  
  return (
    <div className="products">
      <Headers />
      <ProductFilter filterCategory={filterCategory} onCategoryChange={handleFilterCategoryChange} />
      <SearchBar onSearch={handleSearch} />
      <h1 className="titulo">Productos</h1>
        <div className="producto-container">
        <button className="boton-agregar-producto" onClick={handleProductForm}>
        Agregar producto
        </button>
          {productsFiltered.map((product) => (
            <div className="producto" key={product.id}>
              <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>Categoría: {product.category}</p>
              <p>Precio: ${product.price.toFixed(2)}</p>
              <button className="boton-agregar-carrito">Agregar al carrito</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;