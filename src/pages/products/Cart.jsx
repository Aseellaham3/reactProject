import React from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./Cart.module.css";
import { toast } from 'react-toastify';



function Cart() {
  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const getProducts = async () => {
    try {
        
        const token = localStorage.getItem("userToken");
    
              const { data } = await axios.get(
            `https://ecommerce-node4-five.vercel.app/cart`,
      
            { headers: {
               Authorization: `Tariq__${token}`} 
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
    getProducts();
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
                    <img src={product.details.mainImage.secure_url}/>
                    <p>name {product.details.name}</p>
                    <p> {product.details.stock>0?  "available" : "sold out"}</p>

               

                  
                  <p>price {product.quantity*product.details.price}</p>
                  <div className={style.quantity}>
                    <button className={style.quantityBtn}>+</button> 
                    <p>{product.quantity}</p>
                    <button className={style.quantityBtn}>-</button> 
                  </div>
                  <h2>x</h2>
                </div>
            ))}
          </div>


    
    </>
  );
}

export default Cart;
