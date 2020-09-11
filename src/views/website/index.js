import React from "react";

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

import Header from "../../components/Website/Header/index";
import Section from "../../components/Website/Section/index";

function website() {
  return (
    <>
      <Container fluid>
        <Header />
        <Section />
      </Container>
    </>
  );
}

export default website;