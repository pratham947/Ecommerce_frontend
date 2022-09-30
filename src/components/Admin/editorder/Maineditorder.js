import React, { useContext, useEffect, useState } from 'react'
import "./editorder.css"
import { useLocation } from 'react-router-dom'
import productcontext from '../../../context/Productcontext'
import token from '../../layout/token'
import { toastSuccess } from '../../toast/Toast'
const Maineditorder = () => {
  const {changeOrderStatus} = useContext(productcontext)
  const location=useLocation();
  const [order, setOrder] = useState(location.state.order)
  const [status, setStatus] = useState()
  const [shippingInfo, setshippingInfo] = useState()
  const [statusindex, setStatusindex] = useState()
  useEffect(() => {
    if(order){
      setshippingInfo(location.state.order.shippingInfo)
      setStatus(location.state.order.status)
      let index=location.state.order.status==="Shipping"?1:location.state.order.status==="OutForDelievery"?2:3
      setStatusindex(index)
    }    
  }, [])
  const changeStatusAdmin=async()=>{
    const data=await changeOrderStatus(token,order,status)
    if(data.success){
      toastSuccess(data.message)
    }
  }
  return (  
    order && shippingInfo ? 
    <div className="main-edit-order-container">
      <div className="mainEditOrder-shipping">
        <div className="mainEditOrder-shipping-informtion">
        <h2>ShippingInfo</h2>
        <p>Adress:{shippingInfo.adress}</p>
        <p>City:{shippingInfo.city}</p>
        <p>Country:{shippingInfo.country}</p>
        <p>PhoneNo:{shippingInfo.phoneNo}</p>
        <p>PinCode:{shippingInfo.pinCode}</p>
        <p>state:{shippingInfo.state}</p>
        </div>
        <div className="mainOrder-shipping-status">
          <h2>Order status</h2>
          <select name="" id="" onChange={(e)=>setStatus(e.target.value)}>
            <option value="shipping" selected={status=="shipping"?true:false} >Shipping</option>
            <option value="OutForDelievery" selected={status=="OutForDelievery"?true:false}>Out For Delievery</option>
            <option value="Delievered" selected={status=="Delievered"?true:false}>Delievered</option>
          </select>   
          <button className="change-status" onClick={()=>changeStatusAdmin()}>Change Status</button>
        </div>  
      </div>
      <div className="main-edit-order-information">
        <img src={order.url} alt="" />
        <p>ProductId: {order.productId}</p>
        <p>Name: {order.name}</p>
        <p>Quantity: {order.quantity}</p>
        <p>Price: {order.actualPrice}</p>
        <p>Total price: {order.producttotal}</p>
        <p></p>
      </div>
    </div> : " "
  )
}

export default Maineditorder
