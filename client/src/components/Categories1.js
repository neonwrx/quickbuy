import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Categories extends Component {
  render() {
    return (
      <div className="categories container d-flex align-items-center justify-content-between flex-wrap">
        <NavLink
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
        </NavLink>
      </div>
    );
  }
}

export default Categories;
