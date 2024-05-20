import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home/Home.jsx";
import Products from "./pages/products/Products.jsx";
import SignUp from "./pages/signUp/SignUp.jsx";
import Login from "./pages/login/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./layout/Root/Root.jsx";
import CategoryDetails from "./components/categories/CategoryDetails.jsx";
import ProtectedRouter from "./components/auth/ProtectedRouter.jsx";
import UserContextProvider from "./context/User.jsx";
import SendCode from './pages/login/SendCode';
import ForgetPassword from './pages/login/ForgetPassword';
import Cart from './pages/products/Cart.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: 
        <ProtectedRouter>
        <Home />
        </ProtectedRouter>,
      },

      {
        path: "/products",
        element: <Products />,
      },

      {
        path: "/cart",
        element: <Cart />,
      },

      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      
      {
        path: "/SendCode",
        element: <SendCode />,
      },
      
      {
        path: "/ForgetPassword",
        element: <ForgetPassword />,
      },
      {
        path: "/category/:id",
        element: <CategoryDetails />,
      },
    ],
  },
]);

function App() {
  return (
    <>
    <UserContextProvider>
      <RouterProvider router={router} />
      <ToastContainer />
      </UserContextProvider>

    </>
  );
}

export default App;
