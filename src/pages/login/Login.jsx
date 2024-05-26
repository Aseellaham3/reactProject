import  { useContext } from "react";
import {
  useNavigate,
} from "react-router-dom";
import {  useState } from "react";
import style from "./Login.module.css";
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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

 /* const validateData = async () => {
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
  */

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
        toast.success("login successfully")
      }
      //error.response.data.message
    } catch (error) {
      toast.error("The email or password you’ve entered is incorrect.", {
        position: "bottom-center",
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
