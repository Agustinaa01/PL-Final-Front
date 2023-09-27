import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Products.css";

const Products = () => {
  // Define el array de productos con el nuevo enlace de la imagen
  const products = [
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
  ];

  return (
    <div className="products">
      <h2 className="titulo">Productos</h2>
      <div className="producto-container">
        {products.map((product) => (
          <div className="producto" key={product.id}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>Categoría: {product.category}</p>
              <p>Precio: ${product.price.toFixed(2)}</p>
              <button>Agregar al carrito</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
