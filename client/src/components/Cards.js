import React from "react";
import { Spinner } from "reactstrap";
import PropTypes from "prop-types";

import Card from "./Card";

const Cards = ({loading, items, lang}) => {
  if (loading) {
    return (
      <div className="cards container d-flex align-items-start justify-content-center flex-wrap">
        <Spinner color="dark" />
      </div>
    );
  }
  return (
    <div className="cards container d-flex align-items-start justify-content-start flex-wrap">
      {items.map((item, index) => {
        return <Card item={item} lang={lang} key={index} />;
      })}
    </div>
  );
}

Cards.propTypes = {
  loading: PropTypes.bool,
  items: PropTypes.array,
  lang: PropTypes.string,
};

export default Cards;
