import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";

import Header from "./Header";
import Categories from "./Categories";
import NavBar from "./NavBar";
import Cards from "./Cards";
import LangPopup from "./LangPopup";
import Footer from "./Footer";
import { fetchData, defineLang } from "../actions";
import { languages } from '../locales';

class Home extends Component {
  state = {
    page: 1,
    category: undefined,
    orderBy: undefined,
    orderAsc: 1,
    searchText: "",
    modal: false
  };

  componentDidMount() {
    const { userLang } = this.props;
    this.fetchItems();
    if (!languages.includes(userLang)) {
      this.toggle();
    } else {
      this.defineLang(userLang);
    }
  }

  fetchItems() {
    const { page, category, orderBy, orderAsc, searchText } = this.state;
    this.props.fetchData(page, category, orderBy, orderAsc, searchText);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  defineLang(lang) {
    this.props.defineLang(lang);
  }

  onSearch(e) {
    this.setState({ searchText: e }, () => {
      this.fetchItems();
    });
  }

  onSort(orderBy, orderAsc) {
    this.setState({ orderBy, orderAsc }, () => {
      this.fetchItems();
    });
  }

  handlePageClick(data) {
    let selected = data.selected + 1;
    this.setState({ page: selected }, () => {
      this.fetchItems();
    });
  }

  renderPagination(pages) {
    if (pages > 16) {
      return (
        <nav aria-label="Page navigation example">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={Number((pages / 16).toFixed())}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={data => this.handlePageClick(data)}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item noselect"}
            nextClassName={"page-item noselect"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </nav>
      );
    }
  }

  render() {
    const { lang, data } = this.props;
    const { loading, items, pages } = data;
    const { modal } = this.state;
    return (
      <div>
        <Header />
        <NavBar
          onSearch={e => this.onSearch(e)}
          onSort={(a, b) => this.onSort(a, b)}
        />
        <Categories />
        <Cards items={items} loading={loading} lang={lang} />
        <LangPopup
          modal={modal}
          toggle={() => this.toggle()}
          defineLang={lang => this.defineLang(lang)}
        />
        {this.renderPagination(pages)}
        <Footer />
      </div>
    );
  }
}

Home.propTypes = {
  userLang: PropTypes.string,
  lang: PropTypes.string,
  fetchData: PropTypes.func.isRequired,
  defineLang: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

function mapStateToProps({ dataReducer, langReducer }) {
  return {
    data: dataReducer,
    lang: langReducer.lang,
  };
}

export default connect(
  mapStateToProps,
  { fetchData, defineLang }
)(Home);
