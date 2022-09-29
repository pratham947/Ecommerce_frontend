import React from "react";
import {Link} from "react-router-dom"
import "../styles/Register.css";
const Register = () => {
  return (
    <div className="main-container">
      <div className="register-container">
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="registerbtn">Register</button>
        <p style={{marginTop:15,textAlign:"center "}}>Already have a account <Link to={"/login"} style={{textDecoration:"none"}}>Login</Link></p>
      </div>  
    </div>
  );
};

export default Register;
