import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import logo from "../img/logo.svg";
import vk from "../img/vk.svg";
import insta from "../img/insta.svg";
import fb from "../img/fb.svg";

class Header extends Component {
  showLogoutBtn() {
    const { history, admin } = this.props;
    if (admin) {
      return (
        <button
          className="logout-btn"
          onClick={() => this.props.logout(history)}
        >
          Выйти
        </button>
      );
    }
    return <div className="social">{this.renderIcons()}</div>;
  }

  renderIcons() {
    const names = [
      "https://instagram.com/",
      "https://facebook.com/",
      "https://vk.com/"
    ];
    const images = [insta, fb, vk];
    return names.map((name, index) => {
      return (
        <a href={names[index]} className="social__icon" key={index}>
          <img src={images[index]} alt={names[index]} />
        </a>
      );
    });
  }

  render() {
    return (
      <div className="header-wrap">
        <div className="header container d-flex align-items-center justify-content-center flex-wrap mt-2">
          <Link to={"/"}>
            <img src={logo} className="App-logo" alt="quickbuy.store" />
          </Link>
          {this.showLogoutBtn()}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  admin: PropTypes.bool,
  logout: PropTypes.func,
  history: PropTypes.object
};

export default withRouter(Header);
