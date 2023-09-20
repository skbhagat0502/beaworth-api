import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer id="footer">
      <div className="top">
        <h3>For Better Experience, Download Our Beaworth App Now</h3>
        <img src={playStore} className="downloadButton" />
        <img src={appStore} className="downloadButton" />
      </div>
      <div className="footer">
        <div className="first">
          <h3>Beaworth</h3>
          <p> &copy; {year} All Rights Reserved.</p>
          <p>Sindri Town Dhanbad Jharkhand</p>
        </div>
        <div className="second">
          <h3>Contact us</h3>
          <p>Get in touch</p>
          <p>Open your shop</p>
          <p>Logistic partner</p>
        </div>
        <div className="third">
          <h3>Legal</h3>
          <p>Terms & Conditions</p>
          <p>Privacy policy</p>
          <p>Cookie policy</p>
          <p>Return & refund policy</p>
        </div>
        <div className="fourth">
          <h3>Important Links</h3>
          <p>Home</p>
          <p>About</p>
          <p>Career</p>
          <p>Beaworth Seller</p>
          <p>Return & refund policy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
