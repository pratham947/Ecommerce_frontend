import React, { useContext } from "react";
import profile from "../../images/profile.jpg";
import ReactStars from "react-rating-stars-component";
import productcontext from "../../context/Productcontext";
import "./Reviewcard.css";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
const Reviewcard = ({ review, product }) => {
  const { user, deleteReview, reviews, setReviews } =
    useContext(productcontext);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: review && review.rating,
    isHalf: true,
    size: 35,
  };
  const deleteMyReview = async (review) => {
    console.log(review);
    const data = await deleteReview(product._id, review._id);
    setReviews(data.product.reviews);
  };
  return (
    review && (
      <div className="userreviews">
        <div className="userreviews-first-div">
          <div>
            <Link to={`/account/profile/${review.user}`}>
              <img src={review.profile} alt="profile picture" />
            </Link>
          </div>
          <div>
            <p>{review.comment}</p>
            <ReactStars {...options} />
          </div>
        </div>
        <div>
          {review && user && review.user === user._id ? (
            <MdDelete
              className="delete-review"
              onClick={() => deleteMyReview(review)}
            />
          ) : (
            " "
          )}
        </div>
      </div>
    )
  );
};

export default Reviewcard;
