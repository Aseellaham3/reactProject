import {  useState } from "react";
import style from "./signUp.module.css";
import axios from "axios";

import { toast } from 'react-toastify';


export default function SignUp() {

  const [isLoading, setIsLoading] = useState(false);


    const [user, serUser] = useState({
      userName:'',
      email:'',
      password:'',
      image:''
    })
/*
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
   */ 
    
    const handleChange = (e)=>{
      const {name,value} = e.target;
      serUser({
        ...user,
        [name]:value
      })
    }

    const handleImageChange = (e)=>{
      const {name,files} = e.target;
      console.log(files[0]);
      serUser({
        ...user,
        [name]:files[0],
      });
    }
    
    const handleSubmit =  (e) => {
      e.preventDefault();
      setIsLoading(true);
      try{

      
      console.log(user);
      const formData = new FormData();
      formData.append('userName' , user.userName);
      formData.append('email' , user.email);
      formData.append('password' , user.password);
      formData.append('image' , user.image);

      const {data} = axios.post(`https://ecommerce-node4-five.vercel.app/auth/signup` , formData);
      toast.success("welcome")

      console.log(data);
      }
      catch(error){
        console.log(error);
      }
      finally{
        setIsLoading(false);
      }
    }
  return (
    <>
      <form className={style.signUp} onSubmit={handleSubmit}>
      <h2>Sign Up Form</h2>
      <label>user name</label>
      <input type='text' name='userName' value={user.userName} onChange={handleChange}/>
      
      <label>email</label>
      <input type='email' name='email' value={user.email} onChange={handleChange}/>
      
      <label>password</label>
      <input type='password' name='password' value={user.password} onChange={handleChange}/>
      

      <label>image</label>
      <input type='file' name='image' onChange={handleImageChange}/>
      <button disabled={isLoading?'disabled':null}>
        {!isLoading?'Register':'wait...'}
      </button>

      </form>
    </>
  )
  }

