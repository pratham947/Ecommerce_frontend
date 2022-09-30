import React, { useContext, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import productcontext from "../../../context/Productcontext";
const Maindashbraod = () => {
  const { getallproducts, getallorders, getallusers } =
    useContext(productcontext);
  const [productlength, setProductlength] = useState();
  const [orderlength, setOrderlength] = useState();
  const [userlength, setUserlength] = useState();
  const data = {
    labels: ["Products", "orders", "Users"],
    datasets: [
      {
        data: [productlength, orderlength, userlength],
        backgroundColor: ["#F4C430", "hotpink", "green"],
        borderColor: ["#F4C430", "hotpink", "green"],
        borderWidth: 1,
      },
    ],
  };
  const pieOptions = {
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
  };
  ChartJS.register(ArcElement, Tooltip, Legend);
  useEffect(() => {
    const products = async () => {
      const { product } = await getallproducts();
      setProductlength(product.length);
    };
    products();
  }, []);
  useEffect(() => {
    const orders = async () => {
      let orders = 0;
      const token = localStorage.getItem("token");
      const { data } = await getallorders(token);
      data.forEach((items) => {
        items.orderedItems.forEach(() => {
          orders++;
        });
      });
      setOrderlength(orders);
    };
    orders();
  }, []);
  useEffect(() => {
    const users = async () => {
      const { users } = await getallusers();
      setUserlength(users.length);
    };
    users();
  }, []);

  return (
    <div className="main-dashbroad-container">
      <p className="dashbroad-heading">Dashbroad</p>
      <div className="circles-container">
        <div className="product-circle main-circle">
          <p>Product</p>
          <p>{productlength && productlength}</p>
        </div>
        <div className="order-circle main-circle">
          <p>Orders</p>
          <p>{orderlength && orderlength}</p>
        </div>
        <diasv className="users-circle main-circle">
          <p>Users</p>
          <p>{userlength && userlength}</p>
        </diasv>
      </div>
      <div className="line-chart">
        {orderlength && userlength && productlength && (
          <Pie data={data} options={pieOptions} />
        )}
      </div>
    </div>
  );
};

export default Maindashbraod;
