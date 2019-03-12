import React, { Component } from "react";
import { Link } from "react-router-dom";

import logo from "../img/logo.svg";
import vk from "../img/vk.svg";
import insta from "../img/insta.svg";
import fb from "../img/fb.svg";

class Header extends Component {
  showLogoutBtn() {
    if (this.props.admin) {
      return (
        <button className="logout-btn" onClick={() => this.props.logout()}>
        Выйти
        </button>
      );
    }
    return (
      <div className="social">
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
    )
  }

  render() {
    return (
      <div className="header-wrap">
        <div className="header container d-flex align-items-center justify-content-center flex-wrap mt-2">
          <Link to={"/"}>
            <img src={logo} className="App-logo" alt="quickbuy.shop" />
          </Link>
          {this.showLogoutBtn()}
        </div>
      </div>
    );
  }
}

export default Header;
