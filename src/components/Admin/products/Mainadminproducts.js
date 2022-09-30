import React, { useContext, useEffect, useState } from "react";
import "./adminproduct.css";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import productcontext from "../../../context/Productcontext";
import { Link, useNavigate } from "react-router-dom";
import token from "../../layout/token";
import { toastSuccess } from "../../toast/Toast";
import { ToastContainer } from "react-toastify";
const Mainadminproducts = () => {
  const { getallproducts, deleteProduct } = useContext(productcontext);
  const [products, setProducts] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const getProuducts = async () => {
      const data = await getallproducts();
      setProducts(data.product);
    };
    getProuducts();
  }, []);
  const deleteAdminPoduct = async (product) => {
    const data = await deleteProduct(product._id, token);
    if (data.success) {
      toastSuccess("product is deleted successfully please reload the page");
    }
  };
  const goToProduct = (product) => {
    navigate("/admin/products/createproduct", { state: product });
  };
  return (
    <div className="mainadminproducts">
      <h1 className="text-center">All Products</h1>
      <div className="mainadminproducts-container">
        <div className="mainadminproducts-heading">
          <p>ProductId</p>
          <p>Name</p>
          <p>Stock</p>
          <p>Price</p>
          <p>Actions</p>
        </div>
        <div className="productsadmin">
          {products ?
            products.map((product) => (
              <div className="products-item-admin">
                <div className="product-item-id">
                  <p>{product._id}</p>
                </div>
                <div className="product-item-name">
                  <p>
                    {product.name.length > 15
                      ? product.name.substr(0, 15) + "..."
                      : product.name}
                  </p>
                </div>
                <div className="product-item-stock">
                  <p>{product.stock}</p>
                </div>
                <div className="product-item-price">
                  <p>{product.price}</p>
                </div>
                <div className="product-item-actions">
                  <BiEdit
                    className="product-item-icon"
                    onClick={() => goToProduct(product)}
                  />
                  <MdDelete
                    className="product-item-icon"
                    onClick={() => deleteAdminPoduct(product)}
                  />
                </div>
              </div>
            )):<p className="text-center font-class">Loading...</p>}
        </div>
        <Link
          className="create-product-btn"
          to={"/admin/products/createproduct"}
        >
          Create product
        </Link>
      </div>
      <ToastContainer position="bottom-center" closeOnClick />
    </div>
  );
};

export default Mainadminproducts;
