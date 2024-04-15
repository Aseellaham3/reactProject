import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./pages/home/Home.jsx";
import Products from "./pages/products/Products.jsx";
import SignUp from "./pages/signUp/SignUp.jsx";
import Login from "./pages/login/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./layout/Root/Root.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
     

      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/signUp',
        element: <SignUp />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

function App() { 


  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
