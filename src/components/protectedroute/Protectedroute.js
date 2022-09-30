import React from 'react'
import {Navigate,Outlet} from "react-router-dom"

const Protectedroute = ({isAdmin}) => {
    if(!isAdmin){
        return <Navigate to={"/"}/>
    }
  return <Outlet/>
}

export default Protectedroute
