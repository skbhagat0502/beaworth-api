import React, { Fragment, useEffect, useRef, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import axios from "axios";
import "./payment.css";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { emptyCart } from "../../actions/cartAction";
import useRazorpay from "react-razorpay";

const Payment = ({ history }) => {
  const [Razorpay, isLoaded] = useRazorpay();
  const [razorpayKey, setRazorpayKey] = useState(null);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const payBtn = useRef(null);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const handlePayment = () => {
    if (!razorpayKey) {
      alert.error("Razorpay key is not available.");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: paymentData.amount,
      currency: "INR",
      name: "BeaWorth",
      description: "Payment",
      image: "https://example.com/your_logo",
      handler: (response) => {
        try {
          if (response.error) {
            alert.error(response.error.message);
          } else {
            const paymentIntentId = response.razorpay_payment_id;
            const order = {
              shippingInfo,
              orderItems: cartItems,
              itemsPrice: orderInfo.subtotal,
              taxPrice: orderInfo.tax,
              shippingPrice: orderInfo.shippingCharges,
              totalPrice: orderInfo.totalPrice,
              paymentInfo: {
                id: paymentIntentId,
                status: "succeeded",
              },
            };

            dispatch(createOrder(order));
            dispatch(emptyCart());

            history.push("/success");
          }
        } catch (error) {
          alert.error("There's some issue while processing payment");
          console.error(error);
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.contact,
      },
      notes: {
        address: "Bit Sindri",
        order_id: orderInfo._id, // Add the order ID here
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  };

  const handleCashOnDelivery = async () => {
    try {
      const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
        paymentInfo: {
          id: "COD_PAYMENT_ID", // Use a placeholder value for Cash on Delivery
          status: "Cash On Delivery",
        },
      };

      dispatch(createOrder(order));
      dispatch(emptyCart());

      history.push("/success");
    } catch (error) {
      alert.error("An error occurred while processing cash on delivery.");
      console.error(error);
    }
  };

  const fetchRazorpayKey = async () => {
    try {
      const response = await axios.get("/api/v1/getkey"); // Replace with the correct endpoint
      if (response.data && response.data.key) {
        setRazorpayKey(response.data.key);
      } else {
        alert.error("Error retrieving Razorpay key.");
      }
    } catch (error) {
      alert.error("An error occurred while fetching Razorpay key.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRazorpayKey();
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <button
          className="paymentFormBtn"
          onClick={handleCashOnDelivery}
        >{`Pay - ₹${
          orderInfo && orderInfo.totalPrice
        } Via Cash On Delivery`}</button>
      </div>
    </Fragment>
  );
};

export default Payment;
