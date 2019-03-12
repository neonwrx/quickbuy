import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Form, FormGroup,
  Label, Input,
  Button, Alert
} from 'reactstrap';

import Header from '../Header';
import { Link } from 'react-router-dom';
import {  addProduct } from '../../actions';

class AdminNew extends Component {
  state = {
    prodName: '',
    partner: '',
    descr: '',
    price: '',
    category: 'electronic',
    sale: false,
    // images: [{src: "https://res.cloudinary.com/quickbuy/image/upload/v1551869025/smfmteckiaioy1q6ku09.png"}],
    images: [],
    showMessage: false,
    error: false
  }

  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [ name ]: value,
      showMessage: false
    });
  }
  async handleFileChange(event) {
    const BASE_URL = 'https://api.cloudinary.com/v1_1/quickbuy/image/upload';
    const PRESET = 'wgmby3pb';
    const { target } = event;
    let file = target.files[0];
    let formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', PRESET);
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data',
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      }
    }

    try {
      const response = await axios.post(BASE_URL, formData, config);
      const { secure_url } = response.data;
      if (secure_url !== undefined) {
        this.setState({
          images: [{src: secure_url}, ...this.state.images]
        });
      }
      this.showUploadedImage(response.data.secure_url)
    } catch (error) {
      console.error(error);
    }
  }

  showUploadedImage() {
    const { images } = this.state;
    if (images.length) {
      return images.map((item, index) => {
        return (
          <div key={index} className="uploaded-image">
            <img src={item.src} alt="quickbuy.shop" />
          </div>
        )
      });
    }
  }

  submitForm(e) {
    e.preventDefault();
    const { prodName, partner, descr, price, category, sale, images } = this.state;
    if (prodName.length !== 0 || descr.length !== 0 || price.length !== 0) {
      this.setState({showMessage: true, error: false});
      this.props.addProduct({prodName, partner, descr, price, category, sale, images});
      return;
    }
    this.setState({showMessage: true, error: true});
  }

  renderMessage() {
    const { showMessage, error } = this.state;
    const { success, message } = this.props.product;

    if (showMessage) {
      if (!success || error) {
        return(
          <Alert color="danger">
            Ошибка <br/>{message}
          </Alert>
        )
      } else {
        return(
          <Alert color="success">
            {message || 'Успешно'}
          </Alert>
        )
      }
    }
  }

  render() {
    const { prodName, partner, descr, price, category, sale } = this.state;
    return(
      <div>
        <Header admin={true} />
        <br/>
        <div className="container">
          <Link className="" to={'/admin/'}>Назад</Link>
          <br/>
          {
            this.renderMessage()
          }
          <br/>
          <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
            <FormGroup>
              <Label for="prodName">Имя</Label>
              <Input
                type="text"
                name="prodName"
                id="prodName"
                placeholder="Название товара"
                value={ prodName }
                onChange={ (e) => {this.handleChange(e)} }
              />
            </FormGroup>
            <FormGroup>
              <Label for="partner">Партнер</Label>
              <Input
                type="text"
                name="partner"
                id="partner"
                placeholder="Название партнера"
                value={ partner }
                onChange={ (e) => {this.handleChange(e)} }
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Цена</Label>
              <Input
                type="number"
                name="price"
                id="price"
                placeholder="Цена"
                value={ price }
                onChange={ (e) => {this.handleChange(e)} }
              />
            </FormGroup>
            <FormGroup>
              <Label for="descr">Описание</Label>
              <Input
                type="textarea"
                name="descr"
                id="descr"
                placeholder="Описание"
                value={ descr }
                onChange={ (e) => {this.handleChange(e)} }
              />
            </FormGroup>
            <FormGroup>
              <Label for="category">Категория</Label>
              <Input
                type="select"
                name="category"
                id="category"
                value={ category }
                onChange={ (e) => {this.handleChange(e)} }
              >
                <option value="electronic">Электроника</option>
                <option value="beauty">Красота и здоровье</option>
                <option value="children">Детские товары</option>
                <option value="home">Все для дома</option>
              </Input>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="sale"
                  checked={sale}
                  onChange={ (e) => {this.handleChange(e)} }
                />{' '}
                Sale
              </Label>
            </FormGroup>
            <br/>
            <FormGroup>
              <Input
                type="file"
                name="file"
                id="image"
                onChange={ (e) => {this.handleFileChange(e)} }
              />
            </FormGroup>
            <div className="d-flex justify-content-start align-items-center flex-wrap">
              {
                this.showUploadedImage()
              }
            </div>
            <br/>
            <div className="d-flex justify-content-center align-items-center mb-2">
              <Button>Добавить</Button>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    product: state.productReducer
  }
}

export default connect(mapStateToProps, { addProduct })(AdminNew);
