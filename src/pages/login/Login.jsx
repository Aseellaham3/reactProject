import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./login.module.css";
import { object, string } from 'yup';


export default function login() {

    const [user, serUser] = useState({
      name:'',
      password:''
    })
    const [errors,setErrors] = useState([]);

    const handleChange = (e)=>{
      const {name,value} = e.target;
      serUser({
        ...user,
        [name]:value
      })
    }

    const validateData = async() => {
      const userSchema = object ({
        name:string().min(5).max(20).required(),
        password:string().min(8).max(20).required(),
        
      });
      try{
        await userSchema.validate(user,{abortEarly:false});
        setErrors([]);
        return true;
      }
      catch(error){
        console.log("validation error" , );
        setErrors(error.errors);
        return false;
      }
    }
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(await validateData());
      console.log(user);
    }
  return (
    <>
    <ul>
      {errors.map(error => <li>{error}</li>)}
    </ul>
      <form className={style.login} onSubmit={handleSubmit}>
      <h1>Login Form</h1>
      <label>user name</label>
      <input type='text' name='name' value={user.name} onChange={handleChange}/>
      
      <label>password</label>
      <input type='password' name='password' value={user.password} onChange={handleChange}/>
      

      <input type='submit'  />
      </form>
    </>
  )
}

