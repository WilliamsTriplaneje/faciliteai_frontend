import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
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
  const history = useHistory()

  //THIS EFFECT GET CATEGORYS DATA
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState('')
  useEffect(() => {
    async function loadCategories() {
      const response = await api.get("/categories");
      setCategory(response.data);
    }
    loadCategories();
  }, []);

  //THIS EFFECT GET SUBCATEGORYS DATA
  const [subcategorys, setSubcategory] = useState([])
  const [subcategoryId, setSubcategoryId] = useState('')
  useEffect(() => {
    async function loadSubcategories() {
      if (!categoryId) {
        return
      }
      await api.get('/sub-categories', {
        params: { categoryId }
      }).then((result) => {
        setSubcategory(result.data)
      }).catch((e) => {
        //TODO ADD SWEETALERT
        alert('Error')
      })

    }
    loadSubcategories();
  }, [categoryId]);


  //THIS FUNCTION GET SERICES BETWEEN CATEGORYS
  async function getServices() {
    const servicesUrl = `/services/category=${categoryId}/subcategory=${subcategoryId}`
    history.push(servicesUrl)
  }

  return (
    <>
      <Container
        // fluid
        className="bg-gradient-info"
        style={{ maxWidth: "100vw", margin: 0 }}
      >
        <Row>
        <Col lg="1" md="1" xl="1"></Col>
          <Col lg="10" md="6" xl="6" id="descriptionFacilite"
          style={{ display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "center" }}>
              <Row className="title" style={{
                display: "flex", flexDirection: "column", alignContent: "center", 
                justifyContent: "center"
              }}>
                <h3>O SEU PROBLEMA É O</h3>
                <h3>NOSSO PROBLEMA E </h3>
                <h3>NÓS TEMOS A SOLUÇÃO</h3>
              </Row>
              <Row className="description" style={{
                display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "center"
              }}>
                <span>A FaciliteAi é uma plataforma inovadora para que as</span>
                <span>pessoas consigam de uma forma simples e ágil fazer o que</span>
                <span>mais precisam no seu dia a dia: resolver seus problemas.</span>
              </Row>
              <Row className="buttons" style={{
                display: "flex", flexDirection: "row", alignContent: "center", 
                justifyContent: "center", marginTop: '10px'
              }}>
                <Button className="downloadButton" href="#">Baixe o app</Button>
                <Button className="knowMoreButton" href="#saiba-mais">Saiba Mais</Button>
              </Row>
          </Col>
          <Col lg="0" md="4" xl="4" id="cellPhoneImg">
            <Media
                className="align-items-center"
                style={{
                  paddingBottom: 6,
                }}
              >
                <img
                  alt="..."
                  style={{ height: "100%", marginTop: '40px' }}
                  className="branding"
                  src={require("../../../assets/img/utils/theme01-celphone.png")}
                />
              </Media>
          </Col>
          <Col lg="1" md="1" xl="1"></Col>
        </Row>
      </Container>
    </>
  );
}

export default Section;
