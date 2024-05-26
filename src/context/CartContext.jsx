import { createContext, useEffect, useState } from "react";
import axios from "axios";
// eslint-disable-next-line react-refresh/only-export-components
export const cart_context = createContext();

// eslint-disable-next-line react/prop-types
const CartContextProvider = ({children}) => {
  const [cartCount, setCartCount] = useState(0);

  const getCartCount = async () => {
    const token = localStorage.getItem("userToken");

    const { data } = await axios.get(
      `https://ecommerce-node4-five.vercel.app/cart`,

      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );

    setCartCount(data.products.length);
  };
  useEffect(() => {
    getCartCount();
});

  return (
    <cart_context.Provider value={{ cartCount, getCartCount, setCartCount }}>
      {children}
    </cart_context.Provider>
  );
};

export default CartContextProvider;
