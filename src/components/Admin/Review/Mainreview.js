import React, { useContext, useState } from "react";
import "./review.css";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";
import productcontext from "../../../context/Productcontext";
import ToastContainer, { toastSuccess } from "../../toast/Toast";
const Mainreview = () => {
  const [productid, setProductid] = useState(" ");
  const [reviews, setReviews] = useState();
  const { getProductReview, deleteReviewAdmin } = useContext(productcontext);
  useEffect(() => {
    const getReviews = async () => {
      if (productid.length >= 24) {
        const data = await getProductReview(productid);
        setReviews(data.reviews.reverse());
      } else {
        setReviews();
      }
    };
    getReviews();
  }, [productid]);
  const deleteReview = async (productId, reviewId) => {
    const data = await deleteReviewAdmin(productId, reviewId);
    toastSuccess(data.message);
  };
  return (
    <div className="mainreview-review-container">
      <div className="productid-review-container">
        <input
          type="text"
          placeholder="Enter Poduct Id"
          onChange={(e) => setProductid(e.target.value)}
        />
      </div>
      <div className="mainreview-product-review">
        <div className="main-review-heading">
          <p>Review Id</p>
          <p>Name</p>
          <p>Comment</p>
          <p>Actions</p>
        </div>
        <div className="mainreview-container">
          {productid.length >= 24 && reviews && reviews.length > 0 ? (
            reviews.map((review) => (
              <div className="mainreview-items">
                <div>
                  <p>{review._id}</p>
                </div>
                <div>
                  <p>{review.name}</p>
                </div>
                <div>
                  <p>
                    {review.comment.length > 25
                      ? review.comment.substr(0, 25) + "..."
                      : review.comment}
                  </p>
                </div>
                <div>
                  <MdDelete
                    className="del-review-icon"
                    onClick={() => deleteReview(productid, review._id)}
                  />
                </div>
              </div>
            ))
          ) : reviews && reviews.length < 1 ? (
            <p className="no-review-found">No review found</p>
          ) : (
            <p className="no-review-found">Enter the productId</p>
          )}
        </div>
      </div>
      {/* <ToastContainer position="top-right" closeOnClick /> */}
    </div>
  );
};

export default Mainreview;
