import React from "react";
import { useHistory } from 'react-router-dom'
import api from '../../../services/api'
import "./style.css";

import { Button, Card, CardBody, Container, Row, Col, Media } from "reactstrap";


function Website() {
  const history = useHistory()
  return (
    <>
      <div className="header pt-2 ">
        <Container fluid >

          <Row>
            <Col lg='2' md='2' xl='2'></Col>
            <Col
              className="header-login"
              lg='8' md='8' xl='8'
              style={{ display: "flex", flexDirection: "row", alignContent: "center", 
              alignItems:'center', justifyContent: "space-between",
              marginLeft: '10px',
              marginRight: '10px',
              marginBottom: '5px' }}
              >
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

                  <Button 
                id="headerLoginButton"
                onClick={() => {
                    const l = {
                      pathname: "/auth/login",
                      state: { from: `/` }
                    }

                    history.push(l)
                  }}>LOGIN</Button>
              </Col>

              <Col lg='2' md='2' xl='2' />
            </Row>
          </Container>
      </div>
    </>
  );
}

export default Website;
