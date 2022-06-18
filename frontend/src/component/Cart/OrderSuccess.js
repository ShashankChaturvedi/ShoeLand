import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Order Placed Successfully <i className="fas fa-smile"></i></Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;