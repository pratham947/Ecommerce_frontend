import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import productcontext from "../../../context/Productcontext";
import token from "../../layout/token";
import { toastSuccess } from "../../toast/Toast.js";
const Edituser = () => {
  const location = useLocation();
  const { updateUser } = useContext(productcontext);
  const [name, setname] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();
  useEffect(() => {
    if (location.state) {
      setname(location.state.name);
      setEmail(location.state.email);
      setRole(location.state.role);
    }
  }, []);
  const updateUserAdmin = async () => {
    let userObj;
    if (email !== location.state.email) {
      userObj = {
        userId:location.state._id,
        name,
        email,
        role,
        token,
      };
    } else {
      userObj = {
        userId:location.state._id,
        name,
        role,
        token,
      };
    }
    const data = await updateUser(userObj);
    if (data.success) {
      toastSuccess(data.message);
    }
  };
  return (
    <>
      <div className="edit-user-mainContainer">
        <div className="edit-user-container">
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <select name="role" id="" onChange={(e) => setRole(e.target.value)}>
            <option value="user" selected={role != "Admin" ? true : false}>
              User
            </option>
            <option value="Admin" selected={role == "Admin" ? true : false}>
              Admin
            </option>
          </select>
          <button onClick={() => updateUserAdmin()}>Edit user</button>
        </div>
      </div>
    </>
  );
};

export default Edituser;
