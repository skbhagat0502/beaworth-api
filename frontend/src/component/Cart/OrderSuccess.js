import React, { useEffect } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import orderplaced from "../../images/animation_lmm4aopq_small.gif";

const OrderSuccess = () => {
  // Disable going back using browser history
  useEffect(() => {
    const disableBackNavigation = () => {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = function () {
        window.history.go(1);
      };
    };

    disableBackNavigation();

    return () => {
      window.onpopstate = null;
    };
  }, []);

  // Show confirmation dialog when trying to leave the page
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // This is needed for Chrome
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="orderSuccess">
      <img src={orderplaced} />
      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/">Continue Shopping</Link>
    </div>
  );
};

export default OrderSuccess;
