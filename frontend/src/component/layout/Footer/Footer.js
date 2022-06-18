import React from "react";
import "./Footer.css";
import "../../Cart/Cart.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <p>A Land of shoes to give you limitless options</p>
      </div>

      <div className="midFooter">
        <h1>ShoeLand</h1>
        <p>Best Quality is our first priority</p>

        <p>Copyrights 2022 &copy;</p>
        <p>Made By Shashank</p>
      </div>

      <div className="rightFooter">
        <h4>Contact Us</h4>
        <a href="https://www.linkedin.com/in/shashank-chaturvedi1234">LinkedIn</a>
        <a href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSGMvkPLbGpLrdvnsrlVdQWDCHzLJQBkJpSJbskZpPnhGSFTVddScBWjLlqVrkHRNftbNkld">Gmail</a>
        <h6>gshashank1998@gmail.com</h6>
      </div>
    </footer>
  );
};

export default Footer;