import { useNavigate } from "react-router";

function alert = () => {
  const DeleteProduct = () => {
    const navigate = useNavigate();

    const handleConfirmClick = () => {
      navigate();
    };

    const handleCancelClick = () => {
      navigate();
    };
  };

  return(
    <div>className='Warning'
      <h1 className="title">ADVERTENCIA</h1>
      <h2 className="text">Esta seguro que quiere eliminar el producto?</h2>
      <button className="Confirm" onClick={handleConfirmClick}>Confirmar</button>
      <button className="Cancel" onClick={handleCancelClick}>Cancelar</button>
      </div>

  )
};