import { useEffect, useState } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Styles from "./userProfile.module.css";
import { IoLocation } from "react-icons/io5";

function OrderDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("userToken");

  const viewProfile = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-node4-five.vercel.app/order`,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setOrders(data.orders);
      setIsLoading(false);
      console.log(data);
    } catch (error) {
      console.log("error");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    viewProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <>
      <div className={Styles.bg}>
        <div className={Styles.container}>
          <div className={Styles.orderPage}>
            <h1>My Orders<span>({orders.length})</span></h1>
            {orders.map((order) => (
              <div key={order._id} className={Styles.orderDetails}>
                <div className={Styles.start}>
                  <h3>Order {order.status}</h3>
                  <p>
                    <span>Order#</span>
                    {order._id}
                  </p>
                  <div className={Styles.orderView}>
                    <div className={Styles.orderProducts}>
                      {order.products.map((product) => (
                        <img
                          key={product._id}
                          className={Styles.orderImages}
                          src={product.productId.mainImage.secure_url}
                        />
                      ))}
                    </div>

                    <p>
                      <span>Products</span>({order.products.length})
                    </p>
                  </div>
                </div>

                <div className={Styles.end}>
                  <p>
                    <span>Ordered At : </span>
                    {order.createdAt}
                  </p>
                  <p>
                    <IoLocation />
                    {order.address}
                  </p>
                  <p>
                    <span>Total : </span>
                    {order.finalPrice}$
                  </p>
                  <p>
                    <span>Payment Type : </span>
                    {order.paymentType}
                  </p>

                  {order.couponName == "" ? (
                    <></>
                  ) : (
                    <p>
                      <span>Coupon : </span>
                      {order.couponName}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
