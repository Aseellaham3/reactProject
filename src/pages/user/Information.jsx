import UserProfile from "./UserProfile";

import { useEffect, useState } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Styles from "./userProfile.module.css";

function Information() {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState();

  const viewProfile = async () => {
    const token = localStorage.getItem("userToken");

    try {
      const { data } = await axios.get(
        `https://ecommerce-node4-five.vercel.app/user/profile`,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setInfo(data.user);
      setIsLoading(false);
    } catch (error) {
      console.log("error");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    viewProfile();
  }, []);

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <div className={Styles.bg}>
      <div className={Styles.container}>
        <UserProfile />
        <div className={Styles.welcome}>
          <img className={Styles.img} src={info.image.secure_url} />
          <h1> Hello {info.userName}, Welcome!</h1>
        </div>
      </div>
    </div>
  );
}

export default Information;
