import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import HouseIcon from "@mui/icons-material/House";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import ContactPhoneRoundedIcon from "@mui/icons-material/ContactPhoneRounded";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import "./MobileNav.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const MobileNav = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <ul className="mobile-nav">
      <NavLink to="/">
        <HouseIcon />
      </NavLink>
      <NavLink to="/products">
        <Inventory2RoundedIcon />
      </NavLink>
      <NavLink to="/cart">
        <ShoppingCartIcon />
      </NavLink>
      <NavLink to="/contact">
        <ContactPhoneRoundedIcon />
      </NavLink>
      <NavLink to={isAuthenticated ? "/account" : "/login"}>
        <AccountBoxRoundedIcon />
      </NavLink>
    </ul>
  );
};

export default MobileNav;
