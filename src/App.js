import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Products from "./components/products/Products";
import Login from "./components/login/Login";
import ProductForm from "./components/productform/ProductForm";
import Register from "./components/register/Register";
import AboutUs from "./components/about-us/aboutUs";
import "react-toastify/dist/ReactToastify.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ProductDetailsForm from "./components/productDetails/productDetails";
import { useContext } from "react";
import { ThemeContext } from "./components/services/theme/ThemeContext";
import Protected from "./components/services/authentication/Protected";
import RolesAuthentication from "./components/services/authentication/RolesAuthentication";
//import EditProductForm from "./components/pedidos/EditProductForm";
import Pedido from "./components/pedidos/Pedidos";
import Users from "./components/users/users";
import EditProfileForm from "./components/EditProfileForm/EditProfileForm";
import EditPedidoForm from "./components/EditPedidoForm/EditPedidoForm";
import Headers from "./components/header/Headers";
import useTokenExpiration from "./hooks/Useapi";


function App() {
  useTokenExpiration();
  const { theme } = useContext(ThemeContext)
  const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/home" /> },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/products",
      element: <Products />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    
    {
      path: "/productForm",
      element:
      <RolesAuthentication>
        <ProductForm />
      </RolesAuthentication> ,
    },
    {
      path: "/users",
      element:
      <RolesAuthentication>
        <Users />
      </RolesAuthentication> ,
    },
    {
      path: "/nosotros",
      element: <AboutUs />,
    },{
      path: "/pedidos",
      element: 
      <Protected>
          <Pedido />
      </Protected>,
    },{
    path: "/users",
    element: 
    <RolesAuthentication>
      <Users />
    </RolesAuthentication>
,
    },
    {
      path: "/productForm/:id",
      element: 
      <RolesAuthentication>
        <ProductForm />
      </RolesAuthentication>,
    },
    {
      path: "/home",
      element:(
        <Dashboard />
        ), 
    },
    {
      path:"/editarPerfil/:id",
      element:<EditProfileForm/>
    },
    {
      path:"/editarPedido/:id",
      element:<EditPedidoForm/>
    },
    {
      path: "/productDetails/:id",
      element:         
        <ProductDetailsForm />
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return (
    <div className={theme === "light" ? "light-theme" : "dark-theme"}>      <RouterProvider router={router} />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@100;600&family=PT+Serif&family=Playfair+Display&display=swap" rel="stylesheet">
      </link>   

       </div>
    
  );
}

export default App;
