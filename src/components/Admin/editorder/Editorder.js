import React from 'react'
import "./editorder.css"
import Sidebar from "../sidebar/Sidebar.js"
import Maineditorder from './Maineditorder'
import {useLocation} from "react-router-dom"
const Editorder = () => {
  const location=useLocation();
  return (
    <div className="dashboard-container">
    <div className="dashbraod-left-container">
      <Sidebar />
    </div>
    <div className="dashbraod-right-container">
      <Maineditorder order={location.state}/>
    </div>
  </div>
  )
}

export default Editorder
