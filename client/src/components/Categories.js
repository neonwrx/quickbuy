import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem } from 'reactstrap';

class Categories extends Component {
  state = {
    isOpen: false
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="categories container d-flex align-items-center justify-content-between flex-wrap">
        <Navbar light expand="md">
          {/* <NavbarBrand href="/">reactstrap</NavbarBrand> */}
          <NavbarToggler className="collapse-btn" onClick={() => this.toggle()} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="d-flex align-items-center justify-content-between flex-wrap w-100" navbar>
              <NavItem>
                <NavLink
                  className="categories__item nav-link"
                  to={"/category/sale"}
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#5B15CD",
                    textDecoration: "none"
                  }}
                  >
                    РАСПРОДАЖА
                  </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="categories__item nav-link"
                  to={"/category/electronic"}
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#5B15CD",
                    textDecoration: "none"
                  }}
                >
                  ЭЛЕКТРОНИКА
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="categories__item nav-link"
                  to={"/category/beauty"}
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#5B15CD",
                    textDecoration: "none"
                  }}
                >
                  КРАСОТА И ЗДОРОВЬЕ
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="categories__item nav-link"
                  to={"/category/children"}
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#5B15CD",
                    textDecoration: "none"
                  }}
                >
                  ДЕТСКИЕ ТОВАРЫ
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="categories__item nav-link"
                  to={"/category/home"}
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#5B15CD",
                    textDecoration: "none"
                  }}
                >
                  ВСЕ ДЛЯ ДОМА
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        {/* <NavLink
          className="categories__item"
          to={"/category/sale"}
          activeStyle={{
            fontWeight: "bold"
          }}
        >
          РАСПРОДАЖА
        </NavLink>
        <NavLink
          className="categories__item"
          to={"/category/electronic"}
          activeStyle={{
            fontWeight: "bold"
          }}
        >
          ЭЛЕКТРОНИКА
        </NavLink>
        <NavLink
          className="categories__item"
          to={"/category/beauty"}
          activeStyle={{
            fontWeight: "bold"
          }}
        >
          КРАСОТА И ЗДОРОВЬЕ
        </NavLink>
        <NavLink
          className="categories__item"
          to={"/category/children"}
          activeStyle={{
            fontWeight: "bold"
          }}
        >
          ДЕТСКИЕ ТОВАРЫ
        </NavLink>
        <NavLink
          className="categories__item"
          to={"/category/home"}
          activeStyle={{
            fontWeight: "bold"
          }}
        >
          ВСЕ ДЛЯ ДОМА
        </NavLink> */}
      </div>
    );
  }
}

export default Categories;
