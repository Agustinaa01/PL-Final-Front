import './App.css';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';
import New_product from './components/new_product/New_product';
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
    },    {
      path: "/register",
      element: <Register />,
    }, {
      path: "/newProduct",
      element: <New_product />,
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
