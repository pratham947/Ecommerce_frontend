import React, { useContext, useEffect, useState } from "react";
import "./promocode.css";
import { MdDelete } from "react-icons/md";
import productcontext from "../../../context/Productcontext";
import ToastContainer, { toastError, toastSuccess } from "../../toast/Toast.js";
const Mainpromocode = () => {
  const { getAllPromo, addPromo, deletePromo, updatePromo } =
    useContext(productcontext);
  const [codes, setCodes] = useState();
  const [mycode, setMycode] = useState();
  const [promocodestatus, setPromocodestatus] = useState();
  const [discount, setDiscount] = useState();
  useEffect(() => {
    const getPromo = async () => {
      const { promos } = await getAllPromo();
      setCodes(promos.reverse());
    };
    getPromo();
  }, []);
  const addCode = async () => {
    if(mycode && discount){
      if(discount<=100){
        const data = await addPromo(mycode, discount);
        if (data.success) {
          setCodes([...codes,data.promo])
          toastSuccess(data.message);
          setMycode("")
          setDiscount("")
        }
        else{
          toastError(data.message)
        }
      }
      else{
        toastError("Discount cannot greater than 100%")
      }
    }
    else{
      toastError("All fields are required")
    }
  };
  const deleteAdminPromo = async (id) => {
    const data = await deletePromo(id);
    if (data.success) {
      toastSuccess(data.message);
    }
  };
  const updateAdminPromo = async (id, status) => {
    const data = await updatePromo(id, status);
    console.log(data);
    if (data.success) {
      toastSuccess(data.message);
    }
  };
  return (
    <div>
      <div className="add-promo-div">
        <input
          type="text"
          placeholder="Enter code"
          value={mycode}
          onChange={(e) => setMycode(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter discount in number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
        <button
          className="add-promo-btn"
          onClick={() => addCode(codes, discount)}
        >
          Add
        </button>
      </div>
      <div className="add-promo-heading">
        <p>Code Name</p>
        <p>Discount</p>
        <p>Expired</p>
        <p>Delete</p>
      </div>
      <div className="add-promo-container">
        {codes ? (
          codes.map((promo) => {
            console.log(promo.expired);
            return (
              <div className="add-promo-items" key={promo._id}>
                <div>
                  <p>{promo.promocode}</p>
                </div>
                <div>
                  <>{promo.discount}%</>
                </div>
                <div className="promoexpired-div">
                  <select
                    className="promocode-expiry"
                    onChange={(e) =>
                      updateAdminPromo(promo._id, e.target.value)
                    }
                  >
                    <option
                      value="true"
                      selected={promo.expired === true ? true : false}
                    >
                      True
                    </option>
                    <option
                      value="false"
                      selected={promo.expired === false ? true : false}
                    >
                      False
                    </option>
                  </select>
                </div>
                <div className="delete-promo">
                  <MdDelete
                    className="delete-promo-btn"
                    onClick={() => deleteAdminPromo(promo._id)}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center font-class">Loading...</p>
        )}
      </div>
      <ToastContainer position="bottom-center" closeOnClick />
    </div>
  );
};

export default Mainpromocode;
