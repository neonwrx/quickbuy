import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback
} from "reactstrap";
import PropTypes from "prop-types";

import Header from "./Header";
import { signup } from "../actions";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userName: "",
      validate: {
        emailState: "",
        passwordState: ""
      }
    };
  }

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRex.test(e.target.value)) {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
    }
    this.setState({ validate });
  }

  validatePassword(e) {
    const { validate } = this.state;
    if (e.target.value.length >= 6) {
      validate.passwordState = "has-success";
    } else {
      validate.passwordState = "has-danger";
    }
    this.setState({ validate });
  }

  handleChange = async event => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value
    });
  };

  renderError() {
    const { success, message } = this.props.user;
    if (!success) {
      return (
        <Col>
          <FormGroup>
            <div className="error">{message}</div>
          </FormGroup>
        </Col>
      );
    }
  }

  submitForm(e) {
    e.preventDefault();
    const { email, password, userName, validate } = this.state;
    const { emailState, passwordState } = validate;
    const name = userName;
    const { history } = this.props;
    if (
      emailState.length !== 0 &&
      passwordState.length !== 0 &&
      emailState !== "has-danger" &&
      passwordState !== "has-danger"
    ) {
      this.props.signup({ email, password, name }, history);
    }
  }

  render() {
    const { email, password, userName } = this.state;
    return (
      <div>
        <Header />
        <br />
        <div className="Login">
          <h2>Регистрация</h2>
          <Form className="form" onSubmit={e => this.submitForm(e)}>
            <Col>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="myemail@email.com"
                  value={email}
                  valid={this.state.validate.emailState === "has-success"}
                  invalid={this.state.validate.emailState === "has-danger"}
                  onChange={e => {
                    this.validateEmail(e);
                    this.handleChange(e);
                  }}
                />
                <FormFeedback>Вы ввели некорректный email</FormFeedback>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="********"
                  value={password}
                  valid={this.state.validate.passwordState === "has-success"}
                  invalid={this.state.validate.passwordState === "has-danger"}
                  onChange={e => {
                    this.validatePassword(e);
                    this.handleChange(e);
                  }}
                />
                <FormFeedback>
                  Пароль должен содержать не менее 6 символов
                </FormFeedback>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="exampleText">Ваше имя</Label>
                <Input
                  type="text"
                  name="userName"
                  id="exampleText"
                  placeholder=""
                  value={userName}
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
            </Col>
            {this.renderError()}
            <div className="d-flex justify-content-between align-items-end">
              <Button className="register-btn mr-2">Регистрация</Button>
              <Link to={"/signin"}>Вернуться</Link>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  user: PropTypes.object,
  signup: PropTypes.func.isRequired,
};

function mapStateToProps({ userReducer }) {
  return {
    user: userReducer
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { signup }
  )(SignUp)
);
