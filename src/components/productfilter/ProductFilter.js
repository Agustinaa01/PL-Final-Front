import React from "react";
import "./ProductFilter.css"

const ProductFilter = ({filterCategory, onCategoryChange}) => {

    const handleChange = (event) => {
      onCategoryChange(event.target.value)
    } //funcion que guarda la nueva categoria seleccionada

    return (
        <>
        <div className="products-filter">
          <div className="products-filter__control">
            <select value={filterCategory} onChange={handleChange}>
              <option value="">CATEGORIAS</option>
              <option value="Tablet">Tablet</option>
              <option value="Celulares">celulares</option>
              <option value="Auriculares">auriculares</option>
              <option value="Laptops">computadoras</option>
              <option value="Camaras">camaras</option>
              <option value="Parlantes">palantes</option>
              <option value="Consolas">consolas</option>
            </select>
          </div>
        </div>
      </>
    );
}

export default ProductFilter;
