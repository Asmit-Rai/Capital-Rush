import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/ReactToastify.css"
import "./index.css";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <AppRoutes/>
   <ToastContainer/>
  </React.StrictMode>
);
