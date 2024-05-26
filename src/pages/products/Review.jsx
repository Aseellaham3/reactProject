import React from "react";
import style from "./Products.module.css";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Review() {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [success, setSuccess] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [reviewState, setReviewState] = useState({
    comment: "",
    rating: 1
});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewState({
      ...reviewState,
      [name]: value,
    });
  };

  const getReviews = async () => {
    let { data } = await axios.get(
      `https://ecommerce-node4-five.vercel.app/products/${id}`
    );

    setProducts(data.product);
    setSuccess(data.message);
  };

  useEffect(() => {
    getReviews();
  }, []);

  const token = localStorage.getItem("userToken");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {

      let { data } = await axios.post(
        `https://ecommerce-node4-five.vercel.app/products/${id}/review`,

        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }, reviewState 
      );

      toast.success("thanks for your review ");
      console.log(data);
    } catch (error) {
      toast.error("You must have purchased the product to be able to rate it");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.Reviews}>
          {success == "success" ? (
            <>
              <div className={style.creatReview}>
                <h2>We would love to hear about your experience!</h2>
                <h5> Share your thoughts with us by leaving a review </h5>
                <form className={style.revForm} >
                  <label>Comment</label>
                  <input
                    type="text"
                    name="comment"
                    value={reviewState.comment}
                    onChange={handleChange}
                  />

                  <label>Rating</label>
                  <input
                    type="number"
                    name="rating"
                    min="1"
                    max="5"
                    value={reviewState.rating}
                    onChange={handleChange}
                  />

                  <button onClick={handleSubmit}>Send Review</button>
                </form>
              </div>
              <div className={style.review}>
                {products.reviews.map((rev) => (
                  <div className={style.rev} key={rev._id}>
                    <div className={style.user}>
                      <img
                        className={style.revUserImg}
                        src={rev.createdBy.image.secure_url}
                      />
                      <h6>{rev.createdBy.userName}</h6>
                    </div>
                    <div className={style.rating}>
                      <p>
                        Rating 
                        {Array.apply(null, {
                          length: parseFloat(rev.rating.toFixed(0)),
                        }).map((e, i) => (
                          <FaStar key={i} fill="yellow" />
                        ))}
                      </p>
                      <p>{rev.comment}</p>
                      <p>{rev.createdBy.createdAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="notFound">
              <h2>no product found</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Review;
