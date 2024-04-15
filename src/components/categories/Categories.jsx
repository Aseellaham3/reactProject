import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./Categories.module.css";


function Categories() {
  
  const[categories,setCategories] = useState([]);
  const[isLoading,setIsLoading] = useState(true);
  const[error,setError] = useState(false);

  const getCategories = async ()=>{
    try{
    const {data} = await axios.get(`https://ecommerce-node4-five.vercel.app/categories/active?limit=9`);
    setCategories(data.categories);
    setIsLoading(false);
    }
    catch(error){
      console.log("error");
      setIsLoading(false);
      setError(true);
    }finally{
      
    }
  };
  useEffect ( ()=>{
    getCategories();
  },[] )

  if(isLoading){
    return <p>loading...</p>
  }

  return (
    <>
    {error??<p>error while get data</p>}

    <div className={style.categ}>   
    
     {categories.map(category => 
      <div className= {style.category} key={category._id}>
        <img src={category.image.secure_url} />

      </div>)
      }
      </div>
      </>

  )
}

export default Categories
