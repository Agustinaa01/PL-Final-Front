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

function App() {

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
      element: <ProductForm />,
    },
    {
      path: "/nosotros",
      element: <AboutUs />,
    },
    {
      path: "/productForm/:id",
      element: <ProductForm />,
    },
    {
      path: "/home",
      element:(
        <Dashboard />
        ), 
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
    <div style={{height: "100%"}} className={`${theme === "light" && "light-theme"}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
