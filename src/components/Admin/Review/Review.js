import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import Mainreview from './Mainreview'
import "./review.css"
const Review = () => {
  return (
    <div className="dashboard-container">
    <div className="dashbraod-left-container">
      <Sidebar/>  
    </div>
    <div className="dashbraod-right-container">
      <Mainreview/>
    </div>
  </div>
  )
}

export default Review