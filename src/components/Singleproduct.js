import React, { useEffect } from "react";
import { Star } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "../styles/Singleproduct.css"
const Singleproduct = ({ img }) => {
  return (
    <div className="product">
      <Link
        to={"/product/single"}
        state={{ img: img }}
        style={{ color: "black", textDecoration: "none" }}
      >
        <div className="image-wrapper">
          <img src={img} id="product-image" />
        </div>
        <div className="pr-information-wrapper">
          <h2 id="price">$564</h2>
          <p className="pr-name">Best waterproff shoe for hiking</p>
          <div className="ratings">
            <div className="stars-wrapper">
              <Star className="stars" />
              <Star className="stars" />
              <Star className="stars" />
              <Star className="stars" />
            </div>
            <div className="reviews">
              <p>56 ratings</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Singleproduct;
