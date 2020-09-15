/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./auth";
import { createBrowserHistory } from 'history'

import "./assets/plugins/nucleo/css/nucleo.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";

import ProviderLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";
import Website from "./views/website/index";
import Payment from "./views/website/payment";
import Plans from "./views/website/plans";
import Success from "./views/website/success";
import Cancel from "./views/website/cancel";
import Register from "./views/website/register";
import Service from "./views/website/Services/index";




const history = createBrowserHistory()

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

ReactDOM.render(
  <BrowserRouter history={history}>
    <Switch>
      <AuthenticatedRoute
        path="/app"
        component={(props) => <ProviderLayout {...props} />}
      />
      <Route path="/auth/login" render={(props) => <AuthLayout {...props} />} />
      <Route
        path="/auth/register"
        render={(props) => <AuthLayout {...props} />}
      />
      <Route
        path="/app/cadastrar-servico"
        render={(props) => <AuthLayout {...props} />}
      />
      <Route from="/service/:id" render={(props) => <Payment {...props} />} />
      <Route from="/cadastro" render={(props) => <Register {...props} />} />

      <Route from="/contratar-plano" render={(props) => <Plans {...props} />} />
      <Route from="/payment/sucesso" render={(props) => <Success {...props} />} />
      <Route from="/payment/cancel" render={(props) => <Cancel {...props} />} />

      <Route from="/services/category=:catid/subcategory=:subid"  render={(props) => <Service {...props} />} />
      <Route from="/" render={(props) => <Website {...props} />} />
      
     
      
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
