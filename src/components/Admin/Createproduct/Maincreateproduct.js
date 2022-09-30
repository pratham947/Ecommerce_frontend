import React, { useContext, useEffect, useState } from "react";
import "./createproduct.css";
import dummyprofile from "../../../images/profile.jpg";
import productcontext from "../../../context/Productcontext";
import Loader from "../../loader/Loader.js";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toastSuccess } from "../../toast/Toast";
import token from "../../layout/token";
const Maincreateproduct = ({ product }) => {
  const navigate = useNavigate();
  const [name, setname] = useState();
  const [desc, setDesc] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState();
  const [stock, setStock] = useState();
  const [loading, setLoading] = useState(false);
  const [avatarpreview, setAvatarpreview] = useState();
  const { createProduct, updateproduct } = useContext(productcontext);
  const [onlineurl, setOnlineurl] = useState();
  useEffect(() => {
    if (product) {
      setname(product.name);
      setDesc(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setBrand(product.brand);
      setStock(product.stock);
      setAvatarpreview(product.image[0].url);
    }
  }, []);

  const createProductImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarpreview(reader.result);
      }
    };  
    reader.readAsDataURL(e.target.files[0]);
  };
  const makeProductUrl = (url) => {
    setAvatarpreview(url);
  };
  const makeProduct = async () => {
    if (token && name && desc && price && category && brand && avatarpreview) {
      setLoading(true);
      const data = await createProduct(
        token,
        name,
        desc,
        price,
        category,
        brand,
        avatarpreview,
        stock
      );
      if (data.success) {
        toastSuccess(data.message);
        navigate("/products");
      }
    }
  };
  const updateAdminProduct = async () => {
    let updateobj = {
      token: token,
      name,
      desc,
      price,
      category,
      brand,
      public_id:product.image[0].public_id,
      avatarpreview,
      stock,
    };
    const data = await updateproduct(product. _id, updateobj);
    if (data.success) {
      toastSuccess("product is updated successfully");
    }
  };
  return !loading ? (
    <div className="main-create-product">
      {product && <p id="editor">Editor</p>}
      <div className="product-image-div">
        <input
          type="text"
          onChange={(e) => setname(e.target.value)}
          placeholder="Enter name"
          value={name}
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="Enter description"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
        <input
          type="tel"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter Price"
          value={price}
        />
        <input
          type="text"
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category"
          value={category}
        />
        <input
          type="brand"
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Enter brand"
          value={brand}
        />
        <input
          type="tel"
          onChange={(e) => setStock(e.target.value)}
          placeholder="Enter stock"
          value={stock}
        />
        <div className="create-productimage-preview">
          {" "}
          <div>
            <img src={avatarpreview ? avatarpreview : dummyprofile} alt="" />
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => createProductImage(e)}
            />
            <input
              type="text"
              onChange={(e) => makeProductUrl(e.target.value)}
              placeholder="Enter url"
            />
          </div>
        </div>
        <button
          className="create-product-button"
          onClick={() => {
            product ? updateAdminProduct() : makeProduct();
          }}
        >
          {product ? "Update" : "Create product"}
        </button>
      </div>
      <ToastContainer position="bottom-center" closeOnClick />
    </div>
  ) : (
    <div className="loading-container">
      <Loader />
    </div>
  );
};

export default Maincreateproduct;
