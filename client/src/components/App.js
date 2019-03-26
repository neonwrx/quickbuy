import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import detectBrowserLanguage from 'detect-browser-language';

import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NotFound from "./NotFound";
import Item from "./Item";
import Category from "./Category";
import AdminHome from "./admin/AdminHome";
import AdminEdit from "./admin/AdminEdit";
import PrivateRoute from "./PrivateRoute";
import PrivacyPolicy from "./PrivacyPolicy";
import Agreement from "./Agreement";

const lang = detectBrowserLanguage();
// const lang = 'ru-RU';
const App = ({ authenticated, checked }) => (
  <BrowserRouter>
    {checked && (
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} userLang={lang} /> } />
        <Route path="/item/:id" render={(props) => <Item {...props} userLang={lang} /> } />
        <Route path="/category/:id" render={(props) => <Category {...props} userLang={lang} /> } />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/agreement" component={Agreement} />
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
          component={AdminEdit}
          authenticated={authenticated}
          newItem={true}
        />
        <PrivateRoute
          exact
          path="/admin/edit/:id"
          component={AdminEdit}
          authenticated={authenticated}
          newItem={false}
        />
        <Route component={NotFound} />
      </Switch>
    )}
  </BrowserRouter>
);

function mapStateToProps({ session }) {
  return {
    checked: session.checked,
    authenticated: session.authenticated,
  };
}

export default connect(
  mapStateToProps,
  {}
)(App);
