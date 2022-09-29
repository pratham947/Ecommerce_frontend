import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Productpage.css";
const Productpage = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, []);

  return (
    <div className="container">
      <div className="pr-wrapper">
        <div className="left">
          <img src={location.state.img} className="pr-image" />
          <h3 id="product-price">$56</h3>
          <h1>Shoes pair</h1>
        </div>
        <div className="right">
          <p id="product-desc">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam
            nobis animi dolorem! Nesciunt quaerat beatae tenetur rem mollitia
            ipsum hic! Culpa perspiciatis eveniet odio at reprehenderit modi.
            Illum rem deserunt, hic architecto nostrum rerum exercitationem
            numquam distinctio vitae voluptatem provident doloribus, debitis
            modi soluta itaque dolores et alias. Voluptatibus, culpa.
          </p>
          <div className="cart-options">
            <div className="cart-left">
              <Link to="/cart">
                <button id="cartbtn">Add to cart</button>
              </Link>
            </div>
            <div className="cart-right">
              <select id="cart-numbers">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productpage;
