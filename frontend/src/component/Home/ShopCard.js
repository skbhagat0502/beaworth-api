import { Link } from "react-router-dom";
import React, { Fragment } from "react";
import "./shopCard.css";

const ShopCard = ({ user }) => {
  const handleImageError = (event) => {
    event.target.src = "../../images/defaultfood.jpg";
  };

  return (
    <div className="shop">
      <Link to={`/products/${user._id}`} className="shopCard">
        <div className="featuredImage">
          <img
            src={user.avatar?.url || "../../images/defaultfood.jpg"}
            alt="featuredProduct"
            onError={handleImageError}
          />
        </div>
        <div className="shopDetails">
          <p>{user.name}</p>
          <span>Sindri Town Dhanbad</span>
        </div>
      </Link>
    </div>
  );
};

export default ShopCard;
