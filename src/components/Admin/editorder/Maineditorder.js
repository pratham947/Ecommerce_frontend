import React, { useContext, useEffect, useState } from "react";
import "./editorder.css";
import { useLocation } from "react-router-dom";
import productcontext from "../../../context/Productcontext";
import token from "../../layout/token";
import { toastError, toastSuccess } from "../../toast/Toast";
const Maineditorder = () => {
  const { changeOrderStatus } = useContext(productcontext);
  const location = useLocation();
  const [order, setOrder] = useState(location.state.order);
  const [status, setStatus] = useState();
  const [shippingInfo, setshippingInfo] = useState();
  const [oldstatusindex, setOldstatusindex] = useState();
  const [newstatusindex, setNewstatusindex] = useState();
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (order) {
      setshippingInfo(location.state.order.shippingInfo);
      let orderstatus = location.state.order.status;
      setOldstatusindex(
        orderstatus === "Processing"
          ? 1
          : orderstatus === "OutForDelievery"
          ? 2
          : 3
      );
      setDisabled(orderstatus === "Delievered" ? true : false);
      setStatus(orderstatus);
    }
  }, []);
  console.log(oldstatusindex);
  const changeStatusAdmin = async () => {
    let newstatusindex =
      status === "shipping" ? 1 : status === "OutForDelievery" ? 2 : 3;
    if (newstatusindex == oldstatusindex + 1) {
      const data = await changeOrderStatus(token, order, status);
      if (data.success) { 
        toastSuccess(data.message);
      }
    } else {
      toastError("wrong delievery");
    }
  };
  return order && shippingInfo ? (
    <div className="main-edit-order-container">
      <div className="mainEditOrder-shipping">
        <div className="mainEditOrder-shipping-informtion">
          <h2>ShippingInfo</h2>
          <p>BillingName: {shippingInfo.Name}</p>
          <p>Adress: {shippingInfo.adress}</p>
          <p>City: {shippingInfo.city}</p>
          <p>Country: {shippingInfo.country}</p>
          <p>PhoneNo: {shippingInfo.phoneNo}</p>
          <p>PinCode: {shippingInfo.pinCode}</p>
          <p>state:   {shippingInfo.state}</p>
        </div>
        <div className="mainOrder-shipping-status">
          <h2>Order status</h2>
          <select
            name=""
            id=""
            onChange={(e) => setStatus(e.target.value)}
            disabled={disabled}
          >
            <option
              value="Processing"
              selected={status == "Processing" ? true : false}
            >
              Shipping
            </option>
            <option
              value="OutForDelievery"
              selected={status == "OutForDelievery" ? true : false}
            >
              Out For Delievery
            </option>
            <option
              value="Delievered"
              selected={status == "Delievered" ? true : false}
            >
              Delievered
            </option>
          </select>
          <button
            className="change-status"
            onClick={() => changeStatusAdmin()}
            disabled={disabled}
          >
            Change Status
          </button>
          {disabled && <p>Product is delieverd</p>}
        </div>
      </div>
      <div className="main-edit-order-information">
        <img src={order.url} alt="" />
        <p>ProductId: {order.productId}</p>
        <p>Name: {order.name}</p>
        <p>Quantity: {order.quantity}</p>
        <p>Price: {order.actualPrice}</p>
        <p>Total price: {order.producttotal}</p>
        <p></p>
      </div>
    </div>
  ) : (
    " "
  );
};

export default Maineditorder;
