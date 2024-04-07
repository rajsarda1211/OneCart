import React from "react";
import "./NotFound.css";
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import ErrorIcon from '@mui/icons-material/Error';
const NotFound = () => {
  return (
    <div className="PageNotFound">
      <ErrorIcon />

      <Typography>Page Not Found </Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
