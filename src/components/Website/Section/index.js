import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import "./styles.css";
import {
  Container,
  Row,
  Col,
  Button,
  Media,
  Card,
  Input,
  Label,
} from "reactstrap";

function Section() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      const response = await api.get("/categories");
      setCategory(response.data);
      console.log(response.data)
    }
    loadCategories();
  }, []);

  return (
    <>
      <Container
        fluid
        className="bg-gradient-info"
        style={{ maxWidth: "100vw", margin: 0 }}
      >
        <Row xl="12" id="descriptionFacilite">
          <Col
            lg="7"
            style={{ display: "flex", flexDirection: "column" }}
            id="contentInfos"
          >
            <h3>O SEU PROBLEMA É O NOSSO PROBLEMA E NÓS TEMOS A SOLUÇÃO</h3>
            <Row>
              <span>
                A FaciliteAi é uma plataforma inovadora para  pessoas
                que querem contratar serviços  de uma forma simples e ágil.
              </span>
            </Row>
            <Col lg="6" id="buttonsFacilite">
              <Button>Baixe o app</Button>
              <Button>Saiba Mais</Button>
            </Col>
            <span style={{ margin: "12px" }}>
              Procure os serviços da sua região
            </span>
            <Card id="cardCategory">
              <Label style={{ color: "#666", fontSize: '.9rem' }}>O que você procura ?</Label>
              <Input type="text"/>
              <br />
              <Button>Procurar</Button>
            </Card>
          </Col>

          <Col lg="5" id="cellPhoneImg">
            <Media
              className="align-items-center"
              style={{
                paddingBottom: 6,
              }}
            >
              <img
                alt="..."
                style={{ height: "100%" }}
                className="branding"
                src={require("../../../assets/img/utils/theme01-celphone.png")}
              />
            </Media>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Section;
