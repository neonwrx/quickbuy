import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import PropTypes from "prop-types";

import logo from "../img/logo.svg";
import ru from "../img/country_ru.svg";
import ua from "../img/country_ua.svg";
import kz from "../img/country_kz.svg";
import by from "../img/country_by.svg";
import { languages } from "../locales";

const LangPopup = ({toggle, defineLang, modal}) => {
  function onPress(lang) {
    toggle();
    defineLang(lang);
  }
  return (
    <Modal
      isOpen={modal}
      centered={true}
      className="popup"
    >
      <ModalHeader>
        <img src={logo} className="popup__logo2" alt="quickbuy.shop" />
      </ModalHeader>
      <ModalBody>
        <div className="popup__text">Выберите свою страну:</div>
        <br />
        <div className="popup__buttons-wrap d-flex align-items-center justify-content-around flex-wrap">
          <button
            className="popup__country-button"
            onClick={() => {onPress(languages[0])}}
          >
            <img src={ru} alt=""/>
          </button>
          <button
            className="popup__country-button"
            onClick={() => {onPress(languages[1])}}
          >
            <img src={ua} alt=""/>
          </button>
          <button
            className="popup__country-button"
            onClick={() => {onPress(languages[2])}}
          >
            <img src={kz} alt=""/>
          </button>
          <button
            className="popup__country-button"
            onClick={() => {onPress(languages[3])}}
          >
            <img src={by} alt=""/>
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}

LangPopup.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  defineLang: PropTypes.func.isRequired,
};

export default LangPopup;
