import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import Popup from "./Popup";
import noimage from "../img/icon-no-image.svg";
import { languages, currencies } from "../locales";

class Card extends Component {
  state = {
    modal: false
  };

  onPress(e, id) {
    if (e.target.nodeName !== "BUTTON") {
      this.props.history.push(`/item/${id}`);
      window.scrollTo(0, 0);
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  renderPrice(price, price2, price3, price4, sale) {
    const { lang } = this.props;
    switch (lang) {
      case languages[0]:
        return (
          <>
            {" "}
            {(sale) ? this.salePrice(price,currencies[0]) : price} {currencies[0]}{" "}
          </>
        );
      case languages[1]:
        return (
          <>
            {" "}
            {(sale) ? this.salePrice(price2,currencies[1]) : price2} {currencies[1]}{" "}
          </>
        );
      case languages[2]:
        return (
          <>
            {" "}
            {(sale) ? this.salePrice(price3,currencies[2]) : price3} {currencies[2]}{" "}
          </>
        );
      case languages[3]:
        return (
          <>
            {" "}
            {(sale) ? this.salePrice(price4,currencies[3]) : price4} {currencies[3]}{" "}
          </>
        );
      default:
        return (
          <>
            {" "}
            {(sale) ? this.salePrice(price,currencies[0]) : price} {currencies[0]}{" "}
          </>
        );
    }
  }

  salePrice(price,currency) {
    return(
      <>
        <span className="sale-price">{price+price*.20} {currency}</span>
        {price}
      </>
    )
  }

  render() {
    const {
      name,
      price,
      price2,
      price3,
      price4,
      id,
      images,
      productId,
      sale
    } = this.props.item;
    const { modal } = this.state;
    return (
      <div className="col-sm-auto col-md-6 col-lg-4 mb-3">
        <div className={(sale) ? "s-card sale": "s-card"} onClick={e => this.onPress(e, id)}>
          <div className="s-card__image">
            <img
              src={images.length ? images[0].src : noimage}
              alt="quickbuy.shop"
            />
          </div>
          <div className="s-card__name">{name}</div>
          <div className="s-card__bottom-block d-flex align-items-center justify-content-around">
            <button className="s-card__button" onClick={() => this.toggle()}>
              Купить
            </button>
            <div className="s-card__price">
              {this.renderPrice(price, price2, price3, price4, sale)}
            </div>
          </div>
        </div>
        <Popup id={productId} modal={modal} toggle={() => this.toggle()} />
      </div>
    );
  }
}

Card.propTypes = {
  lang: PropTypes.string,
  item: PropTypes.object
};

export default withRouter(Card);
