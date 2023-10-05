import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch, searchTerm }) => {

    const handleSearch =(event) => {
        onSearch (event.target.value)
    } 

  return (
    <div className="search-bar">
      <input className="input-search"
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
