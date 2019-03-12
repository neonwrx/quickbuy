import React, { Component } from "react";
import ImgsViewer from "react-images-viewer";
import { Spinner } from "reactstrap";

import noimage from "../img/icon-no-image.svg";

class Product extends Component {
  state = {
    currImg: 0,
    viewerIsOpen: false
  };

  showGallery() {
    this.setState({
      viewerIsOpen: true
    });
  }

  gotoImg(index) {
    this.setState({
      currImg: index
    });
  }

  gotoPrev() {
    this.setState({
      currImg: this.state.currImg - 1
    });
  }
  gotoNext() {
    this.setState({
      currImg: this.state.currImg + 1
    });
  }

  handleClickImg() {
    if (this.state.currImg === this.props.item.images.length - 1) return;
    this.gotoNext();
  }

  closeViewer() {
    this.setState({
      currImg: 0,
      viewerIsOpen: false
    });
  }

  onPress() {
    alert("Ok");
  }

  render() {
    if (this.props.item === undefined) {
      return (
        <div className="product container d-flex align-items-start justify-content-center flex-wrap">
          <Spinner color="dark" />
        </div>
      );
    } else {
      const { name, descr, price, images } = this.props.item;
      return (
        <div className="product container d-flex align-items-start justify-content-between flex-wrap">
          <div className="product__images" onClick={() => this.showGallery()}>
            <div className="product__image d-flex align-items-center justify-content-center">
              <img
                src={images[0] !== undefined ? images[0].src : noimage}
                alt={name}
              />
            </div>
            <div className="product__gallery d-flex">
              <div className="product__gallery-item">
                <img
                  src={images[1] !== undefined ? images[1].src : noimage}
                  alt={name}
                />
              </div>
              <div className="product__gallery-item">
                <img
                  src={images[2] !== undefined ? images[2].src : noimage}
                  alt={name}
                />
              </div>
              <div className="product__gallery-item">
                <img
                  src={images[3] !== undefined ? images[3].src : noimage}
                  alt={name}
                />
              </div>
            </div>
          </div>
          <div className="product__r-side">
            <div className="product__name">{name}</div>
            <div className="product__descr">{descr}</div>
            <div className="product__price">{price} грн</div>
            <button
              className="product__button"
              onClick={() => {
                this.onPress();
              }}
            >
              КУПИТЬ
            </button>
          </div>
          <ImgsViewer
            imgs={images}
            backdropCloseable={true}
            currImg={this.state.currImg}
            isOpen={this.state.viewerIsOpen}
            onClickImg={() => this.handleClickImg()}
            onClickPrev={() => this.gotoPrev()}
            onClickNext={() => this.gotoNext()}
            onClose={() => this.closeViewer()}
            showThumbnails={true}
            onClickThumbnail={index => this.gotoImg(index)}
          />
        </div>
      );
    }
  }
}

export default Product;
