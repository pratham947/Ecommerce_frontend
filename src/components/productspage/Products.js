import React, { useContext, useEffect, useState } from "react";
import productcontext from "../../context/Productcontext";
import Loader from "../loader/Loader";
import Product from "../product/Product";
import "./products.css";
import { Link } from "react-router-dom";
const Products = () => {
  const {
    getallproducts,
    searchproducts,
    searchByCategory,
    filterByPrice,
    sortingByPrice,
  } = useContext(productcontext);
  const [searchedproducts, setSearchedproducts] = useState();
  const [keyword, setKeyword] = useState();
  const [selectedcategory, setSelectedcategory] = useState("all");
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [filterfistprice, setFilterfistprice] = useState();
  const [filterlastprice, setFilterlastprice] = useState();
  useEffect(() => {
    const allproducts = async () => {
      const data = await getallproducts();
      if (data.success === true) {
        setProducts(data.product);
        setLoading(false);
      }
    };
    allproducts();
  }, []);
  useEffect(() => {
    const search = async () => {
      if (keyword) {
        const data = await searchproducts(keyword.trim());
        if (data.data.length < 1) {
          setSearchedproducts([]);
        } else {
          setSearchedproducts(data.data);
        }
      } else {
        setSearchedproducts();
      }
    };
    search();
  }, [keyword]);
  const searchingCategory = async (category) => {
    setSelectedcategory(category);
    const data = await searchByCategory(category);
    setProducts(data.product);
  };
  const filterPrice = async () => {
    const data = await filterByPrice(
      filterfistprice,
      filterlastprice,
      selectedcategory
    );
    const { mydata } = data;
    setProducts(mydata);
  };
  const sortProducts = async (e) => {
    const data = await sortingByPrice(e.target.value, selectedcategory);
    if (data.success) {
      setProducts(data.product);
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="search-logo">
            <Link to={"/"} className="homelink remove-decoration">
              <h1>Shopper</h1>
            </Link>
            <input
              placeholder="Search here..."
              onChange={(e) => setKeyword(e.target.value.toLowerCase())}
            />
          </div>
          <h1 className="productsheading">products</h1>
          <div className="filter-container">
            <p className="categories">Categories</p>
            <div className="filter-divs-category">
              <input
                type="radio"
                id="all"
                name="fav_language"
                value="HTML"
                defaultChecked={true}
                onClick={() => searchingCategory("all")}
              />
              <label for="all">All</label>
            </div>
            <br />
            <div className="filter-divs-category">
              <input
                type="radio"
                id="html"
                name="fav_language"
                value="HTML"
                onClick={() => searchingCategory("phone")}
              />
              <label for="html">Phones</label>
            </div>
            <br />
            <div className="filter-divs-category">
              <input
                type="radio"
                id="css"
                name="fav_language"
                value="CSS"
                onClick={() => searchingCategory("pc")}
              />
              <label for="css">Pc</label>
            </div>
            <br />
            <div className="filter-divs-category">
              <input
                type="radio"
                id="javascript"
                name="fav_language"
                value="JavaScript"
                onClick={() => searchingCategory("devotional")}
              />
              <label for="javascript">Devotional</label>
            </div>
            <br />
            <div className="filter-divs-category">
              <input
                type="radio"
                id="laptop"
                name="fav_language"
                value="JavaScript"
                onClick={() => searchingCategory("laptop")}
              />
              <label for="laptop">laptop</label>
            </div>
            <div className="filter-price">
              <p className="categories">Price</p>
              <input
                type="tel"
                onChange={(e) => setFilterfistprice(e.target.value)}
                placeholder="from"
              />
              <input
                type="tel"
                onChange={(e) => setFilterlastprice(e.target.value)}
                placeholder="to"
              />
              <button onClick={() => filterPrice()}>Filter</button>
            </div>
          </div>
          {selectedcategory !== "all" ? (
            <div className="price-low-to-high">
              <select
                className="filter-by-price-bar"
                onChange={(e) => sortProducts(e)}
              >
                <option value="0" selected>
                  default
                </option>
                <option value="1">Low to high</option>
                <option value="-1">hight to low</option>
              </select>
            </div>
          ) : (
            " "
          )}
          <div className="productscontainer">
            {searchedproducts ? (
              searchedproducts.length == 0 ? (
                <h1 className="productsnotfound">No products found</h1>
              ) : (
                searchedproducts.map((item) => {
                  return <Product product={item} key={item._id} />;
                })
              )
            ) : products && products.length > 0 ? (
              products.map((item) => {
                return <Product product={item} key={item._id} />;
              })
            ) : (
              <h1>No products found</h1>
            )}
          </div>
        </>
      )}
    </>
  );
};
export default Products;
