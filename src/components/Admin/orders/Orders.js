import React, { useContext, useEffect, useState } from "react";
import productcontext from "../../../context/Productcontext";
import Sidebar from "../sidebar/Sidebar";
import Mainorder from "./Mainorder";
import "./orders.css";

const Orders = () => {
  const { getallorders } = useContext(productcontext);
  const [allorders, setAllorders] = useState()

  return (
    <div className="dashboard-container">
    <div className="dashbraod-left-container">
      <Sidebar/>  
    </div>
    <div className="dashbraod-right-container">
        <Mainorder/>
    </div>
  </div>
  );
};

export default Orders;
