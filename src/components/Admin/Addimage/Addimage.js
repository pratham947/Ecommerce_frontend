import React from "react";
import Sidebar from '../sidebar/Sidebar'
import Addmainimage from "./Addmainimage";
const Addimage = () => {
  return (
    <div className="dashboard-container">
      <div className="dashbraod-left-container">
        <Sidebar />
      </div>
      <div className="dashbraod-right-container">
        <Addmainimage/>
      </div>
    </div>
  );
};

export default Addimage;
