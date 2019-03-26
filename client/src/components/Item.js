import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Header from "./Header";
import Categories from "./Categories";
import Product from "./Product";
import Cards from "./Cards";
import LangPopup from "./LangPopup";
import Footer from "./Footer";
import { fetchData, defineLang } from "../actions";
import { languages } from "../locales";

class Item extends Component {
  state = {
    modal: false
  };

  componentDidMount() {
    const { userLang, lang } = this.props;
    window.scrollTo(0, 0);
    if (!this.props.items.length) {
      this.props.fetchData(1);
    }
    if (!languages.includes(userLang) && !lang.length) {
      this.toggle();
    } else if (lang === "") {
      this.defineLang(userLang);
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  defineLang(lang) {
    this.props.defineLang(lang);
  }

  render() {
    const { item, items, lang } = this.props;
    const { category } = item;
    const { modal } = this.state;
    return (
      <div>
        <Header />
        <Categories active={category} />
        <Product item={item} lang={lang} />
        <div className="container mb-3">РЕКОМЕНДУЕМЫЕ ТОВАРЫ</div>
        <Cards items={items} />
        <LangPopup
          modal={modal}
          toggle={() => this.toggle()}
          defineLang={lang => this.defineLang(lang)}
        />
        <Footer />
      </div>
    );
  }
}

Item.propTypes = {
  userLang: PropTypes.string,
  lang: PropTypes.string,
  fetchData: PropTypes.func.isRequired,
  defineLang: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  item: PropTypes.object
};

function mapStateToProps({ dataReducer, langReducer }, ownProps) {
  const data = dataReducer.items.filter(
    item => item.id === Number(ownProps.match.params.id)
  );
  return {
    item: data[0],
    items: dataReducer.items,
    lang: langReducer.lang
  };
}

export default connect(
  mapStateToProps,
  { fetchData, defineLang }
)(Item);
