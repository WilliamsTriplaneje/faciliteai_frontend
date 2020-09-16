import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

import "./styles.css";
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
  Label,
} from "reactstrap";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Header from "../../components/Website/Header/index";
import Section from "../../components/Website/Section/index";
import Footer from "../../components/Footers/SiteFooter";

function Index() {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);

  useEffect(() => {
    async function loadCategories() {
      await api
        .get("/categories")
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => {
          console.log("Não foi possível listar categorias");
          console.log(err);
        });
    }
    loadCategories();
  }, []);

  useEffect(() => {
    async function loadSubcategories() {
      if (!selectedCategoryId) {
        return;
      }
      await api
        .get("/sub-categories", {
          params: { categoryId: selectedCategoryId },
        })
        .then((result) => {
          setSubCategories(result.data);
        })
        .catch((err) => {
          console.log("Não foi possível listar subcategorias");
          console.log(err);
        });
    }
    loadSubcategories();
  }, [selectedCategoryId]);

  return (
    <>
      <Header />
      <Section />
      <section id="buscar" className="searchSection">
        <Container fluid>
          <Row style={{ marginBottom: "30px", marginTop: "25px" }}>
            <Col
              lg="12"
              md="12"
              xl="12"
              style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <h2>Buscar serviços</h2>
            </Col>
          </Row>
          <Row>
          <Col xs="1" lg="1" md="1" xl="1" />
          <Col xs="10" lg="10" md="10" xl="10">
              <Row
              id="searchSelects"
              style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                alignItems: 'center',
                justifyContent: "center",
                justifyItems: 'center'
              }}
              >
              <Col xs="10" lg="5" md="5" xl="5"
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: 'center',
                justifyContent: "center",
                justifyItems: 'center'
              }}
              >
                <Autocomplete
                  id="combo-box-demo"
                  options={categories}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, value) =>
                    setSelectedCategoryId(value._id)
                  }
                  style={{ width: "80%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Categoria"
                      variant="outlined"
                    />
                  )}
                />
            </Col>

            <Col xs="10" lg="5" md="5" xl="5"
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: 'center',
              justifyContent: "center",
              justifyItems: 'center'
            }}
            >
              <Autocomplete
                id="combo-box-demo"
                options={subCategories}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) =>
                  setSelectedSubCategoryId(value._id)
                }
                style={{ width: "80%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Subcategoria"
                    variant="outlined"
                  />
                )}
              />
            </Col>
              </Row>

              <Row
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: 'center',
                justifyContent: "center",
                justifyItems: 'center'
              }}
              >
              <Button
                    className="searchButton"
                    type="button"
                    onClick={() => {
                      //TODO Redirecionar para próxima tela
                      const categoryId = selectedCategoryId;
                      const subCategoryId = selectedSubCategoryId;
                      history.push(
                        `/services/category=${categoryId}/subcategory=${subCategoryId}`
                      );
                    }}
                  >
                    Buscar
                  </Button>
              </Row>
          </Col>
          <Col xs="1" lg="1" md="1" xl="1" />
          </Row>
        </Container>
      </section>

      <section id="vantagens" className="benefitsSection">
        <Container>
          <Row
            style={{
              marginBottom: "30px",
              marginTop: "25px",
              alignItems: "center",
            }}
            xl ='12'
            lg ='12'
          >
            <Col lg="6" md="6" xl="6" className="platform">
              <img src="http://faciliteai.com.br/assets/images/mockup/home-mockup.png" />
            </Col>
            <Col sm="6" lg="6" md="6" xl="6" className="provider">
              <Row className="title">
                <h3>O que podemos fazer por você?</h3>
              </Row>
              <Row className="data">
                <span>
                  A FACILITE AÍ É UMA PLATAFORMA INOVADORA PARA QUE AS PESSOAS
                  CONSIGAM DE UMA FORMA SIMPLES E ÁGIL FAZER O QUE MAIS PRECISAM
                  NO SEU DIA A DIA: RESOLVER OS SEUS PROBLEMAS.
                </span>
              </Row>
              <Row className="title">
                <h4>Vantagens para o prestador</h4>
              </Row>
              <Row className="data">
                <ul>
                  <li>- Ampla divulgação do serviço no aplicativo;</li>
                  <li>- Maior visibilidade do seu trabalho;</li>
                  <li>- Fácil acionamento e captação de clientes;</li>
                  <li>- Pagamento garantido pela própria Facilite Aí;</li>
                  <li>
                    - Sistema de cadastro direcionado ao prestador de serviço,
                    para controle, acompanhamento e inserção de dados
                    profissionais;
                  </li>
                  <li>
                    - Sistema de avaliação no aplicativo, quanto mais avaliações
                    positivas, maior a visibilidade do profissional;
                  </li>
                </ul>
              </Row>
            </Col>
          </Row>
        </Container>
        <Footer />
      </section>
    </>
  );
}

export default Index;
