import React, { useState } from "react";
import productcontext from "./Productcontext";
import axios from "axios";
const Productstate = (props) => {
  const [cart, setCart] = useState();
  const [totalwithgst, setTotalwithgst] = useState();
  const [gstprice, setGstprice] = useState();
  const [total, setTotal] = useState();
  const [Currenttarget, setCurrenttarget] = useState("Addproduct");
  const [Authenticate, setAuthenticate] = useState(
    localStorage.getItem("token")
  );
  const [reviews, setReviews] = useState();
  const [user, setUser] = useState();
  const url = "http://localhost:4000";
  // calculate total

  const getallproducts = async (limit = 0) => {
    try {
      const { data } = await axios.get(
        `${url}/api/v1/product/getallproduct?limit=${limit}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const productdetails = async (id) => {
    try {
      const { data } = await axios.get(`${url}/api/v1/product/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const searchproducts = async (keyword) => {
    const { data } = await axios.get(
      `${url}/api/feactures/product?search=${keyword}`
    );
    return data;
  };
  const searchByCategory = async (category) => {
    const { data } = await axios.post(`${url}/api/v1/product/category`, {
      category,
    });
    return data;
  };
  const login = async (email, password) => {
    if (email && password) {
      try {
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
          `${url}/api/user/login`,
          { email, password },
          config
        );
        return data;
      } catch (error) {
        let obj = {
          success: true,
          message: error.message,
        };
        return obj;
      }
    }
  };
  const register = async (name, email, password, avatar) => {
    if (name && email && password && avatar) {
      try {
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post(
          `${url}/api/user/register`,
          { name, email, password, avatar },
          config
        );
        return data;
      } catch (error) {}
    }
  };
  const logoutuser = async () => {
    localStorage.removeItem("token");
    setAuthenticate();
    let { data } = await axios.get(`${url}/api/user/logout`);
  };
  const updateUser = async (userobj) => {
    console.log(userobj);
    const { data } = await axios.post(
      `${url}/api/user/admin/updateuser`,
      userobj
    );
    return data;
  };
  const getuser = async (token) => {
    try {
      if (token) {
        const { data } = await axios.post(`${url}/api/user/me`, { token });
        return data;
      }
    } catch (error) {}
  };
  const updateprofile = async (updateprofileobj) => {
    try {
      let token = localStorage.getItem("token");
      if (token) {
        if (updateprofileobj.avatar == "") {
          delete updateprofileobj.avatar;
        }
        updateprofileobj.token = token;
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.put(
          `${url}/api/user/profile/me/update`,
          updateprofileobj,
          config
        );
        return data;
      }
    } catch (error) {}
  };
  const createreview = async (reviewobj) => {
    const { token } = reviewobj;
    if (token) {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `${url}/api/v1/product/review/create`,
        reviewobj,
        config
      );
      return data;
    }
  };
  const getProductReview = async (productid) => {
    const { data } = await axios.post(
      `${url}/api/v1/product/review/getreview`,
      { productid }
    );
    return data;
  };

  const updateuserpassword = async (passwordobj) => {
    const { token } = passwordobj;
    if (token) {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `${url}/api/user/changepassword`,
        passwordobj,
        config
      );
      return data;
    }
  };
  const forgetpasswordreset = async (number) => {
    if (number) {
      let numberobj = {
        number: number,
      };
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `${url}/api/user/password/resetpassword`,
        numberobj,
        config
      );
      console.log(data);
    }
  };
  const getuserbyid = async (id) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.get(`${url}/api/user/profile/${id}`);
    return data;
  };
  // addToCart
  const addItems = async (token, product, quantity) => {
    const { data } = await axios.post(`${url}/api/cart/add/items`, {
      token,
      product,
      quantity,
    });
    return data;
  };
  const removeItems = async (token, productId) => {
    const { data } = await axios.post(`${url}/api/cart/deleteitems`, {
      token,
      productId,
    });
    return data;
  };
  const getCartItems = async (token) => {
    const { data } = await axios.post(`${url}/api/cart/getitems`, { token });
    return data;
  };
  // order related
  const addOrder = async (token, items) => {
    const { data } = await axios.post(`${url}/api/order/addorder`, {
      token,
      items,
    });
    return data;
  };
  const getOrder = async (token) => {
    const { data } = await axios.post(`${url}/api/order/getorders`, { token });
    return data;
  };
  const getSingleOrder = async (token, orderId) => {
    const { data } = await axios.post(`${url}/api/order/getsingleorder`, {
      token,
      orderId,
    });
    return data;
  };
  const checkuser = async (token) => {
    const { data } = await axios.post(`${url}/api/order/checkuser`, { token });
    return data;
  };
  const Checkinformation = async (token, informationObj) => {
    const { data } = await axios.post(`${url}/api/order/shippingInfo`, {
      token,
      informationObj,
    });
    return data;
  };
  const updateShipping = async (shippingobj) => {
    const { data } = await axios.post(
      `${url}/api/order/updateshipping`,
      shippingobj
    );
    return data;
  };
  // all promo code related
  const validatePromo = async (code, token) => {
    const { data } = await axios.post(`${url}/api/promo/validatepromo`, {
      code,
      token,
    });
    return data;
  };
  const addPromo = async (promocode, discount) => {
    const { data } = await axios.post(`${url}/api/promo/createcode`, {
      promocode,
      discount,
    });
    return data;
  };
  const getAllPromo = async () => {
    const { data } = await axios.get(`${url}/api/promo/getcodes`);
    return data;
  };
  const deletePromo=async(id)=>{
    const {data}=await axios.get(`${url}/api/promo/deletepromo/${id}`)
    return data;
  }
  const updatePromo=async(id,status)=>{
    const {data}=await axios.post(`${url}/api/promo/updatecodes`,{id,status})
    return data
  }
  // Delete product
  const deleteOrder = async (token, productId) => {
    const { data } = await axios.post(`${url}/api/order/deleteorder`, {
      token,
      productId,
    });
    return data;
  };
  // Admin functions
  const createProduct = async (
    token,
    name,
    description,
    price,
    category,
    brand,
    productimage,
    stock
  ) => {
    const productobj = {
      token,
      name,
      description,
      price,
      category,
      brand,
      productimage,
      stock,
    };
    const { data } = await axios.post(
      `${url}/api/v1/admin/product/createproduct`,
      productobj
    );
    return data;
  };
  const deleteProduct = async (id, token) => {
    const { data } = await axios.post(
      `${url}/api/v1/admin/product/deleteproduct/${id}`,
      { token }
    );
    return data;
  };
  const updateproduct = async (id, updateobj) => {
    const { data } = await axios.post(
      `${url}/api/v1/admin/product/updateproduct/${id}`,
      updateobj
    );
    return data;
  };
  // get all user
  const getallusers = async () => {
    const { data } = await axios.get(`${url}/api/user/getallusers`);
    return data;
  };
  const deleteUser = async (id, token) => {
    const { data } = await axios.delete(
      `${url}/api/user/admin/user/${id}/${token}`
    );
    return data;
  };
  const getallorders = async (token) => {
    const { data } = await axios.get(`${url}/api/order/getallorders/${token}`);
    return data;
  };
  const deleteOrderAdmin = async (id, orderId) => {
    const { data } = await axios.post(`${url}/api/order/deleteorderadmin`, {
      id,
      orderId,
    });
    return data;
  };
  // filter by price
  const filterByPrice = async (firstprice, secondprice, category) => {
    const { data } = await axios.post(`${url}/api/feactures/product/filter`, {
      firstprice,
      secondprice,
      category,
    });
    return data;
  };
  const sortingByPrice = async (filter, category) => {
    const { data } = await axios.get(
      `${url}/api/feactures/product/sortPrice/${filter}/${category}`
    );
    return data;
  };
  // reviews
  const deleteReview = async (productid, reviewId) => {
    const { data } = await axios.delete(
      `${url}/api/v1/product/review/delete/${productid}/${reviewId}`
    );
    return data;
  };
  // Delete review admin
  const deleteReviewAdmin = async (productId, reviewId) => {
    const { data } = await axios.post(
      `${url}/api/v1/product/review/Admin/deletereview`,
      { productId, reviewId }
    );
    return data;
  };
  // image related
  const getAllImages = async (productId) => {
    const { data } = await axios.get(
      `${url}/api/v1/product/image/getallimage/${productId}`
    );
    return data;
  };
  const addImage = async (id, images, token) => {
    const { data } = await axios.post(
      `${url}/api/v1/admin/product/addimages/${id}`,
      { token, images }
    );
    return data;
  };
  const deleteImage = async (id, imageid, token) => {
    const { data } = await axios.post(
      `${url}/api/v1/admin/product/deleteimage/${id}`,
      { imageid, token }
    );
    return data;
  };
  // change order status Admin
  const changeOrderStatus = async (token, myorder, status) => {
    const { data } = await axios.post(
      `${url}/api/order/admin/order/updatestatus`,
      { token, myorder, status }
    );
    return data;
  };

  return (
    <div>
      <productcontext.Provider
        value={{
          getallproducts,
          productdetails,
          searchByCategory,
          filterByPrice,
          sortingByPrice,
          searchproducts,
          login,
          register,
          Authenticate,
          setAuthenticate,
          getuser,
          user,
          setUser,
          logoutuser,
          updateprofile,
          // review
          reviews,
          setReviews,
          getProductReview,
          createreview,
          deleteReview,
          deleteReviewAdmin,
          getuserbyid,
          updateuserpassword,
          forgetpasswordreset,
          cart,
          setCart,
          total,
          setTotal,
          // cart
          addItems,
          removeItems,
          getCartItems,
          gstprice,
          setGstprice,
          totalwithgst,
          setTotalwithgst,
          checkuser,
          Checkinformation,
          updateShipping,
          addOrder,
          getOrder,
          getSingleOrder,
          // all prmoo code realted
          validatePromo,
          addPromo,
          getAllPromo,
          deletePromo,
          updatePromo,
          // admin status here
          createProduct,
          updateproduct,
          deleteProduct,
          Currenttarget,
          setCurrenttarget,
          deleteOrder,
          deleteOrderAdmin,
          getallorders,
          getallusers,
          deleteUser,
          // image related
          getAllImages,
          addImage,
          deleteImage,
          updateUser,
          // change order status Admin
          changeOrderStatus,
        }}
      >
        {props.children}
      </productcontext.Provider>
    </div>
  );
};

export default Productstate;
