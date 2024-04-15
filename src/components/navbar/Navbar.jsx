import React from "react";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './Navbar.module.css';


function Navbar() {
  return (
    <nav>
      <h1 className="nav">Navbar</h1>
      <ul>
        <li>
        <NavLink className="nav_link" to='/'>Home</NavLink>
        </li>
        <li>
        <NavLink className="nav_link" to='/products'>Products</NavLink>

        </li>
        <li>
        <NavLink className="nav_link" to='/signUp'>Sign Up</NavLink>
        </li>
        <li>
        <NavLink className="nav_link" to='/login'>Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
