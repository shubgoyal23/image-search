import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
   createBrowserRouter,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import { Home, About, Contact, ApiKey } from "./Components/index.js";
import "./index.css"

const router = createBrowserRouter([
   {
      path: "/",
      element: <Layout />,
      children: [
         { path: "", element: <Home /> },
         { path: "/about", element: <About /> },
         { path: "/contact", element: <Contact /> },
         {path: "/apikey", element: <ApiKey />}
      ],
   },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
      <RouterProvider router={router}/>
);
