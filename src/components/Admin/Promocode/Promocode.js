import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import Mainpromocode from './Mainpromocode'
import "./promocode.css"
const Promocode = () => {
  return (
    <div className="dashboard-container">
    <div className="dashbraod-left-container">
      <Sidebar/>  
    </div>
    <div className="dashbraod-right-container">
        <Mainpromocode/>
    </div>
  </div>
  )
}

export default Promocode