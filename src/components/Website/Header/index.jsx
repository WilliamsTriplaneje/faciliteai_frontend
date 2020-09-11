import React, { useState, useEffect } from "react";
import api from '../../../services/api'
import "./style.css";

import { Button, Card, CardBody, Container, Row, Col, Media } from "reactstrap";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

function website() {
  const [category, setCategory] = useState([]);
   
  useEffect(()=>{
    async function loadCategorys(){
      const categorys = await api.get('/categories')
      setCategory(categorys.data)
    }
    loadCategorys()
  }, [])


  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
  ];
  return (
    <>
      <div className="header  pb-4 pt-2 pt-md-5">
        <Container fluid>
          <div className="header-body">
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
                src={require("../../../assets/img/brand/logo.png")}
              />
            </Media>
            <Row>
              <Col lg="12" xl="12">
                <Card
                  className="card-stats mb-4 mb-xl-0"
                  style={{
                    border: "none",
                    background: "none",
                  }}
                >
                  <CardBody>
                    <Row id="search-area">
                      <Col lg="12" className="combo">
                        <Row>
                          <Autocomplete
                            id="combo-box-demo"
                            options={top100Films}
                            getOptionLabel={(option) => option.title}
                            style={{ width: "100%" }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Categoria "
                                variant="outlined"
                              />
                            )}
                          />
                        </Row>
                      </Col>
                      <Col lg="12" className="combo">
                        <Row>
                          <Autocomplete
                            id="combo-box-demo"
                            options={top100Films}
                            getOptionLabel={(option) => option.title}
                            style={{ width: "100%" }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Subcategoria "
                                variant="outlined"
                              />
                            )}
                          />
                        </Row>
                      </Col>
                      <Col className="col-auto">
                        <Button className="mt-2" color="primary">
                          Procurar
                        </Button>
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
