import React from 'react'
import "./sidebar.css"
import {Link} from "react-router-dom"
const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <Link to={"/"} className="sidebar-link sidebar-home-link">Ecommnerce</Link>
      <Link to={"/admin/dashboard"} className="sidebar-link">Dashbroad</Link>
      <Link to={"/admin/products"} className="sidebar-link">Products</Link>
      <Link to={"/admin/orders/allorders"} className="sidebar-link">
        orders</Link>
      <Link to={"/admin/users"} className="sidebar-link">Users</Link>
      <Link to={"/admin/reviews"} className="sidebar-link">Reviews</Link>
      <Link to={"/admin/promocode"} className="sidebar-link">Promocode</Link>
      <Link to={"/admin/addimage"} className="sidebar-link">Addimage</Link>
    </div> 
  )
}

export default Sidebar