import React, { useState, useContext, useEffect } from 'react'
import productcontext from '../../context/Productcontext'
import { useNavigate } from "react-router-dom"
import "./updateprofile.css"
const Updateprofile = () => {
    // avatar is not changing and yet to be done 
    const { Authenticate, user, updateprofile,setUser} = useContext(productcontext)
    const [updateuserobj, setUpdateuserobj] = useState({
        name: "",
        email: "", 
        avatar: ""
    })
    // const [avatar, setAvatar] = useState("")
    const [avatarpreview, setAvatarpreview] = useState()
    let navigate = useNavigate();
    useEffect(() => {
        const checkuser = () => {
            if (!Authenticate) {
                navigate("/login")
            }
        }
        checkuser();
    }, [])
    useEffect(() => {
        if (user) {
            setUpdateuserobj({ ...updateuserobj, name: user.name, email: user.email })
            setAvatarpreview(user.avatar.url)
        }
    }, [user])
    const setfields = (e) => {
        if (user) {
            setUpdateuserobj({ ...updateuserobj, [e.target.name]: e.target.value })
        }
    }

    const updateuserprofile = async (e) => {
        e.preventDefault();
        let data = await updateprofile(updateuserobj)
        if(data.success===true){
            setUser(data.user)
            navigate("/account/profile/me")
        }
    }
    const changeprofileavatar = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarpreview(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    return (
        <div> 
            {
                user && <>
                    <div className='updateprofile-container'>
                        <div className='updateprofile-left'>
                            <h3>Welcome</h3>
                            <p>update your profile and enjoy!</p>
                        </div>
                        <div className='updateprofile-right'>
                            {
                                <><h1>Update profile</h1>
                                    <p>Create a free account and shop now</p>
                                    <form className="myinputcontainer"  encType='multipart/form-data' onSubmit={(e) => updateuserprofile(e)}>
                                        <input type="text" placeholder="name" name='name' value={updateuserobj.name} onChange={(e) => setfields(e)} className='myinputcontainer-name' />
                                        <input type="email" placeholder="email" name='email' value={updateuserobj.email} onChange={(e) => setfields(e)} className="myinputcontainer-email" />
                                        <div className="updateprofile-avatar">
                                            <img src={avatarpreview} alt="" />
                                            <input type="file" name='avatar' accept='image/*' onChange={(e) => changeprofileavatar(e)} />
                                        </div>
                                        <input type="submit" className="update-my-profile" value="update"  />
                                    </form>
                                </>
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Updateprofile
