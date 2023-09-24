import React from "react";
import "./Products.css";
const Products = () => {
  // Define el array de productos
  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 899.99,
      category: "Tecnología",
      image: "https://example.com/images/laptop.jpg",
    },
    {
      id: 2,
      name: "Smartphone",
      price: 599.99,
      category: "Tecnología",
      image: "https://example.com/images/smartphone.jpg",
    },
    {
      id: 3,
      name: "Tableta",
      price: 299.99,
      category: "Tecnología",
      image: "https://example.com/images/tablet.jpg",
    },
    {
      id: 4,
      name: "Auriculares inalámbricos",
      price: 79.99,
      category: "Tecnología",
      image: "https://example.com/images/auriculares.jpg",
    },
    {
      id: 5,
      name: "Cámara digital",
      price: 499.99,
      category: "Tecnología",
      image: "https://example.com/images/camara.jpg",
    },
  ];

  return (
    <div>
      <h2>Nuestros Productos</h2>
      <div className="lista-productos">
        {products.map((product) => (
          <div className="producto" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Categoría: {product.category}</p>
            <p>Precio: ${product.price.toFixed(2)}</p>
            <button>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
