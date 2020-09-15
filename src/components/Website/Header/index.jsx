import React from "react";
import { useHistory } from 'react-router-dom'
import api from '../../../services/api'
import "./style.css";

import { Button, Card, CardBody, Container, Row, Col, Media } from "reactstrap";


function Website() {
  const history = useHistory()
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
                onClick = {()=> history.push('/')}
                style = {{cursor: 'pointer'}}
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
