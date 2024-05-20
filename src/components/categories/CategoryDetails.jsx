import { useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import style from "./Categories.module.css";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const token = localStorage.getItem("userToken");
export function CategoryDetails() {
  const [products, setProducts] = useState([]);

  const { id } = useParams();
  const getProducts = async () => {
    const { data } = await axios.get(
      `https://ecommerce-node4-five.vercel.app/products/category/${id}`    );
    setProducts(data.products);

  };
  
  useEffect(() => {
    getProducts();
 
  }, []);

  const addToCart = async (id) => {
    console.log(id);

    try{
    const token = localStorage.getItem("userToken");

          const { data } = await axios.post(
        `https://ecommerce-node4-five.vercel.app/cart`,
        { productId: id, }, //body
  
        { headers: {
           Authorization: `Tariq__${token}`} 
          }
  
      );
      toast.success("added to the cart");
      console.log(data);
    }catch(error){
      toast.error("can't add the product to the cart more than one ");

    }
  };


  const clearCart = async () => {
    const token = localStorage.getItem("userToken");

    try{
      const { data } = await axios.patch(
        `https://ecommerce-node4-five.vercel.app/cart/clear`,
        {},
  
        { headers: {
           Authorization: `Tariq__${token}`} 
          }
  
      );
      toast.success("cleared the cart");
      toast.success("the cart is empty");

      console.log(data);
    }
    catch(error){
      console.log(error);
    }
      
  }
 
 
 
  const getCart = async () => {
    const token = localStorage.getItem("userToken");

    try{
      const { data } = await axios.get(
        `https://ecommerce-node4-five.vercel.app/cart`,
      
  
        { headers: {
           Authorization: `Tariq__${token}`} 
          }
  
      );

      console.log(data.products);
    }
    catch(error){
      console.log("error get cart");
    }
      
  }
 
 
  return (
    <>
      <div className={style.container}>
        <div className={style.row}>
          {products.length ? (
            products.map((product) => 
              <div className={style.product} key={product._id}>
                <h5 >{product.name}</h5>
                <img
                  className={style.productImg}
                  src={product.mainImage.secure_url}
                />
                <button className={style.addCart}  onClick={()=>addToCart(product._id)} >
                  Add to cart
                </button>
              </div>
              
              
              
            )
            
          )
          
      
        
           : (
            <h2>no product found</h2>
          )}
          
        </div>
       
        <div className={style.rowBtn}>
        <button className={style.addCart} onClick={clearCart} >
          Clear cart
        </button>
        <button className={style.addCart} onClick={getCart} >
          View cart
        </button>
        </div>
        </div>
    </>
  );
}

export default CategoryDetails;
