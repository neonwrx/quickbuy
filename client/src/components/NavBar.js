import React, { Component } from "react";

class NavBar extends Component {
  state = {
    orderBy: undefined,
    orderAsc: false
  };

  renderSortNames() {
    const names = ["ПОПУЛЯРНОЕ", "НОВИНКИ", "ЦЕНА"];
    return names.map((name, index) => {
      const isSelected = index === this.state.orderBy;
      const arrow = isSelected
        ? this.state.orderAsc
          ? "is--asc"
          : "is--desc"
        : "";
      const classes = `${isSelected ? `is--active ${arrow}` : ""}`;
      return (
        <button
          className={`${classes} sort-block__item`}
          key={index}
          onClick={() => this.handleClick(index)}
        >
          {name}
        </button>
      );
    });
  }

  handleClick(index) {
    let orderAsc =
      this.state.orderBy === index ? !this.state.orderAsc : this.state.orderAsc;
    this.setState({
      orderBy: index,
      orderAsc: orderAsc
    });
    this.props.onSort(index, orderAsc ? 1 : -1);
  }

  onSearch(e) {
    this.props.onSearch(e.target.value.toLowerCase());
  }

  render() {
    return (
      <div className="nav-bar">
        <div className="container d-flex align-items-center justify-content-between flex-wrap">
          <div className="sort-block d-flex align-items-center justify-content-around flex-wrap">
            {this.renderSortNames()}
          </div>
          <div className="search-block">
            <input
              type="text"
              placeholder="Поиск"
              onChange={e => {
                this.onSearch(e);
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
