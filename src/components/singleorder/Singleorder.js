import React, { useContext, useEffect, useState } from "react";
import productcontext from "../../context/Productcontext";
import { useParams } from "react-router-dom";
import "./singleorder.css";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import WhereToVoteIcon from "@material-ui/icons/WhereToVote";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import token from "../layout/token";
const Singleorder = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { getSingleOrder, checkuser, deleteOrder } = useContext(productcontext);
  const [singleorder, setSingleorder] = useState();
  const [orderstatus, setOrderstatus] = useState();
  const [shippingInfo, setShippingInfo] = useState();
  const [createdat, setCreatedat] = useState();
  const [delieverydate, setDelieverydate] = useState();
  const [delieveredtime, setDelieveredtime] = useState();
  useEffect(() => {
    const getmyorder = async () => {
      const data = await getSingleOrder(token, params.id);
      if (data.success) {
        setSingleorder(data.order);
        setOrderstatus(data.order.status);
        const parseddate = moment(`${data.order.createdAt}`).format(
          "DD-MM-YYYY"
        );
        setCreatedat(parseddate);
        setDelieverydate(
          moment(parseddate, "DD-MM-YYYY").add(4, "days").format("DD/MM/YYYY")
        );
        if (data.order.status === "Delievered") {
          const date = String(
            new Date(Number(data.order.statustime)).toLocaleString()
          );
          setDelieveredtime(date);
        }
      }
    };
    getmyorder();
  }, [params.id]);
  const cancelOrder = async () => {
    const data = await deleteOrder(token, singleorder._id);
    if (data.success === true) {
      navigate("/user/orders/me/myorders");
    }
  };
  useEffect(() => {
    const getShippingInfo = async () => {
      const { shippingInfo } = await checkuser(token);
      setShippingInfo(shippingInfo);
    };
    getShippingInfo();
  }, [params.id]);
  return singleorder ? (
    <div className="main-order-container">
      <div className="single-order-container">
        <div className="singleOrder-productid">
          <p
            style={{ color: orderstatus === "Delievered" ? "green" : "tomato" }}
          >
            {singleorder.productId}
          </p>
        </div>
        <div className="singleOrder-information">
          <div className="singleOrder-img">
            <img src={singleorder.url} alt="" />
          </div>
          <div className="singleOrder-name">
            <h2 className="text-center">
              {singleorder.name.length > 15
                ? singleorder.name.substr(0, 15) + "..."
                : singleorder.name}
            </h2>
          </div>
          <div className="singleOrder-price">
            <p>₹{singleorder.actualPrice} price</p>
            <p>{singleorder.quantity} quantity purchased</p>
            <p>Total ₹{singleorder.actualPrice * singleorder.quantity} </p>
          </div>
          <div className="singleOrder-status">
            <WatchLaterIcon
              className="orderStatus-icon"
              style={{
                color: orderstatus === "Processing" ? "tomaoto" : "green",
              }}
            />
            <div className="divider"></div>
            <DirectionsBikeIcon
              className="orderStatus-icon"
              style={{
                color:
                  orderstatus === "OutForDelievery" ? "tomaoto" : "initial",
              }}
            />
            <div className="divider"></div>
            <WhereToVoteIcon
              className="orderStatus-icon"
              style={{
                color: orderstatus === "Delievered" ? "green" : "initial",
              }}
            />
          </div>
        </div>
      </div>
      <div className="singleOrder-shipping">
        {shippingInfo && (
          <div className="singleOrder-shipping-information">
            <p>Packed From : New york</p>
            <p>Delievering to: {shippingInfo.adress}</p>
            <p
              className={`${
                orderstatus === "Delievered"
                  ? "font-class mysuccess-class"
                  : "mysingleorder-status"
              }`}
            >
              Status: {orderstatus}
            </p>
            {orderstatus !== "Delievered" ? (
              <div>
                <p>Ordered at : {createdat && createdat} </p>
                <p>Delievery expected: {delieverydate && delieverydate}</p>
                <button
                  className="cancel-order-btn"
                  onClick={() => cancelOrder()}
                >
                  cancel order
                </button>
              </div>
            ) : (
              <div>
                <p
                  className={`${
                    orderstatus === "Delievered"
                      ? "font-class mysuccess-class"
                      : "initial"
                  }`}
                >
                  Success: true
                </p>
                <p>Delievered time : {delieveredtime && delieveredtime} </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  ) : (
    " "
  );
};

export default Singleorder;
