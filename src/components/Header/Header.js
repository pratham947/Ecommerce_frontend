import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsJustify } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import productcontext from "../../context/Productcontext";
import logo from "../../images/SHOP.png"
const Header = () => {
  let navigate = useNavigate();
  const [logoutchange, setLogoutchange] = useState(false);
  const { Authenticate, logoutuser, setAuthenticate } =
    useContext(productcontext);
  const [first, setfirst] = useState(100);
  const logout = () => {
    localStorage.removeItem("token");
    setAuthenticate();
    setfirst(100);
  };
  return (
    <>
      <div
        className="headermenu"
        style={{ transform: `translateY(-${first}%)` }}
      >
        <div className="closemenu">
          <AiOutlineClose
            onClick={() => setfirst(100)}
            className="header-close-icon"
          />
        </div>
        <div className="headerlinks">
          <Link
            to={"/"}
            onClick={() => setfirst(100)}
            className="headerlinksinner"
          >
            Home
          </Link>
          <Link
            to={"/products"}
            onClick={() => setfirst(100)}
            className="headerlinksinner"
          >
            Products
          </Link>
          <Link
            to={"/product"}
            onClick={() => setfirst(100)}
            className="headerlinksinner"
          >
            About
          </Link>
          {Authenticate ? (
            <p
              className="headerlinksinner"
              onClick={() => logout()}
              style={{ cursor: "pointer" }}
            >
              Logout
            </p>
          ) : (
            <Link
              to={"/login"}
              onClick={() => setfirst(100)}
              className="headerlinksinner"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      <div className="headerwrapper">
        <div className="headercontainer">
          <div>
            <BsJustify className="menu-selector" onClick={() => setfirst(0)} />
          </div>
          <div className="site-name">
            <h1>Shopper</h1>
          </div>
          <div>
            <input className="headersearch" />
          </div>
        </div>
        <div className="headercontent">
          <h3>Welcome to our site</h3>
          <Link to="/products" className="scrollbtn remove-decoration">
            Shop Here for the best
          </Link>
        </div>
      </div>

      {/* All products  */}
      <h2 className="productheading">Feactured products</h2>
    </>
  );
};

export default Header;
