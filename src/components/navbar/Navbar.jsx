import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import style from "./Navbar.module.css";
import { UserContext } from "../../context/User.jsx";

function Navbar() {
  const navigate = useNavigate();
  const { userName, setUserName } = useContext(UserContext);
  console.log(useContext(UserContext));

  const logout = () => {
    localStorage.removeItem("userToken");
    setUserName("");
    navigate("/login");
  };

  return (
    <nav>
      <h1 className={style.nav}>Aseel Boutique</h1>
      <ul>
        {userName.length > 0 ? (
          <ul>
             <li>
              <NavLink  to="/">
                welcome {userName}
              </NavLink>
            </li>
            <li>
            <NavLink className="nav_link"  to="/">
                Home
              </NavLink>
            </li>
            <li>
            <NavLink className="nav_link"  to="/products">
                Products
              </NavLink>
            </li>

            <li>
            <NavLink className="nav_link"  to="/cart">
                Cart
              </NavLink>
            </li>

         
            <li>
              <button onClick={logout} className={style.logoutBtn}>Log Out</button>
            </li>
          </ul>
        ) : (
          <ul>
          <li>
          <NavLink className={style.nav_link} to="/signUp">
              Sign Up
            </NavLink>
            </li>
            <li>
            <NavLink className={style.nav_link} to="/login">
                Login
              </NavLink>
            </li>
          </ul>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
