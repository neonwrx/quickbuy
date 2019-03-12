import React, { Component } from 'react';
import { Spinner, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import noimage from '../../img/icon-no-image.svg';
import edit from '../../img/edit-button.svg';
import del from '../../img/delete-button.svg';

class AdminCards extends Component {
  state = {
    modal: false,
    uId: undefined
  }

  showDelProduct(_id) {
    this.setState({
      uId: _id
    });
    this.toggle();
  }

  deleteProduct() {
    const { uId } = this.state;
    this.props.deleteProduct(uId);
    this.toggle();
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  renderItems() {
    const { loading, items } = this.props;
    if (loading) {
      return (
        <tr>
          <td colSpan="8">
            <Spinner color="dark" />
          </td>
        </tr>
      )
    }
    return items.map((item, index) => {
      const { id, name, partner, descr, category, images, _id } = item;
      return (
        <tr key={index}>
          <td>
            <Link
              className="admin-table__btn"
              to={{
                pathname:`/admin/edit/${id}`,
                state: item
              }}
            >
              <img src={edit} alt="Edit"/>
            </Link>
          </td>
          <td>
            <button className="admin-table__btn" onClick={() => this.showDelProduct(_id)}>
              <img src={del} alt="Edit"/>
            </button>
          </td>
          <td>{id}</td>
          <td><div className="admin-table__name">{name}</div></td>
          <td>{category}</td>
          <td><img src={(images.length) ? images[0].src : noimage} className="admin-table__image" alt="quickbuy.shop" /></td>
          <td><div className="admin-table__descr">{descr}</div></td>
          <td>{partner}</td>
        </tr>
      )
    });
  }

  render() {
    return(
      <div className="container">
        <Table bordered responsive hover className="admin-table">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Img</th>
              <th>Description</th>
              <th>Partner</th>
            </tr>
          </thead>
          <tbody>
            {
              this.renderItems()
            }
          </tbody>
        </Table>
        <Modal isOpen={this.state.modal} toggle={() => this.toggle()} className={this.props.className} centered>
          <ModalHeader toggle={() => this.toggle()}>Подтверждение</ModalHeader>
          <ModalBody>
            Вы действительно хотите удалить товар?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => this.deleteProduct()}>Удалить</Button>{' '}
            <Button color="secondary" onClick={() => this.toggle()}>Отмена</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default AdminCards;
