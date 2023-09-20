import React from "react";
import "./Contact.css";
import BusinessIcon from "@mui/icons-material/Business";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
const Contact = () => {
  return (
    <div className="contact">
      <div className="contactContainer"></div>
      <span className="contact-details">
        <span className="flex">
          <BusinessIcon
            sx={{
              color: "blue",
              scale: "2",
              margin: "1rem",
              cursor: "pointer",
            }}
          />
          <span>
            <p>Address</p>
            <p>BIT Sindri, Dhanbad Hostel-12</p>
          </span>
        </span>
        <span className="flex">
          <CallIcon
            sx={{
              color: "blue",
              scale: "2",
              margin: "1rem",
              cursor: "pointer",
            }}
          />
          <span>
            <p>Phone</p>
            <a href="tel:9835811831" className="link">
              +91 9835811831
            </a>
          </span>
        </span>
        <span className="flex">
          <EmailIcon
            sx={{
              color: "blue",
              scale: "2",
              margin: "1rem",
              cursor: "pointer",
            }}
          />
          <span>
            <p>Email</p>
            <a href="mailto:beaworthbusiness@gmail.com" className="link">
              beaworthbusiness@gmail.com
            </a>
          </span>
        </span>
      </span>
    </div>
  );
};

export default Contact;
