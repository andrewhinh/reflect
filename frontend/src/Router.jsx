import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./components/nav/Login";
import SignUp from "./components/nav/SignUp";
import Profile from "./components/nav/Profile";
import ErrorPage from "./components/util/ErrorPage";
import "./styles/main.css";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/profile/:name",
      element: <Profile />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
