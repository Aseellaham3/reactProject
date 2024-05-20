import React from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./Products.module.css";
import { toast } from "react-toastify";


function Products() {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const getAllProducts = async () => {

    try {
      const token = localStorage.getItem("userToken");

      const { data } = await axios.get(
        `https://ecommerce-node4-five.vercel.app/products?page=1&limit=10`,

        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      setProducts(data.products);

      setIsLoading(false);
    } catch (error) {
      console.log("error");
      setIsLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  if (isLoading) {
    return <p>loading...</p>;
  }


    return (
    <>
      {error ?? <p>error while get data</p>}

      <div className={style.cart}>
        {products.map((product) => (
          <div className={style.productCard} key={product._id}>
            <img src={product.mainImage.secure_url} />
            <p>name {product.name}</p>
            <p> {product.stock > 0 ? "available" : "sold out"}</p>

            <div className={style.price}>
              <p> {product.price}</p>
              <p className={style.finalPrice}> {product.finalPrice}</p>
            </div>
            <p>
              rating {parseFloat((product.avgRating).toFixed(3))}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
