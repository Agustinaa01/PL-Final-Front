import './App.css';
import Dashboard from './components/dashboard/Dashboard'
import PageNotFound from './components/PageNotFound/PageNotFound';
import Login from './components/login/Login';
import ProductForm from './components/newproduct/NewProduct';
import Register from './components/register/Register';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/login" /> },
    {
      path: "/login",
      element: <Login />,
    }, {
      path: "/home",
      element: <Dashboard />,
    },    {
      path: "/register",
      element: <Register />,
    }, {
      path: "/newProduct",
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
