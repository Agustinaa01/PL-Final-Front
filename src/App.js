import './App.css';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Login from './components/login/Login';
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
    },  {
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
