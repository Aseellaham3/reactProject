import { useParams } from "react-router-dom";
import axios from "axios";
import React from 'react';
import style from "./Categories.module.css";

import { useEffect, useState } from "react";

const token = localStorage.getItem('userToken');
function CategoryDetails() {
  const [products, setProducts] = useState([]);

  const { id } = useParams();
  const getProducts = async () => {
    const { data } = await axios.get(
      `https://ecommerce-node4-five.vercel.app/products/category/${id}`

    );
    setProducts(data.products)
  };

  const addToCart = async () => {
    const { data } = await axios.post(
      `https://ecommerce-node4-five.vercel.app/cart`, 
      { productId : id },
      { headers: {
        Authorization : `Tariq__${token}`
      }}
    );
    setProducts(data.products)
  };


  useEffect(() => {
    getProducts();
  }, []);
  console.log(id);
  return (
    <>
      <div className="container">
        <div className={style.row}>
          {products.length ? (
            products.map(product => 
              <div className= {style.product}key={product._id}>
                <h5>{product.name}</h5>
                <img className={style.productImg} src={product.mainImage.secure_url} />
                <button className={style.addCart} onClick={addToCart}> Add to cart </button>

              </div>
            )
          ) : (
            <h2>no product found</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default CategoryDetails;
