import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Utils/authContext.jsx";
import { Layout } from "./Utils/layout.jsx";
import Error from "./Pages/Error.jsx";
import Home from "./Pages/Home.jsx";
import Interview from "./Pages/Interview.jsx";
import Results from "./Pages/Results.jsx";
import LogIn from "./Pages/LogIn.jsx";
import SignUp from "./Pages/SignUp.jsx";
import ChangePassword from "./Pages/ChangePassword.jsx";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/interview",
                element: <Interview />,
            },
            {
                path: "/results",
                element: <Results />,
            },
            {
                path: "/login",
                element: <LogIn />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/changepassword",
                element: <ChangePassword />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    //<React.StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
    //</React.StrictMode>
);
