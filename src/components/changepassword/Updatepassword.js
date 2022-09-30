import React, { useContext, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import productcontext from '../../context/Productcontext';
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff"
import { useNavigate } from 'react-router-dom';
import { toastError, toastSuccess } from '../toast/Toast';
import "./updatepassword.css"
import token from '../layout/token';
const Updatepassword = () => {
    const navigate = useNavigate();
    const { updateuserpassword } = useContext(productcontext)
    const [oldpassword, setOldpassword] = useState();
    const [newpassword, setNewpassword] = useState();
    const [conformpassword, setConformpassword] = useState()
    const updatemypassword = async (e) => {
        e.preventDefault()
        if (oldpassword && newpassword && conformpassword) {
            let passwordobj = {
                oldpassword,
                newpassword,
                conformpassword,
                token
            }
            if (newpassword === conformpassword) {
                let data = await updateuserpassword(passwordobj)
                if (data.success === true) {
                    toastSuccess("password change successfully")
                    setInterval(() => {
                        window.location.href = "http://localhost:3000/account/profile/me";
                    }, 2000);
                }
                else {
                    toastError("your password is not correct")
                }
            }
            else {
                toastError("new password and conform password must be same")
            }
        }
        else {
            toastError("all fileds are required")
        }
    }
    return (
        <div>
            <div className='usercontainer'>
                <div className='leftlogin'>
                    <h3>change password</h3>
                    <p>our first priority is our customer</p>
                </div>
                <div className='rightlogin'>
                    <><h1>update password</h1>
                        <form className="inputcontainer" onSubmit={(e) => updatemypassword(e)} >
                            <input type="password" placeholder="old password" onChange={(e) => setOldpassword(e.target.value)} value={oldpassword} className="oldpassword"  />
                            <input type="password" placeholder="new password" onChange={(e) => setNewpassword(e.target.value)} value={newpassword} className="newpassword"/>
                            <input type="password" placeholder="conform password" name="password" onChange={(e) => setConformpassword(e.target.value)} value={conformpassword} className="conformpassword" />
                            <input type="submit" className="signup" value="Update" />
                        </form>
                    </>
                </div>
            </div>
            <ToastContainer position="bottom-center" closeOnClick />
        </div>
    )
}

export default Updatepassword
