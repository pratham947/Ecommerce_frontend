import React, { useContext, useEffect, useState } from "react";
import productcontext from "../../context/Productcontext";
import "./cart.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastError, toastSuccess } from "../toast/Toast";
import token from "../layout/token";
import Loader from "../loader/Loader";
const Cart = () => {
  const {
    getCartItems,
    cart,
    setCart,
    removeItems,
    total,
    setTotal,
    gstprice,
    setGstprice,
    totalwithgst,
    setTotalwithgst,
    validatePromo,
  } = useContext(productcontext);
  const navigate = useNavigate();
  const [code, setCode] = useState();
  const [promocodeprice, setPromocodeprice] = useState();
  const [productname, setproductname] = useState();
  useEffect(() => {
    const cartItems = async () => {
      const data = await getCartItems(token);
      if (data.success) {
        setCart(data.items);
        Maketotal(data.items);
      } else {
        setCart();
      }
    };
    cartItems();
  }, []);
  const DeleteItems = async (product) => {
    const data = await removeItems(token, product.productId);
    setCart(data.items);
    Maketotal(data.items);
  };
  const Maketotal = (items) => {
    let totalprice = 0;
    items.forEach((item) => {
      totalprice += item.actualPrice * Number(item.quantity);
    });
    setTotal(totalprice);
    setGstprice(Math.floor((15 / 100) * totalprice));
    setTotalwithgst(totalprice + (15 / 100) * totalprice);
  };
  const proccedorder = () => {
    navigate("/order/shipping", { state: total });
  };
  // promo code realted
  const validatePromoCodeDiscount = (discount) => {
    let reducedprice = total - (discount / 100) * total;
    setTotal(Math.floor(reducedprice));
    setGstprice(Math.floor((15 / 100) * reducedprice));
    setTotalwithgst(Math.floor(reducedprice + (15 / 100) * reducedprice));
  };
  const checkPromo = async () => {
    if (code && code.length > 2) {
      const data = await validatePromo(code, token);
      if (data.success) {
        const { promocode } = data;
        validatePromoCodeDiscount(Number(promocode.discount));
        toastSuccess(data.message);
      } else {
        toastError(data.message);
      }
    }
  };
  return (
    <div className="cart-container">
      <div className="left-cart-container">
        <div className="cart-heading">
          <p>Product</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
        </div>
        <div className="cart-items-div">
          {cart && cart.length > 0 ? (
            cart.map((items) => {
              return (
                <div className="cart-items" key={items.productId}>
                  <div className="product-img">
                    <img src={items.url} alt="" />
                    <p>
                      {items.name.length > 20
                        ? items.name.substr(0, 10) + "..."
                        : items.name}
                    </p>
                    <button
                      className="remove-items"
                      onClick={() => DeleteItems(items)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="product-price">
                    <p>₹{items.actualPrice}</p>
                  </div>
                  <div className="product-quantity">
                    {/* <button>-</button> */}
                    <p>{items.quantity}</p>
                    {/* <button>+</button> */}
                  </div>
                  <div className="product-total">
                    <p>₹{items.producttotal}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="nothing-found">
              <h1>Nothing found in the cart</h1>
              <Link to="/products">Shop here</Link>
            </div>
          )}
        </div>
      </div>
      <div className="right-cart-container">
        <div className="price-cart">
          <h3 className="total-price-cart">Total Cart price</h3>
          <p>₹{total ? total : 0}</p>
        </div>
        <div className="total-price-gst">
          <h3>GST price</h3>
          <p>₹{gstprice ? gstprice : 0}</p>
        </div>
        <div className="totalprice-gst-addon">
          <h3>Totalprice GST addon</h3>
          <p>₹{totalwithgst ? totalwithgst : 0}</p>
        </div>
        <div></div>
        <div className="add-promo">
          <input
            type="text"
            className="promo-code-input"
            placeholder="Add promo code"
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            disabled={total <= 0 ? true : false}
            style={{ opacity: total <= 0 ? 0.3 : 1 }}
            onClick={() => checkPromo()}
          >
            Add
          </button> 
        </div>
        <div>
          {promocodeprice && (
            <p>price after applying promo code is {promocodeprice}</p>
          )}
        </div>
        <div>
          <button
            className="procced-order"
            style={{ opacity: total <= 0 ? 0.4 : 1 }}
            disabled={total <= 0 ? true : false}
            onClick={() => proccedorder()}
          >
            Proceed order
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-center" closeOnClick />
    </div>
  );
};

export default Cart;
