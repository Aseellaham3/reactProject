import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./signUp.module.css";

export default function signUp() {

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
  return (
    <>
    <div className={style.signUp}>
      <h1>SignUp Form</h1>
      <label>user name</label>
      <input type='text' name='name' value={user.name} onChange={handleChange}/>
      
      <label>password</label>
      <input type='password' name='password' value={user.password} onChange={handleChange}/>

      <label>confirm password</label>
      <input type='password' name='password' value={user.password} onChange={handleChange}/>

      <input type='button' name='button' value="signUp" />
      </div>
    </>
  )
}

