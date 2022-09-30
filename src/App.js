import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Productpage from "./components/productpage/Productpage";
import Products from "./components/productspage/Products";
import Login from "./components/Login/Login";
import { useEffect, useContext } from "react";
import productcontext from "./context/Productcontext";
import Useroptions from "./components/layout/Useroptions";
import Userprofile from "./components/userprofile/Userprofile";
import Updateprofile from "./components/updateprofile/Updateprofile";
import Checkusersprofile from "./components/checkprofile/checkusersprofile";
import Updatepassword from "./components/changepassword/Updatepassword";
import Cart from "./components/cartpage/Cart";
import Shippingpage from "./components/shippingpage/Shippingpage";
import Orderinformation from "./components/orderinformation/Orderinformation";
import Myorders from "./components/myorders/Myorders";
import Singleorder from "./components/singleorder/Singleorder";
import Dashbroad from "./components/Admin/Dashbroad/Dashbroad";
import Adminproduct from "./components/Admin/products/Adminproduct";
import Createproduct from "./components/Admin/Createproduct/Createproduct";
import Orders from "./components/Admin/orders/Orders";
import Editorder from "./components/Admin/editorder/Editorder";
import Allusers from "./components/Admin/Users/Allusers";
import Promocode from "./components/Admin/Promocode/Promocode";
import Review from "./components/Admin/Review/Review";
import Addimage from "./components/Admin/Addimage/Addimage";
import Edituser from "./components/Admin/Users/Edituser";
import Protectedroute from "./components/protectedroute/Protectedroute";
const  App=()=> {
  const { getuser, setUser, user, Authenticate } = useContext(productcontext);
  useEffect(() => {
    const getloggedinuser = async () => {
      // checking the token exist or not
      const token = localStorage.getItem("token");
      if (token) {
        const { user, success } = await getuser(token);
        if (success) {
          setUser(user);
        }
      }
    };
    getloggedinuser();
  }, []);
  return (
    <BrowserRouter>
      {Authenticate && <Useroptions />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<Productpage />} />
        <Route path="/account/profile/:id" element={<Checkusersprofile />} />
        <Route path="/account/profile/me" element={<Userprofile />} />
        <Route path="/profile/update" element={<Updateprofile />} />
        <Route path="/password/update" element={<Updatepassword />} />
        <Route path="/user/products/cart" element={<Cart />} />
        <Route path="/order/shipping" element={<Shippingpage />} />
        <Route
          path="/orders/allorders/information"
          element={<Orderinformation />}
        />
        <Route path="/user/orders/me/myorders" element={<Myorders />} />
        <Route path="/orders/myorders/:id" element={<Singleorder />} />
        {/* Admin routes  */}
        <Route
          element={
            <Protectedroute
              isAdmin={user && user.role != "Admin" ? false : true}
            />
          }
        >
          <Route path="/admin/dashboard" element={<Dashbroad />} />
          <Route path="/admin/products" element={<Adminproduct />} />
          <Route
            path="/admin/products/createproduct"
            element={<Createproduct />}
          />
          <Route path="/admin/orders/allorders" element={<Orders />} />
          <Route path="/admin/order/editorder" element={<Editorder />} />
          <Route path="/admin/users" element={<Allusers />} />
          <Route path="/admin/edituser" element={<Edituser />} />
          <Route path="/admin/reviews" element={<Review />} />
          <Route path="/admin/promocode" element={<Promocode />} />
          <Route path="/admin/addimage" element={<Addimage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
