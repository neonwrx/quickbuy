import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";

import Header from "../Header";
import AdminCards from "./AdminCards";
import Footer from "../Footer";
import { fetchData, logout, deleteProduct } from "../../actions";

class AdminHome extends Component {
  state = {
    page: 1,
    category: undefined,
    orderBy: undefined,
    orderAsc: 1,
    searchText: ""
  };

  componentDidMount() {
    // if (!this.props.data.items.length) {
    this.fetchItems();
    // }
  }

  fetchItems() {
    const { page, category, orderBy, orderAsc, searchText } = this.state;
    this.props.fetchData(page, category, orderBy, orderAsc, searchText);
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
    const { logout, deleteProduct, user, data } = this.props;
    const { loading, items, pages } = data;
    const { rights } = user;
    if (rights !== "admin") {
      return (
        <div>
          <Header admin={true} logout={logout} />
          <br />
          <div className="container">
            У вас нет прав для просмотра данного контента
          </div>
        </div>
      );
    }
    return (
      <div>
        <Header admin={true} logout={logout} />
        <br />
        <div className="container">
          <Link className="" to={"/admin/new"}>
            Добавить
          </Link>
        </div>
        <br />
        <AdminCards
          items={items}
          deleteProduct={deleteProduct}
          loading={loading}
        />
        {this.renderPagination(pages)}
        <Footer />
      </div>
    );
  }
}

AdminHome.propTypes = {
  fetchData: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  user: PropTypes.object,
  data: PropTypes.object.isRequired
};

function mapStateToProps({ dataReducer, session }) {
  return {
    data: dataReducer,
    user: session.user
  };
}

export default connect(
  mapStateToProps,
  { fetchData, logout, deleteProduct }
)(AdminHome);
