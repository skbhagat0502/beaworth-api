import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllShops, clearErrors } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import ShopCard from "./ShopCard";
import banner1 from "../../images/banner1.png";
import banner2 from "../../images/banner2.png";
import banner3 from "../../images/banner3.png";
import banner4 from "../../images/banner4.png";
import banner5 from "../../images/banner5.png";
import pizza from "../../images/pizza.png";
import roll from "../../images/roll.png";
import burger from "../../images/burger.png";
import chowmin from "../../images/chowmein.png";
import chicken from "../../images/chicken.png";
import paneer from "../../images/paneer.png";
import dosa from "../../images/dosa.png";
import { Link } from "react-router-dom";
import "./Home.css";
const Home = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, users, loading } = useSelector((state) => state.allUsers);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllShops());
  }, [dispatch, error, alert]);

  return (
    <div className="home">
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Beaworth" />
          <h2>Best Offers for you!</h2>
          <div className="banners">
            <Link to="/products" className="banner">
              <img src={banner4} />
            </Link>
            <Link to="/products" className="banner">
              <img src={banner1} />
            </Link>
            <Link to="/products" className="banner">
              <img src={banner2} />
            </Link>
            <Link to="/products" className="banner">
              <img src={banner3} />
            </Link>
            <Link to="/products" className="banner">
              <img src={banner5} />
            </Link>
          </div>
          <h2>Top picks for you</h2>
          <div className="items">
            <Link to="/products/pizza" className="item">
              <img src={pizza} />
              <p>Pizza</p>
            </Link>
            <Link to="/products/chicken" className="item">
              <img src={chicken} />
              <p>chicken</p>
            </Link>
            <Link to="/products/roll" className="item">
              <img src={roll} />
              <p>Roll</p>
            </Link>
            <Link to="/products/burger" className="item">
              <img src={burger} />
              <p>Burger</p>
            </Link>
            <Link to="/products/chowmin" className="item">
              <img src={chowmin} />
              <p>Chowmein</p>
            </Link>
            <Link to="/products/paneer" className="item">
              <img src={paneer} />
              <p>Paneer</p>
            </Link>
            <Link to="/products/dosa" className="item">
              <img src={dosa} />
              <p>Dosa</p>
            </Link>
          </div>
          <div className="restaurants">
            <h2 className="productsHeading">Top Restaurants Nearby</h2>
            <div className="shops">
              {users &&
                users.map(
                  (user) =>
                    user.role == "seller" && (
                      <ShopCard key={user._id} user={user} />
                    )
                )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
