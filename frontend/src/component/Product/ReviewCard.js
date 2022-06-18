import { Rating } from "@material-ui/lab";
import React from "react";
// import ReactStars from "react-rating-stars-component";
import profilePng from '../../images/Profile.png'
import "./ProductDetails.css";
const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    precision:0.5,
    readOnly:true
  };
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
