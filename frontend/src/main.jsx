import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Utils/authContext.jsx";
import { Layout } from "./Utils/layouts.jsx";
import Error from "./Pages/Error.jsx";
import Home from "./Pages/Home.jsx";
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
                children: [
                    {
                        path: "/events",
                        element: <InterviewHome />,
                    },
                ],
            },
            {
                path: "/interview/*",
                element: <Interview />,
                children: [
                    {
                        path: ":question",
                        element: <InterviewQuestion />,
                    },
                ],
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
