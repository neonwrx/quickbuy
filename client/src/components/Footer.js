import React from "react";
import { Link } from "react-router-dom";

import vk from "../img/vk.svg";
import insta from "../img/insta.svg";
import fb from "../img/fb.svg";

const Footer = () => (
  <div className="footer-wrap">
    <div className="footer container d-flex align-items-center justify-content-center">
      <a href="https://www.instagram.com/quickbuy.store/" className="social__icon">
        <img src={insta} alt="social" />
      </a>
      <a href="https://www.facebook.com/groups/quickbuy.store/" className="social__icon">
        <img src={fb} alt="social" />
      </a>
      <a href="https://vk.com/quickbuy_shop" className="social__icon">
        <img src={vk} alt="social" />
      </a>
    </div>
    <div className="agreement-link">
      <Link className="" to={"/privacy-policy"}>политика конфиденциальности</Link>
      {" "} | {" "}
      <Link className="" to={"/agreement"}>пользовательское соглашение</Link>
    </div>
  </div>
);

export default Footer;
