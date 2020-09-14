import React, { useState, useEffect } from "react";
import api from '../../../services/api'
import "./style.css";

import { Button, Card, CardBody, Container, Row, Col, Media } from "reactstrap";


function Website() {
  return (
    <>
      <div className="header  pt-2 ">
        <Container fluid>
          <div className="header-body">
            <Media
              id='logo-faciliteai'
              className="align-items-center"
            >
              <img
                alt="..."
                className="branding"
                src={require("../../../assets/img/brand/logo.png")}
              />
            </Media>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Website;
