import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import noimage from "../img/icon-no-image.svg";

class Card extends Component {
  onPress(id) {
    this.props.history.push(`/item/${id}`);
  }
  render() {
    const { name, price, id, images } = this.props.item;
    return (
      <div className="s-card" onClick={() => this.onPress(id)}>
        <div className="s-card__image">
          <img
            src={images.length ? images[0].src : noimage}
            alt="quickbuy.shop"
          />
        </div>
        <div className="s-card__price">{price} грн</div>
        <div className="s-card__name">{name}</div>
      </div>
    );
  }
}

export default withRouter(Card);
