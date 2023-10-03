import './App.css';
import Dashboard from './components/dashboard/Dashboard'
import PageNotFound from './components/PageNotFound/PageNotFound';
import Products from './components/products/Products';
import Login from './components/login/Login';
import ProductForm from './components/productform/ProductForm';
import Register from './components/register/Register';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/home" /> },
    {
      path: "/login",
      element: <Login />,
    }, {
      path: "/home",
      element: <Dashboard />,
    }, 
    {
      path: "/product/:id",
      element: <Products />,
    },    {
      path: "/register",
      element: <Register />,
    }, {
      path: "/productForm",
      element: <ProductForm />,
    }, 
   {
    path: "/home",
    element: <Dashboard />,
  }, 
     {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return (
    <div >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
