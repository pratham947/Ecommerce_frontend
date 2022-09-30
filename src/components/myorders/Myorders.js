import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productcontext from "../../context/Productcontext";
import "./myorder.css";
import Loader from "../loader/Loader.js";
import token from "../layout/token";
const Myorders = () => {
  const { getOrder } = useContext(productcontext);
  const [myorders, setMyorders] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getMyOrder = async () => {
      const data = await getOrder(token);
      if (data.success) {
        setTimeout(() => {
          setMyorders(data.orders.orderedItems);
          setLoading(false);
        }, 5000);
      } else {
        setMyorders();
        setLoading(false);
      }
    };
    getMyOrder();
  }, []);
  return !loading ? (
    <div className="myordercontainer">
      <h1>My orders</h1>
      <div className="ordered-items-heading">
        <p>Order Id</p>
        <p>Name</p>
        <p>Quantity</p>
        <p>Status</p>
      </div>
      <div className="ordered-items-main-div">
        {myorders && myorders.length > 0 ? (
          myorders.map((items) => {
            return (
              <div className="ordered-items-div">
                <div className="orderId">
                  <Link
                    to={`/orders/myorders/${items._id}`}
                    className="product-status-link"
                  >
                    <p>{items._id}</p>
                  </Link>
                </div>
                <div className="orderName">
                  <p>
                    {items.name.length > 15
                      ? items.name.substr(0, 15) + "..."
                      : items.name}
                  </p>
                </div>
                <div className="orderQuantity">
                  <p>{items.quantity}</p>
                </div>
                <div className="order-status">
                  <p className={`${items.status!=="Delievered"?"pending":"completed"}`}>{items.status}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-order-found">
            <p> No orders found</p>
            <Link to={"/products"}>Shop some products</Link>
          </div>
        )}
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Myorders;
