import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";

import Header from "./Header";
import Categories from "./Categories";
import NavBar from "./NavBar";
import Cards from "./Cards";
import Footer from "./Footer";
import { fetchData, defineLang } from "../actions";
import { languages } from "../locales";

class Category extends Component {
  state = {
    page: 1,
    category: undefined,
    orderBy: undefined,
    orderAsc: 1,
    searchText: ""
  };

  static getDerivedStateFromProps(props, state) {
    if (state.category !== props.match.params.id) {
      return { category: props.match.params.id };
    }
    return null;
  }

  componentDidMount() {
    const { userLang, lang } = this.props;
    // if (!this.props.data.items.length) {
    this.fetchItems();
    // }
    if (!languages.includes(userLang) && !lang.length) {
      this.toggle();
    } else if (lang === "") {
      this.defineLang(userLang);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.category !== prevState.category) {
      this.fetchItems();
    }
  }

  defineLang(lang) {
    this.props.defineLang(lang);
  }

  fetchItems() {
    const { page, category, orderBy, orderAsc, searchText } = this.state;
    this.props.fetchData(page, category, orderBy, orderAsc, searchText);
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
    const { data, lang } = this.props;
    const { loading, items, pages } = data;
    return (
      <div>
        <Header />
        <NavBar
          onSearch={e => this.onSearch(e)}
          onSort={(a, b) => this.onSort(a, b)}
        />
        <Categories />
        <Cards items={items} loading={loading} lang={lang} />
        {this.renderPagination(pages)}
        <Footer />
      </div>
    );
  }
}

Category.propTypes = {
  userLang: PropTypes.string,
  fetchData: PropTypes.func.isRequired,
  defineLang: PropTypes.func.isRequired,
  lang: PropTypes.string,
  data: PropTypes.object.isRequired,
};

function mapStateToProps({ dataReducer, langReducer }) {
  return {
    data: dataReducer,
    lang: langReducer.lang
  };
}

export default connect(
  mapStateToProps,
  { fetchData, defineLang }
)(Category);
