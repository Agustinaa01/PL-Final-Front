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
              <option value="">CategoriA</option>
              <option value="Tablet">Tablet</option>
              <option value="Celulares">Celulares</option>
              <option value="Auriculares">Auriculares</option>
              <option value="Laptops">Computadoras</option>
              <option value="Camaras">Camaras</option>
              <option value="Parlantes">Palantes</option>
              <option value="Consolas">Consolas</option>
            </select>
          </div>
        </div>
      </>
    );
}

export default ProductFilter;
