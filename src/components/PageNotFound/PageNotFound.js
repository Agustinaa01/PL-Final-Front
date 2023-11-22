import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./PageNotFound.css";

const PageNotFound = () => {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate("/home");
  };
  return (
    <div className="body">
    <div className="container404">
      <h1 className="titulo-page-not-found">404</h1>
      <h3>No podemos encontrar la pagina que estas buscando</h3>
      <button className="inicio-button" onClick={goBackHandler} variant="primary">
        Volver al inicio
      </button>
    </div>
    </div>
  );
};


export default PageNotFound;