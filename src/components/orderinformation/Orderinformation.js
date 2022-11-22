import React, { useEffect, useContext, useState } from "react";
import productcontext from "../../context/Productcontext";
import "./orderinformation.css";
import { useNavigate,useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toastSuccess } from "../toast/Toast";
import token from "../layout/token";
const Orderinformation = () => {
  const {
    getCartItems,
    checkuser,
    total,
    setTotal,
    gstprice,
    setGstprice,
    setTotalwithgst,
    totalwithgst,
    addOrder,
    updateShipping,
  } = useContext(productcontext);
  const navigate = useNavigate();
  const [billingname, setBillingname] = useState();
  const [adress, setAdress] = useState();
  const [city, setCity] = useState();
  const [pincode, setPincode] = useState();
  const [country, setCountry] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [state, setState] = useState();
  const [cartOrders, setCartOrders] = useState();
  const shippingobj = {
    token,
    adress,
    city,
    country,
    phoneNo,
    pinCode: pincode,
    state,
  };
  useEffect(() => {
    const getItems = async () => {
      const data = await getCartItems(token);
      setCartOrders(data.items.Products);
      setTotal(Math.floor(data.items.carttotal));
    };
    getItems();
  }, []);
  useEffect(() => {
    const shippingInformation = async () => {
      const { shippingInfo } = await checkuser(token);
      setBillingname(shippingInfo.name);
      setAdress(shippingInfo.adress);
      setCity(shippingInfo.city);
      setCountry(shippingInfo.country);
      setPhoneNo(shippingInfo.phoneNo);
      setPincode(shippingInfo.pinCode);
      setState(shippingInfo.state);
    };
    shippingInformation();
  }, []);
  const Maketotal = (total) => {
    Maketotal(total);
    setGstprice(Math.floor((15 / 100) * total));
    setTotalwithgst(Math.floor(total + (15 / 100) * total));
  };
  // add order
  const addUserOrder = async () => {
    const data = await addOrder(token, cartOrders);
    if (data.success) {
      navigate("/user/orders/me/myorders");
    }
  };
  const updateShippingStatus = async () => {
    const data = await updateShipping(shippingobj);
    if (data.success) {
      toastSuccess(data.message)
    }
  };
  return cartOrders ? (
    <div className="information">
      <div className="left-information">
        <div className="shopping-info">
          <h3>Shipping info</h3>
          <span>Adress : </span>{" "}
          <input
            type="text"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
          />
          <span>city : </span>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <span>country : </span>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <span>pinCode : </span>
          <input
            type="tel"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
          <span>phoneNo : </span>
          <input
            type="tel"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
          <span>state : </span>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <button
            className="edit-shipping-info"
            onClick={() => updateShippingStatus()}
          >
            Create change
          </button>
        </div>
        <hr />
        <div className="cart-items-container">
          <h2>Your Cart Items</h2>
          {cartOrders &&
            cartOrders.map((items) => {
              return (
                <div className="myitems">
                  <div className="left-items">
                    <img src={items.url} alt="" />
                    <p>
                      Name :{" "}
                      {items.name.length > 15
                        ? items.name.substr(0, 15) + "..."
                        : items.name}
                    </p>
                  </div>
                  <div className="right-items">
                    <p>Price:{items.actualPrice}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="right-information">
        <h2>Shipping Information</h2>
        <div className="price-information">
          <hr />
          <div>
            <p>Subtotal</p>
            <p class="price-related">{total}</p>
          </div>
          <div>
            <p>GST</p>
            <p class="price-related"> {gstprice}</p>
          </div>
          <div>
            <p>total price</p>
            <p class="price-related"> {totalwithgst} </p>
          </div>
          <hr />
          <button
            className="pay-money"
            style={{ opacity: total <= 0 ? 0.4 : 1 }}
            disabled={total <= 0 ? true : false}
            onClick={() => addUserOrder()}
          >
            Pay {totalwithgst}
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-center" closeOnClick />
    </div>
  ) : (
    " "
  );
};

export default Orderinformation;
