import React, { useContext, useEffect, useState } from "react";
import "./product.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
const Product = ({ product }) => {
  const [productname, setProductname] = useState();
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
  };
  useEffect(() => {
    if (product) {
      if (product.name.length >= 15) {
        const name = product.name.substring(0, 14);
        setProductname(name + "...");
      }
    }
  }, []);

  return (
    <div className="productborder">
      <Link to={`/product/${product._id}`} className="productclass">
        <img src={product.image[0].url} alt={product.name} />
        <div className="productcenter">
          <p>{productname ? productname : product.name}</p>
          <div className="productratings">
            <ReactStars {...options} />
            <span>{product.numberofreviews} reivews</span>
          </div>
          <span className="productprice">₹ {product.price}</span>
        </div>
      </Link>
    </div>
  );
};

export default Product;
