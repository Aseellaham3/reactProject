import { useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import style from "./Navbar.module.css";
import { UserContext } from "../../context/User.jsx";
import { cart_context } from "../../context/CartContext.jsx";
import { GrCart } from "react-icons/gr";

import { IoSearch } from "react-icons/io5";
import logo from "../../assets/images/logo.jpg";

import { SearchContext } from "../../context/SearchContext.jsx";

function Navbar() {
  const navigate = useNavigate();
  const { userName, setUserName } = useContext(UserContext);
  const { cartCount, getCartCount } = useContext(cart_context);

  useEffect(() => {
    getCartCount();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchContext = useContext(SearchContext);

  {
    /*const searchQueryHandler = () => {

    searchContext.searchHandler(searchQuery);


  };

  useEffect(() => {
    searchQueryHandler();
    getParams();

  }, [searchContext]);
*/
  }

  const searchQueryHandler = (value) => {
    searchContext.searchHandler(value);
    getParams();
  };

  const getParams = () => {
    const search = new URL(window.location.href).searchParams.get("search");
    if (search) {
      console.log(`search Param = ${search}`);
    }
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    setUserName("");
    navigate("/login");
  };

  return (
    <nav>
      <NavLink to="/" className={style.bouteqName}>
        <img className={style.logoImg} src={logo} />
        Aseel Boutique
      </NavLink>
      {userName.length > 0 ? (
        <div className={style.justify}>
          <ul>
            <li>
              <NavLink className="nav_link" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="nav_link" to="/products">
                Products
              </NavLink>
            </li>

            <li>
              <NavLink className="nav_link" to="/cart">
                Cart
                <GrCart fill="white" />
                <span className={style.count}>{cartCount}</span>
              </NavLink>
            </li>
          </ul>
          <form className={style.searchForm}>
            <input
              className={style.searchInput}
              name="search"
              type="text"
              placeholder="Search here..."
              aria-label="Search"
              onChange={(e) => searchQueryHandler(e.target.value)}
            />

            <Link
              className={style.searchBtn}
              to={`/products?search=${searchContext.query}`}
            >
              <IoSearch />
              Search
            </Link>
          </form>
          <ul>
            <li>
              <NavLink to="/user/profile">Welcome {userName}</NavLink>
            </li>

            <li>
              <button onClick={logout} className={style.logoutBtn}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <ul>
          <li>
            <NavLink className={style.nav_link} to="/signUp">
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink className={style.nav_link} to="/login">
              Login
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
