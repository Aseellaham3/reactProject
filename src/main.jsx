import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

/*
const router = createBrowserRouter([
  {
    path: "/",
    element:<></>
    //  element: <div>Hello world!</div>,
  },
]);
*/

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/*<RouterProvider router={router} />*/}
  </React.StrictMode>
);
