import "./payment.css";
import React, { useState, useEffect } from "react";
import api from "../../services/api";
import StripeCheckout from "react-stripe-checkout";
import { STRIPE_PUBLIC } from "../../config/Constants";
import useRouter from "./hooks/useRouter";
import Checkout from "../../components/Website/Stripe/Checkout";
import { useParams } from "react-router-dom";

import { Container, Card, Button, Row } from "reactstrap";

import Header from "../../components/Website/Header/index";

function Payment({ history, location }) {
  const router = useRouter();
  const [services, setServices] = useState({});

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0)
    async function loadService() {
      await api
        .get(`/services/${id}`)
        .then((result) => {
          setServices(result.data);
        })
        .catch((err) => {
          //TODO  ADD SWEETALERT
          alert(err);
        });
    }
    loadService();
  }, []);

  // const [isPaying, setIsPaying] = useState(false)
  const [selectedService, setSelectedService] = useState(null);

  function onSelectService(service) {
    console.log(service);
  }
  if (!selectedService) {
    return (
      <>
        <Header />
        <Container
          fluid
          className="bg-gradient-info"
          style={{
            maxWidth: "100vw",
            margin: 0,
            padding: "25px",
            textAlign: "center",
            height: "100vh",
          }}
        >
          <Card>
            <div key={services._id} className="service">
              <Row className = 'rows'>
                <strong>Serviço:</strong>
                <h2>{services.name}</h2>
              </Row>
              <Row className = 'rows'>
                <strong>Descrição:</strong>
                <span>{services.description}</span>
              </Row>
              <Row className = 'rows'>
                <strong>Preço:</strong>
                <span>R$ {services.price}</span>
                <span>{services.typePay}</span>
              </Row>

              <Button
                type="button"
                onClick={() => {
                  const l = {
                    pathname: '/auth/login',
                    state: {from: location}
                  }
                  console.log(`localtion ${location}`)
                  console.log(location)
                  history.push(l)
                }}
              >
                Contratar
              </Button>
            </div>
          </Card>
        </Container>
      </>
    );
  }
  return <Checkout selectedService={selectedService} history={history} />;
}

export default Payment;
