import React from "react";
import { Link } from "react-router-dom";

import logo from "../img/logo.svg";
import error from "../img/404.svg";

const NotFound = () => (
  <>
    <div className="error__logo">
      <img src={logo} alt="quickbuy.store" />
    </div>
    <div className="error__body">
      <div className="error__text">Page not found</div>
      <div className="error__img">
        <img src={error} alt="page not found" />
      </div>

      <Link className="error__btn" to="/">
        Вернуться
      </Link>
    </div>
  </>
);

export default NotFound;
