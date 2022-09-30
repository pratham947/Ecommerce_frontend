import React, { useEffect, useState } from "react";
import { useContext } from "react";
import productcontext from "../../context/Productcontext";
import { Link, Navigate } from "react-router-dom";
import "./userprofile.css";
import { useLocation,useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import token from "../layout/token";
const Userprofile = () => {
  const navigate=useNavigate();
  const location = useLocation();
  const { getuser, user, setUser } = useContext(productcontext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getloogeduser = async () => {
      if (location.state!==null) {
        setLoading(true);
        const data = await getuser(location.state);
        setUser(data.user);
        setLoading(false);
      }
      else{
        const token=localStorage.getItem("token")
        if(token){
          setLoading(true);
          const data = await getuser(token);
          setUser(data.user);
          setLoading(false);
        }
        else{
          navigate("/login")
        }
      }
    };
    getloogeduser();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : user ? (
        <div className="myprofile">
          <div className="leftprofile">
            <img
              src={user.avatar.url}
              alt={"profileimage"}
              className="myprofileimage"
            />
            <Link className="updateprofilebtn" to="/profile/update">
              Edit profile
            </Link>
          </div>
          <div className="rightprofile">
            <div className="name">
              <span>Full name:</span> <h4>{user.name}</h4>
            </div>
            <div className="email">
              <span>Email:</span> <h4>{user.email}</h4>
            </div>
            <div className="createdat">
              <span>Joined At:</span>{" "}
              <h4>{String(user.createdAt).substr(0, 10)}</h4>
            </div>
            <div className="btngroup">
              <Link to={"/user/orders/me/myorders"} className="links-btn">
                My orders
              </Link>
              <Link to={"/password/update"} className="links-btn">
                Change password
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <h1>Please login to check your profile</h1>
      )}
    </>
  );
};

export default Userprofile;
