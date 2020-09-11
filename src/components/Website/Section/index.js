import React from "react";
import "./styles.css";
import { Col, Row, Container, Button } from "reactstrap";

function CardServices() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col className="card-services">
            <div className="services-info">
              <strong>Nome do serviço</strong>
              <span>Descrição do serviço</span>
              <span>Nome da empresa</span>
              <span>Preço do serviço</span>
              <span>Localização</span>
              <Button>Contratar</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

function Section() {
  return (
    <>
      <div className="bg-gradient-info">
        <Row>
          <Col lg = '4'>
          <CardServices />
          </Col>
          <Col lg = '4'>
          <CardServices />
          </Col>
          <Col lg = '4'>
          <CardServices />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Section;
