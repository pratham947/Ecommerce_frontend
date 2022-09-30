import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import LockIcon from "@material-ui/icons/Lock";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import DashboardIcon from "@material-ui/icons/Dashboard";
import "./Useroptions.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import productcontext from "../../context/Productcontext";
import { ToastContainer } from "react-toastify";
import { toastSuccess } from "../toast/Toast";

export default function TemporaryDrawer() {
  const navigate = useNavigate();
  const { user, setAuthenticate } = useContext(productcontext);
  let alllinks = [
    { icon: HomeIcon, name: "Home", to: "/" },
    { icon: ShoppingBasketIcon, name: "Products", to: "/products" },
    { icon: AccountCircleIcon, name: "Profile", to: "/account/profile/me" },
    {
      icon: BookmarkBorderIcon,
      name: "orders",
      to: "/user/orders/me/myorders",
    },
    { icon: LockIcon, name: "cart", to: "/user/products/cart" },
    { icon: LockIcon, name: "Logout", to: "/logout" },
  ];
  if (user && user.role === "Admin") {
    let dashbroad = {
      icon: DashboardIcon,
      name: "Dashbroad",
      to: "/admin/dashboard",
    };
    alllinks.unshift(dashbroad);
  }
  const [state, setState] = React.useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {alllinks.map((item, index) => (
          <ListItem key={item.name} disablePadding>
            <div className="optionslinks">
              {/* <item.icon /> */}
              {item.name !== "Logout" ? (
                <Link to={item.to} className="links">
                  {item.name}
                </Link>
              ) : (
                <p className="links" onClick={() => logoutfunc()}>
                  Logout
                </p>
              )}
            </div>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  const logoutfunc = () => {
    localStorage.removeItem("token");
    setAuthenticate();
    toastSuccess("you are looged out successfully");
    navigate("/")
  };

  return (
    <div>
      {["top"].map((anchor) => (
        <React.Fragment key={anchor}>
          <img
            value={anchor}
            src={user && user.avatar.url}
            onClick={toggleDrawer(anchor, true)}
            className="profileimage"
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
      <ToastContainer position="bottom-center" closeOnClick />
    </div>
  );
}
