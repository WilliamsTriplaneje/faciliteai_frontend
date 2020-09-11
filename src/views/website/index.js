import React from "react";
import "./style.css";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  CardTitle,
  Media,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

function website() {
  return (
    <>
      <div className="header bg-gradient-info pb-4 pt-2 pt-md-5">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col lg="12" xl="12">
                <Card
                  className="card-stats mb-4 mb-xl-0"
                  style={{
                    background: "transparent",
                    border: "none",
                  }}
                >
                  <CardBody>
                    <Media
                      className="align-items-center"
                      style={{
                        justifyContent: "center",
                        paddingBottom: 24,
                      }}
                    >
                      <img
                        alt="..."
                        className="branding"
                        src={require("../../assets/img/brand/logo.png")}
                      />
                    </Media>
                    <Row id ='search-area'>
                      <Col>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <Input
                              placeholder="Digite o trabalho que deseja contratar"
                              id="search"
                              type="text"
                              autoComplete="new-email"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col className="col-auto">
                        <Button>Procurar</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

export default website;
