
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Style from "./Categories.module.css";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-node4-five.vercel.app/categories/active?page=1&limit=9`
      );
      setCategories(data.categories);
      setIsLoading(false);
    } catch (error) {
      console.log("error");
      setIsLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <>
      {error ?? <p>error while get data</p>}
      <div className={Style.bg}>
        <h1>get start your favorites shopping</h1>
        <div className={Style.categ}>
          {categories.map((category) => (
            <div className={Style.category} key={category._id}>
              <img src={category.image.secure_url} />
              <Link className={Style.details} to={`/category/${category._id}`}>
                Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
