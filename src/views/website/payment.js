import "./payment.css";
import React, { useState, useEffect } from "react";
import api from "../../services/api";
import StripeCheckout from "react-stripe-checkout";
import useRouter from "./hooks/useRouter";
import Checkout from "../../components/Website/Stripe/Checkout";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { STRIPE_PUBLIC } from "../../config/Constants";
import { loadStripe } from "@stripe/stripe-js";

import { Container, Card, Button, Row, Col } from "reactstrap";

import Header from "../../components/Website/Header/index";
import Footer from "../../components/Footers/SiteFooter";

const stripePromise = loadStripe(STRIPE_PUBLIC);

function Payment({ history, location }) {
  const router = useRouter();
  const [services, setServices] = useState({});
  const [company, setCompany] = useState({});
  const [companyAddress, setCompanyAddress] = useState({});
  const [selectedService, setSelectedService] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    async function loadService() {
      await api
        .get(`/services/${id}`)
        .then((result) => {
          setServices(result.data);
          setCompany(result.data.companyId);
          setCompanyAddress(result.data.companyId.address);
        })
        .catch((err) => {
          //TODO  ADD SWEETALERT
          alert(err);
        });
    }
    loadService();
  }, []);


  async function getCheckoutSection(service) {
    const serviceId = service._id;

    const session = await api
      .post("/stripe/payments/checkout", {
        serviceId
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log("Erro ao obter checkout do pagamento")
        console.log("err")
      })

    return session;
  }

  function onSelectService(service) {
    console.log(service);
  }

  async function goToCheckout(service) {
    console.log("Indo para o checkout")
    const { id } = await getCheckoutSection(service);
    console.log(`ID: ${id}`)
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId: id,
    });
    console.log(error);
  }

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
        <br />
        <Card xl = '12' lg ='12' md ='12'>
          <Col lg="12">
            <div key={company._id} className="service">
              <Row className="rows">
                <img src={company.logoUrl} />
                <div className="companyData">
                  <h2>{company.nameFantasy}</h2>
                  <span>{company.cnpj}</span>
                </div>
              </Row>
            </div>
          </Col>
          <Col lg="12">
            <div key={services._id} className="service">
              <Row className="titleService">
                <h2>{services.name}</h2>
                <Row>
                  <div className="boxIcons">
                    <i
                      className=" ni ni-pin-3"
                      style={{ margin: "8px", fontSize: "1.1rem" }}
                    />
                    <span className="location">
                      {companyAddress.neighborhood} - {companyAddress.city}
                    </span>
                  </div>
                </Row>
              </Row>
              <Row className="rows">
                <strong>Descrição:</strong>
                <span>{services.description}</span>
              </Row>
              <Row className="cardPayment">
                <h1>R$ {services.price}</h1>
                <span>{services.typePay}</span>

                <Button
                  type="button"
                  onClick={() => {
                    setSelectedService(services);
                    goToCheckout(services)
                  }}
                >
                  Contratar
                </Button>
              </Row>
            </div>
          </Col>
        </Card>
      </Container>
      <Footer />
    </>
  );
  // return <Checkout selectedService={selectedService} history={history} />;
}

export default Payment;
