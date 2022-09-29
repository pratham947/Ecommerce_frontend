import React from "react";
import "../styles/Upperheader.css";
import {
  Facebook,
  Instagram,
  LinkedIn,
  YouTube,
  Pinterest,
} from "@material-ui/icons";
const Upperheader = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="number">
          <p>+255 768 356 890</p>
        </div>
        <div className="email">
          <p>info@zpunet.com</p>
        </div>
        <div className="icons">
          <Facebook className="social-media-icons" />
          <Instagram className="social-media-icons" />
          <LinkedIn className="social-media-icons" />
          <YouTube className="social-media-icons" />
          <Pinterest className="social-media-icons" />
        </div>
      </div>
    </div>
  );
};

export default Upperheader;
