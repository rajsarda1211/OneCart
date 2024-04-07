import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download our App</h4>
        <p>Download App for Android and IOS</p>
        <img src={playStore} alt="playStore" />
        <img src={appStore} alt="appStore" />
      </div>
      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority.</p>
        <p>Copyrights 2024 &copy; Raj Sarda</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.chess.com/home" target="blank">
          Instagram
        </a>
        <a href="https://www.chess.com/home" target="blank">
          Facebook
        </a>
        <a href="https://www.chess.com/home" target="blank">
          Youtube
        </a>
      </div>
    </footer>
  );
};

export default Footer;
