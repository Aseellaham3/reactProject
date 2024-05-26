import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import style from "./Categories.module.css";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useContext } from "react";
import { cart_context } from "../../context/CartContext";
import { FaStar } from "react-icons/fa";

const token = localStorage.getItem("userToken");

export function CategoryDetails() {
  const [products, setProducts] = useState([]);
  const { setCartCount } = useContext(cart_context);

  const navigate = useNavigate();
  const { id } = useParams();
  const getProducts = async () => {
    const { data } = await axios.get(
      `https://ecommerce-node4-five.vercel.app/products/category/${id}`
    );
    setProducts(data.products);
  };

  useEffect(() => {
    getProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCart = async (id) => {
    console.log(id);

    try {
      const { data } = await axios.post(
        `https://ecommerce-node4-five.vercel.app/cart`,
        { productId: id }, //body
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setCartCount(data.count);
      toast.success("added to the cart");
      console.log(data);
    } catch (error) {
      console.log(error);

      toast.error("can't add the product to the cart more than one");
      toast.info("you can increase the quantity from cart");
    }
  };
  const clearCart = async () => {
    const token = localStorage.getItem("userToken");

    try {
      const { data } = await axios.patch(
        `https://ecommerce-node4-five.vercel.app/cart/clear`,
        {},

        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      toast.success("cleared the cart");
      toast.success("the cart is empty");

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCart = async () => {
    navigate("/cart");
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.row}>
          {products.length ? (
            products.map((product) => (
              <div className={style.product} key={product._id}>
                <img
                  className={style.productImg}
                  src={product.mainImage.secure_url}
                />
                                <h5>{product.name}</h5>

                <div className={style.price}>
                  <p className={style.priceBefor}> {product.price}₪</p>
                  <p> {product.finalPrice}₪</p>
                </div>
                <p>
              {Array.apply(null, {
                length: parseFloat(product.avgRating.toFixed(0)),
              }).map((e, i) => (
                <FaStar key={i} fill="grey" />
              ))}
            </p>

                <button
                  className={style.addCart}
                  onClick={() => addToCart(product._id)}
                >
                  Add to cart
                </button>
              </div>
            ))
          ) : (
            <div className="notFound">
              <h2>no product found</h2>
            </div>
          )}
        </div>
        {products.length ? (
          <div className={style.rowBtn}>
            <button className={style.addCart} onClick={clearCart}>
              Clear cart
            </button>
            <button className={style.addCart} onClick={getCart}>
              View cart
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default CategoryDetails;
