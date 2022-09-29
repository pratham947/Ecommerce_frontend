import React from "react";
import "../styles/Allproducts.css";
import Singleproduct from "./Singleproduct";
const Allproducts = () => {
  let imagedata = [
    {
      url: "https://www.pngplay.com/wp-content/uploads/12/Running-Shoes-PNG-Clip-Art-HD-Quality.png",
    },
    {
      url: "https://www.pngall.com/wp-content/uploads/2016/06/Adidas-Shoes-Free-Download-PNG.png",
    },
    {
      url: "https://www.pngkit.com/png/full/361-3611117_brown-shoes-png-download-image-woodland-semi-formal.png",
    },
    {
      url: "https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png",
    },
    {
      url: "https://res.cloudinary.com/zpune/image/upload/v1644396419/random/10_kglqts.png",
    },
    {
      url: "https://shoeshop-youtube-zpunet.netlify.app/images/1.png",
    },
    {
      url: "https://shoeshop-youtube-zpunet.netlify.app/images/2.png",
    },
    {
      url: "https://shoeshop-youtube-zpunet.netlify.app/images/5.png",
    },
  ];
  return (
    <div className="container">
      <div className="products-wrapper">
        {imagedata.map((singledata) => {
          return <Singleproduct img={singledata.url} />;
        })}
      </div>
    </div>
  );
};

export default Allproducts;
