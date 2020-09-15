import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import api from '../../../services/api'

import './styles.css'

import {
  Container,
  Row,
  Col,
  Card,
  Button
} from 'reactstrap'

import Header from "../../../components/Website/Header/index";

function Services() {
  const history = useHistory()
  const [allservices, setServices] = useState([])

  const { catid, subid } = useParams()

  useEffect(() => {
    async function loadServices() {
      await api.get('/services', {
        params: { categoryId: catid, subcategoryId: subid }
      }).then((result) => {
        setServices(result.data)
        console.log(result.data)
      }).catch(() => {
        //TODO ADD SWEETALERT
        alert('Erro na listagem dos serviços')
      })
    }
    loadServices()
  }, [])

  return (
    <>
      <Header />

      <Container fluid className="bg-gradient-info" 
      //  style={{ maxWidth: "100vw", margin: 0, padding: '25px', textAlign: 'center', height: '100vh' }}
      >
        {/* <span style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 'bold' }}>
          Esses são os serviços disponiveis na rua região
          </span> */}
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
              if (service.isActive === true) {
                return (
                  <Col lg='3' md='3' xl='3' className='cardInfoServices pl-0 pl-sm-0 pl-md-3 pl-lg-4 pl-xl-5' key={service._id}>
                    <div className="cardData">
                      <h2>{service.name}</h2>
                      <div className="cardDescription">
                        <span>{service.description}</span>
                        <span className="location">{serviceLocation}</span>
                      </div>
                      <Row className='cardPrice'>
                        <span>R$ {service.price}</span>
                        <span>{service.typePay}</span>
                      </Row>
                      
                      <Button onClick={() => history.push(`/service/${service._id}`)}>Mais</Button>
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
    </>

  );
}

export default Services;