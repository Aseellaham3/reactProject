import React from "react";

import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";

import style from "../../pages/products/Products.module.css";
import { FaStar } from "react-icons/fa";
function Search() {
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("userToken");

  const [searchParam] = useSearchParams();


  const Find = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-node4-five.vercel.app/products?${searchParam}`,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      setProducts(data.products);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log("error");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    Find();
  }, []);

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <div className={style.cart}>
        {products.length ? (
          products.map((product) => (
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
          ))
        ) : (
          <div className="notFound">
            <h2>no product found</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default Search;
