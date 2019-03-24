import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";

class Categories extends Component {
  state = {
    isOpen: false
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  renderCategories() {
    const categories = [
      "РАСПРОДАЖА",
      "ЭЛЕКТРОНИКА",
      "КРАСОТА И ЗДОРОВЬЕ",
      "ДЕТСКИЕ ТОВАРЫ",
      "ВСЕ ДЛЯ ДОМА"
    ];
    const links = ["sale", "electronic", "beauty", "children", "home"];
    return categories.map((cat, index) => {
      return (
        <NavItem key={index}>
          <NavLink
            className="categories__item nav-link"
            to={`/category/${links[index]}`}
            activeStyle={{
              fontWeight: "bold",
              color: "#5B15CD",
              textDecoration: "none"
            }}
          >
            {cat}
          </NavLink>
        </NavItem>
      );
    });
  }

  render() {
    return (
      <div className="categories container d-flex align-items-center justify-content-between flex-wrap">
        <Navbar light expand="md">
          <NavbarToggler
            className="collapse-btn"
            onClick={() => this.toggle()}
          />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav
              className="d-flex align-items-center justify-content-between flex-wrap w-100"
              navbar
            >
              {this.renderCategories()}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Categories;
