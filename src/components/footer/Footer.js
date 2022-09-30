import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-main-container">
        <div className="first-footer-div">
          <h3>Get to know us</h3>
          <p>About us</p>
          <p>Carrers</p>
          <p>Join with us</p>
          <p>Sell your products</p>
        </div>
        <div className="connect-with-us">
          <h3>Connect with us</h3>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>twitter</p>
        </div>
      </div>
      <hr style={{borderColor:"white"}}/>
    </div>
  );
};

export default Footer;
