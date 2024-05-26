import { useParams , useNavigate } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import style from "./Products.module.css";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { useContext } from "react";
import "swiper/css";
import { cart_context } from "../../context/CartContext";
// const token = localStorage.getItem("userToken");

export function ProductDetails() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [success, setSuccess] = useState();
  const [avgRating, setAvgRating] = useState();
  const { setCartCount } = useContext(cart_context);

 


  const { id } = useParams();
  
  const getProducts = async () => {
    let { data } = await axios.get(
      `https://ecommerce-node4-five.vercel.app/products/${id}`
    );

    setProducts(data.product);
    setAvgRating(data.avgRating);
    setSuccess(data.message);
  };

  useEffect(() => {
    getProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCart = async (id) => {
    console.log(id);

    try {
      const token = localStorage.getItem("userToken");

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
      toast.error("can't add the product to the cart more than one ");
    }
  };
  const reviewPage = async (id) => {
    navigate(`/review/${id}`);
  }

  


  return (
    <>
      <div className={style.container}>
        {success == "success" ? (
          <div className={style.product}>
            <div className={style.images}>
              <img
                className={style.mainImagePrd}
                src={products.mainImage.secure_url}
              />
              <div className={style.subImages}>
                {products.subImages.map((image) => (
                  <div key={image.public_id}>
                    <img src={image.secure_url} />
                  </div>
                ))}
              </div>
            </div>

            <div className={style.productDetails}>
              <div className={style.prodDesc}>
                <div className={style.productHeader}>
                  <p>{products.name}</p>
                  <p>
                    Rating :
                    {Array.apply(null, {
                      length: parseFloat(avgRating.toFixed(0)),
                    }).map((e, i) => (
                      <FaStar key={i} fill="yellow" />
                    ))}
                  </p>
                </div>

                <div className={style.productBody}>
                  <h4>price: {products.price}₪</h4>
                  <p>{products.description}</p>
                  <button
                    className={style.details}
                    onClick={() => addToCart(products._id)}
                  >
                    Add to cart
                  </button>
                </div>
                
              </div>
            

              <button
                    className={style.details}
                    onClick={() => reviewPage(products._id)}
                  >
                   Reviews
                  </button>

            </div>
          </div>
        ) : (
          <div className="notFound">
            <h2>no product found</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductDetails;
