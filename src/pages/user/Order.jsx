import UserProfile from "./UserProfile";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Styles from "./userProfile.module.css";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Order() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState({
    address: "",
    phone: "",
  });

  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("userToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrders({
      ...orders,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (products.length > 0) {
        const { data } = await axios.post(
          `https://ecommerce-node4-five.vercel.app/order`,
          orders,

          {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          }
        );
        console.log(data);
        console.log(orders.address);
        console.log(orders.phone);

        if (data.message == "success") {
          toast.success("order successfully");
          toast.info(`status: ${data.order.status}`);
          navigate("/orderDetails");
        }
      } else {
        toast.error("the cart is empty!");
      }
    } catch (error) {
      if (orders.address == "" && orders.phone == "") {
        toast.error("address and phone number is required");
        console.log(error.message);
      }
      toast.error(error.response.status);

      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-node4-five.vercel.app/cart`,

        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setProducts(data.products);
      setIsLoading(false);
    } catch (error) {
      console.log("error");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  });


  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <>
      <div className={Styles.bg}>
        <div className={Styles.container}>
        <UserProfile />

          <div className={Styles.welcome}>
            <form className={Styles.order} onSubmit={handleSubmit}>
              <h2>Creat Order</h2>
              <label>Coupon Name</label>
              <input
                type="text"
                name="couponName"
                onChange={handleChange}
                placeholder="enter if you have coupon"
              />

              <label>address</label>
              <input
                type="text"
                name="address"
                value={orders.address}
                onChange={handleChange}
              />

              <label>phone</label>
              <input
                type="text"
                name="phone"
                value={orders.phone}
                onChange={handleChange}
              />

              <button> Creat Order</button>
            </form>
          </div>
          <div className={Styles.cart}>
            {products.map((product) => (
              <div key={product._id}>
                <img
                  className={Styles.cartImg}
                  src={product.details.mainImage.secure_url}
                />
                <p> Quantity is {product.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
