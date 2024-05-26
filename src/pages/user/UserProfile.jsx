import {  Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Styles from "./userProfile.module.css";

function UserProfile() {
 

  return (
    <>

        <nav className={Styles.profileNav}>
          <Link className="nav_link" to="/user/profile">
            <span>Information</span>
          </Link>

          <Link className="nav_link" to="/user/profile/contact">
          <span> Contact</span>
          </Link>

          <Link className="nav_link" to="/user/profile/order">
          <span>Order</span>
          </Link>
          <Link className="nav_link" to="/orderDetails">
          <span>View Order</span>
            </Link>
        </nav>
        

     
     

    </>
  );
}

export default UserProfile;
