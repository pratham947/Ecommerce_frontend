import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import Mainadminproducts from './Mainadminproducts'

const Adminproduct = () => {
  return (
    <div className="dashboard-container">
      <div className="dashbraod-left-container">
        <Sidebar/>
      </div>
      <div className="dashbraod-right-container">
        <Mainadminproducts/>
      </div>
    </div>
  )
}

export default Adminproduct