import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import InputMask from "react-input-mask";
import PropTypes from "prop-types";

import logo from "../img/logo.svg";
import ok from "../img/ok.svg";

class Popup extends Component {
  state = {
    clientName: "",
    telephone: "",
    success: false
  };

  handleChange = async event => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value
    });
  };

  onPress(id) {
    const { clientName, telephone } = this.state;
    this.setState({ success: true });
    setTimeout(() => {
      this.props.toggle();
      this.setState({ success: false });
    }, 2000);
    const form = document.createElement("form");
    const name = document.createElement("input");
    const phone = document.createElement("input");
    const product_id = document.createElement("input");
    const ref = document.createElement("input");
    const url = "https://m1-shop.ru/send_my_order/";

    form.method = "POST";
    form.action = url + "?s=&w=&t=&p=&m=";
    form.target = "hiddenFrame";
    form.className = "hide";

    name.value = clientName;
    name.name = "name";
    form.appendChild(name);

    phone.value = telephone;
    phone.name = "phone";
    form.appendChild(phone);

    product_id.value = id;
    product_id.name = "product_id";
    form.appendChild(product_id);

    ref.value = "94430";
    ref.name = "ref";
    form.appendChild(ref);

    document.body.appendChild(form);
    form.submit();
  }

  renderBody() {
    const { id } = this.props;
    const { clientName, telephone, success } = this.state;
    if (!success) {
      return (
        <>
          <div className="popup__inputs">
            <div className="input-field">
              <InputMask
                mask="aaaaaaaaaaaa"
                maskChar={null}
                name="clientName"
                placeholder="Имя"
                value={clientName}
                onChange={e => {
                  this.handleChange(e);
                }}
              />
            </div>
            <div className="input-field input-field-2">
              <InputMask
                mask="+7 (999) 999-99-99"
                name="telephone"
                placeholder="Телефон"
                value={telephone}
                inputMode="numeric"
                onChange={e => {
                  this.handleChange(e);
                }}
              />
            </div>
          </div>
          <button className="popup__button" onClick={() => this.onPress(id)}>
            Купить
          </button>{" "}
        </>
      );
    }
    return (
      <>
        <img src={ok} alt="ok" className="popup__success-icon" />
        <div className="popup__text">
          Спасибо! Ваш заказ принят. <br />
          Мы с Вами свяжемся <br />в течении 15 минут
        </div>
      </>
    );
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modal}
        toggle={() => this.props.toggle()}
        centered={true}
        className="popup"
      >
        <ModalHeader>
          <img src={logo} className="popup__logo" alt="quickbuy.shop" />
        </ModalHeader>
        <ModalBody>{this.renderBody()}</ModalBody>
        <iframe
          title="main"
          name="hiddenFrame"
          width="0"
          height="0"
          border="0"
          style={{ display: "none" }}
        />
      </Modal>
    );
  }
}

Popup.propTypes = {
  toggle: PropTypes.func,
  id: PropTypes.string,
  modal: PropTypes.bool,
};

export default Popup;
