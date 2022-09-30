import React from "react";
import "./orderinformation.css";
const Orderinformation = () => {
  return (
    <div className="dashboard-container">
      <div className="dashbraod-left-container">
        <Sidebar />
      </div>
      <div className="dashbraod-right-container">
        <Mainorder />
      </div>
    </div>
  );
};

export default Orderinformation;
