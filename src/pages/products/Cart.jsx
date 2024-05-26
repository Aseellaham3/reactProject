import React from "react";

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import style from "./Cart.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { cart_context } from "../../context/CartContext";


function Cart() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quantityState, setQuantityState] = useState();
  const { setCartCount } = useContext(cart_context);

  const getProducts = async () => {
    try {
      const token = localStorage.getItem("userToken");

      const { data } = await axios.get(
        `https://ecommerce-node4-five.vercel.app/cart`,

        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setProducts(data.products);
      setIsLoading(false);
      setCartCount(data.count);
    } catch (error) {
      console.log("error");
      setIsLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    getProducts();
  });

  const increseQuantity = async (id, quantity) => {
    try {
      const token = localStorage.getItem("userToken");

      const { data } = await axios.patch(
        `https://ecommerce-node4-five.vercel.app/cart/incraseQuantity`,

        { productId: id }, //body
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setQuantityState(quantity);
      console.log(data);

      setIsLoading(false);
      toast.success("quantity increased 1");
    } catch (error) {
      console.log("error");
      toast.error("quantity  cant increased 1");

      setIsLoading(false);
      setError(true);
    }
  };

  const decreaseQuantity = async (id, quantity) => {
    try {
      const token = localStorage.getItem("userToken");

      const { data } = await axios.patch(
        `https://ecommerce-node4-five.vercel.app/cart/decraseQuantity`,
        { productId: id }, //body

        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setQuantityState(quantity);

      console.log(data);
      console.log(quantityState);

      setIsLoading(false);

      toast.success("quantity decreased 1");
    } catch (error) {
      console.log("error");
      toast.error("quantity  cant increased 1");

      setIsLoading(false);
      setError(true);
    }
  };
  const removeProduct = async (id) => {
    try {
      const token = localStorage.getItem("userToken");

      const { data } = await axios.patch(
        `https://ecommerce-node4-five.vercel.app/cart/removeItem`,
        { productId: id }, //body

        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      console.log(data);
      setIsLoading(false);

      toast.success("product is removed!");
    } catch (error) {
      console.log("error");
      toast.error("error in remove product");

      setIsLoading(false);
      setError(true);
    }
  };
  const checkOut = async () => {
    navigate("/user/profile/order");
  };
  const clearCart = async () => {
    const token = localStorage.getItem("userToken");

    try {
      const { data } = await axios.patch(
        `https://ecommerce-node4-five.vercel.app/cart/clear`,
        {},

        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setCartCount(0);
      console.log(quantityState);

      toast.success("cleared the cart");
      toast.success("the cart is empty");

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    <p>loading...</p>;
  }

  return (
    <>
      {error ?? <p>error while get data</p>}

      <div className={style.cart}>
        <table>
          <thead>
            <tr className={style.productCardHead}>
              <th>product</th>
              <th>price </th>
              <th>get </th>
              <th>total </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr className={style.productCard} key={product._id}>
                <td>
                  <div className={style.product}>
                    <img src={product.details.mainImage.secure_url} />
                    <p > {product.details.name}</p>
                    {/* <p>
                        {" "}
                        {product.details.stock > 0 ? "available" : "sold out"}
                      </p>
          */}
                  </div>
                </td>
                <td>
                  <p className={style.price}> {product.details.price}</p>
                </td>
                <td>
                  <div className={style.quantity}>
                    <button
                      className={style.quantityBtn}
                      onClick={() =>
                        increseQuantity(product.productId, product.quantity)
                      }
                    >
                      +
                    </button>
                    <p>{product.quantity}</p>
                    <button
                      className={style.quantityBtn}
                      onClick={() =>
                        decreaseQuantity(product.productId, product.quantity)
                      }
                    >
                      -
                    </button>
                  </div>
                </td>
                <td>
                  <p> {product.quantity * product.details.price}</p>
                </td>
                <td>
                  <button
                    className={style.quantityBtn}
                    onClick={() => removeProduct(product.productId)}
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className={style.checkOut} onClick={() => checkOut()}>
          Check Out
        </button>
        <button className={style.addCart} onClick={clearCart}>
              Clear cart
            </button>
      </div>

    </>
  );
}

export default Cart;
