/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import style from "./Products.module.css";
import { FaStar } from "react-icons/fa";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { SearchContext } from "../../context/SearchContext";
import { SortContext } from "../../context/SortContext";


// eslint-disable-next-line react/prop-types
function Products({children}) {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(1);
  const searchContext = useContext(SearchContext);
  const sortContext = useContext(SortContext);

  const token = localStorage.getItem("userToken");

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-node4-five.vercel.app/products?page=${page}&limit=4&search=${searchContext.query}&sort=${sortContext.sortSelect}`,
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
      setError(true);
    }
  };
  useEffect(() => {
    getAllProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchContext, page, sortContext]);

  const handleParameter = () => {
    const url = new URL(
      `https://ecommerce-node4-five.vercel.app/products?page=${page}&limit=4&search=${searchContext.query}&sort=${sortContext.sortSelect}`
    );
    const searchUrl = url.search;
    console.log(searchUrl);

    const urlParam = new URLSearchParams(searchUrl);
    console.log(urlParam.toString());

    if (urlParam.has("search"  )) {
      urlParam.set("search", searchContext.query);
      console.log(urlParam.has("search"));
    } else {
      urlParam.delete("search" );
      console.log("insert search");
    }

    if (urlParam.has("sort")) {
      urlParam.set("sort", sortContext.sortSelect);
    } else {
      urlParam.delete("sort");
      console.log("select sort");
    }

    console.log(urlParam.toString());


   // window.location.search = urlParam.toString();
  };

  useEffect(() => {
    handleParameter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortContext.sortSelect, searchContext.query]);

  {
    /*

 } const buildUrl = () => {
    const setUrl = new URLSearchParams(window.location.search);

    if (urlParam.has("sort") == false) {
      setUrl.append("sort", sortParameter);

      console.log(urlParam.get("sort"));
    } else {
      console.log("sort is doesnt exist in url");
    }
    if (urlParam.has("search") == true) {
      setUrl.append("search", searchParameter);

      console.log(urlParam.get("search"));
    } else {
      console.log("search is doesnt exist in url");
    }
    console.log("setUrl");
    console.log(setUrl);

    // window.location.search = setUrl
  };

  useEffect(() => {
    buildUrl();
  });

*/
  }

  if (isLoading) {
    return <p>loading...</p>;
  }
  const handleChange = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-node4-five.vercel.app/products?page=${page}&limit=4&search=${searchContext.query}&sort=${sortContext.sortSelect}`,
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
      setError(true);
    }
  };

  return (
    <>
      {error ?? <p>error while get data</p>}

      <div className={style.cart}>
        {products.map((product) => (
          <div className={style.productCard} key={product._id}>
            <img src={product.mainImage.secure_url} />
            <h5> {product.name}</h5>
            <p> {product.stock > 0 ? "Available for order" : "Sold Out"}</p>

            <div className={style.price}>
              <p className={style.priceBefor}> {product.price}₪</p>
              <p> {product.finalPrice}₪</p>
            </div>

            <p>
              Rating :
              {Array.apply(null, {
                length: parseFloat(product.avgRating.toFixed(0)),
              }).map((e, i) => (
                <FaStar key={i} fill="yellow" />
              ))}
            </p>
            <Link className={style.details} to={`/products/${product._id}`}>
              Details
            </Link>
          </div>
        ))}
      </div>
      <div className={style.pagination}>
        <PaginationControl
          page={page}
          total={8}
          limit={4}
          last={true}
          changePage={async (page) => {
            setPage(page);
            handleChange();
          }}
          ellipsis={1}
        />
      </div>
    </>
  );
}

export default Products;
