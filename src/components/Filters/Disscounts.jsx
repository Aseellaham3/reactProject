import React from "react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import style from "../../pages/products/Products.module.css";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

function Disscounts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);


  const token = localStorage.getItem("userToken");

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-node4-five.vercel.app/products?page=1&limit=10&discount[gte]=1`,
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
    toast.success("products with disscounts");

  },[]);

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <>

      <div className={style.cart}>
        {products.map((product) => (
          <div className={style.productCard} key={product._id}>
            <img src={product.mainImage.secure_url} />
            <h5> {product.name}</h5>
            <p> {product.stock > 0 ? "Available for order" : "Sold Out"}</p>

            <div className={style.price}>
              <p className={style.priceBefor}> {product.price}₪</p>
              <p> {product.finalPrice}₪</p>
            </div>

            <p>
              Rating :
              {Array.apply(null, {
                length: parseFloat(product.avgRating.toFixed(0)),
              }).map((e, i) => (
                <FaStar key={i} fill="yellow" />
              ))}
            </p>
            <Link className={style.details} to={`/products/${product._id}`}>
              Details
            </Link>
          </div>
        ))}
      </div>
     
    </>
  );
}

export default Disscounts;
