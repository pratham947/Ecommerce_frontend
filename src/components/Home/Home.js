import React, { useContext, useEffect, useState } from 'react'
import "./Home.css"
import Header from '../Header/Header'
import Product from '../product/Product'
import Metadata from '../layout/Metadata'
import productcontext from '../../context/Productcontext'
import Loader from '../loader/Loader'
const Home = () => {
  const [loading, setLoading] = useState(true)
  const [products, setproducts] = useState([])
  const { getallproducts } = useContext(productcontext)
  useEffect(() => {
    const allproducts = async () => {
      const data = await getallproducts(4);
      console.log(data);
      if (data.success === true) {
        setproducts(data.product)
        setLoading(false)
      }
    }
    allproducts();
  }, [])
  return (
    <div>
      <Metadata title={"Ecommerce"} />
      {
        loading ? (<Loader/>) :
          (
            <>
              <Header />
              <div className="container">
                {
                  products && products.map((item) => {
                    return <Product product={item} key={item._id} />
                  })
                }
              </div>
            </>
          )
      }
    </div>
  )
}

export default Home
