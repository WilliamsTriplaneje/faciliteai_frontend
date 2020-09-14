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

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

function Section() {

  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState('')

  useEffect(() => {
    async function loadCategories() {
      const response = await api.get("/categories");
      setCategory(response.data);
    }
    loadCategories();
  }, []);

  const [subcategorys, setSubcategory] = useState([])
  useEffect(() => {
    async function loadSubcategories() {
      if(!categoryId){
        return
      }
       await api.get('/sub-categories', {
        params: { categoryId }
      }).then((result)=>{
        setSubcategory(result.data)
      }).catch((e)=>{
        //TODO ADD SWEETALERT
        alert('Error')
      })
      
    }
    loadSubcategories();
  }, [categoryId]);




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
              <Row style={{ width: '100%' }}>
                <Col lg='6'>
                  <Label style={{ color: "#666", fontSize: '.9rem' }}>Categoria</Label>
                  <Autocomplete
                    id="combo-box-demo"
                    options={category}
                    getOptionLabel={(option) => option.category}
                    onChange={(event, value) => setCategoryId(value._id)}
                    style={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Categoria" variant="outlined" />}
                  />
                </Col>
                <br />
                <Col lg='6'>
                  <Label style={{ color: "#666", fontSize: '.9rem' }}>Subcategoria</Label>
                  <Autocomplete
                    id="combo-box-demo"
                    options={subcategorys}
                    getOptionLabel={(option) => option.subcategory}
                    style={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Subcategoria" variant="outlined" />}
                  />
                </Col>
              </Row>

              <br />
              <Button>Procurar</Button>
            </Card>
            <p><a href='/auth/login'>Sou um prestador !</a></p>
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
