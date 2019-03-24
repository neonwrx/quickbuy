import React from "react";

import vk from "../img/vk.svg";
import insta from "../img/insta.svg";
import fb from "../img/fb.svg";

const Footer = () => (
  <div className="footer-wrap">
    <div className="footer container d-flex align-items-center justify-content-center">
      <a href="https://instagram.com/" className="social__icon">
        <img src={insta} alt="instagram" />
      </a>
      <a href="https://facebook.com/" className="social__icon">
        <img src={fb} alt="instagram" />
      </a>
      <a href="https://vk.com/" className="social__icon">
        <img src={vk} alt="instagram" />
      </a>
    </div>
  </div>
);

export default Footer;
