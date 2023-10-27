import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";

import { AuthProvider } from "./components/auth/AuthContext";
import "./styles/main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>
);
