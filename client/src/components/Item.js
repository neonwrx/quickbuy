import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "./Header";
import Categories from "./Categories";
import Product from "./Product";
import Cards from "./Cards";
import Footer from "./Footer";
import { fetchData } from "../actions";

class Item extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    if (!this.props.items.length) {
      this.props.fetchData(1);
    }
  }

  render() {
    const { item, items } = this.props;
    return (
      <div>
        <Header />
        <Categories />
        <Product item={item} />
        <div className="rules container">
          Returns & Refund is a guarantee provided by sellers for every product
          they sell on AliExpress.com. <br />
          When you receive a product that was bought and paid for on our site,
          and you find it is not as described or is of low quality, you can
          contact the seller to resolve these problems (according to the
          seller's set of returns guarantees).You will then be able to request a
          full refund and return the item, or keep the item and agree a partial
          refund with seller.
        </div>
        <div className="container mb-3">РЕКОМЕНДУЕМЫЕ ТОВАРЫ</div>
        <Cards items={items} />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  // console.log('dataReducer', state)
  // console.log('ownProps', typeof Number(ownProps.match.params.id))
  const data = state.dataReducer.items.filter(
    item => item.id === Number(ownProps.match.params.id)
  );
  return {
    item: data[0],
    items: state.dataReducer.items
  };
}

export default connect(
  mapStateToProps,
  { fetchData }
)(Item);
