import  {  useContext } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";
import style from "./Filters.module.css";
import sale from "../../assets/images/sale.gif";
import { SortContext } from "./../../context/SortContext";

function Filters() {
  const navigate = useNavigate();

  const sortContext = useContext(SortContext);

  const sortQueryHandler = (value) => {
    sortContext.sortHandler(value);

    navigate(`/products?sort=${value}`);
    getParams();
  };

  //  useEffect(() => {sortQueryHandler(); });

  const getParams = () => {
    const sortParam = new URL(window.location.href).searchParams.get("sort");

    if (sortParam) {
      console.log(`sort Param = ${sortParam}`);
    }
  };

  const [price, setPrice] = useState({
    minPrice: "",
    maxPrice: "",
  });

  const handlePriceChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setPrice({
      ...price,
      [name]: value,
    });
    console.log(price);
  };

  const handleSubmitPrice = () => {
    navigate(`/filtersResult/${price.maxPrice}/${price.minPrice}`);
  };

  return (
    <>
      {localStorage.getItem("userToken") == null ? (
        <></>
      ) : (
        <div className={style.filters}>
          <form className={style.price} method="get">
            <input
              type="text"
              name="minPrice"
              placeholder="Min Price"
              onChange={handlePriceChange}
            />
            <input
              type="text"
              name="maxPrice"
              placeholder="Max Price"
              onChange={handlePriceChange}
            />
            <button onClick={handleSubmitPrice}>Filter Price</button>
          </form>
          <form className={style.sales} method="get" action="/disscounts">
            <button>
              Product with sales
              <img src={sale} />
            </button>
          </form>

          <form className={style.sort} method="get">
            <select
              name="sort"
              // value={sortQuery}

              onChange={(e) => sortQueryHandler(e.target.value)}
            >
              <option value="" hidden>
                Sort By
              </option>
              <option value="price">Price, Low To High </option>
              <option value="-price">Price, High To Low </option>
              <option value="name">Name, a - z </option>
              <option value="-name">Name, z - a </option>
              <option value="stock">Stock, Low To High </option>
              <option value="-stock">Stock, High To Low </option>
              <option value="-createdAt">Newest </option>
              <option value="createdAt">Oldest </option>
            </select>
          </form>
        </div>
      )}
    </>
  );
}

export default Filters;
