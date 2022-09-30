import React, { useContext, useEffect, useState } from "react";
import productcontext from "../../context/Productcontext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../userprofile/userprofile.css";
import Loader from "../loader/Loader.js";
import "./checkuserprofile.css";
const Checkusersprofile = () => {
  const [userprofile, setUserprofile] = useState();
  const { getuserbyid, user } = useContext(productcontext);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const getuser = async () => {
    const data = await getuserbyid(params.id);
    if (user) {
      if (params.id === user._id) {
        window.location.href = "http://localhost:3000/account/profile/me";
      } else {
        setUserprofile(data.user);
        setInterval(() => {
          setLoading(false);
        }, 2000);
      }
    } else {
      setInterval(() => {
        setLoading(false);
      }, 2000);
    }
  };
  useEffect(() => {
    getuser();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <h1 style={{ padding: "10px", position: "absolute" }}>users profile</h1>
      {userprofile ? (
        <div className="myprofile">
          <div className="leftprofile">
            <img
              src={userprofile.avatar.url}
              alt={"profileimage"}
              className="myprofileimage"
            />
          </div>
          <div className="rightprofile">
            <div className="name">
              <span>Full name:</span> <h4>{userprofile.name}</h4>
            </div>
            <div className="email">
              <span>Email:</span> <h4>{userprofile.email}</h4>
            </div>
            <div className="createdat">
              <span>Joined At:</span>{" "}
              <h4>{String(userprofile.createdAt).substr(0, 10)}</h4>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-profile">
          <h3>Please login to watch other user profile</h3>
          <Link to={"/login"} className="loginredirect">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Checkusersprofile;
