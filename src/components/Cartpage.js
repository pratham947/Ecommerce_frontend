import React from "react";
import { Link } from "react-router-dom";
import "../styles/cartpage.css";
const Cartpage = () => {
  return (
    <div className="container">
      <div className="cart-empty">
        <p>Your cart is empty</p>
        <Link to={"/"}>
          <button>Shop Now</button>
        </Link>
      </div>
    </div>
  );
};

export default Cartpage;
