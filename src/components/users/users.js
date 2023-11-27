import { useEffect, useState } from "react";
import { jwtDecode as jwt_decode } from "jwt-decode";
import "./users.css";
import Headers from "../header/Headers";
import { ToastContainer, toast } from "react-toastify";

const Users = ({}) => {
  const [user, setUser] = useState(null);
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
      }) // This closing parenthesis was moved up
      .then((data) => {
        console.log(data);
        setUser(data);
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

  return (
    <div>
      <Headers />
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />

      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-uppercase mb-0">Usuarios</h5>
              </div>
              <div class="table-responsive">
                <table class="table no-wrap user-table mb-0">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        class="border-0 text-uppercase font-medium pl-4"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        class="border-0 text-uppercase font-medium"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        class="border-0 text-uppercase font-medium"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        class="border-0 text-uppercase font-medium"
                      >
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {user &&
                      user.map((item, index) => (
                        <tr key={index}>
                          <td class="pl-4">{index + 1}</td>
                          <td>
                            <h5 class="font-medium mb-0">{item.name}</h5>
                          </td>
                          <td>
                            <span class="text-muted">{item.email}</span>
                          </td>
                          <td>
                            <span class="text-muted">
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
                              class="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                              onClick={() => handleEliminate(item.id)}
                            >
                              <i class="fa fa-trash"></i>{" "}
                            </button>
                            <button
                              type="button"
                              class="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                            >
                              <i class="fa fa-edit"></i>{" "}
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
