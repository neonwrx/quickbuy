import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Popup from "./Popup";
import noimage from "../img/icon-no-image.svg";

class Card extends Component {
  state = {
    modal: false
  };

  onPress(e, id) {
    if (e.target.nodeName !== "BUTTON") {
      this.props.history.push(`/item/${id}`);
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const { name, price, id, images, productId } = this.props.item;
    const { modal } = this.state;
    return (
      <div className="col-auto mb-3">
        <div className="s-card" onClick={e => this.onPress(e, id)}>
          <div className="s-card__image">
            <img
              src={images.length ? images[0].src : noimage}
              alt="quickbuy.shop"
            />
          </div>
          <div className="s-card__name">{name}</div>
          <div className="s-card__bottom-block d-flex align-items-center justify-content-around">
            <button className="s-card__button" onClick={() => this.toggle()}>
              Заказать
            </button>
            <div className="s-card__price">{price} ₽</div>
          </div>
        </div>
        <Popup id={productId} modal={modal} toggle={() => this.toggle()} />
      </div>
    );
  }
}

export default withRouter(Card);
