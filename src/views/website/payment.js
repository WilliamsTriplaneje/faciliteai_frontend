import "./payment.css";
import React, { useState, useEffect } from "react";
import api from "../../services/api";
import StripeCheckout from "react-stripe-checkout";
import { STRIPE_PUBLIC } from "../../config/Constants";
import useRouter from "./hooks/useRouter";
import Checkout from "../../components/Website/Stripe/Checkout";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { Container, Card, Button, Row, Col } from "reactstrap";

import Header from "../../components/Website/Header/index";
import Footer from "../../components/Footers/SiteFooter";

function Payment({ history, location }) {
  const router = useRouter();
  const [services, setServices] = useState({});
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    async function loadService() {
      await api
        .get(`/services/${id}`)
        .then((result) => {
          setServices(result.data);
          localStorage.setItem("companyId", result.data.companyId);
        })
        .catch((err) => {
          //TODO  ADD SWEETALERT
          alert(err);
        });
    }
    loadService();
  }, []);

  const [company, setCompany] = useState({});
  const [companyAddress, setCompanyAddress] = useState({});
  const companyId = localStorage.getItem("companyId");
  useEffect(() => {
    async function loadDataContratant() {
      await api
        .get(`/companies/${companyId}`)
        .then((result) => {
          setCompany(result.data);
          setCompanyAddress(result.data.address);
          console.log(result.data);
        })
        .catch((err) => {
          alert(err);
        });
    }
    loadDataContratant();
  }, [useEffect]);

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
          <br />
          <Card>
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
  }
  return <Checkout selectedService={selectedService} history={history} />;
}

export default Payment;
