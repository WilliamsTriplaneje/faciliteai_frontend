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

      <Container fluid className="bg-gradient-info" style={{ maxWidth: "100vw", margin: 0, padding: '25px', textAlign: 'center', height: '100vh' }}>
        <span style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 'bold' }}>
          Esses são os serviços disponiveis na rua região
          </span>
        {
          allservices.map((all) => (
            <div>
              {
                all.isActive !== true ? (
                  <Row className='cardServices' key={all._id}>
                    <Col lg='12' className='cardInfoServices' >
                      <h2>{all.name}</h2>
                      <span>{all.description}</span>
                      <Row className='cardPrice'>
                        <span>R$ {all.price}</span>
                        <span>{all.typePay}</span>
                      </Row>
                      <Button onClick={() => history.push(`/service/${all._id}`)}>Ver informações</Button>
                    </Col>
                  </Row>
                ) : <br/>
              }
            </div>
          ))
        }
      </Container>
    </>

  );
}

export default Services;