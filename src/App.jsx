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
import SendCode from "./pages/login/SendCode";
import ForgetPassword from "./pages/login/ForgetPassword";
import Cart from "./pages/products/Cart.jsx";
import ProductDetails from "./pages/products/ProductDeatils.jsx";
import Review from "./pages/products/Review.jsx";
import UserProfile from "./pages/user/UserProfile.jsx";
import Information from "./pages/user/Information.jsx";
import Contact from "./pages/user/Contact.jsx";
import Order from "./pages/user/Order.jsx";
import Search from "./components/search/Search.jsx";
import Filters from "./components/Filters/Filters";
import FiltersResult from "./components/Filters/FiltersResult.jsx";
import Disscounts from "./components/Filters/Disscounts.jsx";
import Sort from "./components/Filters/Sort.jsx";
import CartContextProvider from "./context/CartContext.jsx";
import OrderDetails from "./pages/user/OrderDetails.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import SearchContextProvider from "./context/SearchContext.jsx";
import SortContextProvider from "./context/SortContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRouter>
            <Home />
          </ProtectedRouter>
        ),
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
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/review/:id",
        element: <Review />,
      },
      {
        path: "/user",
        element: <UserProfile />,
      },
      {
        path: "/user/profile",
        element: <Information />,
      },
      {
        path: "/user/profile/contact",
        element: <Contact />,
      },
      {
        path: "/user/profile/order",
        element: <Order />,
      },
      {
        path: "/orderDetails",
        element: <OrderDetails />,
      },
     
      {
        path: "/filters",
        element: <Filters />,
      },
      {
        path: "/filtersResult/:maxPrice?/:minPrice?",
        element: <FiltersResult />,
      },
      {
        path: "/disscounts",
        element: <Disscounts />,
      },

      {
        path: "/sort",
        element: <Sort />,
      },
    ],
  },
]);

function App() {
  return (
    <>
  <SearchContextProvider>
  <SortContextProvider>

      <CartContextProvider>
        <UserContextProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </UserContextProvider>
      </CartContextProvider>
      </SortContextProvider>


      </SearchContextProvider>

    </>
  );
}

export default App;
