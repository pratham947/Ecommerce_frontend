import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import "./createproduct.css"
import Maincreateproduct from './Maincreateproduct'
import { useLocation } from 'react-router-dom'
const Createproduct = ({product}) => {
  const location=useLocation();
  return (
    <div className="dashboard-container">
        <div className="dashbraod-left-container">
            <Sidebar/>
        </div>
        <div className="dashbraod-right-container">
            <Maincreateproduct product={location.state?location.state:undefined}/>
        </div>
    </div>

  )
}

export default Createproduct