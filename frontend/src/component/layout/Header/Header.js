import React, { Fragment, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <div className="wrapper">
      <nav>
        <input type="checkbox" id="show-search" />
        <input type="checkbox" id="show-menu" />
        <label htmlFor="show-menu" className="menu-icon">
          <i className="fas fa-bars"></i>
        </label>
        <div className="content">
          <div className="logo">
            <a id="logo" href="/">ShoeLand</a>
          </div>
          <ul className="links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/orders">Your Orders</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/cart" id="cart-box">
                <i className="fa fa-shopping-cart"></i>
              </a>
            </li>
          </ul>
        </div>
        <label htmlFor="show-search" className="search-icon">
          <i className="fas fa-search"></i>
        </label>
        <Fragment>
          <form className="search-box" onSubmit={searchSubmitHandler}>
            <input
              type="text"
              placeholder="Type Something to Search..."
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" value="Search" className="go-icon">
              <i className="fas fa-long-arrow-alt-right"></i>
            </button>
          </form>
        </Fragment>
      </nav>
    </div>
  );
};

export default Header;

