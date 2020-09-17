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
import React, { useRef } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AuthenticatedNavbar from "../components/Navbars/AuthenticatedNavbar";
// import AdminFooter from "../components/Footers/AdminFooter.js";
import AuthenticatedSidebar from "../components/Sidebars/AuthenticatedSidebar";
import { AUTHENTICATED_ROUTE_PREFIX } from '../config/Constants'
import { Logo } from '../components/Icons/index'

// import { Container } from './styles';

function AuthenticatedContainer(props) {

const mainContentRef = useRef();
  return (
      <>
        <AuthenticatedSidebar
        //   {...props}
          logo={{
            innerLink: `/${AUTHENTICATED_ROUTE_PREFIX}/index`,
            imgSrc: Logo,
            imgAlt: "..."
          }}
        />

        <div className="main-content" ref={mainContentRef}>
          <AuthenticatedNavbar
            // {...props}
            // brandText={this.getBrandText(props.location.pathname)} 
          />
          {props.children}
        </div>
      </>
  )
}

export default AuthenticatedContainer;