import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Header from "../Header";
import { addProduct, editProduct } from "../../actions";

class AdminEdit extends Component {
  state = {
    prodName: "",
    partner: "",
    descr: "",
    descr2: "",
    price: "",
    price2: "",
    price3: "",
    price4: "",
    category: "electronic",
    productId: "",
    sale: false,
    images: [],
    showMessage: false,
    error: false,
    errorFetchItems: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    if (!this.props.newItem) {
      if (this.props.location.state !== undefined) {
        const {
          name,
          partner,
          descr,
          descr2,
          price,
          price2,
          price3,
          price4,
          category,
          productId,
          sale,
          images
        } = this.props.location.state;
        this.setState({
          prodName: name,
          partner,
          descr,
          descr2,
          price,
          price2,
          price3,
          price4,
          category,
          productId,
          sale,
          images
        });
      } else {
        this.setState({
          errorFetchItems: true
        });
      }
    }
  }

  handleChange = async event => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value,
      showMessage: false
    });
  };

  async handleFileChange(event) {
    const BASE_URL = "https://api.cloudinary.com/v1_1/quickbuy/image/upload";
    const PRESET = "wgmby3pb";
    const { target } = event;
    let file = target.files[0];
    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", PRESET);
    let config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };

    try {
      const response = await axios.post(BASE_URL, formData, config);
      const { secure_url } = response.data;
      if (secure_url !== undefined) {
        this.setState({
          images: [{ src: secure_url }, ...this.state.images]
        });
      }
      this.showUploadedImage(response.data.secure_url);
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
            <img src={item.src} alt="quickbuy.shop" onClick={() => this.onImageClick(index)} />
          </div>
        );
      });
    }
  }
  onImageClick(index) {
    const { images } = this.state;
    let arr = [...images]
    // eslint-disable-next-line
    Array.prototype.move = function(from,to){
      this.splice(to,0,this.splice(from,1)[0]);
      return this;
    };
    if (index !==0) {
      this.setState({images: arr.move(index,0)})
    }
  }

  submitForm(e) {
    const { newItem, editProduct, addProduct } = this.props;
    e.preventDefault();
    const {
      prodName,
      partner,
      descr,
      descr2,
      price,
      price2,
      price3,
      price4,
      category,
      productId,
      sale,
      images
    } = this.state;
    if (!newItem) {
      const { state } = this.props.location;
      const { _id } = state;
      let data = {};
      const obj = {
        name: prodName,
        partner,
        descr,
        descr2,
        price,
        price2,
        price3,
        price4,
        category,
        productId,
        sale,
        images
      };

      for (const prop in obj) {
        if (obj[prop] !== state[prop]) {
          data = { [prop]: obj[prop], ...data };
        }
      }
      if (Object.entries(data).length === 0) {
        return;
      }

      if (prodName.length !== 0 || descr.length !== 0 || price.length !== 0) {
        this.setState({ showMessage: true, error: false });
        editProduct(data, _id);
        setTimeout(() => {
          this.props.history.push("/admin");
        }, 1000);
        return;
      }
    }

    if (prodName.length !== 0 || descr.length !== 0 || price.length !== 0) {
      this.setState({ showMessage: true, error: false });
      addProduct({
        prodName,
        partner,
        descr,
        descr2,
        price,
        price2,
        price3,
        price4,
        category,
        productId,
        sale,
        images
      });
      setTimeout(() => {
        this.props.history.push("/admin");
      }, 1000);
      return;
    }
    this.setState({ showMessage: true, error: true });
  }

  renderMessage() {
    const { showMessage, error } = this.state;
    const { success, message } = this.props.product;

    if (showMessage) {
      if (!success || error) {
        return (
          <Alert color="danger">
            Ошибка <br />
            {message}
          </Alert>
        );
      } else {
        return <Alert color="success">{message || "Успешно"}</Alert>;
      }
    }
  }

  renderFields() {
    const {
      prodName,
      partner,
      descr,
      descr2,
      price,
      price2,
      price3,
      price4,
      productId
    } = this.state;
    const arr = {
      prodName,
      partner,
      price,
      price2,
      price3,
      price4,
      descr,
      descr2,
      productId
    };
    const names = [
      "Имя",
      "Партнер",
      "Цена 1, рубли",
      "Цена 2, грн",
      "Цена 3, тенге",
      "Цена 4, бел. рубли",
      "Описание",
      "Дополнительное описание",
      "Product ID"
    ];
    const types = [
      "text",
      "text",
      "number",
      "number",
      "number",
      "number",
      "textarea",
      "textarea",
      "text"
    ];
    const placeholders = [
      "Название товара",
      "Название партнера",
      "Цена, рубли",
      "Цена, грн",
      "Цена, тенге",
      "Цена, бел. рубли",
      "Описание",
      "Дополнительное описание",
      "ID товара"
    ];

    return names.map((name, i) => {
      return (
        <FormGroup key={i}>
          <Label for={Object.keys(arr)[i]}>{names[i]}</Label>
          <Input
            type={Object.values(types)[i]}
            name={Object.keys(arr)[i]}
            id={Object.keys(arr)[i]}
            placeholder={placeholders[i]}
            value={Object.values(arr)[i]}
            onChange={e => {
              this.handleChange(e);
            }}
          />
        </FormGroup>
      );
    });
  }

  render() {
    const { category, sale, errorFetchItems } = this.state;
    const { newItem } = this.props;
    if (errorFetchItems) {
      return (
        <div>
          <Header admin={true} />
          <br />
          <div className="container">
            <span>Ошибка загрузки данных </span>
            <Link className="" to={"/admin/"}>
              назад
            </Link>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Header admin={true} />
        <br />
        <div className="container">
          <Link className="" to={"/admin/"}>
            Назад
          </Link>
          <br />
          <br />
          <Form className="form" onSubmit={e => this.submitForm(e)}>
            {this.renderFields()}
            <FormGroup>
              <Label for="category">Категория</Label>
              <Input
                type="select"
                name="category"
                id="category"
                value={category}
                onChange={e => {
                  this.handleChange(e);
                }}
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
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />{" "}
                Sale
              </Label>
            </FormGroup>
            <br />
            <FormGroup>
              <Input
                type="file"
                name="file"
                id="image"
                onChange={e => {
                  this.handleFileChange(e);
                }}
              />
            </FormGroup>
            <div className="d-flex justify-content-start align-items-center flex-wrap">
              {this.showUploadedImage()}
            </div>
            <br />
            <div className="d-flex justify-content-center align-items-center mb-2">
              <Button>{!newItem ? "Изменить" : "Добавить"}</Button>
            </div>
          </Form>
          <br />
          {this.renderMessage()}
        </div>
      </div>
    );
  }
}

AdminEdit.propTypes = {
  newItem: PropTypes.bool,
  addProduct: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired,
  product: PropTypes.object,
};

function mapStateToProps({productReducer}) {
  return {
    product: productReducer
  };
}

withRouter(AdminEdit);
export default connect(
  mapStateToProps,
  { addProduct, editProduct }
)(AdminEdit);
