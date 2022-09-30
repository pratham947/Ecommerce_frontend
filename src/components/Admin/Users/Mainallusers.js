import React, { useContext, useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import productcontext from "../../../context/Productcontext";
import { ToastContainer, toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
import "./allusers.css";
import { toastError, toastSuccess } from "../../toast/Toast";
const Mainallusers = () => {
  const { getallusers, deleteUser } = useContext(productcontext);
  const [users, setUsers] = useState();
  const navigate=useNavigate();
  useEffect(() => {
    const getUsers = async () => {
      const data = await getallusers();
      setUsers(data.users);
    };
    getUsers();
  }, []);
  const deleteUserAdmin = async (user) => {
    const token = localStorage.getItem("token");
    const data = await deleteUser(user._id, token);
    if (data.success) {
      toastSuccess(data.message)
    } else {
      toastError(data.message)
    }
  };
  const goToEditUser=(user)=>{
    navigate("/admin/edituser",{state:user})
  }
  return (
    <div>
      <div className="mainusers-heading">
        <p className="mainusers-userId-sec">userId</p>
        <p>Name</p>
        <p className="mainusers-email-sec">Email</p>
        <p>Actions</p>
      </div>
      <div className="mainusers-container">
        {users ?
          users.map((user) => {
            return (
              <div className="mainuseritems-div">
                <div className="mainusers-userId-sec">
                  <p>{user._id}</p>
                </div>
                <div className="mainuseritems-name">
                  <p>{user.name}</p>
                </div>
                <div className="mainusers-email-sec">
                  <p>{user.email}</p>
                </div>
                <div className="mainuseritems-actions">
                  <BiEdit className="product-item-icon" onClick={()=>goToEditUser(user)} />
                  <MdDelete
                    className="product-item-icon"
                    onClick={() => deleteUserAdmin(user)}
                  />
                </div>
              </div>
            );
          }):<p className="text-center font-class">Loading...</p>}
      </div>
      <ToastContainer position="bottom-center" closeOnClick />
    </div>
  );
};

export default Mainallusers;
