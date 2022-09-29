import React from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css"
const Login = () => {
  return (
    <div className="main-container">
      <div className="login-container">
        <input type={"text"} placeholder="Email" />
        <input type={"text"} placeholder="Password" />
        <button className="registerbtn">Login</button>
        <p style={{ marginTop: 15,textAlign:"center"}}>
          Create a{" "}
          <Link to={"/register"} style={{ textDecoration: "none" }}>
            Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
