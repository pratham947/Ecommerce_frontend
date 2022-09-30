import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import productcontext from "../../context/Productcontext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profile from "../../images/profile.jpg";
import Loader from "../loader/Loader";
import { toastError, toastSuccess } from "../toast/Toast";
const Login = () => {
  let navigate = useNavigate();
  const { login, register, Authenticate, setAuthenticate, setUser } =
    useContext(productcontext);
  const [successlogin, setSuccesslogin] = useState(false);
  const [avatarpreview, setAvatarpreview] = useState(profile);
  const [loading, setLoading] = useState(false);
  const [checklogin, setChecklogin] = useState(false);
  const [authentication, setAuthentication] = useState("sign in");
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [signin, setSignin] = useState({
    email: "",
    password: "",
  });
  const createchange = () => {
    if (authentication == "sign in") {
      setSignup({ name: "", email: "", password: "", avatar: "" });
      setSignin({ email: "", password: "" });
      setAuthentication("sign up");
    } else {
      setSignup({ name: "", email: "", password: "", avatar: "" });
      setSignin({ email: "", password: "" });
      setAuthentication("sign in");
    }
  };
  console.log(signin,signup);
  const handlesignupchange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarpreview(reader.result);
          setSignup({ ...signup, avatar: reader.result });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setSignup({ ...signup, [e.target.name]: e.target.value });
    }
  };
  const handlesinginchange = (e) => {
    setSignin({ ...signin, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const loginuser = async () => {
      const { email, password } = signin;
      const data = await login(email, password);
      if (data) {
        if (data.success) {
          localStorage.setItem("token", data.token);
          setAuthenticate(data.token);
          toastSuccess(data.message);
          navigate("/account/profile/me", { state: data.token });
        } else {
          toastError(data.message);
        }
      }
      setChecklogin(false);
    };
    loginuser();
  }, [checklogin]);

  const registeruser = async (e) => {
    e.preventDefault();
    const { name, email, password, avatar } = signup;
    if (name && email && password.length >= 8 && avatar) {
      toastSuccess("Please wait while creating account");
      setTimeout(async () => {
        setLoading(true);
        const user = await register(name, email, password, avatar);
        if (user.success === true) {
          toastSuccess("account created");
          setLoading(false);
          localStorage.setItem("token", user.token);
          setAuthenticate(user.token);
          setUser(user.user);
          setSuccesslogin(true);
        } else {
          setLoading(false);
          toastError("User already exist");
        }
      }, 2000);
    } else {
      if (!name || !email || !password) {
        toastError("all fileds are required");
      } else {
        toastError("password should be greater than 8 character");
      }
    }
  };
  useEffect(() => {
    const checkAuthentication = () => {
      if (Authenticate) {
        navigate("/");
      }
    };
    checkAuthentication();
  }, []);

  useEffect(() => {
    const checkloginsignup = () => {
      if (successlogin) {
        navigate("/");
      }
    };
    checkloginsignup();
  }, [successlogin]);

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <>
          <div className="usercontainer">
            <div className="leftlogin">
              <Link to={"/"}>
                <AiOutlineArrowLeft className="back" />
              </Link>
              <h3>Welcome</h3>
              <p>our first priority is our customer</p>
              <button className="signin" onClick={createchange}>
                {authentication}
              </button>
            </div>
            <div className="rightlogin">
              {authentication == "sign in" ? (
                <>
                  <h1>create account</h1>
                  <p>Create a free account and shop now</p>
                  <form
                    className="inputcontainer"
                    encType="multipart/form-data"
                    onSubmit={(e) => registeruser(e)}
                  >
                    <input
                      type="text"
                      placeholder="name"
                      name="name"
                      value={signup.name}
                      className="register-name"
                      onChange={(e) => handlesignupchange(e)}
                    />
                    <input
                      type="email"
                      placeholder="email"
                      name="email"
                      value={signup.email}
                      className="register-email"
                      onChange={(e) => handlesignupchange(e)}
                    />
                    <input
                      type="password"
                      placeholder="password"
                      name="password"
                      value={signup.password}
                      className="register-password"
                      onChange={(e) => handlesignupchange(e)}
                    />
                    <div className="avatar">
                      <img src={avatarpreview} alt="" />
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={(e) => handlesignupchange(e)}
                      />
                    </div>
                    <input type="submit" className="signup" value="sign up" />
                  </form>
                </>
              ) : (
                <>
                  <h1>Login</h1>
                  <p>enjoy your life in every condition</p>
                  <form
                    className="inputcontainer"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setChecklogin(true);
                    }}
                  >
                    <input
                      type="email"
                      placeholder="email"
                      name="email"
                      value={signin.email}
                      className="login-email"
                      onChange={(e) => handlesinginchange(e)}
                    />
                    <input
                      type="password"
                      placeholder="password"
                      name="password"
                      value={signin.password}
                      className="login-password"
                      onChange={(e) => handlesinginchange(e)}
                    />
                    <input className="login" value={"sign in"} type="submit" />
                  </form>
                </>
              )}
            </div>
          </div>
          <ToastContainer position="bottom-center" closeOnClick />
        </>
      )}
    </>
  );
};

export default Login;
