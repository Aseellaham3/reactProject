import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import style from "./Login.module.css";
import axios from "axios";
import { UserContext } from "../../context/User";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ForgetPassword() {

  const [user, setUser] = useState({
    email: "",
    password: "",
    code: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const forgetPass = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const { data } = await axios.patch(
        `https://ecommerce-node4-five.vercel.app/auth/sendcode`,
        user
      );

      console.log(data);

    } catch (error) {
      toast.error("vertify your inputs is true");
    }
  };

  return (
    <div className={style.resetPass}>
      <h4>please enter your email to restore it</h4>
      <label>Email</label>

      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
            <label>Password</label>

      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
      />
                  <label>Code</label>

      <input
        type="code"
        name="code"
        value={user.code}
        onChange={handleChange}
      />
      <button onClick={forgetPass}> Send</button>
    </div>
  );
}
