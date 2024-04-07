import React from 'react'
import { Rating } from "@mui/material";
import profilePng from "../../images/profilePic.webp"
const ReviewCard = ({review}) => {
  const options = {
    size: "large",
    value: review.rating,
    readOnly:true,
    precision:0.5,
  };
  return (
    <div className='reviewCard'>
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  )
}

export default ReviewCard
