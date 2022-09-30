import React from 'react'
import "./Loader.css"
import loading from "../../images/loading.gif"
const Loader = () => {
  return (
    <div className='loading'>
      <img src={loading} alt="" />
    </div>
  )
}

export default Loader
