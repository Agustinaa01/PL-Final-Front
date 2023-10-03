import React from "react";

const ProductFilter = ({filterCategory, onCategoryChange}) => {

    const handleChange = (event) => {
        onCategoryChange(event.target.value)
    }

    return (
        <>
        <div className="Books-filter">
          <div className="Books-filter__control">
            <select value={filterCategory} onChange={handleChange}>
              <option value="">CATEGORIAS</option>
              <option value="TABLET">tablet</option>
              <option value="SMARTPHONE">celulares</option>
              <option value="AURICULARES">auriculares</option>
              <option value="LAPTOPS">computadoras</option>
              <option value="CAMARAS">camaras</option>
              <option value="PARLANTES">palantes</option>
              <option value="CONSOLAS">consolas</option>
            </select>
          </div>
        </div>
      </>
    );
}

export default ProductFilter;
