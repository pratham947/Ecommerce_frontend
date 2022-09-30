import React, { useState, useContext, useEffect } from "react";
import "./shippingpage.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import productcontext from "../../context/Productcontext";
import { useNavigate,useLocation } from "react-router-dom";
import token from "../layout/token";
import { toastError } from "../toast/Toast";
const Shippingpage = () => {
  const location=useLocation();
  const [pincode, setPincode] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [adress, setAdress] = useState();
  const [phonenumber, setPhonenumber] = useState();
  const [name, setName] = useState();
  const { Checkinformation, checkuser } = useContext(productcontext);
  const navigate = useNavigate();
  const submitdata = async (e) => {
    e.preventDefault();
    const informationobj = {
      adress,
      city,
      country,
      pinCode: pincode,
      state,
      Name: name,
      phoneNo: phonenumber,
    };
    if (adress && city && country && pincode && state && name && phonenumber) {
      const data = await Checkinformation(token, informationobj);
      if (data.success) {
        navigate("/orders/allorders/information",{state:location.state});
      }
    } else {
      toastError("all fields are required")
    }
  };
  useEffect(() => {
    const checkUserInformationExist = async () => {
      if (token) {
        const data = await checkuser(token);
        if (data.success) {
          navigate("/orders/allorders/information",{state:location.state});
        }
      }
    };
    checkUserInformationExist();
  }, []);
  return (
    <>
      <form onSubmit={(e) => submitdata(e)}>
        <div className="shipping-container">
          <h1>order informtion</h1>
          <input
            type="text"
            placeholder="Enter Name..."
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Adress..."
            onChange={(e) => setAdress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter city..."
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="Number"
            placeholder="Enter pincode"
            onChange={(e) => setPincode(e.target.value)}
            value={pincode}
          />
          <input
            type="text"
            value={state}
            placeholder="state"
            onChange={(e) => setState(e.target.value)}
          />
          <input
            type="text"
            placeholder="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            type="Number"
            placeholder="Enter phone number"
            onChange={(e) => setPhonenumber(e.target.value)}
          />
          <input
            type="submit"
            placeholder="Procced to payment"
            className="payment"
          />
        </div>
      </form>
      <ToastContainer position="bottom-center" closeOnClick />
    </>
  );
};
export default Shippingpage;
