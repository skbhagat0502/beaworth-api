import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import "./productCart.css";
const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className="product">
      <Link className="productCard" to={`/product/${product._id}`}>
        <div className="image-box">
          <img src={product.images[0].url} alt={product.name} />
        </div>
        <div className="product-details">
          <p>{product.name.substring(0, 25) + "..."}</p>
          <span className="red">{`₹${product.price}`}</span>
          <span className="sub-details">
            <Rating {...options} />
            <span className="productCardSpan">
              ({product.numOfReviews} Reviews)
            </span>
          </span>
          <button className="btn">Buy Now</button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
