import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NotFound from "./NotFound";
import Item from "./Item";
import Category from "./Category";
import AdminHome from "./admin/AdminHome";
import AdminNew from "./admin/AdminNew";
import AdminEdit from "./admin/AdminEdit";
import PrivateRoute from "./PrivateRoute";

const App = ({ authenticated, checked }) => (
  <BrowserRouter>
    {checked && (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/item/:id" component={Item} />
        <Route path="/category/:id" component={Category} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute
          exact
          path="/admin"
          component={AdminHome}
          authenticated={authenticated}
        />
        <PrivateRoute
          exact
          path="/admin/new"
          component={AdminNew}
          authenticated={authenticated}
        />
        <PrivateRoute
          exact
          path="/admin/edit/:id"
          component={AdminEdit}
          authenticated={authenticated}
        />
        <Route component={NotFound} />
      </Switch>
    )}
  </BrowserRouter>
);

function mapStateToProps({ session }) {
  return {
    checked: session.checked,
    authenticated: session.authenticated
  };
}

export default connect(
  mapStateToProps,
  {}
)(App);
