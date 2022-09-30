import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import Mainallusers from './Mainallusers'

const Allusers = () => {
  return (
    <div className="dashboard-container">
    <div className="dashbraod-left-container">
      <Sidebar />
    </div>
    <div className="dashbraod-right-container">
        <Mainallusers/>
    </div>
  </div>
  )
}

export default Allusers
