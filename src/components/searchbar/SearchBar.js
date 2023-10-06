import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar /**/ = ({ searchTerm /*valor actual de la busqueda*/ , onSearch }) => {

    const handleSearch =(event) => {
        onSearch (event.target.value) 
    } /*handleSearch es el evento que se encarga de tomar el valor del campo de busqueda(lo que el usuario escribio) */

  return (
    <div className="search-bar">
      <input className="input-search"
        type="text"
        placeholder="Buscar producto..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
