import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./login.module.css";

export default function login() {

    const [user, serUser] = useState({
      name:'',
      password:''
    })
    const handleChange = (e)=>{
      const {name,value} = e.target;
      serUser({
        ...user,
        [name]:value
      })
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(user);
    }
  return (
    <>
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

