import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom'
import api from '../../../services/api'
import { isAuthenticated } from '../../../auth'
import Swal from 'sweetalert2'

import './styles.css'

import {
  Container,
  Row,
  Col,
  CardHeader,
  Button
} from 'reactstrap'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Header from "../../../components/Website/Header/index";
import Footer from '../../../components/Footers/SiteFooter'
import QueryString from 'query-string'

function Services({ history }) {
  const [allservices, setServices] = useState([])
  const location = useLocation()
  const queries = QueryString.parse(location.search);
  const { catid, subid } = useParams()

  

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);


  useEffect(() => {
    async function loadCategories() {
      await api.get("/categories").then((res) => {
        setCategories(res.data);
      }).catch((err) => {
        console.log("Não foi possível listar categorias")
        console.log(err)
      })
    }
    loadCategories();
  }, []);

  useEffect(() => {
    async function loadSubcategories() {
      if (!selectedCategoryId) {
        return
      }
      await api.get('/sub-categories', {
        params: { categoryId: selectedCategoryId }
      }).then((result) => {
        setSubCategories(result.data)
      }).catch((err) => {
        console.log("Não foi possível listar subcategorias")
        console.log(err)
      })

    }
    loadSubcategories();
  }, [selectedCategoryId]);

  useEffect(() => {
    async function loadServices(category, subcategory) {
      await api.get('/services', {
        params: { categoryId: category, subcategoryId: subcategory }
      }).then((result) => {
        setServices(result.data)
      }).catch(() => {
        //TODO ADD SWEETALERT
        alert('Erro na listagem dos serviços')
      })
    }
    const { category, subcategory } = queries
    loadServices(category, subcategory)
    setSelectedCategoryId(category)
    setSelectedSubCategoryId(subcategory)
  }, [])

  function loadServices() {
    const categoryId = selectedCategoryId
    const subCategoryId = selectedSubCategoryId
    history.push(`/services?category=${categoryId}&subcategory=${subCategoryId}`)
  }

  return (
    <>
      <Header />
      <section id="buscar" className="searchSection bg-gradient-info">
        <Container>
          <Row
            style={{ marginBottom: '30px', marginTop: '25px' }}
          >
            <Col lg="12" md="12" xl="12"
              style={{ display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "center" }}
            >
              <h2 style={{ color: '#fff', fontWeight: 'bold', marginTop: '12px' }}>Buscar serviços</h2>
            </Col>
          </Row>
          <Row >
            <Col lg="12" md="12" xl="12"
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Row
                style={{ display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "center" }}
              >
                <Col lg='6'>
                  <Autocomplete
                    id="combo-box-demo"
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => setSelectedCategoryId(value._id)}
                    style={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Categoria" variant="outlined" />}
                  />
                </Col>
              </Row>
              <Row
                style={{
                  display: "flex", flexDirection: "column", alignContent: "center",
                  justifyContent: "center", marginTop: '15px'
                }}
              >
                <Col lg='6'>
                  <Autocomplete
                    id="combo-box-demo"
                    options={subCategories}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => setSelectedSubCategoryId(value._id)}
                    style={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Subcategoria" variant="outlined" />}
                  />
                </Col>
              </Row>
              <Row
                style={{ display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "center" }}
              >
                <Col lg='6'
                  style={{ display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "center" }}
                >
                  <Button className="searchButton" type='button' onClick={() => {
                    loadServices()
                  }}>Buscar</Button>
                </Col>

              </Row>
            </Col>
          </Row>

        </Container>
      </section>
      <Container fluid>
      <span style = {{fontWeight: 'bold', fontSize: '1.4rem', marginLeft: '20px'}}>Esses são os serviços disponíveis no momento.</span>
        <Row className='cardServices' >
          {
            allservices.map((service) => {
              let serviceLocation = ""
              try {
                const { city, neighborhood } = service.companyId.address
                serviceLocation = `${city}, ${neighborhood}`
              }
              catch (err) {

              }
              if (service.isActive === false) {
                return (
                  <Col lg='6' md='6' xl='6' className='cardInfoServices pl-0 pl-sm-0 pl-md-3 pl-lg-4 pl-xl-5' key={service._id}>
                    <div className="cardData">
                      <CardHeader>
                        <div className='boxIcons' >
                          <i className=" ni ni-briefcase-24 text-dark" style={{ marginRight: '12px', fontSize: '1rem' }} />
                          <h2>{service.name}</h2>
                        </div>
                        <div className='boxIcons' >
                          <i className=" ni ni-pin-3" style={{ marginRight: '8px', fontSize: '1.1rem' }} />
                          <span className="location">{serviceLocation}</span>
                        </div>
                      </CardHeader>

                      <div className="cardDescription">
                        <span>{service.description}</span>
                      </div>
                      <Row className='cardPrice'>
                        <span>R$ {service.price}</span>
                        <span>{service.typePay}</span>
                      </Row>

                      <Button type='button' onClick={async () => {
                        if (isAuthenticated() === true) {
                          history.push(`/service/${service._id}`)
                        }
                        await Swal.fire({
                          imageUrl: "../../assets/img/brand/logo.png",
                          confirmButtonColor: "#0ee49d",
                          title: "Autenticação",
                          text: "Você precisa logar para acessar a página.",
                        });
                        const l = {
                          pathname: "/auth/login",
                          state: { from: `/service/${service._id}` }
                        }
                        console.log(`location: ${location}`)
                        console.log(location)
                        history.push(l)
                      }
                      }>Mais</Button>
                    </div>
                  </Col>
                )
              }
              return (<br />)
            }
            )
          }
        </Row>
      </Container>
      <br/>
      <Footer/>
    </>

  );
}

export default Services;