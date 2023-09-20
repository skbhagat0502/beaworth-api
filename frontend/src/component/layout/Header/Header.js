import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../../images/logo.png";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CallIcon from "@mui/icons-material/Call";
import SearchIcon from "@mui/icons-material/Search";
import "../../Product/Search.css";
import MetaData from "../../layout/MetaData";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <>
      <MetaData title="Search A Product -- Beaworth" />
      <nav className="navbar">
        <ul className="navbar-list">
          <NavLink to="/">
            <img src={logo} alt="logo" className="logo" />
          </NavLink>
          <div className="icons">
            <li>
              <NavLink
                className="nav-icon"
                to="/contact"
                style={{ fontSize: "0.8vmax", textDecoration: "none" }}
              >
                <CallIcon />
              </NavLink>
            </li>
            <li className="nav-icon search-icon">
              <NavLink to="/search" className="search-icon">
                <SearchIcon />
              </NavLink>
            </li>
            <li
              className="cart"
              style={{ marginRight: isAuthenticated ? "2.5rem" : 0 }}
            >
              <NavLink
                className="nav-icon"
                to="/cart"
                style={{
                  fontSize: "0.8vmax",
                  textDecoration: "none",
                  marginRight: isAuthenticated ? "2rem" : "0",
                }}
              >
                <ShoppingCartIcon
                  style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
                />
                {`${cartItems.length}`}
              </NavLink>
            </li>
            {!isAuthenticated && (
              <NavLink className="nav-icon login" to="/login">
                <button className="button">Login</button>
              </NavLink>
            )}
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Header;
