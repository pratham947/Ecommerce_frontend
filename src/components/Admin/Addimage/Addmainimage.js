import React, { useContext, useEffect, useState } from "react";
import productcontext from "../../../context/Productcontext";
import "./addimage.css";
import token from "../../layout/token.js";
import { toastError, toastSuccess } from "../../toast/Toast";
import { MdDelete } from "react-icons/md";
import Loader from "../../loader/Loader.js";
const Addmainimage = () => {
  const [productId, setProductId] = useState("");
  const { getAllImages, addImage, deleteImage } = useContext(productcontext);
  const [productimages, setProductimages] = useState();
  const [avatarspreview, setAvatarspreview] = useState([]);
  const [onlineurl, setOnlineurl] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getimage = async () => {
      if (productId.length >= 24) {
        const { images } = await getAllImages(productId);
        setProductimages(images);
      } else {
        setProductimages([]);
      }
    };
    getimage();
  }, [productId]);
  const setImages = (e, type) => {
    if (type == "data") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarspreview([...avatarspreview, reader.result]);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const addAdminImage = async () => {
    if (productId.length >= 24 && avatarspreview.length > 0) {
      setLoading(true);
      const data = await addImage(productId, avatarspreview, token);
      console.log(data);
      if (data.success) {
        setLoading(false);
        toastSuccess(data.message);
      } else {
        toastError(data.message);
      }
    }
  };
  const deleteAdminImage = async (imageid) => {
    const data = await deleteImage(productId, imageid, token);
    if (data.success) {
      toastSuccess(data.message);
    } else {
      toastError(data.message);
    }
  };
  const addOnlineUrl = () => {
    setAvatarspreview([...avatarspreview, onlineurl]);
    setOnlineurl(" ");
  };
  return loading ? (
    <Loader />
  ) : (
    <div className="addimage-container">
      <div className="addimage-productid">
        <input
          type="text"
          placeholder="Enter productId"
          onChange={(e) => setProductId(e.target.value)}
        />
      </div>
      <div className="productimages-container">
        {productimages &&
          productimages.length > 0 &&
          productimages.map((image) => (
            <div className="productimages-item">
              <img src={image.url} alt="" />
              <MdDelete
                className="delete-image"
                onClick={() => deleteAdminImage(image.public_id)}
              />
            </div>
          ))}
      </div>
      <div className="productimages-add">
        <div className="productimages-add-div">
          <div>
            {avatarspreview &&
              avatarspreview.length > 0 &&
              avatarspreview.map((img) => {
                return <img src={img} />;
              })}
          </div>
        </div>
        <div className="button-set-image">
          <input
            type="text"
            onChange={(e) =>
              productId.length >= 24 && setOnlineurl(e.target.value)
            }
            className="seturl"
            placeholder="set url here"
            value={onlineurl}
          />
          {onlineurl && onlineurl.length > 2 ? (
            <button
              className="add-url"
              onClick={() => productId.length >= 24 && addOnlineUrl()}
            >
              Add url
            </button>
          ) : (
            " "
          )}
          <input
            type="file"
            name=""
            id=""
            className="addimage-btn"
            onChange={(e) => productId.length >= 24 && setImages(e, "data")}
          />
          <button
            className="add-images"
            onClick={() => productId.length >= 24 && addAdminImage()}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addmainimage;
