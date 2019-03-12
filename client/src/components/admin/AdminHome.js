import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import Header from '../Header';
import AdminCards from './AdminCards';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import { fetchData, logout, deleteProduct } from '../../actions';

class AdminHome extends Component {
  state = {
    page: 1,
    category: undefined,
    orderBy: undefined,
    orderAsc: 1,
    searchText: ''
  }

  componentDidMount() {
    // if (!this.props.data.items.length) {
      this.fetchItems();
      console.log('request');
    // }
  }

  fetchItems() {
    const { page, category, orderBy, orderAsc, searchText } = this.state;
    this.props.fetchData(page, category, orderBy, orderAsc, searchText);
  }

  handlePageClick(data) {
    let selected = data.selected + 1;
    this.setState({page: selected}, () => {
      this.fetchItems()
    })
  }

  renderPagination(pages) {
    if (pages > 16) {
      return (
        <nav aria-label="Page navigation example">
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={Number((pages/16).toFixed())}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(data) => this.handlePageClick(data)}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item noselect'}
            nextClassName={'page-item noselect'}
            previousLinkClassName={'page-link'}
            nextLinkClassName={'page-link'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </nav>
      )
    }
  }

  render() {
    const { loading, items, pages } = this.props.data;
    const { logout, deleteProduct } = this.props;
    return (
      <div>
        <Header admin={true} logout={logout} />
        <br/>
        <div className="container">
          <Link className="" to={'/admin/new'}>Добавить</Link>
        </div>
        <br/>
        <AdminCards items={items} deleteProduct={deleteProduct} loading={loading} />
        {
          this.renderPagination(pages)
        }
        <Footer />
      </div>
    )
  }
}

function mapStateToProps({ dataReducer }) {
  return {
    data: dataReducer
  }
}

export default connect(mapStateToProps, { fetchData, logout, deleteProduct })(AdminHome);
