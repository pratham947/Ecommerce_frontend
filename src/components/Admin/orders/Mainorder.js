import React, { useContext, useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import productcontext from "../../../context/Productcontext";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toastSuccess } from "../../toast/Toast";
import token from "../../layout/token";
const Mainorder = () => {
  const { getallorders, deleteOrderAdmin } = useContext(productcontext);
  const navigate = useNavigate();
  const [Orders, setOrders] = useState();
  useEffect(() => {
    const getOrders = async () => {
      const { data } = await getallorders(token);
      console.log(data);
      setOrders(data.reverse());
    };
    getOrders();
  }, []);
  const editOrderAdmin = (mainorder,order) => {
    order.shippingInfo=mainorder.shippingInfo;
    order.shippingInfo.Name=mainorder.Name
    navigate("/admin/order/editorder", { state: {order} });
  };
  const deleteorder = async (mainorder, order) => {
    const data = await deleteOrderAdmin(mainorder._id, order._id);
    if (data.success) {
      toastSuccess(data.message)
    }
  };
  return (
    <div className="mainOrder-container">
      <div className="mainOrder-div"> 
        <h1 className="text-center">ALL ORDERS</h1>
        <div className="mainOrder-heading">
          <p>Billing-user-name</p>
          <p>Status</p>
          <p>Order qty</p>
          <p>Amount</p>
          <p>Actions</p>
        </div>{" "}
        <div className="mainOrder-items-div">
          {Orders && Orders.length > 0
            ? Orders.map((singleorder) =>
                singleorder.orderedItems.map((order) => (
                  <div className="mainOrder-items">
                    <div className="mainOrder-Billing-Name">
                      <p>{singleorder.Name}</p>
                    </div>
                    <div className="mainOrder-status">
                      <p className="mainOrder-status">{order.status}</p>
                    </div>
                    <div className="prouduct-quantity">
                      <p>{order.quantity}</p>
                    </div>
                    <div className="amount">
                      <p>{order.actualPrice}</p>
                    </div>
                    <div className="icons">
                      <BiEdit
                        className="product-item-icon"
                        onClick={() => editOrderAdmin(singleorder,order)}
                      />
                      <MdDelete
                        className="product-item-icon"
                        onClick={() => deleteorder(singleorder, order)}
                      />
                    </div>
                  </div>
                ))
              )
            : <p className="text-center font-class">Loading...</p>}
        </div>
      </div>
      <ToastContainer position="bottom-center" closeOnClick />
    </div>
  );
};

export default Mainorder;
