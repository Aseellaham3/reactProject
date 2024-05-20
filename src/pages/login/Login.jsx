import React, { useContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./Login.module.css";
import { object, string } from "yup";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { UserContext } from "../../context/User";

export default function Login() {
  const { getUserData } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateData = async () => {
    const userSchema = object({
      name: string().min(5).max(20).required(),
      password: string().min(8).max(20).required(),
    });
    try {
      await userSchema.validate(user, { abortEarly: false });
      setErrors([]);
      return true;
    } catch (error) {
      console.log("validation error");
      setErrors(error.errors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `https://ecommerce-node4-five.vercel.app/auth/signin`,
        user
      );
      // JSON.stringify({user})
      console.log(data);
      if (data.message == "success") {
        localStorage.setItem("userToken", data.token);
        getUserData();
        navigate("/");
      }
      //error.response.data.message
    } catch (error) {
      toast.error(error.responce.data.message, {
        position: "bottom-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const SendCode = async () => {
    navigate("/SendCode");
  };

  return (
    <>
      <ul>
        {errors.map((error) => (
          <li>{error}</li>
        ))}
      </ul>
      <form className={style.login} onSubmit={handleSubmit}>
        <h2>Login Form</h2>
        <label>email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />

        <label>password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />

        <button disabled={isLoading ? "disabled" : null}>
          {!isLoading ? "submit" : "wait..."}
        </button>
        <div></div>
        <button onClick={SendCode}>Forget password</button>

      </form>

    </>
  );
}
