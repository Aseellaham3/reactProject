import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import axios from "axios";
import { UserContext } from "../../context/User";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SendCode() {
  const navigate = useNavigate();

  const [emailUser, setEmailUser] = useState({
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailUser({
      ...emailUser,
      [name]: value,
    });
  };

  const sendCodeFun = async (e) => {
    e.preventDefault();
    console.log(emailUser);

    try {
      const { data } = await axios.patch(
        `https://ecommerce-node4-five.vercel.app/auth/sendcode`,
        emailUser
      );

      console.log(data);
      navigate("/ForgetPassword");

    } catch (error) {
      toast.error("error in email, can't send code");
    }
  };

  return (
    <div className={style.resetPass}>
      <h5>enter your email to send code</h5>
      <input
        type="email"
        name="email"
        value={emailUser.email}
        onChange={handleChange}
      />
      <button onClick={sendCodeFun}> Send</button>
    </div>
  );
}
