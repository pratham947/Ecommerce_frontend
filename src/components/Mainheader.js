import React from "react";
import "../styles/Mainheader.css";
import logo from "../images/logo.png";
import { ShoppingBasket } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Menu, MenuItem, Button } from "@material-ui/core";
const Mainheader = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="container">
      <div className="main-header-wrapper">
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="search-bar">
          <form action="">
            <div className="search">
              <input
                type="text"
                name=""
                placeholder="Search"
                id="search-input"
              />
              <button id="search-btn">Search</button>
            </div>
          </form>
        </div>
        {/* <div className="menu-small-devices">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Dashboard
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div> */}
        <div className="authentication">
          <Link
            to={"/register"}
            style={{
              textDecoration: "none",
              color: "black",
              textTransform: "uppercase",
            }}
          >
            Register
          </Link>
          <Link
            to={"/login"}
            style={{
              textDecoration: "none",
              color: "black",
              textTransform: "uppercase",
            }}
          >
            Login
          </Link>
          <Link to={"/cart"} style={{ textDecoration: "none", color: "black" }}>
            <ShoppingBasket />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Mainheader;
