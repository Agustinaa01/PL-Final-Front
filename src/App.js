import './App.css';
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
    },
  ]);
  return (
    <div >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
