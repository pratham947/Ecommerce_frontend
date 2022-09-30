import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import "./dashbroad.css"
import Maindashbraod from './Maindashbraod'
const Dashbroad = () => {
  return (
    <div className="dashboard-container">
      <div className="dashbraod-left-container">
        <Sidebar/>  
      </div>
      <div className="dashbraod-right-container">
        <Maindashbraod/>
      </div>
    </div>
  )
}

export default Dashbroad