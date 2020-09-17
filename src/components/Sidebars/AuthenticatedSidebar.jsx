import React, { useState } from 'react';
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { logout as AuthLogout} from "../../auth";

import { canAccess } from '../../auth'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

import routes from "../../routes"

// import { Container } from './styles';

function AuthenticatedSidebar(props) {
    const { logo } = props;
    const [isOpen, setIsOpen] = useState(false)

    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link,
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank",
      };
    }

    function logout() {
        AuthLogout()
        window.location = "/auth/login";
    }

    function createLinks () {
        return routes.map((prop, key) => {
            if(prop.hidden === true || !canAccess(prop.requestedRoles)){
                return ('')
            }
          
            return (
                <NavItem key={key}>
                <NavLink
                    to={prop.layout + prop.path}
                    tag={NavLinkRRD}
                    onClick={() => { setIsOpen(false) }}
                    activeClassName="active"
                >
                    <i className={prop.icon} />
                    {prop.name}
                </NavLink>
                </NavItem>
            );
          
        });
      };

      return (
        <Navbar
          className="navbar-vertical fixed-left navbar-light bg-white"
          expand="md"
          id="sidenav-main"
        >
          <Container fluid>
            <button
              className="navbar-toggler"
              type="button"
              onClick={() => { setIsOpen(!isOpen) }}
            >
              <span className="navbar-toggler-icon" />
            </button>
            
            {logo ? (
              <NavbarBrand className="pt-0" {...navbarBrandProps}>
                <img
                  alt={logo.imgAlt}
                  className="navbar-brand-img"
                  src={logo.imgSrc}
                />
              </NavbarBrand>
            ) : ''}
            
            <Nav className="align-items-center d-md-none">
                {/* NOTIFICATIONS Items */}
                <UncontrolledDropdown nav>
                    <DropdownToggle nav className="nav-link-icon">
                        <i className="ni ni-bell-55" />
                    </DropdownToggle>   
                    <DropdownMenu
                        aria-labelledby="navbar-default_dropdown_1"
                        className="dropdown-menu-arrow"
                        right
                    >
                        <DropdownItem>Action</DropdownItem>
                        <DropdownItem>Another action</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Something else here</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>

              {/* PROFILE Items */}
              <UncontrolledDropdown nav>
                <DropdownToggle nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("../../assets/img/theme/team-1-800x800.jpg")}
                      />
                    </span>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem to="/admin/profile">
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-settings-gear-65" />
                    <span>Settings</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/profile" tag={Link}>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Activity</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-support-16" />
                    <span>Support</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="#pablo" onClick={(e) => {
                    e.preventDefault()
                    logout()
                    }}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            {/* Collapse */}
            <Collapse navbar isOpen={isOpen}>
              {/* Collapse header */}
              <div className="navbar-collapse-header d-md-none">
                <Row>
                  {logo ? (
                    <Col className="collapse-brand" xs="6">
                      {logo.innerLink ? (
                        <Link to={logo.innerLink}>
                          <img alt={logo.imgAlt} src={logo.imgSrc} />
                        </Link>
                      ) : (
                        <a href={logo.outterLink}>
                          <img alt={logo.imgAlt} src={logo.imgSrc} />
                        </a>
                      )}
                    </Col>
                  ) : null}
                  <Col className="collapse-close" xs="6">
                    <button
                      className="navbar-toggler"
                      type="button"
                      onClick={() => {setIsOpen(!isOpen)}}
                    >
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              {/* SearchBar */}
              {/* <Form className="mt-4 mb-3 d-md-none">
                <InputGroup className="input-group-rounded input-group-merge">
                  <Input
                    aria-label="Search"
                    className="form-control-rounded form-control-prepended"
                    placeholder="Search"
                    type="search"
                  />
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <span className="fa fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Form> */}
              {/* Navigation */}
              <Nav navbar>{createLinks()}</Nav>
              {/* Divider */}
              <hr className="my-3" />
            </Collapse>
          </Container>
        </Navbar>
      );
}

export default AuthenticatedSidebar;