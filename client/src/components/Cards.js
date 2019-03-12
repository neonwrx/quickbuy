import React, { Component } from "react";
import { Spinner } from "reactstrap";

import Card from "./Card";

class Cards extends Component {
  render() {
    const { loading, items } = this.props;
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
          return <Card item={item} key={index} />;
        })}
      </div>
    );
  }
}

export default Cards;
