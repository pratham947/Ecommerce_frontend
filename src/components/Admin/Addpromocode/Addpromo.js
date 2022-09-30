import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import Mainaddpromo from './Mainaddpromo'

const Addpromo = () => {
  return (
    <div className="dashboard-container">
    <div className="dashbraod-left-container">
      <Sidebar/>
    </div>
    <div className="dashbraod-right-container">
        <Mainaddpromo/>
    </div>
  </div>
  )
}

export default Addpromo