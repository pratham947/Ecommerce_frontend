import React, { useContext, useEffect, useState } from "react";
import productcontext from "../../context/Productcontext";
import { useParams, useNavigate } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { BsLightbulbFill } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";
import "./productpage.css";
import Reviewcard from "../Reviewcard/Reviewcard";
import { Rating } from "@material-ui/lab";
import Loader from "../loader/Loader";
import { toastError, toastSuccess } from "../toast/Toast";
import token from "../layout/token";
const Productpage = () => {
  const navigate = useNavigate();
  const {
    productdetails,
    Authenticate,
    createreview,
    user,
    addItems,
    reviews,
    setReviews,
  } = useContext(productcontext);
  const params = useParams();
  const [product, setProduct] = useState();
  const [ratings, setRatings] = useState(0);
  const [comment, setComment] = useState();
  const [items, setItems] = useState(1);
  const [btnstate, setBtnstate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [previewurl, setPreviewurl] = useState();

  useEffect(() => {
    const getsingleproductdetails = async () => {
      const data = await productdetails(params.id);
      setProduct(data.product);
      setReviews(data.product.reviews);
      setLoading(false);
      if (data.product.stock < 1) {
        setBtnstate(true);
      }
    };
    getsingleproductdetails();
  }, [params.id]);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product && product.ratings,
    isHalf: true,
    size: 35,
  };
  const addreview = async () => {
    if (Authenticate) {
      if (comment || ratings) {
        const reviewobj = {
          token,
          comment,
          rating: ratings,
          productId: params.id,
          profile: user && user.avatar.url,
        };
        let data = await createreview(reviewobj);
        setReviews(data.product.reviews);
        setComment(" ");
        toastSuccess("review added");
        setRatings(0);
      } else {
        toastError("please give ratings or comment");
      }
    } else {
      toastError("Please login to create review");
    }
  };
  // function for adding and removing products in the cart
  const addtomycart = async () => {
    if (token) {
      const data = await addItems(token, product, items);
      if (data.success) {
        toastSuccess("items is successfully added in the cart");
      } else {
        toastSuccess("items is already added in the cart");
      }
    } else {
      navigate("/login");
    }
  };
  const buyNow = async () => {
    if(token){
      const data = await addItems(token, product, items);
      navigate("/order/shipping", {
        state: Number(product.price) * Number(items),
      });
    }
    else{
      navigate("/login")
    }
  };
  const setchanges = (url) => {
    setPreviewurl(url);
  };
  return loading ? (
    <Loader />
  ) : (
    <>
      {product && (
        <>
          <div className="productdetails">
            <div className="firstdiv">
              <div className="single-image">
                <img
                  src={previewurl ? previewurl : product.image[0].url}
                  alt=""
                />
              </div>
              <div className="multiple-images">
                {product.image.length > 1 &&
                  product.image.map((image) => {
                    return (
                      <img
                        src={image.url}
                        alt=""
                        onMouseEnter={() => setchanges(image.url)}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="lastdiv">
              <div className="productbuttons">
                <button
                  className="addtocart"
                  disabled={btnstate}
                  style={{ opacity: btnstate === true ? 0.3 : 1 }}
                  onClick={() => addtomycart()}
                >
                  <BsFillCartFill /> Add to cart
                </button>
                <button
                  className="buynow"
                  style={{ opacity: btnstate === true ? 0.3 : 1 }}
                  disabled={btnstate}
                  onClick={() => buyNow()}
                >
                  <BsLightbulbFill /> Buy now
                </button>
              </div>
              <div className="productinformation">
                <h2>{product.name}</h2>
                <p>₹ {product.price}</p>
              </div>
              <div>
                <p className="productdescription">{product.description}</p>
              </div>
              {product.stock < 6 ? (
                product.stock > 0 && product.stock < 6 ? (
                  <div className="stock-quantity">
                    <p>Hurry up only {product.stock} products left</p>
                  </div>
                ) : (
                  <div className="stock-quantity">
                    <p>Product is out of stock</p>
                  </div>
                )
              ) : (
                " "
              )}
              <div className="status">
                <p>status</p>{" "}
                {product.stock > 0 ? (
                  <span style={{ color: "green" }}>: instock</span>
                ) : (
                  <span style={{ color: "red" }}>: outofstock</span>
                )}
              </div>

              <div className="add-remove-quantity">
                <button
                  className="minus"
                  onClick={() => setItems(items > 1 ? items - 1 : items)}
                >
                  -
                </button>
                <p>{items}</p>
                <button
                  className="plus"
                  onClick={() =>
                    setItems(product.stock > items ? items + 1 : items)
                  }
                >
                  +
                </button>
              </div>
              <div className="ratingsreview">
                <ReactStars {...options} />
                <span className="noofreviews">
                  {product.numberofreviews} reivews
                </span>
              </div>
              <p className="productcategory">Brand : {product.brand}</p>
            </div>
          </div>
          {/* recommended products  */}
          
          <div className="productreview">
            <h1 className="reviewratings">Reviews</h1>
            {reviews ? (
              <div className="reviewcontainer">
                <>
                  {reviews.map((review) => (
                    <div className="reviewcontainer-items">
                      <Reviewcard review={review} product={product} />
                    </div>
                  ))}
                </>
              </div>
            ) : product.reviews ? (
              <div className="reviewcontainer">
                {product.reviews.map((review) => (
                  <div className="reviewcontainer-items">
                    <Reviewcard review={review} product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <h1>No reviews found</h1>
            )}
          </div>
          <div className="addreview">
            <textarea
              onChange={(e) => setComment(e.target.value)}
              size={"large"}
              value={comment}
            />
            <Rating
              value={ratings}
              onChange={(e) => setRatings(e.target.value)}
              color="black"
              className="MuiRating-root"
            />
            <button onClick={() => addreview()}>Add review</button>
          </div>
        </>
      )}
    </>
  );
};

export default Productpage;
