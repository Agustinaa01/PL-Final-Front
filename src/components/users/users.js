import { useEffect, useState } from "react";
import { jwtDecode as jwt_decode } from "jwt-decode";
import "./users.css";
import Headers from "../header/Headers";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";

const Users = ({ }) => {
  const [user, setUser] = useState(null);
  const [pedidos, setPedidos] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`https://localhost:7108/api/Users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else if (
          response.headers.get("content-type").includes("application/json")
        ) {
          return response.json();
        } else {
          throw new Error(
            `Unexpected content-type! Expected "application/json", got ${response.headers.get(
              "content-type"
            )}`
          );
        }
      })
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    fetch(`https://localhost:7108/api/Pedido/pedido`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else if (
          response.headers.get("content-type").includes("application/json")
        ) {
          return response.json();
        } else {
          throw new Error(
            `Unexpected content-type! Expected "application/json", got ${response.headers.get(
              "content-type"
            )}`
          );
        }
      })
      .then((data) => {
        console.log(data);
        setPedidos(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleEliminate = (userId) => {
    fetch(`https://localhost:7108/api/Users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setUser(user.filter((item) => item.id !== userId));
        toast.success("¡Usuario eliminado!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEditar = (item) => {
    if (item && item.id) {
      navigate(`/editarPerfil/${item.id}`, {
        state: { UserSelected: item },
      });
    } else {
      console.error("ID del usuario no encontrado en item.");
    }
  };

  const handleEditarPedido = (item) => {
    if (item && item.id) {
      navigate(`/editarPedido/${item.id}`, {
        state: { UserSelected: item },
      });
    } else {
      console.error("ID del pedido no encontrado en item.");
    }
  };

  const handleEliminatePedido = (itemId) => {
    fetch(`https://localhost:7108/api/Pedido/${itemId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          setPedidos(pedidos.filter(item => item.id !== itemId));
          toast.success("¡Pedido eliminado!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
        } else {
          // Handle error
          toast.error('Ocurrió un error. Por favor, inténtelo de nuevo.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        // Handle network error
        toast.error('Ocurrió un error de red. Por favor, inténtelo de nuevo.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        console.error("Error:", error);
      });
  };

  return (
    <div className="panel">
      <Headers />
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-uppercase mb-0">Usuarios</h5>
              </div>
              <div className="table-responsive">
                <table className="table no-wrap user-table mb-0">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium pl-4" >#
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {user &&
                      user.map((item, index) => (
                        <tr key={index}>
                          <td className="pl-4">{index + 1}</td>
                          <td>
                            <h5 className="font-medium mb-0">{item.name}</h5>
                          </td>
                          <td>
                            <span className="text-muted">{item.email}</span>
                          </td>
                          <td>
                            <span className="text-muted">
                              {item.rol === 0
                                ? "Admin"
                                : item.rol === 1
                                  ? "User"
                                  : "SuperAdmin"}
                            </span>
                          </td>

                          <td>
                            <button
                              type="button"
                              className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                              onClick={() => handleEliminate(item.id)}
                            >
                              <i className="fa fa-trash"></i>{" "}
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                              onClick={() => handleEditar(item)}
                            >
                              <i className="fa fa-edit"></i>{" "}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-uppercase mb-0">Pedidos</h5>
              </div>
              <div className="table-responsive">
                <table className="table no-wrap user-table mb-0">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium pl-4"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        Fecha
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        Estado
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        Usuario
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidos &&
                      pedidos.map((pedido, index) => (
                        <tr key={index}>
                          <td className="pl-4">{index + 1}</td>
                          <td>
                            <h5 className="font-medium mb-0">
                              {new Date(pedido.date).toLocaleDateString()} {new Date(pedido.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </h5>
                          </td>
                          <td>
                            <span className="text-muted">{pedido.id}</span>
                          </td>
                          <td>
                            <span className="text-muted">{pedido.state}</span>
                          </td>
                          <td>
                            <span className="text-muted">{pedido.userId}</span>
                          </td>

                          <td>
                            <button
                              type="button"
                              className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                              onClick={() => handleEliminatePedido(pedido.id)}
                            >
                              <i className="fa fa-trash"></i>{" "}
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                              onClick={() => handleEditarPedido(pedido)}
                            >
                              <i className="fa fa-edit"></i>{" "}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};
export default Users;
